import { NextResponse } from "next/server";

import { leadTypeMap, modalSchemaMap } from "@/lib/form-schemas";
import { sendLeadEmails } from "@/lib/email";
import { isHoneypotFilled, verifyLeadChallenge } from "@/lib/lead-challenge";
import { logLeadError, logLeadInfo, logLeadWarn } from "@/lib/lead-logger";
import { createLeadId, isBlobConfigured, saveLeadToBlob } from "@/lib/lead-storage";
import { isSmtpConfigured } from "@/lib/smtp";
import type { ModalId } from "@/lib/site-content";

const modalIdSchema = ["contactModal", "quoteModal", "faultReportModal", "documentRequestModal"] as const;

function isModalId(value: string): value is ModalId {
  return modalIdSchema.includes(value as ModalId);
}

function getEmailDomain(value: unknown) {
  if (typeof value !== "string" || !value.includes("@")) {
    return null;
  }

  return value.split("@").at(-1) ?? null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      modalId?: string;
      data?: Record<string, unknown>;
    };

    if (!payload.modalId || !payload.data || !isModalId(payload.modalId)) {
      logLeadWarn("invalid_payload", {
        hasModalId: Boolean(payload.modalId),
        hasData: Boolean(payload.data)
      });
      return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
    }

    if (
      isHoneypotFilled(payload.data.website) ||
      !verifyLeadChallenge(payload.data.challengeAnswer, payload.data.challengeToken)
    ) {
      logLeadWarn("anti_spam_failed", {
        modalId: payload.modalId,
        honeypotFilled: isHoneypotFilled(payload.data.website),
        emailDomain: getEmailDomain(payload.data.email)
      });
      return NextResponse.json({ error: "Verifica anti-spam non superata" }, { status: 400 });
    }

    const schema = modalSchemaMap[payload.modalId];
    const parsed = schema.safeParse(payload.data);

    if (!parsed.success) {
      logLeadWarn("validation_failed", {
        modalId: payload.modalId,
        issues: parsed.error.flatten()
      });
      return NextResponse.json(
        {
          error: "Controlla i campi richiesti",
          issues: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const data = parsed.data as Record<string, unknown>;
    const leadType = leadTypeMap[payload.modalId];
    const leadId = createLeadId();
    const createdAt = new Date().toISOString();

    logLeadInfo("lead_request_received", {
      modalId: payload.modalId,
      leadType,
      leadId,
      emailDomain: getEmailDomain(data.email),
      blobConfigured: isBlobConfigured(),
      smtpConfigured: isSmtpConfigured()
    });

    const emailData = data as Record<string, string | boolean | null | undefined>;

    const emailResult = await sendLeadEmails({
      modalId: payload.modalId,
      leadId,
      data: emailData
    });

    const blobResult = await saveLeadToBlob({
      id: leadId,
      modalId: payload.modalId,
      type: leadType,
      data,
      email: emailResult,
      createdAt
    });

    if (!emailResult.internalSent && !emailResult.confirmationSent) {
      logLeadWarn("lead_email_not_sent", {
        modalId: payload.modalId,
        leadId,
        leadSaved: blobResult.saved,
        blobError: blobResult.error,
        smtpConfigured: isSmtpConfigured(),
        internalError: emailResult.internalError,
        confirmationError: emailResult.confirmationError
      });

      return NextResponse.json(
        {
          error: "Invio email non riuscito. Riprova tra qualche minuto oppure contattaci via telefono.",
          leadSaved: blobResult.saved
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        leadId,
        leadSaved: blobResult.saved,
        emailSent: emailResult.internalSent,
        confirmationSent: emailResult.confirmationSent
      },
      { status: 201 }
    );
  } catch (error) {
    logLeadError("lead_api_unhandled_error", error);
    return NextResponse.json(
      {
        error: "Invio non riuscito. Riprova tra qualche minuto oppure contattaci via telefono."
      },
      { status: 500 }
    );
  }
}

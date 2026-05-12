import { modalDefinitions, type ModalId } from "@/lib/site-content";
import { logLeadError, logLeadInfo, logLeadWarn } from "@/lib/lead-logger";
import { getResendClient, getResendDiagnostics, getResendFrom, getResendLeadTo } from "@/lib/resend";
import { getSiteUrl } from "@/lib/site-url";

type LeadFieldValue = string | boolean | null | undefined;

type LeadEmailPayload = {
  modalId: ModalId;
  leadId: string;
  data: Record<string, LeadFieldValue>;
};

type LeadEmailResult = {
  internalSent: boolean;
  confirmationSent: boolean;
  internalError?: string;
  confirmationError?: string;
};

const siteUrl = getSiteUrl();
const defaultFrom = getResendFrom();
const leadTo = getResendLeadTo();
const replyToAddress = "info@siamcondomini.com";
const logoUrl = `${siteUrl}/images/brand/logo-siam.png`;

function getRequesterEmail(payload: LeadEmailPayload) {
  const value = payload.data.email;

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return leadTo;
}

function escapeHtml(value: LeadFieldValue) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(value: LeadFieldValue) {
  if (typeof value === "boolean") {
    return value ? "Sì" : "No";
  }

  return value && String(value).trim() ? String(value).trim() : "—";
}

function buildRows(modalId: ModalId, data: Record<string, LeadFieldValue>) {
  const modal = modalDefinitions.find((entry) => entry.id === modalId);

  if (!modal) {
    return "";
  }

  return modal.fields
    .filter((field) => field.type !== "checkbox" || field.name === "privacyConsent")
    .map((field) => {
      const value = formatValue(data[field.name]);
      return `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #d8e0e8;color:#4b5563;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(
            field.label
          )}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #d8e0e8;color:#0f172a;font-size:14px;line-height:1.5;vertical-align:top;">${escapeHtml(
            value
          )}</td>
        </tr>
      `;
    })
    .join("");
}

function buildHeaderLogo() {
  return `
    <div style="display:inline-block;background:#ffffff;border-radius:12px;padding:8px 12px;">
      <img src="${logoUrl}" width="112" height="42" alt="SIAM s.r.l." style="display:block;width:112px;height:auto;border:0;" />
    </div>
  `;
}

function buildAdminEmailHtml(payload: LeadEmailPayload) {
  const rows = buildRows(payload.modalId, payload.data);
  const requesterEmail = getRequesterEmail(payload);

  return `
    <div style="margin:0;padding:0;background:#f5f8fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #d8e0e8;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(14,39,66,0.08);">
          <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#0f3a74,#1d7dc9);color:#fff;">
            ${buildHeaderLogo()}
            <h1 style="margin:18px 0 0;font-size:26px;line-height:1.2;">Nuova Richiesta da Sito Web</h1>
          </div>

          <div style="padding:28px;">
            <p style="margin:0 0 18px;color:#334155;font-size:14px;line-height:1.7;">
              È arrivata una nuova richiesta dal sito SIAM s.r.l. I dettagli sono riportati di seguito.
            </p>

            <table style="width:100%;border-collapse:collapse;border:1px solid #d8e0e8;border-radius:16px;overflow:hidden;">
              <tbody>${rows}</tbody>
            </table>

            <div style="margin-top:22px;padding:16px 18px;border-radius:14px;background:#f1f6fb;color:#0f172a;font-size:13px;line-height:1.6;">
              Ricevuta dal sito: <a href="${siteUrl}" style="color:#0f3a74;text-decoration:underline;">${siteUrl}</a><br />
              Email del richiedente: <a href="mailto:${escapeHtml(requesterEmail)}" style="color:#0f3a74;text-decoration:underline;">${escapeHtml(
                requesterEmail
              )}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildUserConfirmationHtml(payload: LeadEmailPayload) {
  const userEmail = String(payload.data.email ?? "");

  return `
    <div style="margin:0;padding:0;background:#f5f8fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #d8e0e8;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(14,39,66,0.08);">
          <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#0f3a74,#1d7dc9);color:#fff;">
            ${buildHeaderLogo()}
            <h1 style="margin:18px 0 0;font-size:26px;line-height:1.2;">Abbiamo ricevuto la tua richiesta di contatto</h1>
          </div>

          <div style="padding:28px;">
            <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;">
              Grazie per averci scritto. La tua richiesta è stata presa in carico e ti ricontatteremo al più presto.
            </p>
            <p style="margin:16px 0 0;color:#334155;font-size:14px;line-height:1.7;">
              Se vuoi aggiungere ulteriori dettagli, puoi rispondere direttamente a questa email o scriverci a
              <a href="mailto:${replyToAddress}" style="color:#0f3a74;text-decoration:underline;"> ${replyToAddress}</a>.
            </p>
            <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.6;">
              Questa conferma è stata inviata a ${escapeHtml(userEmail)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendLeadEmails(payload: LeadEmailPayload): Promise<LeadEmailResult> {
  const resend = getResendClient();
  const diagnostics = getResendDiagnostics();

  if (!resend) {
    logLeadWarn("resend_not_configured", {
      leadId: payload.leadId,
      modalId: payload.modalId,
      resend: diagnostics
    });

    return { internalSent: false, confirmationSent: false };
  }

  const internalSubject = "Nuova Richiesta da Sito Web";
  const confirmationSubject = "SIAM s.r.l. - abbiamo ricevuto la tua richiesta di contatto";

  const safeSend = async (options: Parameters<typeof resend.emails.send>[0]) => {
    try {
      const result = await resend.emails.send(options);

      if (result.error) {
        logLeadError("resend_send_failed", result.error, {
          leadId: payload.leadId,
          modalId: payload.modalId,
          to: options.to,
          bcc: options.bcc,
          resend: diagnostics
        });
        return { error: result.error };
      }

      logLeadInfo("resend_send_success", {
        leadId: payload.leadId,
        modalId: payload.modalId,
        to: options.to,
        bcc: options.bcc,
        messageId: result.data?.id
      });
      return { result };
    } catch (error) {
      logLeadError("resend_send_failed", error, {
        leadId: payload.leadId,
        modalId: payload.modalId,
        to: options.to,
        bcc: options.bcc,
        resend: diagnostics
      });
      return { error };
    }
  };

  const [internalResult, confirmationResult] = await Promise.all([
    safeSend({
      from: defaultFrom,
      to: leadTo,
      replyTo: getRequesterEmail(payload),
      subject: internalSubject,
      html: buildAdminEmailHtml(payload)
    }),
    safeSend({
      from: defaultFrom,
      to: String(payload.data.email ?? ""),
      replyTo: replyToAddress,
      subject: confirmationSubject,
      html: buildUserConfirmationHtml(payload)
    })
  ]);

  return {
    internalSent: !("error" in internalResult) || !internalResult.error,
    confirmationSent: !("error" in confirmationResult) || !confirmationResult.error,
    internalError:
      "error" in internalResult && internalResult.error instanceof Error
        ? internalResult.error.message
        : undefined,
    confirmationError:
      "error" in confirmationResult && confirmationResult.error instanceof Error
        ? confirmationResult.error.message
        : undefined
  };
}

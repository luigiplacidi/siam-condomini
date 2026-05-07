import { contactInfo, modalDefinitions, type ModalId } from "@/lib/site-content";
import { logLeadError, logLeadInfo, logLeadWarn } from "@/lib/lead-logger";
import { getResendClient, getResendDiagnostics } from "@/lib/resend";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultFrom = process.env.RESEND_FROM ?? "SIAM Condomini <noreply@siamcondomini.it>";
const leadTo = process.env.RESEND_LEAD_TO ?? "siam.condomini@gmail.com";

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

function buildAdminEmailHtml(payload: LeadEmailPayload) {
  const modal = modalDefinitions.find((entry) => entry.id === payload.modalId);
  const title = modal?.title ?? "Nuova richiesta";
  const rows = buildRows(payload.modalId, payload.data);

  return `
    <div style="margin:0;padding:0;background:#f5f8fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #d8e0e8;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(14,39,66,0.08);">
          <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#0f3a74,#1d7dc9);color:#fff;">
            <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85;">SIAM Condomini</div>
            <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;">Nuova richiesta: ${escapeHtml(title)}</h1>
            <p style="margin:10px 0 0;font-size:14px;line-height:1.6;opacity:.92;">ID pratica: ${escapeHtml(
              payload.leadId
            )}</p>
          </div>

          <div style="padding:28px;">
            <p style="margin:0 0 18px;color:#334155;font-size:14px;line-height:1.7;">
              È arrivata una nuova richiesta dal sito SIAM Condomini. I dettagli sono riportati di seguito.
            </p>

            <table style="width:100%;border-collapse:collapse;border:1px solid #d8e0e8;border-radius:16px;overflow:hidden;">
              <tbody>${rows}</tbody>
            </table>

            <div style="margin-top:22px;padding:16px 18px;border-radius:14px;background:#f1f6fb;color:#0f172a;font-size:13px;line-height:1.6;">
              Ricevuta dal sito: <a href="${siteUrl}" style="color:#0f3a74;text-decoration:underline;">${siteUrl}</a><br />
              Puoi rispondere direttamente all'utente usando il campo email presente nella richiesta.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildUserConfirmationHtml(payload: LeadEmailPayload) {
  const modal = modalDefinitions.find((entry) => entry.id === payload.modalId);
  const title = modal?.title ?? "la tua richiesta";
  const userEmail = String(payload.data.email ?? "");

  return `
    <div style="margin:0;padding:0;background:#f5f8fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #d8e0e8;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(14,39,66,0.08);">
          <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#0f3a74,#1d7dc9);color:#fff;">
            <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85;">SIAM Condomini</div>
            <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;">Abbiamo ricevuto ${escapeHtml(title)}</h1>
          </div>

          <div style="padding:28px;">
            <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;">
              Grazie per averci scritto. La tua richiesta è stata presa in carico e ti ricontatteremo al più presto.
            </p>
            <p style="margin:16px 0 0;color:#334155;font-size:14px;line-height:1.7;">
              Se vuoi aggiungere ulteriori dettagli, puoi rispondere direttamente a questa email o scriverci a
              <a href="mailto:${escapeHtml(contactInfo.email)}" style="color:#0f3a74;text-decoration:underline;"> ${escapeHtml(
                contactInfo.email
              )}</a>.
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

  const modal = modalDefinitions.find((entry) => entry.id === payload.modalId);
  const subject = modal?.title ?? "Nuova richiesta dal sito";
  const internalSubject = `[SIAM Condomini] ${subject}`;

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
      replyTo: String(payload.data.email ?? leadTo),
      subject: internalSubject,
      html: buildAdminEmailHtml(payload)
    }),
    safeSend({
      from: defaultFrom,
      to: String(payload.data.email ?? ""),
      bcc: leadTo,
      replyTo: leadTo,
      subject: `SIAM Condomini - ricevuta ${subject.toLowerCase()}`,
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

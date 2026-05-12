import { Resend } from "resend";

export const defaultResendFrom = "SIAM s.r.l. <info@send.siamcondomini.com>";
export const defaultLeadTo = "siam.condomini@gmail.com";

let client: Resend | null = null;

function getEnvValue(name: string) {
  const value = process.env[name]?.trim();

  return value ? value : null;
}

export function isResendConfigured() {
  return Boolean(getEnvValue("RESEND_API_KEY"));
}

export function getResendFrom() {
  return getEnvValue("RESEND_FROM") ?? defaultResendFrom;
}

export function getResendLeadTo() {
  return getEnvValue("RESEND_LEAD_TO") ?? defaultLeadTo;
}

export function getResendDiagnostics() {
  return {
    configured: isResendConfigured(),
    hasApiKey: isResendConfigured(),
    from: getResendFrom(),
    leadTo: getResendLeadTo()
  };
}

export function getResendClient() {
  const apiKey = getEnvValue("RESEND_API_KEY");

  if (!apiKey) {
    return null;
  }

  if (!client) {
    client = new Resend(apiKey);
  }

  return client;
}

import { Resend } from "resend";

let client: Resend | null = null;

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getResendDiagnostics() {
  return {
    configured: isResendConfigured(),
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    from: process.env.RESEND_FROM ?? null,
    leadTo: process.env.RESEND_LEAD_TO ?? "siam.condomini@gmail.com"
  };
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!client) {
    client = new Resend(apiKey);
  }

  return client;
}

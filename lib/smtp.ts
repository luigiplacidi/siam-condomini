import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null;

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function getSmtpOptions(): SMTPTransport.Options | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = parseBoolean(process.env.SMTP_SECURE, port === 465);

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  };
}

export function getSmtpDiagnostics() {
  const port = Number(process.env.SMTP_PORT ?? "465");

  return {
    configured: isSmtpConfigured(),
    hasHost: Boolean(process.env.SMTP_HOST),
    host: process.env.SMTP_HOST ?? null,
    hasUser: Boolean(process.env.SMTP_USER),
    user: process.env.SMTP_USER ?? null,
    hasPass: Boolean(process.env.SMTP_PASS),
    port: Number.isNaN(port) ? null : port,
    secure: parseBoolean(process.env.SMTP_SECURE, port === 465),
    from: process.env.SMTP_FROM ?? null,
    leadTo: process.env.SMTP_LEAD_TO ?? "siam.condomini@gmail.com"
  };
}

export function isSmtpConfigured() {
  return Boolean(getSmtpOptions());
}

export function getSmtpTransporter() {
  const options = getSmtpOptions();

  if (!options) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport(options);
  }

  return transporter;
}

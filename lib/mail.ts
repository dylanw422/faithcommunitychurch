import nodemailer from "nodemailer";

export class MailConfigurationError extends Error {}

export function createSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT ?? "587");

  if (!host || !user || !password || !Number.isInteger(port)) {
    throw new MailConfigurationError("SMTP environment variables are not configured.");
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user, pass: password },
      disableFileAccess: true,
      disableUrlAccess: true,
    }),
    user,
  };
}

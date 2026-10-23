import nodemailer from "nodemailer";
export const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      requireTLS: process.env.NODE_ENV === "production" && process.env.SMTP_SECURE !== "true",
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })
  : null;

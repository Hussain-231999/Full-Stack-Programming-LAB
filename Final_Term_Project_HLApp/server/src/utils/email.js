import nodemailer from "nodemailer";

let transporter;

async function createDemoTransporter() {
  const account = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
}

async function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function getTransporter() {
  if (transporter) {
    return transporter;
  }

  transporter = process.env.SMTP_HOST ? await createSmtpTransporter() : await createDemoTransporter();
  return transporter;
}

export async function sendEmail({ to, subject, text }) {
  const mailer = await getTransporter();
  const info = await mailer.sendMail({
    from: process.env.EMAIL_FROM || "\"Healthcare System\" <no-reply@hospital.test>",
    to,
    subject,
    text
  });

  return {
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info)
  };
}

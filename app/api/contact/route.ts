import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body: ContactRequest): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(body.email)) return "Please enter a valid email address.";
  if (!body.subject?.trim()) return "Subject is required.";
  if (!body.message?.trim()) return "Message is required.";
  if (body.message.trim().length < 10) return "Message should be at least 10 characters.";

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || "cchandhan021@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass || !fromEmail) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set SMTP_USER, SMTP_PASS and CONTACT_FROM_EMAIL in environment.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = body.name.trim();
    const safeEmail = body.email.trim();
    const safePhone = body.phone?.trim() || "Not provided";
    const safeSubject = body.subject.trim();
    const safeMessage = body.message.trim();

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: safeEmail,
      subject: `[Portfolio Contact] ${safeSubject}`,
      text: `New contact request received\n\nName: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nSubject: ${safeSubject}\n\nMessage:\n${safeMessage}`,
      html: `
        <h2>New contact request received</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submit failed", error);
    return NextResponse.json(
      { error: "Unable to send message at this time. Please try again later." },
      { status: 500 },
    );
  }
}

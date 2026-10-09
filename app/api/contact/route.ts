import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/schemas";
import { consumeRateLimit, getRequestIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_SECONDS = 60 * 60;
const MAX_BODY_BYTES = 10_000;

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

/** Visitor input is shown as text in the email, never interpreted as HTML (no injected links or buttons). */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character] ?? character);
}

/** Strips line breaks so a name can't smuggle extra lines into the subject header. */
function toSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Съобщението е твърде дълго." }, { status: 413 });
    }

    const body: unknown = await request.json().catch(() => null);
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Моля, провери въведените данни и опитай отново." },
        { status: 422 }
      );
    }

    const withinLimit = await consumeRateLimit(
      "contact-form",
      getRequestIp(),
      CONTACT_LIMIT,
      CONTACT_WINDOW_SECONDS
    );
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Изпратихте много съобщения. Опитайте отново по-късно или пишете директно на имейла." },
        { status: 429, headers: { "Retry-After": String(CONTACT_WINDOW_SECONDS) } }
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error("Contact form error: SMTP is not configured");
      return NextResponse.json(
        { error: "Формата временно не работи. Моля, пишете директно на имейла." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const name = toSingleLine(parsed.data.name);
    const email = toSingleLine(parsed.data.email);
    const message = parsed.data.message;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Ново съобщение от сайта — ${name}`,
      text: `Име: ${name}\nИмейл: ${email}\n\nСъобщение:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 12px;">Ново съобщение от portfolio сайта</h2>
          <p><strong>Име:</strong> ${escapeHtml(name)}</p>
          <p><strong>Имейл:</strong> ${escapeHtml(email)}</p>
          <p><strong>Съобщение:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `
    });

    return NextResponse.json({
      message: "Съобщението беше изпратено успешно. Благодаря за контакта."
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Възникна неочакван проблем. Моля, опитай отново по-късно." },
      { status: 500 }
    );
  }
}

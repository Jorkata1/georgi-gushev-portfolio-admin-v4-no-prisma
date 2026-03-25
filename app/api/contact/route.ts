import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Моля, провери въведените данни и опитай отново." },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      return NextResponse.json(
        {
          error:
            "SMTP настройките не са конфигурирани. Добави валидни данни в .env файла."
        },
        { status: 500 }
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

    const { name, email, message } = parsed.data;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Ново съобщение от сайта — ${name}`,
      text: `Име: ${name}\nИмейл: ${email}\n\nСъобщение:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 12px;">Ново съобщение от portfolio сайта</h2>
          <p><strong>Име:</strong> ${name}</p>
          <p><strong>Имейл:</strong> ${email}</p>
          <p><strong>Съобщение:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
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

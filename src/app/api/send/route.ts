import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Получены данные:", body);

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // твой подтвержденный email
      to: "ulgusevramil@gmail.com", // куда отправляешь
      subject: "Новая заявка с сайта",
      html: `
        <p>Имя: ${body.username}</p>
        <p>Контакт: ${body.phone}</p>
        <p>Метод связи: ${body.contactMethod}</p>
      `,
    });

    console.log("Ответ Resend:", data);

    return NextResponse.json({ message: "Письмо отправлено" });
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

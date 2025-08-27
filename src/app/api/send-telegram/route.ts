import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Получены данные:", body);

  const contact = body.contact; // <-- берем поле contact напрямую

  try {
    const message = `
Новая заявка с сайта:
Имя: ${body.username}
Контакт: ${contact}
`;

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.description);

    return NextResponse.json({ message: "Заявка отправлена в Telegram", data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

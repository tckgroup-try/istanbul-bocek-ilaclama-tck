import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to map DB Enums to readable Turkish text for Telegram
const customerTypeLabels: Record<string, string> = {
  B2C: 'Bireysel (B2C)',
  B2B: 'Kurumsal (B2B)'
};

const pestTypeLabels: Record<string, string> = {
  UCAN_HASERE: 'Uçan Haşere (Sivrisinek, Arı vb.)',
  YURIYEN_HASERE: 'Yürüyen Haşere (Hamam Böceği, Kalorifer vb.)',
  KEMIRGEN: 'Kemirgen (Fare, Sıçan)',
  OZEL_MUDAHALE: 'Özel Müdahale (Akrep, Yılan vb.)',
  DIGER: 'Diğer / Belirtilmemiş'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerType,
      pestType,
      areaSizeSqM,
      serviceArea,
      fullName,
      phoneNumber,
      isUrgent,
      message
    } = body;

    // Validate inputs
    if (!customerType || !pestType || !serviceArea || !fullName || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create Lead in PostgreSQL
    const lead = await prisma.lead.create({
      data: {
        customerType,
        pestType,
        areaSizeSqM: areaSizeSqM ? parseInt(areaSizeSqM) : null,
        serviceArea,
        fullName,
        phoneNumber,
        isUrgent: Boolean(isUrgent),
        message: message || null
      }
    });

    // 2. Telegram Alert Dispatch (Optional / Silent Fail-safe)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Only attempt if variables are set and are not default placeholders
    if (
      botToken && 
      chatId && 
      botToken !== 'your-telegram-bot-token-here' && 
      chatId !== 'your-telegram-chat-id-here'
    ) {
      try {
        const text = `🔔 *Yeni İlaçlama Talebi (Lead)*\n\n` +
          `👤 *Müşteri:* ${fullName}\n` +
          `📞 *Telefon:* ${phoneNumber}\n` +
          `📍 *Bölge:* ${serviceArea}\n` +
          `🏢 *Tip:* ${customerTypeLabels[customerType] || customerType}\n` +
          `🐛 *Haşere Grubu:* ${pestTypeLabels[pestType] || pestType}\n` +
          `📐 *Alan (m²):* ${areaSizeSqM ? areaSizeSqM + ' m²' : 'Belirtilmedi'}\n` +
          `🚨 *Acil mi?:* ${isUrgent ? '🔴 EVET (ACİL)' : '🟢 Normal'}\n` +
          (message ? `📝 *Not:* ${message}\n` : '') +
          `\n⏱️ _Sistem Kayıt Tarihi: ${new Date().toLocaleString('tr-TR')}_`;

        // Send via fetch to Telegram Bot API
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
          })
        });
      } catch (tgError) {
        // Log Telegram failures but DO NOT fail the main response to the user
        console.error('⚠️ Telegram Notification sending failed:', tgError);
      }
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

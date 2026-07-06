import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      isUrgent
    } = body;

    // Validate inputs
    if (!customerType || !pestType || !serviceArea || !fullName || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        customerType,
        pestType,
        areaSizeSqM: areaSizeSqM ? parseInt(areaSizeSqM) : null,
        serviceArea,
        fullName,
        phoneNumber,
        isUrgent: Boolean(isUrgent),
      }
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

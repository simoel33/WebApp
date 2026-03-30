import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, role, country, phoneNumber, message, captcha } = body;

    // Validate required fields
    if (!email || !name || !role || !country || !phoneNumber || !message || captcha !== true) {
      return NextResponse.json(
        { message: "Missing required fields or invalid captcha" },
        { status: 400 }
      );
    }

    // Save to database
    const savedMessage = await prisma.contactMessage.create({
      data: {
        email,
        name,
        role,
        country,
        phoneNumber,
        message,
      },
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        id: savedMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "An error occurred while sending your message" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

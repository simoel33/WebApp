import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { requireAdminAuth } from "@/lib/admin-session";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth();

    // Get messages with pagination
    const page = request.nextUrl.searchParams.get("page");
    const pageNumber = parseInt(page || "1");
    const pageSize = 20;
    const skip = (pageNumber - 1) * pageSize;

    const [messages, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.contactMessage.count(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      messages,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalCount,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1,
      },
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminAuth();

    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Message ID is required" },
        { status: 400 }
      );
    }

    const deletedMessage = await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

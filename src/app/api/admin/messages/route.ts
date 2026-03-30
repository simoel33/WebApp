import { NextRequest, NextResponse } from "next/server";
import { XMLMessageStore } from "@/lib/xml-message-store";
import { requireAdminAuth } from "@/lib/admin-session";

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth();

    // Get messages with pagination
    const page = request.nextUrl.searchParams.get("page");
    const pageNumber = parseInt(page || "1");

    const result = await XMLMessageStore.getMessages(pageNumber, 20);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
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

    const deleted = await XMLMessageStore.deleteMessage(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

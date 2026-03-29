import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { ADMIN_CONFIG } from "@/config/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check against config credentials
    if (email !== ADMIN_CONFIG.email) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, ADMIN_CONFIG.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set session cookie (use email as session ID)
    const cookieStore = await cookies();
    cookieStore.set("admin-session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Login successful",
        admin: {
          email: ADMIN_CONFIG.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

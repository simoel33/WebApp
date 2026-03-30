import { NextRequest, NextResponse } from "next/server";
import { XMLMessageStore } from "@/lib/xml-message-store";

export async function POST(request: NextRequest) {
  try {
    console.log("Contact API called");
    const body = await request.json();
    console.log("Request body:", body);
    const { email, name, role, country, phoneNumber, message, captcha } = body;

    // Validate required fields
    if (!email || !name || !role || !country || !phoneNumber || !message || captcha !== true) {
      console.log("Validation failed:", { email, name, role, country, phoneNumber, message, captcha });
      return NextResponse.json(
        { message: "Missing required fields or invalid captcha" },
        { status: 400 }
      );
    }

    console.log("Validation passed, saving message...");
    // Save to XML file
    const savedMessage = await XMLMessageStore.saveMessage({
      email,
      name,
      role,
      country,
      phoneNumber,
      message,
    });

    console.log("Message saved successfully:", savedMessage.id);
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
  }
}
//   } catch (error) {
//     console.error("Captcha verification error:", error);
//     return false;
//   }
// }

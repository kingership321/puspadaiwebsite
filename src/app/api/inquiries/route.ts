import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      propertyId,
      agencyId,
      agentId,
      name,
      email,
      phone,
      message,
      preferredViewingTime,
      inquiryType,
    } = body;

    if (!propertyId || !name || !email || !message) {
      return NextResponse.json(
        { error: "Property ID, Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Listing could not be located." },
        { status: 404 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId,
        userId: user ? user.id : undefined,
        agencyId: agencyId || property.agencyId,
        agentId: agentId || property.agentId,
        name,
        email,
        phone,
        message,
        preferredViewingTime,
        inquiryType: inquiryType || "MESSAGE",
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully dispatched to listing representative.",
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Unable to process inquiry. Please try again later." },
      { status: 500 }
    );
  }
}

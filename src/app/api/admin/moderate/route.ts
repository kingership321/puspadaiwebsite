import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { propertyId, action, rejectionReason } = await request.json();

    if (!propertyId || !action) {
      return NextResponse.json({ error: "propertyId and action are required" }, { status: 400 });
    }

    let status = "PUBLISHED";
    if (action === "APPROVE") status = "PUBLISHED";
    if (action === "REJECT") status = "DRAFT";
    if (action === "PAUSE") status = "PAUSED";
    if (action === "ARCHIVE") status = "ARCHIVED";

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        status,
        rejectionReason: action === "REJECT" ? rejectionReason || "Does not meet listing standards" : null,
      },
    });

    // Record in Audit Log
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        actorName: user.name,
        action: `LISTING_${action}`,
        entityType: "Property",
        entityId: propertyId,
        metadata: JSON.stringify({ status, rejectionReason }),
      },
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (error) {
    console.error("Admin moderation error:", error);
    return NextResponse.json({ error: "Failed to process moderation action" }, { status: 500 });
  }
}

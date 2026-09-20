import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const savedSearches = await prisma.savedSearch.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ savedSearches });
  } catch (error) {
    console.error("Saved searches GET error:", error);
    return NextResponse.json({ error: "Failed to fetch saved searches" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, searchType, filtersJson, notificationFrequency } = await request.json();

    const savedSearch = await prisma.savedSearch.create({
      data: {
        userId: user.id,
        name: name || "Custom Search Alert",
        searchType: searchType || "ALL",
        filtersJson: typeof filtersJson === "string" ? filtersJson : JSON.stringify(filtersJson || {}),
        notificationFrequency: notificationFrequency || "DAILY",
      },
    });

    return NextResponse.json({ success: true, savedSearch });
  } catch (error) {
    console.error("Saved searches POST error:", error);
    return NextResponse.json({ error: "Failed to save search" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 });
    }

    await prisma.savedSearch.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Saved search DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete saved search" }, { status: 500 });
  }
}

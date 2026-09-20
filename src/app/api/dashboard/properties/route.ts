import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "AGENT" && user.role !== "OWNER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Forbidden: Agent, Owner or Admin role required" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      listingType,
      propertyType,
      price,
      deposit,
      bedrooms,
      bathrooms,
      area,
      address,
      cityId,
      areaId,
      description,
      furnished,
      parking,
      imageUrls = [],
    } = body;

    const baseSlug = slugify(title || "property-listing");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    // Resolve city to get coordinates fallback
    const city = await prisma.city.findUnique({ where: { id: cityId } });
    const lat = city ? city.latitude + 0.005 : 40.7128;
    const lng = city ? city.longitude + 0.005 : -74.0060;

    // Resolve agent if user is an agent
    const agent = await prisma.agent.findFirst();

    const property = await prisma.property.create({
      data: {
        slug: uniqueSlug,
        listingType: listingType || "RENT",
        propertyType: propertyType || "APARTMENT",
        title,
        description: description || "Modern high-finish property in a premier neighborhood.",
        price: parseFloat(price),
        deposit: deposit ? parseFloat(deposit) : null,
        bedrooms: parseInt(bedrooms) || 1,
        bathrooms: parseFloat(bathrooms) || 1,
        area: parseFloat(area) || 800,
        address,
        cityId,
        areaId,
        agentId: agent ? agent.id : undefined,
        agencyId: agent ? agent.agencyId : undefined,
        latitude: lat,
        longitude: lng,
        furnished: !!furnished,
        parking: !!parking,
        status: user.role === "ADMIN" ? "PUBLISHED" : "PENDING_REVIEW",
      },
    });

    // Add images
    if (imageUrls && imageUrls.length > 0) {
      for (let i = 0; i < imageUrls.length; i++) {
        await prisma.propertyImage.create({
          data: {
            propertyId: property.id,
            url: imageUrls[i],
            alt: `${title} photo ${i + 1}`,
            sortOrder: i,
            isMain: i === 0,
          },
        });
      }
    } else {
      await prisma.propertyImage.create({
        data: {
          propertyId: property.id,
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
          alt: title,
          sortOrder: 0,
          isMain: true,
        },
      });
    }

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        actorName: user.name,
        action: "LISTING_CREATE",
        entityType: "Property",
        entityId: property.id,
        metadata: JSON.stringify({ title: property.title }),
      },
    });

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Dashboard listing create error:", error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "AGENT" && user.role !== "OWNER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await request.json();
    const updated = await prisma.property.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (error) {
    console.error("Dashboard listing update error:", error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

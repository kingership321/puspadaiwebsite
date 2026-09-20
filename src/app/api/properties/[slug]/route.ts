import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        city: true,
        neighborhood: true,
        agency: true,
        agent: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        amenities: {
          include: { amenity: true },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Also fetch similar properties in the same city or property type
    const similar = await prisma.property.findMany({
      where: {
        id: { not: property.id },
        cityId: property.cityId,
        listingType: property.listingType,
        status: "PUBLISHED",
      },
      take: 4,
      include: {
        city: true,
        neighborhood: true,
        agency: true,
        images: {
          orderBy: { sortOrder: "asc" },
          take: 2,
        },
        amenities: {
          include: { amenity: true },
        },
      },
    });

    const formattedProperty = {
      ...property,
      areaInfo: property.neighborhood,
    };

    const formattedSimilar = similar.map((s) => ({
      ...s,
      areaInfo: s.neighborhood,
    }));

    return NextResponse.json({ property: formattedProperty, similar: formattedSimilar });
  } catch (error) {
    console.error("Property detail API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

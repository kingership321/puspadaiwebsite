import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type"); // RENT | SALE
    const query = searchParams.get("query");
    const city = searchParams.get("city");
    const area = searchParams.get("area");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const propertyType = searchParams.get("propertyType");
    const amenities = searchParams.get("amenities");
    const furnished = searchParams.get("furnished");
    const parking = searchParams.get("parking");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12")));

    // Build where clause
    const where: Prisma.PropertyWhereInput = {
      status: "PUBLISHED",
    };

    if (type && (type === "RENT" || type === "SALE")) {
      where.listingType = type;
    }

    if (propertyType) {
      where.propertyType = propertyType;
    }

    if (city) {
      where.city = {
        slug: city,
      };
    }

    if (area) {
      where.neighborhood = {
        slug: area,
      };
    }

    if (bedrooms) {
      const b = parseInt(bedrooms);
      if (!isNaN(b)) {
        where.bedrooms = { gte: b };
      }
    }

    if (bathrooms) {
      const ba = parseFloat(bathrooms);
      if (!isNaN(ba)) {
        where.bathrooms = { gte: ba };
      }
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice && !isNaN(parseFloat(minPrice))) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice && !isNaN(parseFloat(maxPrice))) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    if (furnished === "true") {
      where.furnished = true;
    }

    if (parking === "true") {
      where.parking = true;
    }

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { address: { contains: query } },
        { description: { contains: query } },
        { city: { name: { contains: query } } },
        { neighborhood: { name: { contains: query } } },
      ];
    }

    if (amenities) {
      const amenitySlugs = amenities.split(",").map((s) => s.trim());
      where.amenities = {
        some: {
          amenity: {
            slug: { in: amenitySlugs },
          },
        },
      };
    }

    // Determine sorting
    let orderBy: Prisma.PropertyOrderByWithRelationInput = { publishedAt: "desc" };
    if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "area_desc") {
      orderBy = { area: "desc" };
    }

    const skip = (page - 1) * limit;

    const [rawResults, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
      }),
      prisma.property.count({ where }),
    ]);

    // Format results so area is present as area: p.neighborhood
    const results = rawResults.map((p: any) => ({
      ...p,
      area: p.area, // number (sqft)
      neighborhood: p.neighborhood,
      areaInfo: p.neighborhood,
    }));

    // Fetch popular cities aggregation for filter sidebar
    const citiesWithCount = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: { properties: true },
        },
      },
    });

    return NextResponse.json({
      results,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      aggregations: {
        cities: citiesWithCount.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: c._count.properties,
        })),
      },
    });
  } catch (error: any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to execute property search." },
      { status: 500 }
    );
  }
}

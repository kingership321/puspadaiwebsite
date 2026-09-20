import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Database Seed & Models Verification", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("verifies that Japanese cities are populated", async () => {
    const cities = await prisma.city.findMany();
    expect(cities.length).toBeGreaterThanOrEqual(5);
    const cityNames = cities.map((c) => c.name);
    expect(cityNames).toContain("Tokyo");
    expect(cityNames).toContain("Osaka");
    expect(cityNames).toContain("Kyoto");
  });

  it("verifies that authentic Japanese properties are seeded with station transit info", async () => {
    const totalProperties = await prisma.property.count();
    expect(totalProperties).toBeGreaterThanOrEqual(50);

    const stationProperty = await prisma.property.findFirst({
      where: { stationName: { not: null } },
    });
    expect(stationProperty).not.toBeNull();
    expect(stationProperty?.stationName).toBeTruthy();
    expect(stationProperty?.walkMinutes).toBeGreaterThan(0);
    expect(stationProperty?.titleJa).toBeTruthy();
  });

  it("verifies both Rent and Sale properties exist with images", async () => {
    const rentProperty = await prisma.property.findFirst({
      where: { listingType: "RENT", status: "PUBLISHED" },
      include: { images: true, amenities: true },
    });
    expect(rentProperty).not.toBeNull();
    expect(rentProperty?.images.length).toBeGreaterThanOrEqual(3);

    const saleProperty = await prisma.property.findFirst({
      where: { listingType: "SALE", status: "PUBLISHED" },
      include: { images: true },
    });
    expect(saleProperty).not.toBeNull();
    expect(saleProperty?.images.length).toBeGreaterThanOrEqual(3);
  });

  it("verifies demo user accounts exist for all 4 roles", async () => {
    const users = await prisma.user.findMany();
    const roles = users.map((u) => u.role);
    expect(roles).toContain("SEEKER");
    expect(roles).toContain("OWNER");
    expect(roles).toContain("AGENT");
    expect(roles).toContain("ADMIN");
  });
});

import { describe, it, expect } from "vitest";
import { formatCurrency, formatPriceCompact, slugify } from "@/lib/utils";

describe("Real Estate Formatting Utilities", () => {
  it("correctly formats full USD currency without fractions", () => {
    expect(formatCurrency(4500, "USD")).toBe("$4,500");
    expect(formatCurrency(1250000, "USD")).toBe("$1,250,000");
  });

  it("correctly formats compact price badges", () => {
    expect(formatPriceCompact(4500, "USD")).toBe("$5k");
    expect(formatPriceCompact(2500000, "USD")).toBe("$2.5M");
    expect(formatPriceCompact(850, "USD")).toBe("$850");
  });

  it("correctly generates search-friendly URL slugs", () => {
    expect(slugify("Tribeca Luxury Duplex Penthouse")).toBe("tribeca-luxury-duplex-penthouse");
    expect(slugify("Modern Loft w/ Pool & Garden!")).toBe("modern-loft-w-pool-garden");
  });
});

describe("Search Parameter Serialization", () => {
  it("serializes filter combinations into reproducible URL search params", () => {
    const filters = {
      type: "RENT",
      city: "new-york",
      minPrice: "2500",
      maxPrice: "6000",
      bedrooms: "2",
      propertyType: "APARTMENT",
    };

    const params = new URLSearchParams(filters);
    const queryString = params.toString();

    expect(queryString).toContain("type=RENT");
    expect(queryString).toContain("city=new-york");
    expect(queryString).toContain("minPrice=2500");
    expect(queryString).toContain("maxPrice=6000");
    expect(queryString).toContain("bedrooms=2");
    expect(queryString).toContain("propertyType=APARTMENT");

    // Test reverse parsing
    const parsed = new URLSearchParams(queryString);
    expect(parsed.get("type")).toBe("RENT");
    expect(parsed.get("city")).toBe("new-york");
    expect(parsed.get("bedrooms")).toBe("2");
  });
});

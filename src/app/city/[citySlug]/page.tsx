import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property/PropertyCard";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Building, ArrowLeft, TrendingUp } from "lucide-react";
import { PropertyDto } from "@/types";

interface Props {
  params: { citySlug: string };
}

export default async function CityLandingPage({ params }: Props) {
  let city = null;

  try {
    city = await prisma.city.findUnique({
      where: { slug: params.citySlug },
      include: {
        areas: true,
        properties: {
          where: { status: "PUBLISHED" },
          take: 12,
          orderBy: { publishedAt: "desc" },
          include: {
            city: true,
            neighborhood: true,
            agency: true,
            agent: true,
            images: { orderBy: { sortOrder: "asc" } },
            amenities: { include: { amenity: true } },
          },
        },
      },
    });
  } catch (error) {
    console.error("CityLandingPage database error:", error);
  }

  if (!city) notFound();

  const formattedProperties = city.properties.map((p: any) => ({
    ...p,
    area: p.area,
    neighborhood: p.neighborhood,
    areaInfo: p.neighborhood,
  })) as unknown as PropertyDto[];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden bg-slate-900 text-white">
        <img
          src={city.imageUrl || ""}
          alt={city.name}
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white mb-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Global Search</span>
            </Link>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300 block">
              {city.country}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {city.name} Real Estate
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              {city.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Neighborhood chips */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Popular Neighborhoods in {city.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {city.areas.map((a) => (
              <Link
                key={a.id}
                href={`/search?city=${city.slug}&area=${a.slug}`}
                className="rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700 shadow-sm transition-all"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Listings Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Latest Listings in {city.name}
            </h2>
            <Link
              href={`/search?city=${city.slug}`}
              className="text-xs font-bold text-brand-700 hover:underline"
            >
              View All {city.name} Properties →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

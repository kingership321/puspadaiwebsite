import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Heart, Home, ArrowLeft } from "lucide-react";
import { PropertyDto } from "@/types";

export default async function SavedPropertiesPage() {
  const user = await getCurrentUser();

  const favorites = user
    ? await prisma.favorite.findMany({
        where: { userId: user.id },
        include: {
          property: {
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
        orderBy: { createdAt: "desc" },
      })
    : [];

  const formattedProperties = favorites.map((f: any) => ({
    ...f.property,
    area: f.property.area,
    neighborhood: f.property.neighborhood,
    areaInfo: f.property.neighborhood,
    isFavorite: true,
  })) as unknown as PropertyDto[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Account</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Saved Properties</h1>
              <p className="text-xs text-slate-500">
                You have {formattedProperties.length} saved listings in your personal portfolio.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-4 py-2 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
        >
          Discover More Homes
        </Link>
      </div>

      {/* Grid */}
      {formattedProperties.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <Heart className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-base font-bold text-slate-900">No Saved Properties Yet</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any property card or detail page to bookmark listings here for easy access.
          </p>
          <div className="mt-6">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-bold text-white"
            >
              Browse Active Listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formattedProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} isFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}

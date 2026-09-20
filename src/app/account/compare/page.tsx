import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Scale, ArrowLeft, Check, X, Bed, Bath, Maximize, ExternalLink } from "lucide-react";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  // If no IDs passed in query, grab 3 featured properties by default for demonstration
  let properties: any[] = [];

  if (searchParams.ids) {
    const idList = searchParams.ids.split(",");
    properties = await prisma.property.findMany({
      where: { id: { in: idList } },
      include: {
        city: true,
        neighborhood: true,
        agency: true,
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        amenities: { include: { amenity: true } },
      },
    });
  }

  if (properties.length === 0) {
    properties = await prisma.property.findMany({
      take: 3,
      where: { status: "PUBLISHED" },
      include: {
        city: true,
        neighborhood: true,
        agency: true,
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        amenities: { include: { amenity: true } },
      },
    });
  }

  const comparisonAmenities = [
    { slug: "balcony", label: "Balcony / Terrace" },
    { slug: "central-ac", label: "Central AC" },
    { slug: "pool", label: "Swimming Pool" },
    { slug: "gym", label: "Fitness Center" },
    { slug: "pet-friendly", label: "Pet Friendly" },
    { slug: "in-unit-laundry", label: "In-unit Laundry" },
    { slug: "doorman", label: "24/7 Concierge" },
    { slug: "smart-home", label: "Smart Home" },
    { slug: "ev-charger", label: "EV Charger" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Account</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Property Comparison Matrix</h1>
            <p className="text-xs text-slate-500">
              Direct side-by-side evaluation of specifications, pricing, and amenities.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-48">
                Property
              </th>
              {properties.map((p) => (
                <th key={p.id} className="p-4 sm:p-6 min-w-[240px] max-w-[300px]">
                  <div className="space-y-3">
                    <img
                      src={p.images?.[0]?.url || ""}
                      alt={p.title}
                      className="h-36 w-full rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <span className="text-xs font-bold text-brand-700 uppercase">
                        FOR {p.listingType}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{p.address}</p>
                    </div>
                    <Link
                      href={`/property/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                    >
                      <span>View Full Listing</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {/* Price Row */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Price</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <span className="text-base font-black text-slate-900">
                    {formatCurrency(p.price, p.currency)}
                  </span>
                  {p.listingType === "RENT" && <span className="text-slate-500 font-semibold"> /mo</span>}
                </td>
              ))}
            </tr>

            {/* Price Per Sq Ft */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Price / Sq Ft</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 font-semibold text-slate-800">
                  ${Math.round(p.price / p.area).toLocaleString()} / sqft
                </td>
              ))}
            </tr>

            {/* Beds & Baths */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Bedrooms & Baths</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 font-medium text-slate-800">
                  {p.bedrooms === 0 ? "Studio" : `${p.bedrooms} Beds`} • {p.bathrooms} Baths
                </td>
              ))}
            </tr>

            {/* Living Area */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Living Space</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 font-semibold text-slate-800">
                  {p.area.toLocaleString()} sq ft
                </td>
              ))}
            </tr>

            {/* Property Type */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Type</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 font-semibold text-slate-800 capitalize">
                  {p.propertyType.toLowerCase()}
                </td>
              ))}
            </tr>

            {/* Furnished */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Furnished</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  {p.furnished ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <Check className="h-3 w-3" /> Yes
                    </span>
                  ) : (
                    <span className="text-slate-400">No</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Parking */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 sm:p-5 font-bold text-slate-700 bg-slate-50/40">Dedicated Parking</td>
              {properties.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  {p.parking ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <Check className="h-3 w-3" /> Included
                    </span>
                  ) : (
                    <span className="text-slate-400">Street</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Amenities Section Divider */}
            <tr className="bg-slate-50">
              <td
                colSpan={properties.length + 1}
                className="p-3 text-[11px] font-bold uppercase tracking-wider text-slate-500"
              >
                Amenities Checklist
              </td>
            </tr>

            {comparisonAmenities.map((amen) => (
              <tr key={amen.slug} className="hover:bg-slate-50/50">
                <td className="p-4 sm:p-5 font-medium text-slate-700 bg-slate-50/40">
                  {amen.label}
                </td>
                {properties.map((p) => {
                  const hasAmenity = p.amenities.some(
                    (a: any) => a.amenity.slug === amen.slug
                  );
                  return (
                    <td key={p.id} className="p-4 sm:p-5">
                      {hasAmenity ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <X className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

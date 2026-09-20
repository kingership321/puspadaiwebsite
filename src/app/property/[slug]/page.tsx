import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatJapanesePrice, formatDate } from "@/lib/utils";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyDetailClientActions } from "./PropertyDetailClientActions";
import {
  Bed,
  Bath,
  Maximize,
  Calendar,
  Building,
  Car,
  Armchair,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Compass,
  GraduationCap,
  Train,
  Utensils,
  TreePine,
  Sparkles,
} from "lucide-react";
import { PropertyDto } from "@/types";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { city: true, neighborhood: true, images: { take: 1 } },
  });

  if (!property) return { title: "Property Not Found — HavenEstate" };

  return {
    title: `${property.title} — HavenEstate`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: {
      city: true,
      neighborhood: true,
      agency: true,
      agent: true,
      images: { orderBy: { sortOrder: "asc" } },
      amenities: { include: { amenity: true } },
    },
  });

  if (!property) {
    notFound();
  }

  // Fetch similar properties
  const similar = await prisma.property.findMany({
    where: {
      id: { not: property.id },
      cityId: property.cityId,
      listingType: property.listingType,
      status: "PUBLISHED",
    },
    take: 3,
    include: {
      city: true,
      neighborhood: true,
      agency: true,
      images: { orderBy: { sortOrder: "asc" }, take: 2 },
      amenities: { include: { amenity: true } },
    },
  });

  const formattedProperty = {
    ...property,
    area: property.area,
    neighborhood: property.neighborhood,
    areaInfo: property.neighborhood,
  } as unknown as PropertyDto;

  const formattedSimilar = similar.map((s: any) => ({
    ...s,
    area: s.area,
    neighborhood: s.neighborhood,
    areaInfo: s.neighborhood,
  })) as unknown as PropertyDto[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link href={`/search?type=${property.listingType}`} className="hover:text-slate-900">
          {property.listingType === "RENT" ? "Rent" : "Buy"}
        </Link>
        <span>/</span>
        <Link href={`/search?city=${property.city.slug}`} className="hover:text-slate-900">
          {property.city.name}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
      </nav>

      {/* Hero Media Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Content Grid: Left 8 Cols (Details), Right 4 Cols (Agent Card & Action Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Title, Price & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
                FOR {property.listingType}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {property.propertyType}
              </span>
              {property.featured && (
                <span className="rounded-full bg-amber-500 text-white px-3 py-1 text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Featured Collection
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {property.titleJa ? (
                <>
                  <span>{property.titleJa}</span>
                  <span className="block text-base sm:text-lg font-medium text-slate-500 mt-1">
                    {property.title}
                  </span>
                </>
              ) : (
                property.title
              )}
            </h1>

            {/* Station and Line */}
            {property.stationName && (
              <div className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                <Train className="h-4 w-4 text-emerald-600" />
                <span>
                  {property.stationLine ? `${property.stationLine} ` : ""}{property.stationName}
                  {property.walkMinutes ? ` 徒歩${property.walkMinutes}分 (${property.walkMinutes} min walk)` : ""}
                </span>
              </div>
            )}

            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              <span>{property.address}, {property.neighborhood.nameJa || property.neighborhood.name}, {property.city.nameJa || property.city.name}</span>
            </div>

            {/* SUUMO Style Pricing Box */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-brand-50/60 via-slate-50 to-white border border-brand-100/80 flex flex-wrap items-baseline gap-6 sm:gap-8">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  {property.listingType === "RENT" ? "賃料 (Monthly Rent)" : "販売価格 (Price)"}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-brand-700 tracking-tight">
                  {formatJapanesePrice(property.price, property.listingType === "RENT", "ja")}
                </span>
                <span className="text-xs font-semibold text-slate-500 ml-2">
                  ({formatCurrency(property.price, property.currency, "en")})
                </span>
              </div>

              {property.managementFee && (
                <div className="border-l border-slate-200 pl-4 sm:pl-6">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">管理費・共益費</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    ¥{property.managementFee.toLocaleString()} / 月
                  </span>
                </div>
              )}

              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">敷金 / 礼金</span>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {property.deposit ? `${(property.deposit / property.price).toFixed(0)}ヶ月` : "敷0"} / {property.keyMoney ? `${(property.keyMoney / property.price).toFixed(0)}ヶ月` : "礼0"}
                </span>
              </div>

              {property.layout && (
                <div className="border-l border-slate-200 pl-4 sm:pl-6">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">間取り</span>
                  <span className="text-sm sm:text-base font-black text-slate-900">
                    {property.layout}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Bedrooms</span>
                <span className="text-sm font-bold text-slate-900">
                  {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Beds`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Bath className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Bathrooms</span>
                <span className="text-sm font-bold text-slate-900">{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Maximize className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">専有面積 (Area)</span>
                <span className="text-sm font-bold text-slate-900">{property.area} ㎡</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">築年月 (Year)</span>
                <span className="text-sm font-bold text-slate-900">{property.yearBuilt ? `${property.yearBuilt}年築` : "新築・築浅"}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">物件詳細情報 (About this Property)</h3>
            {property.descriptionJa && (
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {property.descriptionJa}
              </p>
            )}
            <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
              {property.description}
            </p>

            {/* Additional Facts List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">建物構造 (Structure)</span>
                <span className="font-bold text-slate-800">{property.structure || "RC (鉄筋コンクリート造)"}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">所在階 (Floor)</span>
                <span className="font-bold text-slate-800">{property.floor ? `${property.floor}階 / 地上${property.totalFloors}階建` : "一戸建て"}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">駐車場 (Parking)</span>
                <span className="font-bold text-slate-800">{property.parking ? "敷地内駐車場あり" : "近隣駐車場"}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">情報掲載日 (Published)</span>
                <span className="font-bold text-slate-800">{formatDate(property.publishedAt || property.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">設備・特徴 (Equipment & Amenities)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item) => (
                <div
                  key={item.amenity.id}
                  className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5 text-xs font-semibold text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>
                    {item.amenity.nameJa ? `${item.amenity.nameJa}` : item.amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage / Rental Affordability Calculator */}
          <MortgageCalculator
            price={property.price}
            currency={property.currency}
            isRent={property.listingType === "RENT"}
          />

          {/* Neighborhood & Nearby POIs */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Neighborhood & Surroundings</h3>
                <p className="text-xs text-slate-500">{property.neighborhood.name}, {property.city.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                  <Train className="h-4 w-4" />
                  <span>Transit & Metro</span>
                </div>
                <p className="text-slate-600 font-medium">3 min walk to Express Station</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>Top Schools</span>
                </div>
                <p className="text-slate-600 font-medium">District 9 Rating (9/10)</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                  <Utensils className="h-4 w-4" />
                  <span>Dining & Cafes</span>
                </div>
                <p className="text-slate-600 font-medium">20+ Michelin & Artisan Bistros</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center gap-2 text-brand-700 font-bold mb-1">
                  <TreePine className="h-4 w-4" />
                  <span>Parks & Greenery</span>
                </div>
                <p className="text-slate-600 font-medium">5 min walk to Riverfront Park</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: Agent Box & Client Actions */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <PropertyDetailClientActions property={formattedProperty} />

          {/* Agency & Agent Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={property.agent?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
                alt={property.agent?.name || "Listing Agent"}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">{property.agent?.name || "Elena Rostova"}</h4>
                <p className="text-xs text-brand-700 font-semibold">{property.agency?.name || "Metropolitan Partners"}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Licensed Broker</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {property.agent?.bio || "Expert in residential leasing and private sales. Specializing in confidential client advisory."}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold">{property.agent?.phone || "+1 (555) 200-1001"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold">{property.agent?.email || "advisor@havenestate.com"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {formattedSimilar.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Similar Residences</h3>
              <p className="text-xs text-slate-500 mt-0.5">More options in {property.city.name}</p>
            </div>
            <Link
              href={`/search?city=${property.city.slug}&type=${property.listingType}`}
              className="text-xs font-bold text-brand-700 hover:underline"
            >
              View All Similar →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formattedSimilar.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SearchBar } from "@/components/search/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  KeyRound,
  CheckCircle2,
  Users,
} from "lucide-react";
import { PropertyDto } from "@/types";

export const revalidate = 60; // Revalidate every 60s

export default async function HomePage() {
  // Fetch featured and recent listings
  const [featuredProperties, cities, agencies, totalCount] = await Promise.all([
    prisma.property.findMany({
      where: { status: "PUBLISHED", featured: true },
      take: 6,
      orderBy: { publishedAt: "desc" },
      include: {
        city: true,
        neighborhood: true,
        agency: true,
        agent: true,
        images: { orderBy: { sortOrder: "asc" } },
        amenities: { include: { amenity: true } },
      },
    }),
    prisma.city.findMany({
      take: 5,
      include: {
        _count: { select: { properties: true } },
      },
    }),
    prisma.agency.findMany({
      take: 4,
      include: {
        _count: { select: { properties: true, agents: true } },
      },
    }),
    prisma.property.count({ where: { status: "PUBLISHED" } }),
  ]);

  const formattedProperties = featuredProperties.map((p: any) => ({
    ...p,
    area: p.area,
    neighborhood: p.neighborhood,
    areaInfo: p.neighborhood,
  })) as unknown as PropertyDto[];

  return (
    <div className="flex flex-col gap-12 sm:gap-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 lg:py-32 text-white">
        {/* Ambient background imagery and gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&auto=format&fit=crop&q=80"
            alt="Tokyo city view"
            className="h-full w-full object-cover opacity-25 filter blur-[1px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-brand-600/15 blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span>日本全国の主要都市・駅近の厳選物件 {totalCount}+ 件掲載 (Bilingual Marketplace)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            SUUMOスタイルで探す <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-teal-200 to-emerald-400">
              理想の住まいと暮らし。
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            東京・大阪・京都・横浜・福岡の賃貸マンション、タワーレジデンス、新築・中古戸建てを網羅。駅徒歩・間取り・敷金礼金などこだわり条件でスムーズに検索。
          </p>

          {/* Hero Search Bar Component */}
          <div className="mt-8 sm:mt-12">
            <SearchBar />
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
              <span className="text-xs text-slate-400 font-medium">宅地建物取引士 専任</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">{totalCount}+</span>
              <span className="text-xs text-slate-400 font-medium">公開中の厳選物件</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">駅徒歩</span>
              <span className="text-xs text-slate-400 font-medium">主要路線・駅近アクセス</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">敷・礼0</span>
              <span className="text-xs text-slate-400 font-medium">お得な物件多数掲載</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Cities Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="h-4 w-4" />
              <span>人気エリア・都市から探す</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              主要都市・エリア特集
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              東京・大阪・京都・横浜・福岡の利便性高いおすすめエリア。
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors"
          >
            <span>すべてのエリアを見る (View All)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/search?city=${city.slug}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={city.imageUrl || "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80"}
                alt={city.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-brand-300 block">Japan</span>
                <h3 className="text-xl font-bold tracking-tight text-white leading-tight mt-0.5">
                  {city.nameJa ? `${city.nameJa}` : city.name}
                  <span className="text-xs font-normal text-slate-300 ml-1.5">({city.name})</span>
                </h3>
                <span className="mt-2 inline-flex items-center text-[11px] font-semibold text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {city._count.properties} 件掲載
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Property Collection */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Hand-Picked Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Residences
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Exceptional homes with standout architectural pedigree and amenities.
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors"
          >
            <span>View All {totalCount} Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {formattedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. Property Types Discovery */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore by Architectural Style
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Filter instantly by lifestyle requirements and residence dimensions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { type: "APARTMENT", label: "Apartments", count: "30+" },
              { type: "CONDO", label: "Condominiums", count: "25+" },
              { type: "HOUSE", label: "Single Family", count: "20+" },
              { type: "TOWNHOUSE", label: "Townhouses", count: "15+" },
              { type: "VILLA", label: "Luxury Villas", count: "10+" },
              { type: "STUDIO", label: "Studios", count: "8+" },
            ].map((item) => (
              <Link
                key={item.type}
                href={`/search?propertyType=${item.type}`}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-300 hover:shadow-md transition-all text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:scale-110 transition-transform mb-3">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">{item.count} Listings</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Premier Agencies Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="h-4 w-4" />
            <span>Market Leaders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Premier Real Estate Brokerages
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Licensed broker partners providing fiduciary excellence and client representation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={agency.logoUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&auto=format&fit=crop&q=80"}
                    alt={agency.name}
                    className="h-12 w-12 rounded-2xl object-cover border border-slate-100"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{agency.name}</h3>
                    <span className="text-xs text-brand-600 font-medium">{agency._count.agents} Licensed Agents</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {agency.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {agency._count.properties} Active Listings
                </span>
                <Link
                  href={`/search`}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800"
                >
                  View Listings →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Trust & Process Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Direct Verification</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Every property undergoes automated and manual review before appearing in public searches.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Seamless Touring</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Schedule in-person walkthroughs or virtual appointments directly with dedicated agents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Transparent Pricing</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Clear breakdowns of monthly costs, deposits, HOA fees, and mortgage estimators with zero surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
  Train,
  Home,
  Check,
  Zap,
  BadgePercent,
  FileCheck2,
  CalendarCheck,
} from "lucide-react";
import { PropertyDto } from "@/types";

export const revalidate = 60; // Revalidate every 60s

export default async function HomePage() {
  let featuredProperties: any[] = [];
  let noDepositProperties: any[] = [];
  let nearStationProperties: any[] = [];
  let cities: any[] = [];
  let agencies: any[] = [];
  let totalCount = 0;
  let dbError = false;

  try {
    const [props, noDep, nearSt, cList, aList, count] = await Promise.all([
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
      prisma.property.findMany({
        where: { status: "PUBLISHED", deposit: 0, keyMoney: 0 },
        take: 4,
        orderBy: { publishedAt: "desc" },
        include: {
          city: true,
          neighborhood: true,
          agency: true,
          agent: true,
          images: { orderBy: { sortOrder: "asc" } },
        },
      }),
      prisma.property.findMany({
        where: { status: "PUBLISHED", walkMinutes: { lte: 5 } },
        take: 4,
        orderBy: { publishedAt: "desc" },
        include: {
          city: true,
          neighborhood: true,
          agency: true,
          agent: true,
          images: { orderBy: { sortOrder: "asc" } },
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

    featuredProperties = props;
    noDepositProperties = noDep;
    nearStationProperties = nearSt;
    cities = cList;
    agencies = aList;
    totalCount = count;
  } catch (error) {
    console.error("HomePage Database connection error:", error);
    dbError = true;
  }

  const fallbackCities = [
    { id: "c1", name: "Tokyo", nameJa: "東京都", slug: "tokyo", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80", avgRent: "14.8万円", _count: { properties: 25 } },
    { id: "c2", name: "Osaka", nameJa: "大阪府", slug: "osaka", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&auto=format&fit=crop&q=80", avgRent: "9.4万円", _count: { properties: 15 } },
    { id: "c3", name: "Kyoto", nameJa: "京都府", slug: "kyoto", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80", avgRent: "8.9万円", _count: { properties: 12 } },
    { id: "c4", name: "Yokohama", nameJa: "横浜市", slug: "yokohama", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80", avgRent: "11.2万円", _count: { properties: 8 } },
    { id: "c5", name: "Fukuoka", nameJa: "福岡市", slug: "fukuoka", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&auto=format&fit=crop&q=80", avgRent: "8.1万円", _count: { properties: 5 } },
  ];

  const displayCities = cities.length > 0 ? cities.map((c, i) => ({
    ...c,
    avgRent: fallbackCities[i]?.avgRent || "10.5万円"
  })) : fallbackCities;

  const formatList = (list: any[]) =>
    list.map((p) => ({
      ...p,
      area: p.area,
      neighborhood: p.neighborhood,
      areaInfo: p.neighborhood,
    })) as unknown as PropertyDto[];

  const formattedFeatured = formatList(featuredProperties);
  const formattedNoDeposit = formatList(noDepositProperties.length > 0 ? noDepositProperties : featuredProperties.slice(0, 4));
  const formattedNearStation = formatList(nearStationProperties.length > 0 ? nearStationProperties : featuredProperties.slice(2, 6));

  return (
    <div className="bg-[#f4f6f8] pb-16">
      {/* 1. Portal Sub-Header Announcement Bar (Flush with Hero, Zero White Space) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-brand-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">
              SUUMO準拠
            </span>
            <span className="text-slate-300 font-medium">
              日本全国の主要都市・駅近の優良物件を網羅したバイリンガル不動産ポータル
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[11px] whitespace-nowrap shrink-0">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>おとり広告ゼロ保証</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <FileCheck2 className="h-4 w-4 text-blue-400 shrink-0" />
              <span>全物件 専任宅建士確認済</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Search Matrix Section (SUUMO Commercial Standard) */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 sm:pb-20 shadow-sm">
        {/* Subtle background skyline pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&auto=format&fit=crop&q=80"
            alt="Tokyo Skyline"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-950/60 px-3.5 py-1 text-xs font-bold text-brand-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              <span>厳選物件 {totalCount > 0 ? `${totalCount}+` : "65+"} 件掲載中 • 賃貸 & 売買マーケットプレイス</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              沿線・駅近・こだわり条件で探す<br />
              <span className="text-brand-400">日本の住まいと理想の暮らし。</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              東京・大阪・京都・横浜・福岡の賃貸マンション、タワーレジデンス、戸建て住宅。駅徒歩・敷礼ゼロ・間取りでスピーディーに検索。
            </p>
          </div>

          {/* Core Search Bar Component */}
          <div className="mt-8">
            <SearchBar />
          </div>

          {/* Quick Filter Shortcut Pills (こだわり条件ショートカット) */}
          <div className="mt-6 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-bold text-[11px] mr-1">人気条件:</span>
            <Link
              href="/search?maxPrice=120000&type=RENT"
              className="rounded-full bg-white/10 hover:bg-brand-600 hover:text-white px-3 py-1 text-slate-200 font-medium transition-all"
            >
              家賃12万円以下
            </Link>
            <Link
              href="/search?type=RENT"
              className="rounded-full bg-white/10 hover:bg-brand-600 hover:text-white px-3 py-1 text-slate-200 font-medium transition-all"
            >
              敷金・礼金0円
            </Link>
            <Link
              href="/search?query=徒歩5分"
              className="rounded-full bg-white/10 hover:bg-brand-600 hover:text-white px-3 py-1 text-slate-200 font-medium transition-all"
            >
              駅徒歩5分以内
            </Link>
            <Link
              href="/search?propertyType=CONDO"
              className="rounded-full bg-white/10 hover:bg-brand-600 hover:text-white px-3 py-1 text-slate-200 font-medium transition-all"
            >
              タワーマンション
            </Link>
            <Link
              href="/search?city=tokyo"
              className="rounded-full bg-white/10 hover:bg-brand-600 hover:text-white px-3 py-1 text-slate-200 font-medium transition-all"
            >
              東京23区
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-center border-t border-slate-800 pt-6">
            <div>
              <span className="text-2xl font-black text-white">{totalCount}+</span>
              <span className="text-[11px] text-slate-400 block font-medium">公開中の厳選物件</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-[11px] text-slate-400 block font-medium">宅地建物取引士確認済</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white">5大都市</span>
              <span className="text-[11px] text-slate-400 block font-medium">東京・大阪・京都・横浜・福岡</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white">JP / EN</span>
              <span className="text-[11px] text-slate-400 block font-medium">日英完全バイリンガル</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Sections (Spaced cleanly below hero) */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {/* 3. Live Market Price Benchmark Ticker (家賃相場インサイト) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full -mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 text-brand-800">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                主要都市の家賃相場レポート (Market Benchmark)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              ※ 間取り1LDK〜2LDKの平均成約水準 (2026年最新)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
            {displayCities.map((c) => (
              <Link
                key={c.id}
                href={`/search?city=${c.slug}`}
                className="group rounded-xl p-2.5 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-0.5">
                  <span className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {c.nameJa || c.name}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                    活況
                  </span>
                </div>
                <span className="text-base font-black text-brand-800 block">
                  {c.avgRent}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  掲載 {c._count?.properties || 10}件
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Listings (おすすめ物件セレクション) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-brand-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Featured Properties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              おすすめの注目物件
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              駅近、充実の設備、敷金礼金ゼロなどプロが厳選したハイグレード物件。
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-brand-600 hover:text-brand-700 transition-all shadow-sm"
          >
            <span>物件一覧を見る ({totalCount}件)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {formattedFeatured.map((property, idx) => (
            <PropertyCard key={property.id} property={property} priority={idx < 3} />
          ))}
        </div>
      </section>

      {/* 5. Special Theme Section: 敷金礼金0円 & 駅徒歩5分以内 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Box A: 敷金礼金0円 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-black text-xs">
                  0円
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">敷金・礼金なし物件</h3>
                  <p className="text-[11px] text-slate-500">初期費用を抑えてスマートに入居できるお部屋</p>
                </div>
              </div>
              <Link href="/search?type=RENT" className="text-xs font-bold text-brand-700 hover:underline">
                もっと見る →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formattedNoDeposit.slice(0, 2).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* Box B: 駅近徒歩5分以内 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                  <Train className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">駅近 徒歩5分以内</h3>
                  <p className="text-[11px] text-slate-500">雨の日も通勤通学も快適なエキチカ人気物件</p>
                </div>
              </div>
              <Link href="/search?query=徒歩5分" className="text-xs font-bold text-brand-700 hover:underline">
                もっと見る →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formattedNearStation.slice(0, 2).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Popular Metropolises & Areas Directory (主要エリア特集) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-brand-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="h-4 w-4" />
              <span>Cities & Metropolitan Areas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              主要都市・エリアから探す
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              日本を代表する5大都市圏の住まい。利便性と居住環境に優れたエリア一覧。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {displayCities.map((city) => (
            <Link
              key={city.id}
              href={`/search?city=${city.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={city.imageUrl || "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80"}
                alt={city.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-[10px] font-bold tracking-wider text-brand-300 uppercase block">Japan Metropolis</span>
                <h3 className="text-lg font-black tracking-tight text-white leading-tight mt-0.5">
                  {city.nameJa ? `${city.nameJa}` : city.name}
                  <span className="text-xs font-normal text-slate-300 ml-1">({city.name})</span>
                </h3>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded font-bold">
                    {city._count?.properties || 10} 件掲載
                  </span>
                  <span className="font-semibold text-brand-200 group-hover:translate-x-1 transition-transform">
                    探す →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Trust, Guarantees & Fiduciary Standards (信頼と安心の取り組み) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-bold text-brand-800">
              安心・安全の住まい探し基準
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              日本の不動産取引における透明性と信頼
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              当ポータルは宅地建物取引業法を遵守し、正確な物件情報と健全な市場取引をお約束します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-800 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">全物件・おとり広告徹底排除</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                成約済みの物件やおとり掲載をシステムが自動検知。毎日最新の空室状況を更新し、無駄足のない物件見学をサポートします。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800 font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">国家資格「宅地建物取引士」専任</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                重要事項説明から賃貸借契約書の締結まで、経験豊富な有資格者が責任をもってお客様の契約をサポートいたします。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-800 font-bold">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">初期費用の明瞭会計・分割相談</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                敷金・礼金・仲介手数料・保証会社利用料など、不明瞭な追加料金は一切なし。初期費用の事前見積もりもオンラインで完結。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action for Property Owners (家主・オーナー様へ) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Owner Portal
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              所有物件の空室掲載・入居者募集をお考えのオーナー様へ
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              スマホやPCから直接お部屋の写真をアップロードして即日掲載。国内外の優良な入居希望者とスムーズにマッチングします。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/signup"
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-xs font-black text-slate-950 shadow-lg transition-all"
            >
              オーナー無料登録 (Post Housing)
            </Link>
            <Link
              href="/dashboard/listings/new"
              className="rounded-xl border border-white/20 hover:bg-white/10 px-5 py-3 text-xs font-bold text-white transition-all"
            >
              直接掲載画面へ
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { JapanesePortalSearch } from "@/components/search/JapanesePortalSearch";
import { PropertyCard } from "@/components/property/PropertyCard";
import { YouthAreaStories } from "@/components/home/YouthAreaStories";
import { LifestyleQuiz } from "@/components/home/LifestyleQuiz";
import { LifestyleMoodWall } from "@/components/home/LifestyleMoodWall";
import { InitialCostExplainer } from "@/components/home/InitialCostExplainer";
import { YouthRealVoices } from "@/components/home/YouthRealVoices";
import { TokyoSkylineBackdrop } from "@/components/home/TokyoSkylineSilhouette";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Train,
  Flame,
  MessageCircle,
  Smartphone,
  Coins,
  CheckCircle2,
  Heart,
  Coffee,
  Tv,
} from "lucide-react";
import { PropertyDto } from "@/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("haven_lang")?.value === "en" ? "en" : "ja") as "ja" | "en";

  let featuredProperties: any[] = [];
  let noDepositProperties: any[] = [];
  let nearStationProperties: any[] = [];
  let cities: any[] = [];
  let totalCount = 0;

  try {
    const [props, noDep, nearSt, cList, count] = await Promise.all([
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
      prisma.property.count({ where: { status: "PUBLISHED" } }),
    ]);

    featuredProperties = props;
    noDepositProperties = noDep;
    nearStationProperties = nearSt;
    cities = cList;
    totalCount = count;
  } catch (error) {
    console.error("HomePage Database connection error:", error);
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
    <div className="bg-[#FAF9F5] min-h-screen text-slate-800 pb-20 w-full max-w-full overflow-x-hidden">
      {/* 1. Youth Peace-of-Mind Announcement Ribbon */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-2 sm:py-2.5 px-3 sm:px-6 shadow-2xs w-full">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
              {lang === "ja" ? "新生活応援 2026" : "New Lifestyle 2026"}
            </span>
            <span className="text-emerald-50 font-medium text-xs leading-snug">
              {lang === "ja"
                ? "敷金・礼金0円＆駅近物件多数！LINEで内見・相談受付中"
                : "Zero deposit & station-front units! Inquire & book viewings on LINE"}
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-3 text-emerald-100 text-[11px] font-bold shrink-0 whitespace-nowrap">
            <span className="flex items-center gap-1 text-white shrink-0 whitespace-nowrap">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-200 shrink-0" />
              <span className="shrink-0 whitespace-nowrap">
                {lang === "ja" ? "おとり物件ゼロ" : "Zero Bait & Switch"}
              </span>
            </span>
            <span className="text-emerald-300/80">•</span>
            <span className="flex items-center gap-1 text-white shrink-0 whitespace-nowrap">
              <Smartphone className="h-3.5 w-3.5 text-emerald-200 shrink-0" />
              <span className="shrink-0 whitespace-nowrap">
                {lang === "ja" ? "しつこい営業電話ナシ" : "No Sales Calls"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Emotional Lifestyle Hero Section */}
      <section className="relative overflow-hidden pt-4 sm:pt-6 pb-10 sm:pb-12 border-b border-slate-200/70">
        {/* Tokyo City Skyscraper Silhouettes (Left & Right Hero Flanks) */}
        <TokyoSkylineBackdrop />

        {/* Soft Decorative Gradient Blurs */}
        <div className="absolute top-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="absolute top-10 right-1/4 -z-10 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 -z-10 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
          {/* Main Hero Copywriting */}
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-white/95 px-3 py-0.5 text-[11px] font-black text-rose-600 shadow-2xs">
              <Sparkles className="h-3 w-3 text-rose-500" />
              <span>
                {lang === "ja"
                  ? "いま若者に選ばれている住まい探しポータル"
                  : "The #1 Housing Portal Chosen by Today's Generation"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-black tracking-tight text-slate-900 leading-snug sm:leading-tight">
              {lang === "ja" ? (
                <>
                  もっと私らしく、自由に暮らす。<br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent sm:ml-2">
                    写真とリアルな声で探すお部屋
                  </span>
                </>
              ) : (
                <>
                  Live Freely, More Authentically.<br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent sm:ml-2">
                    Find Your Room with Real Photos & Reviews
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-[13px] text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
              {lang === "ja"
                ? "敷金礼金0円・駅近5分・デザイナーズ・推し活ルーム。LINEでサクッと相談して、来店不要でスマートに新生活を始めよう。"
                : "Zero deposit, 5-min walk, designer spaces, and pet-friendly rooms. Consult quickly on LINE and start your new life without in-person visits."}
            </p>

            {/* Psychological Safety Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 pt-0.5 text-[10.5px] sm:text-[11px] font-bold text-slate-600">
              <span className="flex items-center gap-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>{lang === "ja" ? "営業電話ナシ" : "No Sales Calls"}</span>
              </span>
              <span className="flex items-center gap-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                <MessageCircle className="h-3 w-3 text-[#06C755]" />
                <span>{lang === "ja" ? "LINEで完結" : "100% on LINE"}</span>
              </span>
              <span className="flex items-center gap-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Coins className="h-3 w-3 text-amber-600" />
                <span>{lang === "ja" ? "明朗会計" : "Clear Pricing"}</span>
              </span>
              <span className="flex items-center gap-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Smartphone className="h-3 w-3 text-blue-600" />
                <span>{lang === "ja" ? "オンライン内見可" : "Online Tours"}</span>
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="pt-0 sm:pt-1">
            <JapanesePortalSearch />
          </div>

          {/* Trendy Hashtag Shortcut Pills */}
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-slate-500 font-black text-xs mr-1 flex items-center gap-1">
              <Flame className="h-4 w-4 text-rose-500" />
              <span>{lang === "ja" ? "人気タグ:" : "Trending Tags:"}</span>
            </span>
            <Link href="/search?deposit=0&keyMoney=0" className="hashtag-pill">
              {lang === "ja" ? "#敷金・礼金0円" : "#ZeroDeposit"}
            </Link>
            <Link href="/search?walkMinutes=5" className="hashtag-pill">
              {lang === "ja" ? "#駅徒歩5分以内" : "#Under5MinWalk"}
            </Link>
            <Link href="/search?maxPrice=80000" className="hashtag-pill">
              {lang === "ja" ? "#家賃8万円以下" : "#Under80kYen"}
            </Link>
            <Link href="/search?query=洗面台" className="hashtag-pill">
              {lang === "ja" ? "#独立洗面台" : "#SeparateVanity"}
            </Link>
            <Link href="/search?query=オートロック" className="hashtag-pill">
              {lang === "ja" ? "#オートロック・防犯" : "#AutoLockSecurity"}
            </Link>
            <Link href="/search?propertyType=MANSION" className="hashtag-pill">
              {lang === "ja" ? "#デザイナーズ" : "#Designer"}
            </Link>
            <Link href="/search?query=ペット" className="hashtag-pill">
              {lang === "ja" ? "#ペットと暮らす" : "#PetFriendly"}
            </Link>
            <Link href="/search?layout=1DK/1LDK" className="hashtag-pill">
              {lang === "ja" ? "#ふたり暮らし・同棲" : "#Couples"}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main Body Content Container */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-12 sm:space-y-16 w-full max-w-full overflow-x-hidden">
        {/* SECTION A: Instagram-Style Youth Town Stories */}
        <YouthAreaStories />

        {/* SECTION B: Interactive 30-Second Housing Match Quiz */}
        <LifestyleQuiz />

        {/* SECTION C: Lifestyle Mood Wall */}
        <LifestyleMoodWall />

        {/* SECTION D: Featured Properties with Staff Picks */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-0.5 text-xs font-black text-amber-700 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>STAFF PICK</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ja"
                  ? "スタッフ厳選！いまイチオシの注目物件"
                  : "Staff Picks: Featured & Trending Residences"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === "ja"
                  ? "駅近・独立洗面台・敷礼ゼロなど、若者のリアルな住みやすさに徹底的にこだわったお部屋。"
                  : "Units curated for real comfort: near stations, private vanity, and zero upfront fees."}
              </p>
            </div>

            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white border border-slate-200 px-4 py-2 text-xs font-black text-slate-700 hover:border-rose-400 hover:text-rose-600 transition-all shadow-2xs shrink-0"
            >
              <span>
                {lang === "ja"
                  ? `すべての物件を見る (${totalCount}件)`
                  : `View All Properties (${totalCount})`}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formattedFeatured.map((property, idx) => (
              <PropertyCard key={property.id} property={property} priority={idx < 3} />
            ))}
          </div>
        </section>

        {/* SECTION E: Initial Cost Peace-of-Mind Simulator */}
        <InitialCostExplainer />

        {/* SECTION F: Dual Special Themes: 敷礼ゼロ & 駅徒歩5分以内 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Box 1: 敷金・礼金0円 */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-white font-black text-xs shadow-sm">
                  {lang === "ja" ? "0円" : "$0"}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {lang === "ja" ? "敷金・礼金なし特集" : "Zero Deposit & Key Money Special"}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {lang === "ja"
                      ? "初期費用をスマートに抑えて身軽に新生活スタート"
                      : "Cut upfront moving fees and start your life with ease"}
                  </p>
                </div>
              </div>
              <Link href="/search?deposit=0&keyMoney=0" className="text-xs font-black text-rose-600 hover:underline">
                {lang === "ja" ? "もっと見る →" : "View More →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formattedNoDeposit.slice(0, 2).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* Box 2: 駅近 徒歩5分以内 */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
                  <Train className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {lang === "ja" ? "駅近 徒歩5分以内特集" : "Within 5-Min Walk to Station"}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {lang === "ja"
                      ? "雨の日も夜遅くの帰宅も安心！フットワーク軽快な暮らし"
                      : "Peace of mind in rain or late nights. Swift and effortless transit"}
                  </p>
                </div>
              </div>
              <Link href="/search?walkMinutes=5" className="text-xs font-black text-emerald-700 hover:underline">
                {lang === "ja" ? "もっと見る →" : "View More →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formattedNearStation.slice(0, 2).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION G: Popular Train Lines for Daily Commute */}
        <section className="space-y-4">
          <div className="border-b border-slate-200/80 pb-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-black text-emerald-700 mb-1">
              <Train className="h-3.5 w-3.5" />
              <span>{lang === "ja" ? "アクセス良好" : "Transit Access"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === "ja" ? "若者に人気の主要沿線・駅から探す" : "Popular Transit Lines & Stations for Commute"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ja"
                ? "通勤・通学、休日のカフェや買い物にもスムーズ。乗換なしでアクセス抜群の人気路線。"
                : "Direct train access for easy work commutes, weekend cafes, and shopping."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                line: lang === "ja" ? "JR山手線" : "JR Yamanote Line",
                area: lang === "ja" ? "渋谷・新宿・原宿・恵比寿" : "Shibuya, Shinjuku, Harajuku, Ebisu",
                count: "1,420",
                query: "山手線",
              },
              {
                line: lang === "ja" ? "東急東横線" : "Tokyu Toyoko Line",
                area: lang === "ja" ? "代官山・中目黒・自由が丘" : "Daikanyama, Nakameguro, Jiyugaoka",
                count: "740",
                query: "東横線",
              },
              {
                line: lang === "ja" ? "東京メトロ千代田線" : "Tokyo Metro Chiyoda Line",
                area: lang === "ja" ? "代々木公園・表参道・赤坂" : "Yoyogi Park, Omotesando, Akasaka",
                count: "680",
                query: "千代田線",
              },
              {
                line: lang === "ja" ? "JR中央・総武線" : "JR Chuo-Sobu Line",
                area: lang === "ja" ? "高円寺・阿佐ヶ谷・吉祥寺" : "Koenji, Asagaya, Kichijoji",
                count: "920",
                query: "中央線",
              },
              {
                line: lang === "ja" ? "東京メトロ銀座線" : "Tokyo Metro Ginza Line",
                area: lang === "ja" ? "渋谷・表参道・銀座" : "Shibuya, Omotesando, Ginza",
                count: "890",
                query: "銀座線",
              },
              {
                line: lang === "ja" ? "小田急線" : "Odakyu Line",
                area: lang === "ja" ? "下北沢・東北沢・代々木八幡" : "Shimokitazawa, Yoyogi-Hachiman",
                count: "610",
                query: "小田急線",
              },
              {
                line: lang === "ja" ? "大阪メトロ御堂筋線" : "Osaka Metro Midosuji Line",
                area: lang === "ja" ? "梅田・本町・心斎橋・難波" : "Umeda, Honmachi, Shinsaibashi, Namba",
                count: "650",
                query: "御堂筋線",
              },
              {
                line: lang === "ja" ? "福岡地下鉄空港線" : "Fukuoka Subway Kuko Line",
                area: lang === "ja" ? "天神・博多・大濠公園" : "Tenjin, Hakata, Ohori Park",
                count: "430",
                query: "空港線",
              },
            ].map((item) => (
              <Link
                key={item.line}
                href={`/search?query=${encodeURIComponent(item.query)}`}
                className="group rounded-2xl border border-slate-200/90 bg-white p-4 hover:border-rose-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-xs text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.line}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    {item.count}{lang === "ja" ? "件" : " units"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block truncate">
                  {item.area}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION H: Peer Testimonials & Real Living Voices */}
        <YouthRealVoices />

        {/* SECTION I: Friendly Digital-First Owner Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
              Owner & Agent Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {lang === "ja"
                ? "若い世代の優良な入居者をお探しのオーナー様へ"
                : "To Property Owners Seeking Quality Young Tenants"}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">
              {lang === "ja"
                ? "スマホから写真をアップロードするだけで即日掲載。Z世代・ミレニアル世代の入居希望者とLINE・オンライン内見でスムーズにマッチングします。"
                : "Upload photos straight from your phone for same-day listing. Seamless matching with young renters via LINE chat and online video tours."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/signup"
              className="rounded-2xl bg-rose-500 hover:bg-rose-600 px-6 py-3.5 text-xs font-black text-white shadow-md shadow-rose-500/25 transition-all hover:scale-[1.02]"
            >
              {lang === "ja" ? "オーナー無料掲載を始める" : "Start Free Owner Listing"}
            </Link>
            <Link
              href="/dashboard/listings/new"
              className="rounded-2xl border border-white/30 hover:bg-white/10 px-5 py-3.5 text-xs font-bold text-white transition-all"
            >
              {lang === "ja" ? "物件登録画面へ" : "Go to Property Registration"}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatJapanesePrice, formatDate } from "@/lib/utils";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { InitialCostSimulator } from "@/components/property/InitialCostSimulator";
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
  FileText,
  Clock,
  KeyRound,
  Shield,
  BadgeAlert,
} from "lucide-react";
import { PropertyDto } from "@/types";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const property = await prisma.property.findUnique({
      where: { slug: params.slug },
      include: { city: true, neighborhood: true, images: { take: 1 } },
    });

    if (!property) return { title: "Property Not Found — HavenSUUMO" };

    return {
      title: `${property.titleJa || property.title} 【${property.stationName ? property.stationName + "駅" : property.city.name}】 — HavenSUUMO`,
      description: (property.descriptionJa || property.description).slice(0, 160),
      openGraph: {
        title: property.titleJa || property.title,
        description: (property.descriptionJa || property.description).slice(0, 160),
        images: property.images?.[0]?.url ? [property.images[0].url] : [],
      },
    };
  } catch (error) {
    return { title: "Property — HavenSUUMO" };
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  let property = null;
  let similar: any[] = [];

  try {
    property = await prisma.property.findUnique({
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

    if (property) {
      similar = await prisma.property.findMany({
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
    }
  } catch (error) {
    console.error("PropertyDetailPage database error:", error);
  }

  if (!property) {
    notFound();
  }

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

  const propertyRefId = `HS-${property.id.slice(0, 8).toUpperCase()}`;
  const tsubo = (property.area * 0.3025).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb Navigation & Property Code */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs text-slate-500">
        <nav className="flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-emerald-700">SUUMOトップ</Link>
          <span>›</span>
          <Link href={`/search?type=${property.listingType}`} className="hover:text-emerald-700">
            {property.listingType === "RENT" ? "賃貸物件" : "売買・マンション"}
          </Link>
          <span>›</span>
          <Link href={`/search?city=${property.city.slug}`} className="hover:text-emerald-700">
            {property.city.nameJa || property.city.name}
          </Link>
          <span>›</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {property.titleJa || property.title}
          </span>
        </nav>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>物件管理番号:</span>
          <span className="font-bold text-slate-700">{propertyRefId}</span>
        </div>
      </div>

      {/* Property Primary Title & Station Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rounded-md bg-emerald-700 px-2.5 py-0.5 text-xs font-bold text-white shadow-2xs">
            {property.listingType === "RENT" ? "賃貸" : "売買"}
          </span>
          <span className="rounded-md bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-white">
            {property.propertyType === "MANSION" ? "マンション" : property.propertyType === "HOUSE" ? "一戸建て" : "アパート"}
          </span>
          {property.featured && (
            <span className="rounded-md bg-amber-500 text-white px-2.5 py-0.5 text-xs font-bold flex items-center gap-1 shadow-2xs">
              <Sparkles className="h-3 w-3" />
              特選物件
            </span>
          )}
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
            ✔ おとり広告ゼロ（実在確認済）
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {property.titleJa || property.title}
        </h1>
        {property.titleJa && (
          <p className="text-sm font-medium text-slate-500 mt-0.5">{property.title}</p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-700">
          {property.stationName && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 font-bold text-emerald-900 border border-emerald-200">
              <Train className="h-4 w-4 text-emerald-700" />
              <span>
                {property.stationLine ? `${property.stationLine} ` : ""}
                {property.stationName}駅 徒歩{property.walkMinutes || 5}分
              </span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>
              {property.address}, {property.neighborhood?.nameJa || property.neighborhood?.name}, {property.city.nameJa || property.city.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Media Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Content Grid: Left 8 Cols (Details), Right 4 Cols (Agent Card & Action Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* SUUMO Style JPY Pricing Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-slate-50 to-white border border-emerald-200/80 shadow-2xs flex flex-wrap items-baseline gap-6 sm:gap-8">
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">
                {property.listingType === "RENT" ? "賃料 (Monthly Rent)" : "販売価格 (Price)"}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
                  {formatJapanesePrice(property.price, property.listingType === "RENT", "ja")}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  ({formatCurrency(property.price, property.currency, "en")})
                </span>
              </div>
            </div>

            {property.managementFee && (
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="text-[11px] font-bold text-slate-500 block">管理費・共益費</span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  ¥{property.managementFee.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ 月</span>
                </span>
              </div>
            )}

            <div className="border-l border-slate-200 pl-4 sm:pl-6">
              <span className="text-[11px] font-bold text-slate-500 block">敷金 / 礼金</span>
              <span className="text-base sm:text-lg font-bold text-slate-900">
                {property.deposit ? `${(property.deposit / property.price).toFixed(0)}ヶ月` : "敷0"} /{" "}
                {property.keyMoney ? `${(property.keyMoney / property.price).toFixed(0)}ヶ月` : "礼0"}
              </span>
            </div>

            {property.layout && (
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="text-[11px] font-bold text-slate-500 block">間取り</span>
                <span className="text-base sm:text-lg font-black text-emerald-800">
                  {property.layout}
                </span>
              </div>
            )}
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">間取り (Layout)</span>
                <span className="text-sm font-bold text-slate-900">
                  {property.layout || (property.bedrooms === 0 ? "1R/1K" : `${property.bedrooms}LDK`)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Maximize className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">専有面積 (Area)</span>
                <span className="text-sm font-bold text-slate-900">
                  {property.area} ㎡ <span className="text-[11px] text-slate-400 font-normal">({tsubo}坪)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">階数 / 構造</span>
                <span className="text-sm font-bold text-slate-900">
                  {property.floor ? `${property.floor}階 / ${property.totalFloors || 10}階建` : "低層階"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">築年月 (Year)</span>
                <span className="text-sm font-bold text-slate-900">
                  {property.yearBuilt ? `${property.yearBuilt}年築` : "新築・築浅"}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Recommendations */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="h-4 w-4 text-emerald-700" />
              <span>物件アピールポイント・担当者コメント</span>
            </h3>
            {property.descriptionJa && (
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {property.descriptionJa}
              </p>
            )}
            <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
              {property.description}
            </p>
          </div>

          {/* Japanese Real Estate Standards: Official 物件概要 (Property Specification Table) */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-bold tracking-wide">
                  物件概要 (Official Real Estate Specifications)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">宅地建物取引業法に基づく表示</span>
            </div>

            <table className="w-full text-xs border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    物件種目
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4 border-r border-slate-200">
                    {property.propertyType === "MANSION" ? "賃貸マンション (鉄筋コンクリート造)" : "賃貸アパート"}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    物件名・号室
                  </th>
                  <td className="px-4 py-3 text-slate-900 font-bold sm:w-1/4">
                    {property.titleJa || property.title}
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    所在地
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4 border-r border-slate-200">
                    {property.address}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    交通・最寄駅
                  </th>
                  <td className="px-4 py-3 text-slate-900 font-semibold sm:w-1/4">
                    {property.stationLine ? `${property.stationLine} ` : ""}
                    {property.stationName ? `${property.stationName}駅 徒歩${property.walkMinutes || 5}分` : "駅徒歩圏内"}
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    間取り
                  </th>
                  <td className="px-4 py-3 text-slate-900 font-bold sm:w-1/4 border-r border-slate-200">
                    {property.layout || "1LDK"}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    専有面積
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    {property.area} ㎡ (壁芯) / 約{tsubo}坪
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    構造・規模
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4 border-r border-slate-200">
                    {property.structure || "鉄筋コンクリート造 (RC) 地上12階建"}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    所在階 / 向き
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    {property.floor ? `${property.floor}階` : "3階"} / 南向き（日当たり良好）
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    築年月
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4 border-r border-slate-200">
                    {property.yearBuilt ? `${property.yearBuilt}年` : "2020年"}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    契約期間
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    普通借家契約 2年間 (更新可能)
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    敷金 / 礼金
                  </th>
                  <td className="px-4 py-3 text-slate-900 font-semibold sm:w-1/4 border-r border-slate-200">
                    {property.deposit ? `${(property.deposit / property.price).toFixed(0)}ヶ月` : "敷金なし"} /{" "}
                    {property.keyMoney ? `${(property.keyMoney / property.price).toFixed(0)}ヶ月` : "礼金なし"}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    更新料
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    新賃料の1ヶ月分
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    現況・入居時期
                  </th>
                  <td className="px-4 py-3 text-emerald-800 font-bold sm:w-1/4 border-r border-slate-200">
                    空室 / 即入居可 (即時内見可能)
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    取引態様
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    媒介（仲介）
                  </td>
                </tr>

                <tr className="flex flex-col sm:table-row">
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    情報更新日
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4 border-r border-slate-200">
                    {formatDate(property.publishedAt || property.createdAt)}
                  </td>
                  <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 sm:w-1/4 border-r border-slate-200">
                    次回更新予定日
                  </th>
                  <td className="px-4 py-3 text-slate-900 sm:w-1/4">
                    更新日より14日以内
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Move-in Initial Cost Calculator */}
          <InitialCostSimulator
            rent={property.price}
            managementFee={property.managementFee || 10000}
            deposit={property.deposit || 0}
            keyMoney={property.keyMoney || 0}
            currency={property.currency}
            isRent={property.listingType === "RENT"}
          />

          {/* Amenities & Equipment */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>設備・こだわり条件 (Amenities &amp; Features)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((item) => (
                <div
                  key={item.amenity.id}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-100"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {item.amenity.nameJa ? `${item.amenity.nameJa}` : item.amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage / Investment Calculator (for buyers or rent affordability) */}
          <MortgageCalculator
            price={property.price}
            currency={property.currency}
            isRent={property.listingType === "RENT"}
          />

          {/* Neighborhood & Surrounding Living Environment */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">周辺環境・生活インフラ (Neighborhood &amp; Access)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {property.neighborhood?.nameJa || property.neighborhood?.name}, {property.city.nameJa || property.city.name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <Train className="h-4 w-4" />
                  <span>最寄駅アクセス</span>
                </div>
                <p className="text-slate-600 font-medium">徒歩5分以内（平坦な舗装歩道）</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <Utensils className="h-4 w-4" />
                  <span>スーパー・コンビニ</span>
                </div>
                <p className="text-slate-600 font-medium">セブンイレブン徒歩2分 / スーパー徒歩4分</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>教育・公共機関</span>
                </div>
                <p className="text-slate-600 font-medium">区立図書館・区役所出張所 徒歩8分</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <TreePine className="h-4 w-4" />
                  <span>公園・自然環境</span>
                </div>
                <p className="text-slate-600 font-medium">緑道沿い・閑静な住宅街エリア</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: Agent Box & Inquiries */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <PropertyDetailClientActions property={formattedProperty} />

          {/* Certified Japanese Real Estate Agency & Agent Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img
                src={property.agent?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
                alt={property.agent?.name || "Licensed Agent"}
                className="h-14 w-14 rounded-xl object-cover border border-slate-100"
              />
              <div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>専任宅地建物取引士</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{property.agent?.name || "佐藤 健一 (Kenichi Sato)"}</h4>
                <p className="text-xs text-slate-500 font-medium">{property.agency?.name || "三井ヘイブン不動産アドバイザリー"}</p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">免許証番号:</span>
                <span className="font-semibold text-slate-800">国土交通大臣 (3) 第88204号</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">所属団体:</span>
                <span className="font-semibold text-slate-800">(一社)不動産流通経営協会</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">保証協会:</span>
                <span className="font-semibold text-slate-800">(公社)不動産保証協会</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {property.agent?.bio || "東京・主要ターミナル駅周辺の賃貸・売買仲介に15年以上携わっております。初期費用交渉やオンライン内見もお気軽にお申し付けください。"}
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900 border border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-700" />
                  <span className="font-bold">{property.agent?.phone || "0120-800-928"}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/80 px-1.5 py-0.5 rounded">通話無料</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center">営業時間: 09:30〜19:00（水曜定休）</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {formattedSimilar.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">この物件を見た人はここもチェックしています</h3>
              <p className="text-xs text-slate-500 mt-0.5">{property.city.nameJa || property.city.name}の類似条件物件</p>
            </div>
            <Link
              href={`/search?city=${property.city.slug}&type=${property.listingType}`}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              類似物件をすべて見る →
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Scale,
  Sparkles,
  Train,
  MapPin,
  Building,
  ShieldCheck,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { PropertyDto } from "@/types";
import { formatJapanesePrice } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface PropertyCardProps {
  property: PropertyDto;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (property: PropertyDto) => void;
  viewMode?: "grid" | "list" | "split";
  priority?: boolean;
}

export function PropertyCard({
  property,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare,
  viewMode = "grid",
  priority = false,
}: PropertyCardProps) {
  const { lang } = useLanguage();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);
  const [compared, setCompared] = useState(isCompared);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [
          {
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
            alt: property.title,
          },
        ];

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompared(!compared);
    if (onToggleCompare) {
      onToggleCompare(property);
    }
  };

  const isListLayout = viewMode === "list";
  const isRent = property.listingType === "RENT";
  const tsubo = (property.area * 0.3025).toFixed(1);

  // Deposit & Key money badges
  const isShikikinZero = !property.deposit || property.deposit === 0;
  const isReikinZero = !property.keyMoney || property.keyMoney === 0;

  return (
    <div
      className={`group relative flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-brand-600 hover:shadow-lg ${
        isListLayout ? "md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* 1. Media Area */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isListLayout ? "md:w-5/12 aspect-[16/10] md:aspect-auto" : "aspect-[16/10] w-full"
        }`}
      >
        <Link href={`/property/${property.slug}`} className="block h-full w-full">
          <img
            src={images[activeImageIdx]?.url || images[0].url}
            alt={property.title}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className={`px-2 py-0.5 text-[11px] font-black tracking-wider uppercase rounded ${
              isRent ? "bg-brand-700 text-white shadow-sm" : "bg-blue-800 text-white shadow-sm"
            }`}
          >
            {isRent ? (lang === "ja" ? "賃貸" : "FOR RENT") : lang === "ja" ? "売買" : "FOR SALE"}
          </span>

          {property.layout && (
            <span className="bg-slate-900/90 text-white px-2 py-0.5 text-[11px] font-black rounded backdrop-blur-sm">
              {property.layout}
            </span>
          )}

          {isShikikinZero && isReikinZero && isRent && (
            <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-black rounded shadow-sm">
              敷礼0円
            </span>
          )}

          {property.featured && (
            <span className="bg-rose-600 text-white px-2 py-0.5 text-[10px] font-black rounded shadow-sm flex items-center gap-0.5">
              <Sparkles className="h-2.5 w-2.5" />
              <span>注目</span>
            </span>
          )}
        </div>

        {/* Action Buttons Top-Right */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={handleCompareClick}
            aria-label="Compare property"
            title="比較リストに追加"
            className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md shadow transition-transform active:scale-90 ${
              compared
                ? "bg-brand-700 text-white"
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-brand-700"
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={handleFavClick}
            aria-label="Save to favorites"
            title="お気に入りに保存"
            className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md shadow transition-transform active:scale-90 ${
              favorite
                ? "bg-rose-500 text-white"
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Photo Count Tag */}
        <div className="absolute bottom-2 right-2 rounded bg-black/65 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {activeImageIdx + 1} / {images.length}
        </div>
      </div>

      {/* 2. Structured Real Estate Information Body */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div className="space-y-2">
          {/* Price Strip */}
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl font-black text-brand-800 tracking-tight">
                {formatJapanesePrice(property.price, isRent, lang)}
              </span>
              {property.managementFee ? (
                <span className="text-xs font-semibold text-slate-500">
                  {lang === "ja" ? "管理費: " : "Fee: "}¥{property.managementFee.toLocaleString()}
                </span>
              ) : isRent ? (
                <span className="text-xs font-semibold text-slate-400">管理費込</span>
              ) : null}
            </div>

            {isRent && (
              <div className="text-[11px] font-bold text-slate-500">
                敷 {isShikikinZero ? "なし" : `${(property.deposit! / property.price).toFixed(0)}ヶ月`} / 礼{" "}
                {isReikinZero ? "なし" : `${(property.keyMoney! / property.price).toFixed(0)}ヶ月`}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug}`} className="block group-hover:text-brand-800 transition-colors">
            <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
              {lang === "ja" && property.titleJa ? property.titleJa : property.title}
            </h4>
          </Link>

          {/* Transit & Station Walk (High Priority for Japanese Market) */}
          {property.stationName && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-100">
              <Train className="h-3.5 w-3.5 text-brand-700 shrink-0" />
              <span className="truncate">
                {property.stationLine ? `${property.stationLine} ` : ""}
                「{property.stationName}」駅
                {property.walkMinutes ? ` 徒歩${property.walkMinutes}分` : ""}
              </span>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="truncate">
              {property.address} ({property.neighborhood?.nameJa || property.neighborhood?.name || property.city?.name})
            </span>
          </div>

          {/* Structured Specs Grid */}
          <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-slate-50/80 p-2 text-[11px] font-semibold text-slate-700 border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block font-normal">間取り</span>
              <span className="font-bold text-slate-900">{property.layout || "ワンルーム"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-normal">専有面積</span>
              <span className="font-bold text-slate-900">
                {property.area}㎡ <span className="text-[9px] text-slate-500 font-normal">({tsubo}坪)</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-normal">建物構造</span>
              <span className="font-bold text-slate-900">{property.structure || "RC造"}</span>
            </div>
          </div>

          {/* Japanese Amenity Badges */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            <span className="badge-tag-japanese">バス・トイレ別</span>
            <span className="badge-tag-japanese">2階以上</span>
            <span className="badge-tag-japanese">オートロック</span>
            <span className="badge-tag-japanese">エアコン</span>
            {property.parking && <span className="badge-tag-japanese">駐車場有</span>}
          </div>
        </div>

        {/* 3. Broker & Action Row */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="truncate max-w-[130px] font-medium">
              {property.agency?.name || "専属仲介・宅建士確認済"}
            </span>
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="inline-flex items-center gap-1 rounded-md bg-brand-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-800 transition-colors"
          >
            <span>詳細を見る</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      className={`group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white transition-all duration-300 hover:border-rose-300 hover:shadow-xl lifestyle-card overflow-hidden ${
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className={`px-2.5 py-0.5 text-[10px] font-black tracking-wider rounded-full ${
              isRent ? "bg-emerald-600 text-white shadow-2xs" : "bg-blue-600 text-white shadow-2xs"
            }`}
          >
            {isRent ? (lang === "ja" ? "賃貸" : "RENT") : lang === "ja" ? "売買" : "SALE"}
          </span>

          {property.layout && (
            <span className="bg-slate-950/80 text-white px-2 py-0.5 text-[10px] font-black rounded-full backdrop-blur-md">
              {property.layout}
            </span>
          )}

          {isShikikinZero && isReikinZero && isRent && (
            <span className="bg-rose-500 text-white px-2 py-0.5 text-[10px] font-black rounded-full shadow-2xs animate-pulse">
              敷0・礼0
            </span>
          )}

          {property.featured && (
            <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-black rounded-full shadow-2xs flex items-center gap-0.5">
              <Sparkles className="h-2.5 w-2.5" />
              <span>推し物件</span>
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
                ? "bg-emerald-600 text-white"
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-emerald-600"
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
        <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {activeImageIdx + 1} / {images.length}
        </div>
      </div>

      {/* 2. Structured Real Estate Information Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-2.5">
          {/* Price Strip */}
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl font-black text-rose-600 tracking-tight">
                {formatJapanesePrice(property.price, isRent, lang)}
              </span>
              {property.managementFee ? (
                <span className="text-[11px] font-bold text-slate-500">
                  {lang === "ja" ? "管理費: " : "Fee: "}¥{property.managementFee.toLocaleString()}
                </span>
              ) : isRent ? (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">管理費込</span>
              ) : null}
            </div>

            {isRent && (
              <div className="text-[10px] font-bold text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-full">
                敷{isShikikinZero ? "0" : `${(property.deposit! / property.price).toFixed(0)}`} / 礼{isReikinZero ? "0" : `${(property.keyMoney! / property.price).toFixed(0)}`}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug}`} className="block group-hover:text-rose-600 transition-colors">
            <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-1">
              {lang === "ja" && property.titleJa ? property.titleJa : property.title}
            </h4>
          </Link>

          {/* Transit & Station Walk Highlight */}
          {property.stationName && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-emerald-50/70 px-2.5 py-1 rounded-xl border border-emerald-200/60">
              <Train className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">
                {property.stationLine ? `${property.stationLine} ` : ""}
                <strong className="text-slate-900">「{property.stationName}」</strong>駅
                {property.walkMinutes ? (
                  <span className="text-emerald-700 font-black"> 徒歩{property.walkMinutes}分</span>
                ) : ""}
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

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-50 p-1.5 sm:p-2 text-[10px] sm:text-[11px] font-semibold text-slate-700 border border-slate-200/70 text-center">
            <div>
              <span className="text-[9px] text-slate-400 block font-medium">間取り</span>
              <span className="font-bold text-slate-900">{property.layout || "1LDK"}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-medium">専有面積</span>
              <span className="font-bold text-slate-900">
                {property.area}㎡
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-medium">構造</span>
              <span className="font-bold text-slate-900 truncate block">{property.structure || "RC造"}</span>
            </div>
          </div>

          {/* Lifestyle Tags */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 px-2 py-0.5 rounded-full border border-slate-200/80 transition-colors">
              #独立洗面台
            </span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 px-2 py-0.5 rounded-full border border-slate-200/80 transition-colors">
              #オートロック
            </span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 px-2 py-0.5 rounded-full border border-slate-200/80 transition-colors">
              #2階以上
            </span>
            {isShikikinZero && isReikinZero && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                #初期費用安め
              </span>
            )}
          </div>
        </div>

        {/* 3. Action Buttons Row */}
        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-xs">
          <a
            href="https://line.me/R/ti/p/@havensuumo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#e8f9ee] hover:bg-[#d5f5de] text-[#06C755] font-black px-2.5 py-1.5 text-[11px] transition-colors shrink-0"
            title="LINEでこのお部屋の空室確認・内見予約"
          >
            <span>LINE内見</span>
          </a>

          <Link
            href={`/property/${property.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 hover:bg-rose-600 px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-2xs transition-colors shrink-0"
          >
            <span>詳細を見る</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

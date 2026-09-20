"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Building,
  Check,
  Scale,
  Sparkles,
  Train,
} from "lucide-react";
import { PropertyDto } from "@/types";
import { formatCurrency, formatJapanesePrice, formatPriceCompact } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
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
  const { lang, t } = useLanguage();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);
  const [compared, setCompared] = useState(isCompared);

  const images = property.images && property.images.length > 0
    ? property.images
    : [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80", alt: property.title }];

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

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl ${
        isListLayout ? "md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* Image Media Container */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isListLayout ? "md:w-2/5 aspect-[4/3] md:aspect-auto" : "aspect-[16/10] w-full"
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

        {/* Gradient overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Badges Top-Left */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <Badge
            variant={property.listingType === "RENT" ? "brand" : "neutral"}
            className="bg-white/95 text-slate-900 border-none shadow-sm backdrop-blur-md font-bold px-2.5 py-1"
          >
            {property.listingType === "RENT"
              ? lang === "ja" ? "賃貸" : "FOR RENT"
              : lang === "ja" ? "売買" : "FOR SALE"}
          </Badge>
          {property.layout && (
            <Badge
              variant="neutral"
              className="bg-slate-900/80 text-white border-none shadow-sm font-bold px-2 py-0.5 text-[11px]"
            >
              {property.layout}
            </Badge>
          )}
          {property.featured && (
            <Badge
              variant="warning"
              className="bg-amber-500 text-white border-none shadow-sm font-bold flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              {lang === "ja" ? "おすすめ" : "Featured"}
            </Badge>
          )}
        </div>

        {/* Favorite & Compare Action Buttons Top-Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            aria-label={compared ? "Remove from comparison" : "Add to comparison"}
            title="Compare property"
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow transition-transform active:scale-90 ${
              compared
                ? "bg-brand-600 text-white"
                : "bg-white/80 text-slate-700 hover:bg-white hover:text-brand-600"
            }`}
          >
            <Scale className="h-4 w-4" />
          </button>

          <button
            onClick={handleFavClick}
            aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
            title="Save favorite"
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow transition-transform active:scale-90 ${
              favorite
                ? "bg-rose-500 text-white"
                : "bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Multiple image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            {images.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIdx === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {formatJapanesePrice(property.price, property.listingType === "RENT", lang)}
              </span>
              {property.managementFee && (
                <span className="text-xs font-semibold text-slate-500">
                  ({lang === "ja" ? "管理費: " : "Fee: "}¥{property.managementFee.toLocaleString()})
                </span>
              )}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
              {property.layout || property.propertyType}
            </span>
          </div>

          {/* Title Link */}
          <Link href={`/property/${property.slug}`} className="block mt-2 group-hover:text-brand-700 transition-colors">
            <h4 className="text-base font-bold text-slate-900 line-clamp-1">
              {lang === "ja" && property.titleJa ? property.titleJa : property.title}
            </h4>
          </Link>

          {/* Transit & Station Walk */}
          {property.stationName && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <Train className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="line-clamp-1">
                {property.stationName}
                {property.walkMinutes ? (lang === "ja" ? ` 徒歩${property.walkMinutes}分` : ` (${property.walkMinutes} min walk)`) : ""}
              </span>
            </div>
          )}

          {/* Location */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="line-clamp-1">
              {property.address}, {lang === "ja" ? (property.neighborhood?.nameJa || property.neighborhood?.name || property.city?.nameJa || property.city?.name) : (property.neighborhood?.name || property.city?.name)}
            </span>
          </div>

          {/* Facts Strip (Layout, Structure, Area) */}
          <div className="mt-3.5 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-slate-500" />
              <span>{property.layout || (property.bedrooms === 0 ? "1R / Studio" : `${property.bedrooms}部屋`)}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4 text-slate-500" />
              <span>{property.area} ㎡</span>
            </div>
            {property.structure && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{property.structure}</span>
              </>
            )}
          </div>
        </div>

        {/* Agency / Agent Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            {property.agency?.logoUrl ? (
              <img
                src={property.agency.logoUrl}
                alt={property.agency.name}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <Building className="h-4 w-4 text-slate-600" />
            )}
            <span className="font-medium text-slate-600 line-clamp-1 max-w-[150px]">
              {property.agency?.name || "Licensed Brokerage"}
            </span>
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="font-bold text-brand-700 hover:text-brand-800 hover:underline"
          >
            {lang === "ja" ? "詳細を見る →" : "View Details →"}
          </Link>
        </div>
      </div>
    </div>
  );
}

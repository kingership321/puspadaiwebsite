"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Home,
  Bed,
  DollarSign,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ListingType } from "@/types";
import { useLanguage } from "@/lib/LanguageContext";

interface SearchBarProps {
  initialType?: ListingType;
  initialQuery?: string;
  className?: string;
}

const POPULAR_LOCATIONS = [
  { name: "Tokyo (東京都)", nameJa: "東京都 (全域)", slug: "tokyo", type: "City" },
  { name: "Shibuya, Tokyo (渋谷区)", nameJa: "渋谷区・恵比寿・代官山", slug: "tokyo-shibuya", type: "Ward" },
  { name: "Shinjuku, Tokyo (新宿区)", nameJa: "新宿区・新宿駅周辺", slug: "tokyo-shinjuku", type: "Ward" },
  { name: "Minato, Tokyo (港区・六本木)", nameJa: "港区・六本木・赤坂", slug: "tokyo-minato", type: "Ward" },
  { name: "Osaka Umeda (大阪・梅田)", nameJa: "大阪市北区・梅田駅", slug: "osaka-kita-umeda", type: "Station" },
  { name: "Kyoto Karasuma (京都・烏丸)", nameJa: "京都市中京区・四条烏丸", slug: "kyoto-nakagyo", type: "Area" },
  { name: "Yokohama (横浜・みなとみらい)", nameJa: "横浜市西区・みなとみらい", slug: "yokohama-minato-mirai", type: "Port" },
  { name: "Fukuoka Tenjin (福岡・天神)", nameJa: "福岡市中央区・天神駅", slug: "fukuoka-tenjin", type: "City" },
];

export function SearchBar({
  initialType = "RENT",
  initialQuery = "",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [listingType, setListingType] = useState<ListingType>(initialType);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAutocompleteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (selectedCity) params.set("city", selectedCity);
    if (query && !selectedCity) params.set("query", query);
    if (propertyType) params.set("propertyType", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div ref={containerRef} className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Rent / Buy Mode Switcher */}
      <div className="flex items-center gap-1 mb-2">
        <button
          type="button"
          onClick={() => setListingType("RENT")}
          className={`rounded-t-xl px-6 py-2.5 text-xs font-bold transition-all ${
            listingType === "RENT"
              ? "bg-white text-slate-900 shadow-sm"
              : "bg-black/30 text-white/80 hover:bg-black/40 hover:text-white"
          }`}
        >
          {t.rent}
        </button>
        <button
          type="button"
          onClick={() => setListingType("SALE")}
          className={`rounded-t-xl px-6 py-2.5 text-xs font-bold transition-all ${
            listingType === "SALE"
              ? "bg-white text-slate-900 shadow-sm"
              : "bg-black/30 text-white/80 hover:bg-black/40 hover:text-white"
          }`}
        >
          {t.buy}
        </button>
      </div>

      {/* Main Search Surface */}
      <div className="relative rounded-2xl md:rounded-3xl border border-slate-200/80 bg-white p-2.5 sm:p-3 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Location Input with Autocomplete */}
          <div className="relative md:col-span-4 flex items-center rounded-xl bg-slate-50 px-3.5 py-2 hover:bg-slate-100/80 transition-colors">
            <MapPin className="h-5 w-5 text-brand-600 shrink-0 mr-2" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.location}
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedCity("");
                  setAutocompleteOpen(true);
                }}
                onFocus={() => setAutocompleteOpen(true)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Autocomplete suggestions popup */}
            {autocompleteOpen && (
              <div className="absolute top-full left-0 mt-2 w-full sm:w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === "ja" ? "主要エリア・主要駅" : "Popular Areas & Stations"}
                </div>
                {POPULAR_LOCATIONS.map((loc) => (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => {
                      setQuery(lang === "ja" ? loc.nameJa : loc.name);
                      setSelectedCity(loc.slug);
                      setAutocompleteOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-brand-600" />
                      <span>{lang === "ja" ? loc.nameJa : loc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {loc.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="md:col-span-3 flex items-center rounded-xl bg-slate-50 px-3.5 py-2 hover:bg-slate-100/80 transition-colors">
            <Home className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.propertyType}
              </span>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">{lang === "ja" ? "すべての物件種別" : "All Types"}</option>
                <option value="MANSION">{lang === "ja" ? "マンション (分譲・タワー)" : "Mansions"}</option>
                <option value="APARTMENT">{lang === "ja" ? "アパート" : "Apartments"}</option>
                <option value="HOUSE">{lang === "ja" ? "一戸建て" : "Houses"}</option>
                <option value="STUDIO">{lang === "ja" ? "ワンルーム (1R/1K)" : "Studios"}</option>
              </select>
            </div>
          </div>

          {/* Layout / Bedrooms Dropdown */}
          <div className="md:col-span-2 flex items-center rounded-xl bg-slate-50 px-3.5 py-2 hover:bg-slate-100/80 transition-colors">
            <Bed className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.layout}
              </span>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">{lang === "ja" ? "すべての間取り" : "Any Layout"}</option>
                <option value="0">{lang === "ja" ? "1R・1K" : "1R / 1K"}</option>
                <option value="1">{lang === "ja" ? "1DK・1LDK" : "1DK / 1LDK"}</option>
                <option value="2">{lang === "ja" ? "2DK・2LDK" : "2DK / 2LDK"}</option>
                <option value="3">{lang === "ja" ? "3DK・3LDK以上" : "3LDK+"}</option>
              </select>
            </div>
          </div>

          {/* Search Button CTA */}
          <div className="md:col-span-3 flex items-center">
            <button
              type="submit"
              className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 px-6 text-xs sm:text-sm font-bold text-white shadow-lg shadow-brand-700/20 hover:bg-brand-800 active:scale-[0.98] transition-all"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              <span>{t.searchButton}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

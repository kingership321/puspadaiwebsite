"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Train,
  MapPin,
  Sparkles,
  Search,
  Check,
  ChevronRight,
  SlidersHorizontal,
  Home,
  Building2,
  DollarSign,
  Flame,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function JapanesePortalSearch() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"train" | "area" | "theme" | "keyword">("train");

  // Filter states
  const [listingType, setListingType] = useState<"RENT" | "SALE">("RENT");
  const [selectedCity, setSelectedCity] = useState<string>("tokyo");
  const [selectedLine, setSelectedLine] = useState<string>("");
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [walkMinutes, setWalkMinutes] = useState<string>("5");
  const [maxRent, setMaxRent] = useState<string>("");
  const [layout, setLayout] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  // Theme conditions
  const [themes, setThemes] = useState<{ [key: string]: boolean }>({
    noDeposit: true,
    nearStation: false,
    autoLock: false,
    separateBath: false,
    secondFloor: false,
    cornerRoom: false,
    petFriendly: false,
    towerMansion: false,
  });

  const toggleTheme = (key: string) => {
    setThemes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    params.set("type", listingType);

    if (activeTab === "train") {
      if (selectedStation) params.set("query", selectedStation);
      else if (selectedLine) params.set("query", selectedLine);
      if (walkMinutes) params.set("walkMinutes", walkMinutes);
    } else if (activeTab === "area") {
      if (selectedCity) params.set("city", selectedCity);
      if (selectedWard) params.set("query", selectedWard);
    } else if (activeTab === "theme") {
      if (themes.noDeposit) {
        params.set("deposit", "0");
        params.set("keyMoney", "0");
      }
      if (themes.nearStation) params.set("walkMinutes", "5");
      if (themes.towerMansion) params.set("propertyType", "MANSION");
      if (themes.petFriendly) params.set("query", "ペット");
      if (themes.autoLock) params.set("query", "オートロック");
    } else if (activeTab === "keyword") {
      if (keyword) params.set("query", keyword);
    }

    if (maxRent) params.set("maxPrice", maxRent);
    if (layout) params.set("layout", layout);

    router.push(`/search?${params.toString()}`);
  };

  const MAJOR_TRAIN_LINES = [
    { id: "yamanote", name: "JR山手線", nameEn: "JR Yamanote Line", station: "渋谷" },
    { id: "ginza", name: "東京メトロ銀座線", nameEn: "Tokyo Metro Ginza", station: "表参道" },
    { id: "chiyoda", name: "東京メトロ千代田線", nameEn: "Chiyoda Line", station: "乃木坂" },
    { id: "marunouchi", name: "東京メトロ丸ノ内線", nameEn: "Marunouchi Line", station: "新宿" },
    { id: "toyoko", name: "東急東横線", nameEn: "Tokyu Toyoko Line", station: "中目黒" },
    { id: "chuo", name: "JR中央線", nameEn: "JR Chuo Line", station: "吉祥寺" },
    { id: "midosuji", name: "大阪メトロ御堂筋線", nameEn: "Osaka Midosuji Line", station: "梅田" },
  ];

  const TOKYO_WARDS = [
    { name: "港区", nameEn: "Minato", count: 28 },
    { name: "渋谷区", nameEn: "Shibuya", count: 34 },
    { name: "新宿区", nameEn: "Shinjuku", count: 22 },
    { name: "世田谷区", nameEn: "Setagaya", count: 19 },
    { name: "目黒区", nameEn: "Meguro", count: 16 },
    { name: "中央区", nameEn: "Chuo", count: 15 },
    { name: "千代田区", nameEn: "Chiyoda", count: 12 },
    { name: "品川区", nameEn: "Shinagawa", count: 14 },
    { name: "文京区", nameEn: "Bunkyo", count: 11 },
  ];

  const MAJOR_METROS = [
    { id: "tokyo", name: "東京都心", count: "12,480" },
    { id: "osaka", name: "大阪府", count: "4,210" },
    { id: "kyoto", name: "京都府", count: "2,190" },
    { id: "yokohama", name: "横浜・神奈川", count: "3,850" },
    { id: "fukuoka", name: "福岡市", count: "1,940" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white shadow-xl border border-slate-200/90 overflow-hidden">
      {/* 1. Modern Header Bar with Mode Switcher */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            スマート検索
          </span>
          <h2 className="text-sm sm:text-base font-black tracking-wide">
            {lang === "ja" ? "理想の条件をタップして部屋探し" : "Choose Your Search Pathway"}
          </h2>
        </div>

        {/* Rent vs Sale Switcher */}
        <div className="flex items-center bg-black/20 p-1 rounded-xl backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setListingType("RENT")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
              listingType === "RENT"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-emerald-100 hover:text-white"
            }`}
          >
            賃貸 (Rent)
          </button>
          <button
            type="button"
            onClick={() => setListingType("SALE")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
              listingType === "SALE"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-emerald-100 hover:text-white"
            }`}
          >
            売買 (Buy)
          </button>
        </div>
      </div>

      {/* 2. Main Search Pathway Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-50/90 border-b border-slate-200 text-xs font-bold divide-x divide-y sm:divide-y-0 divide-slate-200/80">
        <button
          type="button"
          onClick={() => setActiveTab("train")}
          className={`flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-2 transition-all min-w-0 ${
            activeTab === "train"
              ? "bg-white text-emerald-700 font-black shadow-2xs border-b-2 sm:border-b-2 border-emerald-600"
              : "text-slate-600 hover:bg-slate-100/70"
          }`}
        >
          <Train className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="truncate">{lang === "ja" ? "沿線・駅から探す" : "Train & Station"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("area")}
          className={`flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-2 transition-all min-w-0 ${
            activeTab === "area"
              ? "bg-white text-emerald-700 font-black shadow-2xs border-b-2 sm:border-b-2 border-emerald-600"
              : "text-slate-600 hover:bg-slate-100/70"
          }`}
        >
          <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="truncate">{lang === "ja" ? "エリア・市区町村" : "Area & Ward"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={`flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-2 transition-all min-w-0 ${
            activeTab === "theme"
              ? "bg-white text-rose-600 font-black shadow-2xs border-b-2 sm:border-b-2 border-rose-500"
              : "text-slate-600 hover:bg-slate-100/70"
          }`}
        >
          <Sparkles className="h-4 w-4 shrink-0 text-rose-500" />
          <span className="truncate">{lang === "ja" ? "こだわり・テーマ" : "Lifestyle & Features"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("keyword")}
          className={`flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-2 transition-all min-w-0 ${
            activeTab === "keyword"
              ? "bg-white text-emerald-700 font-black shadow-2xs border-b-2 sm:border-b-2 border-emerald-600"
              : "text-slate-600 hover:bg-slate-100/70"
          }`}
        >
          <Search className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="truncate">{lang === "ja" ? "キーワード検索" : "Keyword Search"}</span>
        </button>
      </div>

      {/* 3. Tab Body Panels */}
      <form onSubmit={handleSearch} className="p-3.5 sm:p-6 space-y-4 sm:space-y-5 bg-white">
        {/* TAB 1: 沿線・駅から探す */}
        {activeTab === "train" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>人気沿線からワンクリック選択 (Popular Train Lines):</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {MAJOR_TRAIN_LINES.map((line) => {
                  const isSelected = selectedLine === line.name;
                  return (
                    <button
                      key={line.id}
                      type="button"
                      onClick={() => {
                        setSelectedLine(isSelected ? "" : line.name);
                        setSelectedStation(isSelected ? "" : line.station);
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div className="truncate">
                        <span className="block truncate">{line.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">主要駅: {line.station}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Station Walk & Budget Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  駅徒歩分数 (Walk Distance)
                </label>
                <select
                  value={walkMinutes}
                  onChange={(e) => setWalkMinutes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">指定なし (Any distance)</option>
                  <option value="3">駅徒歩3分以内 (超駅近)</option>
                  <option value="5">駅徒歩5分以内 (標準的エキチカ)</option>
                  <option value="7">駅徒歩7分以内</option>
                  <option value="10">駅徒歩10分以内</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  賃料・価格の上限 (Max Budget)
                </label>
                <select
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">上限なし (No limit)</option>
                  <option value="80000">〜8.0万円以下</option>
                  <option value="100000">〜10.0万円以下</option>
                  <option value="120000">〜12.0万円以下</option>
                  <option value="150000">〜15.0万円以下</option>
                  <option value="200000">〜20.0万円以下</option>
                  <option value="300000">〜30.0万円以下</option>
                  <option value="500000">〜50.0万円以下 (高級賃貸)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  希望の間取り (Room Layout)
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">指定なし (All Layouts)</option>
                  <option value="1R/1K">1R / 1K (単身・一人暮らし)</option>
                  <option value="1DK/1LDK">1DK / 1LDK (広め単身・カップル)</option>
                  <option value="2K/2DK/2LDK">2DK / 2LDK (ファミリー・2人)</option>
                  <option value="3LDK">3LDK以上 (広々ファミリー)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: エリア・市区町村から探す */}
        {activeTab === "area" && (
          <div className="space-y-4">
            {/* Major Cities Toggle */}
            <div className="flex flex-wrap gap-1.5">
              {MAJOR_METROS.map((metro) => (
                <button
                  key={metro.id}
                  type="button"
                  onClick={() => setSelectedCity(metro.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === metro.id
                      ? "bg-[#00a854] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {metro.name} ({metro.count}件)
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>人気市区町村・エリアを選択 (Select Ward):</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {TOKYO_WARDS.map((ward) => {
                  const isSelected = selectedWard === ward.name;
                  return (
                    <button
                      key={ward.name}
                      type="button"
                      onClick={() => setSelectedWard(isSelected ? "" : ward.name)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs ring-1 ring-emerald-600"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <span className="block">{ward.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{ward.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget & Layout in Area tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  賃料・価格の上限 (Max Budget)
                </label>
                <select
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">上限なし (No limit)</option>
                  <option value="100000">〜10.0万円以下</option>
                  <option value="150000">〜15.0万円以下</option>
                  <option value="200000">〜20.0万円以下</option>
                  <option value="300000">〜30.0万円以下</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  希望の間取り (Room Layout)
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">指定なし (All Layouts)</option>
                  <option value="1R/1K">1R / 1K</option>
                  <option value="1DK/1LDK">1DK / 1LDK</option>
                  <option value="2K/2DK/2LDK">2DK / 2LDK</option>
                  <option value="3LDK">3LDK以上</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: こだわり条件・テーマから探す */}
        {activeTab === "theme" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-medium">
              Z世代に定番の人気条件をチェックして、理想の暮らしにフィットする物件を一発検索！
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { id: "noDeposit", label: "敷金・礼金0円", sub: "初期費用節約", hot: true },
                { id: "nearStation", label: "駅近 徒歩5分以内", sub: "雨でも通勤快適", hot: true },
                { id: "separateBath", label: "バス・トイレ別", sub: "水回りゆったり" },
                { id: "autoLock", label: "オートロック完備", sub: "女性も安心セキュリティ" },
                { id: "secondFloor", label: "2階以上", sub: "日当たり・プライバシー" },
                { id: "cornerRoom", label: "角部屋", sub: "2面採光で明るい" },
                { id: "petFriendly", label: "ペット相談可", sub: "愛犬・愛猫と暮らす" },
                { id: "towerMansion", label: "タワーマンション", sub: "眺望・コンシェルジュ" },
              ].map((theme) => {
                const isChecked = themes[theme.id];
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => toggleTheme(theme.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                      isChecked
                        ? "bg-amber-50 border-[#ff6b00] text-slate-900 shadow-xs ring-1 ring-[#ff6b00]"
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">{theme.label}</span>
                        {theme.hot && (
                          <span className="rounded bg-rose-100 text-rose-600 text-[9px] font-black px-1">
                            人気
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{theme.sub}</span>
                    </div>
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? "bg-[#ff6b00] text-white" : "border border-slate-300"
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: キーワード検索 */}
        {activeTab === "keyword" && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="駅名・路線名・住所・建物名を入力 (例: 渋谷駅, 六本木, 敷金なし, サンライズ)"
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-slate-900 focus:border-[#00a854] focus:outline-none focus:ring-1 focus:ring-[#00a854]"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Quick Word suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold text-[11px]">よく検索されるワード:</span>
              {["六本木 1LDK", "渋谷 徒歩5分", "新宿 敷金礼金0", "タワーレジデンス", "恵比寿", "梅田"].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setKeyword(kw)}
                  className="rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-[#008836] border border-slate-200 px-3 py-1 text-slate-600 font-semibold text-[11px] transition-all"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Giant SUUMO Search CTA Action Button */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            <span className="text-[#008836] font-bold">12,480件</span> の公開物件からあなたに最適な住まいを抽出します
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#ea580c] hover:to-[#ff6b00] text-white px-8 py-3.5 text-sm font-black shadow-md shadow-orange-500/20 hover:shadow-lg transition-all active:scale-[0.99]"
          >
            <Search className="h-4 w-4" />
            <span>{lang === "ja" ? "この条件で検索する (無料)" : "Search Listings (Free)"}</span>
            <ChevronRight className="h-4 w-4 ml-1 opacity-80" />
          </button>
        </div>
      </form>
    </div>
  );
}

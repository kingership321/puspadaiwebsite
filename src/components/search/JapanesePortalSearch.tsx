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
    { id: "yamanote", name: "JR山手線", nameEn: "JR Yamanote Line", station: "渋谷", stationEn: "Shibuya" },
    { id: "ginza", name: "東京メトロ銀座線", nameEn: "Tokyo Metro Ginza Line", station: "表参道", stationEn: "Omotesando" },
    { id: "chiyoda", name: "東京メトロ千代田線", nameEn: "Tokyo Metro Chiyoda Line", station: "乃木坂", stationEn: "Nogizaka" },
    { id: "marunouchi", name: "東京メトロ丸ノ内線", nameEn: "Tokyo Metro Marunouchi Line", station: "新宿", stationEn: "Shinjuku" },
    { id: "toyoko", name: "東急東横線", nameEn: "Tokyu Toyoko Line", station: "中目黒", stationEn: "Nakameguro" },
    { id: "chuo", name: "JR中央線", nameEn: "JR Chuo Line", station: "吉祥寺", stationEn: "Kichijoji" },
    { id: "midosuji", name: "大阪メトロ御堂筋線", nameEn: "Osaka Metro Midosuji Line", station: "梅田", stationEn: "Umeda" },
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
    { id: "tokyo", nameJa: "東京都心", nameEn: "Tokyo Central", count: "12,480" },
    { id: "osaka", nameJa: "大阪府", nameEn: "Osaka", count: "4,210" },
    { id: "kyoto", nameJa: "京都府", nameEn: "Kyoto", count: "2,190" },
    { id: "yokohama", nameJa: "横浜・神奈川", nameEn: "Yokohama", count: "3,850" },
    { id: "fukuoka", nameJa: "福岡市", nameEn: "Fukuoka", count: "1,940" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white shadow-xl border border-slate-200/90 overflow-hidden">
      {/* 1. Modern Header Bar with Mode Switcher */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            {lang === "ja" ? "スマート検索" : "Smart Search"}
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
            {lang === "ja" ? "賃貸 (Rent)" : "Rent"}
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
            {lang === "ja" ? "売買 (Buy)" : "Buy"}
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
                <span>
                  {lang === "ja"
                    ? "人気沿線からワンクリック選択 (Popular Train Lines):"
                    : "Select Transit Line (1-Click Select):"}
                </span>
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
                        <span className="block truncate">{lang === "ja" ? line.name : line.nameEn}</span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {lang === "ja" ? `主要駅: ${line.station}` : `Key Station: ${line.stationEn || line.station}`}
                        </span>
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
                  {lang === "ja" ? "駅徒歩分数 (Walk Distance)" : "Walk Distance to Station"}
                </label>
                <select
                  value={walkMinutes}
                  onChange={(e) => setWalkMinutes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">{lang === "ja" ? "指定なし (Any distance)" : "Any distance"}</option>
                  <option value="3">{lang === "ja" ? "駅徒歩3分以内 (超駅近)" : "Under 3 mins walk"}</option>
                  <option value="5">{lang === "ja" ? "駅徒歩5分以内 (標準的エキチカ)" : "Under 5 mins walk"}</option>
                  <option value="7">{lang === "ja" ? "駅徒歩7分以内" : "Under 7 mins walk"}</option>
                  <option value="10">{lang === "ja" ? "駅徒歩10分以内" : "Under 10 mins walk"}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "ja" ? "賃料・価格の上限 (Max Budget)" : "Max Monthly Rent"}
                </label>
                <select
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">{lang === "ja" ? "上限なし (No limit)" : "No limit"}</option>
                  <option value="80000">{lang === "ja" ? "〜8.0万円以下" : "Up to ¥80,000 / mo"}</option>
                  <option value="100000">{lang === "ja" ? "〜10.0万円以下" : "Up to ¥100,000 / mo"}</option>
                  <option value="120000">{lang === "ja" ? "〜12.0万円以下" : "Up to ¥120,000 / mo"}</option>
                  <option value="150000">{lang === "ja" ? "〜15.0万円以下" : "Up to ¥150,000 / mo"}</option>
                  <option value="200000">{lang === "ja" ? "〜20.0万円以下" : "Up to ¥200,000 / mo"}</option>
                  <option value="300000">{lang === "ja" ? "〜30.0万円以下" : "Up to ¥300,000 / mo"}</option>
                  <option value="500000">{lang === "ja" ? "〜50.0万円以下 (高級賃貸)" : "Up to ¥500,000 (Luxury)"}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "ja" ? "希望の間取り (Room Layout)" : "Desired Room Layout"}
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#00a854] focus:outline-none"
                >
                  <option value="">{lang === "ja" ? "指定なし (All Layouts)" : "All Layouts"}</option>
                  <option value="1R/1K">{lang === "ja" ? "1R / 1K (単身・一人暮らし)" : "1R / 1K (Studio / Single)"}</option>
                  <option value="1DK/1LDK">{lang === "ja" ? "1DK / 1LDK (広め単身・カップル)" : "1DK / 1LDK (Spacious / Couple)"}</option>
                  <option value="2K/2DK/2LDK">{lang === "ja" ? "2K / 2DK / 2LDK (ファミリー・2人)" : "2K / 2DK / 2LDK (Family / 2-Person)"}</option>
                  <option value="3LDK">{lang === "ja" ? "3LDK以上 (広々ファミリー)" : "3LDK+ (Family)"}</option>
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
                  {lang === "ja" ? metro.nameJa : metro.nameEn} ({metro.count})
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>
                  {lang === "ja"
                    ? "人気市区町村・エリアを選択 (Select Ward):"
                    : "Select Ward / District:"}
                </span>
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
                      <span className="block">{lang === "ja" ? ward.name : ward.nameEn}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {lang === "ja" ? ward.nameEn : ward.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget & Layout in Area tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "ja" ? "賃料・価格の上限 (Max Budget)" : "Max Monthly Rent"}
                </label>
                <select
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">{lang === "ja" ? "上限なし (No limit)" : "No limit"}</option>
                  <option value="100000">{lang === "ja" ? "〜10.0万円以下" : "Up to ¥100,000 / mo"}</option>
                  <option value="150000">{lang === "ja" ? "〜15.0万円以下" : "Up to ¥150,000 / mo"}</option>
                  <option value="200000">{lang === "ja" ? "〜20.0万円以下" : "Up to ¥200,000 / mo"}</option>
                  <option value="300000">{lang === "ja" ? "〜30.0万円以下" : "Up to ¥300,000 / mo"}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "ja" ? "希望の間取り (Room Layout)" : "Desired Room Layout"}
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">{lang === "ja" ? "指定なし (All Layouts)" : "All Layouts"}</option>
                  <option value="1R/1K">1R / 1K</option>
                  <option value="1DK/1LDK">1DK / 1LDK</option>
                  <option value="2K/2DK/2LDK">2DK / 2LDK</option>
                  <option value="3LDK">{lang === "ja" ? "3LDK以上" : "3LDK+"}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: こだわり条件・テーマから探す */}
        {activeTab === "theme" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-medium">
              {lang === "ja"
                ? "Z世代に定番の人気条件をチェックして、理想の暮らしにフィットする物件を一発検索！"
                : "Check your favorite amenities & lifestyle preferences to find homes matching your vibe!"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  id: "noDeposit",
                  labelJa: "敷金・礼金0円",
                  labelEn: "0 Deposit & Key Money",
                  subJa: "初期費用節約",
                  subEn: "Save move-in fees",
                  hot: true,
                },
                {
                  id: "nearStation",
                  labelJa: "駅近 徒歩5分以内",
                  labelEn: "Station Walk ≤5 min",
                  subJa: "雨でも通勤快適",
                  subEn: "Effortless commute",
                  hot: true,
                },
                {
                  id: "separateBath",
                  labelJa: "バス・トイレ別",
                  labelEn: "Separate Bath / Toilet",
                  subJa: "水回りゆったり",
                  subEn: "Relaxing spacious layout",
                },
                {
                  id: "autoLock",
                  labelJa: "オートロック完備",
                  labelEn: "Auto-Lock Security",
                  subJa: "女性も安心セキュリティ",
                  subEn: "Protected building access",
                },
                {
                  id: "secondFloor",
                  labelJa: "2階以上",
                  labelEn: "2nd Floor or Above",
                  subJa: "日当たり・プライバシー",
                  subEn: "Great light & privacy",
                },
                {
                  id: "cornerRoom",
                  labelJa: "角部屋",
                  labelEn: "Corner Unit",
                  subJa: "2面採光で明るい",
                  subEn: "Dual-aspect windows",
                },
                {
                  id: "petFriendly",
                  labelJa: "ペット相談可",
                  labelEn: "Pet Friendly",
                  subJa: "愛犬・愛猫と暮らす",
                  subEn: "Live with your pet",
                },
                {
                  id: "towerMansion",
                  labelJa: "タワーマンション",
                  labelEn: "High-Rise Tower",
                  subJa: "眺望・コンシェルジュ",
                  subEn: "Stunning skyline views",
                },
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
                        <span className="text-xs font-bold">
                          {lang === "ja" ? theme.labelJa : theme.labelEn}
                        </span>
                        {theme.hot && (
                          <span className="rounded bg-rose-100 text-rose-600 text-[9px] font-black px-1">
                            {lang === "ja" ? "人気" : "HOT"}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {lang === "ja" ? theme.subJa : theme.subEn}
                      </span>
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
                placeholder={
                  lang === "ja"
                    ? "駅名・路線名・住所・建物名を入力 (例: 渋谷駅, 六本木, 敷金なし, サンライズ)"
                    : "Enter station, line, ward, or keywords (e.g. Shibuya, Roppongi, Zero Deposit, Tower)"
                }
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-slate-900 focus:border-[#00a854] focus:outline-none focus:ring-1 focus:ring-[#00a854]"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Quick Word suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold text-[11px]">
                {lang === "ja" ? "よく検索されるワード:" : "Popular Keywords:"}
              </span>
              {(lang === "ja"
                ? ["六本木 1LDK", "渋谷 徒歩5分", "新宿 敷金礼金0", "タワーレジデンス", "恵比寿", "梅田"]
                : ["Roppongi 1LDK", "Shibuya 5-min walk", "Shinjuku Zero Deposit", "Tower Residence", "Ebisu", "Umeda"]
              ).map((kw) => (
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
            {lang === "ja" ? (
              <>
                <span className="text-[#008836] font-bold">12,480件</span> の公開物件からあなたに最適な住まいを抽出します
              </>
            ) : (
              <>
                Filtering through <span className="text-[#008836] font-bold">12,480 verified listings</span> for your ideal home
              </>
            )}
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

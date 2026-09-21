"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface MoodCategory {
  titleJa: string;
  titleEn: string;
  tagJa: string;
  tagEn: string;
  subtitleJa: string;
  subtitleEn: string;
  href: string;
  badgeJa: string;
  badgeEn: string;
  imageUrl: string;
  gradient: string;
}

const MOODS: MoodCategory[] = [
  {
    titleJa: "ホテルライクな暮らし",
    titleEn: "Hotel-Style Luxury Living",
    tagJa: "#ホテルライク #洗練ミニマル",
    tagEn: "#HotelLike #MinimalistChic",
    subtitleJa: "美しい水回りと無駄のない上質空間で、毎日が特別に。",
    subtitleEn: "Pristine vanity suites and sleek architecture making every day feel luxurious.",
    href: "/search?propertyType=MANSION",
    badgeJa: "人気急上昇",
    badgeEn: "Trending",
    imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&auto=format&fit=crop&q=80",
    gradient: "from-slate-950/80 via-slate-900/40 to-transparent",
  },
  {
    titleJa: "おうちカフェ＆淡色インテリア",
    titleEn: "Home Café & Soft Tone Decor",
    tagJa: "#淡色インテリア #無垢ウッド",
    tagEn: "#WarmWood #CafeAesthetic",
    subtitleJa: "やわらかな自然光とウッド調の床。休日のコーヒーが至福の時間に。",
    subtitleEn: "Sun-drenched spaces and natural wood flooring for cozy morning pour-overs.",
    href: "/search?query=日当たり",
    badgeJa: "女子に人気",
    badgeEn: "Top Pick",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80",
    gradient: "from-amber-950/80 via-amber-900/30 to-transparent",
  },
  {
    titleJa: "推し活＆シアタールーム",
    titleEn: "Fandom & Home Theater Haven",
    tagJa: "#推し活 #プロジェクター白壁",
    tagEn: "#HomeTheater #ProjectorWall",
    subtitleJa: "広い白壁に大画面投影！グッズを飾れるスペースも確保。",
    subtitleEn: "Generous white projection walls and display niches for your favorite collectibles.",
    href: "/search?layout=1DK/1LDK",
    badgeJa: "Z世代注目",
    badgeEn: "Gen-Z Hit",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    gradient: "from-purple-950/80 via-purple-900/30 to-transparent",
  },
  {
    titleJa: "敷金・礼金0円で賢くスタート",
    titleEn: "Smart Start: Zero Deposit & Key Money",
    tagJa: "#敷礼0 #初期費用節約",
    tagEn: "#ZeroDeposit #AffordableMoveIn",
    subtitleJa: "引っ越し費用を浮かせて、好きな家具や家電にお金をかけられる！",
    subtitleEn: "Save thousands on move-in costs and invest in the furniture and gadgets you love.",
    href: "/search?deposit=0&keyMoney=0",
    badgeJa: "コスパ最強",
    badgeEn: "Best Value",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80",
    gradient: "from-emerald-950/80 via-emerald-900/30 to-transparent",
  },
  {
    titleJa: "はじめてのふたり暮らし・同棲",
    titleEn: "First Couple Home & Cohabitation",
    tagJa: "#同棲カップル #1LDK #2LDK",
    tagEn: "#Couples #1LDK #2LDK",
    subtitleJa: "収納たっぷり・独立洗面台付き。2人の心地よい距離感を叶える間取り。",
    subtitleEn: "Ample storage and dual-basin potential with ideal layouts for comfortable togetherness.",
    href: "/search?layout=1DK/1LDK&minPrice=110000",
    badgeJa: "カップル定番",
    badgeEn: "Couple Classic",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    gradient: "from-rose-950/80 via-rose-900/30 to-transparent",
  },
  {
    titleJa: "ひとり暮らし女子の安心セキュリティ",
    titleEn: "High-Security Solo Living",
    tagJa: "#オートロック #2階以上 #駅近",
    tagEn: "#AutoLock #Floor2Plus #SafeArea",
    subtitleJa: "夜道も明るいエキチカ立地＆モニター付きインターホンで安心。",
    subtitleEn: "Well-lit station proximity, video intercoms, and secure building access.",
    href: "/search?walkMinutes=5&query=オートロック",
    badgeJa: "防犯重視",
    badgeEn: "High Security",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    gradient: "from-cyan-950/80 via-cyan-900/30 to-transparent",
  },
];

export function LifestyleMoodWall() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-0.5 text-xs font-black text-rose-600 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>{lang === "ja" ? "ライフスタイルから探す" : "Explore by Lifestyle"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === "ja"
              ? "気分や憧れのテーマで選ぶ、エモい暮らしのコレクション"
              : "Curated Lifestyle & Aesthetic Living Collections"}
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          {lang === "ja"
            ? "InstagramやRoomClipで話題のテイストから、直感でワンタップ！"
            : "Tap into trending Tokyo interior styles and vibes effortlessly."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOODS.map((mood, idx) => (
          <Link
            key={idx}
            href={mood.href}
            className="group relative h-64 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 block lifestyle-card"
          >
            <img
              src={mood.imageUrl}
              alt={lang === "ja" ? mood.titleJa : mood.titleEn}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient}`} />

            {/* Badge Top */}
            <div className="absolute top-3.5 left-3.5">
              <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                {lang === "ja" ? mood.badgeJa : mood.badgeEn}
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="text-[11px] font-bold text-amber-300 block">
                {lang === "ja" ? mood.tagJa : mood.tagEn}
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug text-white group-hover:text-amber-200 transition-colors">
                {lang === "ja" ? mood.titleJa : mood.titleEn}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {lang === "ja" ? mood.subtitleJa : mood.subtitleEn}
              </p>
              <div className="pt-1 flex items-center justify-end">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>{lang === "ja" ? "お部屋を見る" : "Explore Homes"}</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface AreaStory {
  id: string;
  nameJa: string;
  nameEn: string;
  subJa: string;
  subEn: string;
  tagJa: string;
  tagEn: string;
  query: string;
  imageUrl: string;
  vibeJa: string;
  vibeEn: string;
}

const YOUTH_AREAS: AreaStory[] = [
  {
    id: "shimokita",
    nameJa: "下北沢",
    nameEn: "Shimokitazawa",
    subJa: "古着・カフェ・劇場",
    subEn: "Vintage, Cafés, Indie",
    tagJa: "#カルチャーの街",
    tagEn: "#CultureHub",
    query: "下北沢",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop&q=80",
    vibeJa: "個性的なカフェやミニシアターが点在。エモい街歩きが好きな若者に大人気！",
    vibeEn: "Brimming with bohemian cafes, vintage boutiques, and indie theaters.",
  },
  {
    id: "nakameguro",
    nameJa: "中目黒",
    nameEn: "Nakameguro",
    subJa: "目黒川・洗練ショップ",
    subEn: "Canal Walk & Boutiques",
    tagJa: "#洗練デザイナーズ",
    tagEn: "#SleekLiving",
    query: "中目黒",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80",
    vibeJa: "桜並木とモダンな建築。渋谷・六本木へのアクセスも抜群の憧れエリア。",
    vibeEn: "Cherry blossom riverbanks, upscale design studios, and swift Shibuya access.",
  },
  {
    id: "koenji",
    nameJa: "高円寺",
    nameEn: "Koenji",
    subJa: "純情商店街・銭湯",
    subEn: "Shopping Arcade & Sento",
    tagJa: "#コスパ＆温もり",
    tagEn: "#FriendlyVibes",
    query: "高円寺",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
    vibeJa: "家賃相場もお手頃でレトロな銭湯や商店街が充実。初めてのひとり暮らしに◎",
    vibeEn: "Warm retro charm, affordable rents, and bustling community arcades.",
  },
  {
    id: "shibuya",
    nameJa: "渋谷・代官山",
    nameEn: "Shibuya",
    subJa: "トレンド発信地",
    subEn: "Heart of Tokyo Culture",
    tagJa: "#最先端アーバン",
    tagEn: "#UrbanPace",
    query: "渋谷",
    imageUrl: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&auto=format&fit=crop&q=80",
    vibeJa: "仕事もプライベートも24時間アクティブ。タワーレジデンスや高級賃貸が充実。",
    vibeEn: "Non-stop 24/7 energy with luxury high-rises and premier dining.",
  },
  {
    id: "kichijoji",
    nameJa: "吉祥寺",
    nameEn: "Kichijoji",
    subJa: "井の頭公園・ハモニカ",
    subEn: "Inokashira Park & Foodies",
    tagJa: "#住みたい街常連",
    tagEn: "#MostLovedCity",
    query: "吉祥寺",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&auto=format&fit=crop&q=80",
    vibeJa: "自然豊かな公園と活気ある商店街が共存。休日のピクニックが日課に。",
    vibeEn: "Lush greenery by the pond paired with iconic dining alleys.",
  },
  {
    id: "fukuoka",
    nameJa: "福岡・天神",
    nameEn: "Fukuoka",
    subJa: "グルメ・コンパクトシティ",
    subEn: "Gourmet Haven & Sea",
    tagJa: "#若者移住人気No.1",
    tagEn: "#RelocationHit",
    query: "天神",
    imageUrl: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=400&auto=format&fit=crop&q=80",
    vibeJa: "空港も海もすぐ近く。美味しくてコスパ最強の住まいが見つかる注目の都市。",
    vibeEn: "Coastline proximity, world-class cuisine, and stellar value apartments.",
  },
];

export function YouthAreaStories() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-full min-w-0 space-y-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs sm:text-base font-black text-slate-900 truncate">
            {lang === "ja" ? "20代がリアルに住みたい！注目の人気タウン STORIES" : "Trending Neighborhood Stories & Local Vibes"}
          </h3>
        </div>
        <span className="text-[11px] font-bold text-slate-400 shrink-0 hidden sm:inline">
          {lang === "ja" ? "横スクロールでチェック →" : "Scroll to explore →"}
        </span>
      </div>

      {/* Horizontal Story Reel */}
      <div
        className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto pb-2.5 pt-1 no-scrollbar scroll-smooth touch-pan-x w-full max-w-full"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {YOUTH_AREAS.map((area) => (
          <Link
            key={area.id}
            href={`/search?query=${encodeURIComponent(area.query)}`}
            className="group flex flex-col items-center shrink-0 text-center w-[72px] sm:w-24 transition-transform active:scale-95"
          >
            {/* Story Gradient Ring */}
            <div className="story-avatar-ring mb-1.5">
              <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-white bg-slate-100">
                <img
                  src={area.imageUrl}
                  alt={lang === "ja" ? area.nameJa : area.nameEn}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Name & Tag */}
            <span className="text-xs font-black text-slate-900 group-hover:text-rose-600 transition-colors truncate w-full">
              {lang === "ja" ? area.nameJa : area.nameEn}
            </span>
            <span className="text-[10px] text-slate-400 truncate w-full mt-0.5">
              {lang === "ja" ? area.tagJa : area.tagEn}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

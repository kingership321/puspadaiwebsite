"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart, Coffee, ShieldCheck, Flame, Tv, Users } from "lucide-react";

interface MoodCategory {
  title: string;
  tag: string;
  subtitle: string;
  href: string;
  badge: string;
  imageUrl: string;
  gradient: string;
}

const MOODS: MoodCategory[] = [
  {
    title: "ホテルライクな暮らし",
    tag: "#ホテルライク #洗練ミニマル",
    subtitle: "美しい水回りと無駄のない上質空間で、毎日が特別に。",
    href: "/search?propertyType=MANSION",
    badge: "人気急上昇",
    imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&auto=format&fit=crop&q=80",
    gradient: "from-slate-950/80 via-slate-900/40 to-transparent",
  },
  {
    title: "おうちカフェ＆淡色インテリア",
    tag: "#淡色インテリア #無垢ウッド",
    subtitle: "やわらかな自然光とウッド調の床。休日のコーヒーが至福の時間に。",
    href: "/search?query=日当たり",
    badge: "女子に人気",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80",
    gradient: "from-amber-950/80 via-amber-900/30 to-transparent",
  },
  {
    title: "推し活＆シアタールーム",
    tag: "#推し活 #プロジェクター白壁",
    subtitle: "広い白壁に大画面投影！グッズを飾れるスペースも確保。",
    href: "/search?layout=1DK/1LDK",
    badge: "Z世代注目",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    gradient: "from-purple-950/80 via-purple-900/30 to-transparent",
  },
  {
    title: "敷金・礼金0円で賢くスタート",
    tag: "#敷礼0 #初期費用節約",
    subtitle: "引っ越し費用を浮かせて、好きな家具や家電にお金をかけられる！",
    href: "/search?deposit=0&keyMoney=0",
    badge: "コスパ最強",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80",
    gradient: "from-emerald-950/80 via-emerald-900/30 to-transparent",
  },
  {
    title: "はじめてのふたり暮らし・同棲",
    tag: "#同棲カップル #1LDK #2LDK",
    subtitle: "収納たっぷり・独立洗面台付き。2人の心地よい距離感を叶える間取り。",
    href: "/search?layout=1DK/1LDK&minPrice=110000",
    badge: "カップル定番",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    gradient: "from-rose-950/80 via-rose-900/30 to-transparent",
  },
  {
    title: "ひとり暮らし女子の安心セキュリティ",
    tag: "#オートロック #2階以上 #駅近",
    subtitle: "夜道も明るいエキチカ立地＆モニター付きインターホンで安心。",
    href: "/search?walkMinutes=5&query=オートロック",
    badge: "防犯重視",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
    gradient: "from-cyan-950/80 via-cyan-900/30 to-transparent",
  },
];

export function LifestyleMoodWall() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-0.5 text-xs font-black text-rose-600 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>ライフスタイルから探す</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            気分や憧れのテーマで選ぶ、エモい暮らしのコレクション
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          InstagramやRoomClipで話題のテイストから、直感でワンタップ！
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
              alt={mood.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient}`} />

            {/* Badge Top */}
            <div className="absolute top-3.5 left-3.5">
              <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                {mood.badge}
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="text-[11px] font-bold text-amber-300 block">
                {mood.tag}
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug text-white group-hover:text-amber-200 transition-colors">
                {mood.title}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {mood.subtitle}
              </p>
              <div className="pt-1 flex items-center justify-end">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>お部屋を見る</span>
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

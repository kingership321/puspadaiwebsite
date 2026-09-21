"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Coffee, Music, Trees, ShoppingBag, Flame, MapPin } from "lucide-react";

interface AreaStory {
  id: string;
  name: string;
  sub: string;
  tag: string;
  query: string;
  imageUrl: string;
  vibe: string;
}

const YOUTH_AREAS: AreaStory[] = [
  {
    id: "shimokita",
    name: "下北沢",
    sub: "古着・カフェ・劇場",
    tag: "#カルチャーの街",
    query: "下北沢",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop&q=80",
    vibe: "個性的なカフェやミニシアターが点在。エモい街歩きが好きな若者に大人気！",
  },
  {
    id: "nakameguro",
    name: "中目黒",
    sub: "目黒川・洗練ショップ",
    tag: "#洗練デザイナーズ",
    query: "中目黒",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80",
    vibe: "桜並木とモダンな建築。渋谷・六本木へのアクセスも抜群の憧れエリア。",
  },
  {
    id: "koenji",
    name: "高円寺",
    sub: "純情商店街・銭湯",
    tag: "#コスパ＆温もり",
    query: "高円寺",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
    vibe: "家賃相場もお手頃でレトロな銭湯や商店街が充実。初めてのひとり暮らしに◎",
  },
  {
    id: "shibuya",
    name: "渋谷・代官山",
    sub: "トレンド発信地",
    tag: "#最先端アーバン",
    query: "渋谷",
    imageUrl: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&auto=format&fit=crop&q=80",
    vibe: "仕事もプライベートも24時間アクティブ。タワーレジデンスや高級賃貸が充実。",
  },
  {
    id: "kichijoji",
    name: "吉祥寺",
    sub: "井の頭公園・ハモニカ",
    tag: "#住みたい街常連",
    query: "吉祥寺",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&auto=format&fit=crop&q=80",
    vibe: "自然豊かな公園と活気ある商店街が共存。休日のピクニックが日課に。",
  },
  {
    id: "fukuoka",
    name: "福岡・天神大名",
    sub: "グルメ・コンパクトシティ",
    tag: "#若者移住人気No.1",
    query: "天神",
    imageUrl: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=400&auto=format&fit=crop&q=80",
    vibe: "空港も海もすぐ近く。美味しくてコスパ最強の住まいが見つかる注目の都市。",
  },
];

export function YouthAreaStories() {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            20代がリアルに住みたい！注目の人気タウン STORIES
          </h3>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          横スクロールでチェック →
        </span>
      </div>

      {/* Horizontal Story Reel */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {YOUTH_AREAS.map((area) => (
          <Link
            key={area.id}
            href={`/search?query=${encodeURIComponent(area.query)}`}
            className="group flex flex-col items-center shrink-0 text-center w-20 sm:w-24 transition-transform active:scale-95"
          >
            {/* Story Gradient Ring */}
            <div className="story-avatar-ring mb-1.5">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-white bg-slate-100">
                <img
                  src={area.imageUrl}
                  alt={area.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Name & Tag */}
            <span className="text-xs font-black text-slate-900 group-hover:text-rose-600 transition-colors truncate w-full">
              {area.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate w-full mt-0.5">
              {area.tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

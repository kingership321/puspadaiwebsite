"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface RealVoice {
  name: string;
  ageAreaJa: string;
  ageAreaEn: string;
  avatar: string;
  quoteJa: string;
  quoteEn: string;
  detailJa: string;
  detailEn: string;
  tagJa: string;
  tagEn: string;
  rating: number;
}

const VOICES: RealVoice[] = [
  {
    name: "M.Kさん",
    ageAreaJa: "23歳・IT企業勤務 / 渋谷区勤務・一人暮らし",
    ageAreaEn: "Age 23 · Tech · Shibuya Commute",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quoteJa: "「独立洗面台と宅配ボックスはガチで生活の質が上がりました！」",
    quoteEn: "“Having a separate vanity and parcel delivery locker truly leveled up my daily routine!”",
    detailJa: "初めての引っ越しで不安でしたが、LINEで深夜に質問してもすぐに丁寧な返信が。営業電話が一切かかってこないのが本当に快適でした。",
    detailEn: "I was anxious about my first Tokyo apartment, but fast LINE support answered every question without any pushy sales phone calls.",
    tagJa: "#初めてのひとり暮らし #LINE相談",
    tagEn: "#FirstSoloApt #FastSupport",
    rating: 5,
  },
  {
    name: "Y.Tさん",
    ageAreaJa: "26歳・アパレル勤務 / 世田谷区在住・カップル同棲",
    ageAreaEn: "Age 26 · Fashion · Setagaya Couple",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quoteJa: "「敷金礼金0円のおかげで、憧れのカフェ風家具を揃えられました」",
    quoteEn: "“Zero deposit and key money let us spend our budget on beautiful cafe-style furniture!”",
    detailJa: "初期費用シミュレーターのおかげで金額が事前に1円単位でクリアに。不要な消臭費用やサポート代の強制上乗せもなく、とても誠実です。",
    detailEn: "The move-in cost simulator broke down fees down to the yen. No compulsory deodorizing fees or surprise add-ons—truly honest service.",
    tagJa: "#敷金礼金0円 #同棲スタート",
    tagEn: "#ZeroDeposit #CoupleHome",
    rating: 5,
  },
  {
    name: "S.Nさん",
    ageAreaJa: "28歳・Webデザイナー / 中野区在住・フルリモート",
    ageAreaEn: "Age 28 · Designer · Nakano Remote",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    quoteJa: "「オンライン内見で来店ゼロ。遠方からの上京もスムーズでした！」",
    quoteEn: "“Completed the entire viewing process online without visiting the office once!”",
    detailJa: "関西から東京への転職で現地に行けなかったのですが、スマホ動画でコンセントの位置や日当たりまでしっかり確認できて即決できました。",
    detailEn: "Moving from Kansai to Tokyo made in-person visits hard, but high-res video walk-throughs showed sunlight and power outlets in detail.",
    tagJa: "#オンライン内見 #来店不要",
    tagEn: "#OnlineViewing #NoOfficeVisit",
    rating: 5,
  },
];

export function YouthRealVoices() {
  const { lang } = useLanguage();

  return (
    <div className="rounded-3xl bg-slate-50/80 border border-slate-200/80 p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-0.5 text-xs font-black text-rose-600 shadow-2xs">
          <MessageSquareQuote className="h-3.5 w-3.5" />
          <span>{lang === "ja" ? "先輩たちのリアルな声" : "Verified Tenant Reviews"}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {lang === "ja" ? "20代の一人暮らし・新生活体験談" : "Real Experiences: Solo Living in Japan"}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          {lang === "ja"
            ? "HavenSUUMOで理想のお部屋を見つけたユーザーのリアルな口コミをご紹介。"
            : "Hear directly from residents who discovered their perfect home with zero stress."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {VOICES.map((v, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(v.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>

              <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                {lang === "ja" ? v.quoteJa : v.quoteEn}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "ja" ? v.detailJa : v.detailEn}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={v.avatar}
                  alt={v.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {v.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {lang === "ja" ? v.ageAreaJa : v.ageAreaEn}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                {(lang === "ja" ? v.tagJa : v.tagEn).split(" ")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

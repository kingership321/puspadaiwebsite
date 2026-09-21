"use client";

import React from "react";
import { MessageSquareQuote, Star, ShieldCheck, Heart } from "lucide-react";

interface RealVoice {
  name: string;
  ageArea: string;
  avatar: string;
  quote: string;
  detail: string;
  tag: string;
  rating: number;
}

const VOICES: RealVoice[] = [
  {
    name: "M.Kさん",
    ageArea: "23歳・IT企業勤務 / 渋谷区勤務・一人暮らし",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quote: "「独立洗面台と宅配ボックスはガチで生活の質が上がりました！」",
    detail: "初めての引っ越しで不安でしたが、LINEで深夜に質問してもすぐに丁寧な返信が。営業電話が一切かかってこないのが本当に快適でした。",
    tag: "#初めてのひとり暮らし #LINE相談",
    rating: 5,
  },
  {
    name: "Y.Tさん",
    ageArea: "26歳・アパレル勤務 / 世田谷区在住・カップル同棲",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quote: "「敷金礼金0円のおかげで、憧れのカフェ風家具を揃えられました」",
    detail: "初期費用シミュレーターのおかげで金額が事前に1円単位でクリアに。不要な消臭費用やサポート代の強制上乗せもなく、とても誠実です。",
    tag: "#敷金礼金0円 #同棲スタート",
    rating: 5,
  },
  {
    name: "S.Nさん",
    ageArea: "28歳・Webデザイナー / 中野区在住・フルリモート",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    quote: "「オンライン内見で来店ゼロ。遠方からの上京もスムーズでした！」",
    detail: "関西から東京への転職で現地に行けなかったのですが、スマホ動画でコンセントの位置や日当たりまでしっかり確認できて即決できました。",
    tag: "#オンライン内見 #来店不要",
    rating: 5,
  },
];

export function YouthRealVoices() {
  return (
    <div className="rounded-3xl bg-slate-50/80 border border-slate-200/80 p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-0.5 text-xs font-black text-rose-600 shadow-2xs">
          <MessageSquareQuote className="h-3.5 w-3.5" />
          <span>先輩たちのリアルな声</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          20代の一人暮らし・新生活体験談
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          HavenSUUMOで理想のお部屋を見つけたユーザーのリアルな口コミをご紹介。
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
                {v.quote}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {v.detail}
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
                    {v.ageArea}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                {v.tag.split(" ")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

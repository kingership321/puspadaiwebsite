"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, RotateCcw, Heart, Coffee, Tv, Flame, Laptop, Compass, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Question {
  id: number;
  titleJa: string;
  titleEn: string;
  subtitleJa: string;
  subtitleEn: string;
  options: {
    id: string;
    labelJa: string;
    labelEn: string;
    sublabelJa: string;
    sublabelEn: string;
    icon: any;
    tagJa: string;
    tagEn: string;
    queryParam: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    titleJa: "Q1. お休みの日は、どんなふうに過ごしたい？",
    titleEn: "Q1. How do you love spending your days off?",
    subtitleJa: "あなたのライフスタイルのベースをチェック",
    subtitleEn: "Discover the foundation of your ideal living space",
    options: [
      {
        id: "homebody",
        labelJa: "おうちで映画・推し活・ゲーム",
        labelEn: "Movies, Gaming & Fandom at Home",
        sublabelJa: "居心地重視のくつろぎ空間",
        sublabelEn: "Cozy haven built for pure relaxation",
        icon: Tv,
        tagJa: "#推し活 #おうち時間",
        tagEn: "#CozyHome #FandomRoom",
        queryParam: "query=ペット",
      },
      {
        id: "cafe",
        labelJa: "カフェ巡り・古着・アート",
        labelEn: "Café Hopping, Vintage & Art",
        sublabelJa: "感性を刺激するおしゃれな街",
        sublabelEn: "Inspiring vibes in creative neighborhoods",
        icon: Coffee,
        tagJa: "#カフェ風 #デザイナーズ",
        tagEn: "#CafeVibes #DesignerApt",
        queryParam: "propertyType=MANSION",
      },
      {
        id: "work",
        labelJa: "在宅ワーク・自己投資に集中",
        labelEn: "Remote Work & Personal Growth",
        sublabelJa: "デスク環境＆静音性重視",
        sublabelEn: "Quiet focus zone with high-speed internet",
        icon: Laptop,
        tagJa: "#リモート最適 #ネット無料",
        tagEn: "#WorkFromHome #FreeWifi",
        queryParam: "walkMinutes=7",
      },
      {
        id: "active",
        labelJa: "サウナ・ジム・アクティブ",
        labelEn: "Sauna, Fitness & City Life",
        sublabelJa: "駅近でフットワーク軽く",
        sublabelEn: "Steps from station for quick commutes",
        icon: Flame,
        tagJa: "#駅チカ #フットワーク",
        tagEn: "#CloseToStation #ActiveLife",
        queryParam: "walkMinutes=5",
      },
    ],
  },
  {
    id: 2,
    titleJa: "Q2. 毎日の生活で「絶対に譲れない」設備は？",
    titleEn: "Q2. Which feature is an absolute must-have?",
    subtitleJa: "ストレスフリーな毎日のための最重要ポイント",
    subtitleEn: "The non-negotiables for a stress-free daily routine",
    options: [
      {
        id: "washbasin",
        labelJa: "独立洗面台",
        labelEn: "Separate Vanity / Washbasin",
        sublabelJa: "朝のヘアメイクも快適スムーズ",
        sublabelEn: "Effortless morning grooming & skincare",
        icon: Sparkles,
        tagJa: "#独立洗面台",
        tagEn: "#SeparateVanity",
        queryParam: "query=洗面台",
      },
      {
        id: "autolock",
        labelJa: "オートロック＆2階以上",
        labelEn: "Auto-Lock & 2nd Floor+",
        sublabelJa: "夜遅くの帰宅も安心セキュリティ",
        sublabelEn: "Peace-of-mind security for late arrivals",
        icon: ShieldCheck,
        tagJa: "#オートロック #女性安心",
        tagEn: "#AutoLock #SafeLiving",
        queryParam: "query=オートロック",
      },
      {
        id: "zero",
        labelJa: "敷金0円・礼金0円",
        labelEn: "Zero Deposit & Key Money",
        sublabelJa: "初期費用をグッと抑えたい",
        sublabelEn: "Keep upfront move-in costs as low as possible",
        icon: Heart,
        tagJa: "#敷礼ゼロ #初期費用安め",
        tagEn: "#ZeroDeposit #LowMoveInCost",
        queryParam: "deposit=0&keyMoney=0",
      },
      {
        id: "walk5",
        labelJa: "駅徒歩5分以内",
        labelEn: "Within 5-Min Walk to Station",
        sublabelJa: "雨の日も寝坊した朝も安心",
        sublabelEn: "No umbrella needed, hassle-free commute",
        icon: Compass,
        tagJa: "#駅徒歩5分 #エキチカ",
        tagEn: "#5MinWalk #StationClose",
        queryParam: "walkMinutes=5",
      },
    ],
  },
];

interface ArchetypeData {
  titleJa: string;
  titleEn: string;
  badgeJa: string;
  badgeEn: string;
  descJa: string;
  descEn: string;
  link: string;
  tagsJa: string[];
  tagsEn: string[];
}

const ARCHETYPES: Record<string, ArchetypeData> = {
  default: {
    titleJa: "ナチュラル＆居心地重視派",
    titleEn: "Natural & Warm Cozy Living",
    badgeJa: "癒やしの暮らし",
    badgeEn: "Soothing Lifestyle",
    descJa: "陽当たり良好で木の温もりを感じるお部屋がベストマッチ。淡色インテリアや間接照明が映える空間で、毎日をごきげんに過ごせます。",
    descEn: "Sun-drenched spaces with warm wood floors. Designed to complement minimal pastel decor and ambient lighting for relaxing days.",
    link: "/search?deposit=0&keyMoney=0",
    tagsJa: ["#敷礼ゼロ", "#淡色インテリア", "#独立洗面台", "#日当たり良好"],
    tagsEn: ["#ZeroDeposit", "#MinimalWood", "#SeparateVanity", "#SunnyExposure"],
  },
  homebody: {
    titleJa: "おこもり推し活＆リラックスタイプ",
    titleEn: "Fandom & Cozy Theater Room",
    badgeJa: "推し活＆シアター",
    badgeEn: "Entertainment & Chill",
    descJa: "白壁プロジェクターが映える広めワンルームや1LDKがおすすめ。Wi-Fi無料で動画配信もサクサク、居心地満点のプライベート空間！",
    descEn: "Spacious 1R or 1LDK with large white walls for home projectors. Free high-speed Wi-Fi and soundproofing make it the ultimate private escape.",
    link: "/search?deposit=0&keyMoney=0&layout=1DK/1LDK",
    tagsJa: ["#推し活ルーム", "#ネット無料", "#バストイレ別", "#防音性"],
    tagsEn: ["#TheaterRoom", "#FreeWifi", "#SeparateBathToilet", "#Soundproof"],
  },
  cafe: {
    titleJa: "カフェ風リノベ＆デザイナーズタイプ",
    titleEn: "Artistic Loft & Designer Renovation",
    badgeJa: "洗練デザイン",
    badgeEn: "Curated Design",
    descJa: "コンクリート打ちっぱなしやアイアン素材、無垢フローリングが好きなあなたへ。下北沢・中目黒・蔵前などのカルチャー街がぴったりです。",
    descEn: "Exposed concrete, iron accents, and solid wood floors. Perfect match for vibrant cultural neighborhoods like Shimokitazawa, Nakameguro, and Kuramae.",
    link: "/search?propertyType=MANSION&walkMinutes=7",
    tagsJa: ["#デザイナーズ", "#リノベーション", "#カフェが近い街", "#おしゃれ"],
    tagsEn: ["#DesignerApt", "#Renovated", "#CafeDistrict", "#StylishLiving"],
  },
  work: {
    titleJa: "タイパ最強！スマートリモートワークタイプ",
    titleEn: "High-Efficiency Smart Remote Worker",
    badgeJa: "スマート生活",
    badgeEn: "Smart Productivity",
    descJa: "デスクとベッドのゾーニングがしやすい1LDKや、高速ネット完備の駅近物件が最適。オンオフの切り替えがスムーズな住環境をご提案！",
    descEn: "A 1LDK with clear work/rest separation, high-speed fiber internet, and parcel delivery boxes. Ideal for seamless productivity and balance.",
    link: "/search?walkMinutes=5&layout=1DK/1LDK",
    tagsJa: ["#リモート部屋", "#宅配ボックス", "#独立洗面台", "#駅徒歩5分"],
    tagsEn: ["#HomeOffice", "#DeliveryBox", "#SeparateVanity", "#5MinWalk"],
  },
  active: {
    titleJa: "エキチカ＆身軽フットワークタイプ",
    titleEn: "Fast-Paced Urban Footwork",
    badgeJa: "駅近アクティブ",
    badgeEn: "Station Close & Active",
    descJa: "主要駅まで徒歩5分以内、周辺にサウナや飲食店が充実した好立地。敷金礼金ゼロで初期費用もスマートに抑えて身軽に新生活スタート！",
    descEn: "Under 5 minutes walk from key transit hubs, surrounded by gyms, saunas, and dining. Zero deposit makes launching your new life agile and affordable.",
    link: "/search?deposit=0&keyMoney=0&walkMinutes=5",
    tagsJa: ["#駅徒歩3〜5分", "#敷金礼金0円", "#24hゴミ出し可", "#コンビニ近"],
    tagsEn: ["#3to5MinWalk", "#ZeroDepositKeyMoney", "#24hTrash", "#NearConvenience"],
  },
};

export function LifestyleQuiz() {
  const { lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (optionId: string) => {
    const nextAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
  };

  const matchedArchetype = answers[0] ? ARCHETYPES[answers[0]] || ARCHETYPES.default : ARCHETYPES.default;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-amber-50/70 via-rose-50/30 to-emerald-50/50 p-4 sm:p-8 border border-slate-200/90 shadow-sm">
      <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
        {/* Quiz Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-black text-rose-500 shadow-2xs border border-rose-100">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>{lang === "ja" ? "30秒でわかる！タイプ診断" : "30-Second Match Quiz"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === "ja" ? "あなたにぴったりの暮らし方・お部屋診断" : "Find Your Ideal Lifestyle & Living Style"}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {lang === "ja"
              ? "直感でタップするだけ！Z世代に人気のこだわり条件から、理想のマッチングをご提案。"
              : "Tap intuitively! We recommend the best listings and neighborhoods based on your daily vibes."}
          </p>
        </div>

        {/* Progress Bar */}
        {!completed && (
          <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Question View */}
        {!completed ? (
          <div className="space-y-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-rose-600 block mb-0.5">
                STEP {currentStep + 1} / {QUESTIONS.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === "ja" ? QUESTIONS[currentStep].titleJa : QUESTIONS[currentStep].titleEn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === "ja" ? QUESTIONS[currentStep].subtitleJa : QUESTIONS[currentStep].subtitleEn}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {QUESTIONS[currentStep].options.map((opt) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className="group text-left p-4 rounded-2xl bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-400 shadow-2xs hover:shadow-md transition-all duration-200 flex items-start gap-3.5 active:scale-[0.98]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-rose-100 text-slate-700 group-hover:text-rose-600 transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors block">
                        {lang === "ja" ? opt.labelJa : opt.labelEn}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {lang === "ja" ? opt.sublabelJa : opt.sublabelEn}
                      </span>
                      <span className="inline-block text-[10px] font-bold text-rose-500/80 bg-rose-50 px-2 py-0.5 rounded-md mt-2">
                        {lang === "ja" ? opt.tagJa : opt.tagEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="rounded-2xl bg-white p-6 sm:p-8 border border-rose-200/80 shadow-md space-y-5 animate-fade-in text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-0.5 rounded-full mb-1.5">
                  {lang === "ja" ? matchedArchetype.badgeJa : matchedArchetype.badgeEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === "ja" ? matchedArchetype.titleJa : matchedArchetype.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{lang === "ja" ? "もう一度診断する" : "Retake Quiz"}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {lang === "ja" ? matchedArchetype.descJa : matchedArchetype.descEn}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {(lang === "ja" ? matchedArchetype.tagsJa : matchedArchetype.tagsEn).map((t, idx) => (
                <span key={idx} className="hashtag-pill active text-xs">
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <Link
                href={matchedArchetype.link}
                className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 py-3.5 text-sm font-black text-white shadow-md shadow-rose-500/25 transition-all hover:scale-[1.01]"
              >
                <span>{lang === "ja" ? "このタイプのおすすめ物件を見る" : "View Recommended Properties for This Type"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

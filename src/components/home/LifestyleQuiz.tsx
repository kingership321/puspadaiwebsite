"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, RotateCcw, Heart, Coffee, Tv, Flame, Laptop, Compass, ShieldCheck } from "lucide-react";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    sublabel: string;
    icon: any;
    tag: string;
    queryParam: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Q1. お休みの日は、どんなふうに過ごしたい？",
    subtitle: "あなたのライフスタイルのベースをチェック",
    options: [
      {
        id: "homebody",
        label: "おうちで映画・推し活・ゲーム",
        sublabel: "居心地重視のくつろぎ空間",
        icon: Tv,
        tag: "#推し活 #おうち時間",
        queryParam: "query=ペット",
      },
      {
        id: "cafe",
        label: "カフェ巡り・古着・アート",
        sublabel: "感性を刺激するおしゃれな街",
        icon: Coffee,
        tag: "#カフェ風 #デザイナーズ",
        queryParam: "propertyType=MANSION",
      },
      {
        id: "work",
        label: "在宅ワーク・自己投資に集中",
        sublabel: "デスク環境＆静音性重視",
        icon: Laptop,
        tag: "#リモート最適 #ネット無料",
        queryParam: "walkMinutes=7",
      },
      {
        id: "active",
        label: "サウナ・ジム・アクティブ",
        sublabel: "駅近でフットワーク軽く",
        icon: Flame,
        tag: "#駅チカ #フットワーク",
        queryParam: "walkMinutes=5",
      },
    ],
  },
  {
    id: 2,
    title: "Q2. 毎日の生活で「絶対に譲れない」設備は？",
    subtitle: "ストレスフリーな毎日のための最重要ポイント",
    options: [
      {
        id: "washbasin",
        label: "独立洗面台",
        sublabel: "朝のヘアメイクも快適スムーズ",
        icon: Sparkles,
        tag: "#独立洗面台",
        queryParam: "query=洗面台",
      },
      {
        id: "autolock",
        label: "オートロック＆2階以上",
        sublabel: "夜遅くの帰宅も安心セキュリティ",
        icon: ShieldCheck,
        tag: "#オートロック #女性安心",
        queryParam: "query=オートロック",
      },
      {
        id: "zero",
        label: "敷金0円・礼金0円",
        sublabel: "初期費用をグッと抑えたい",
        icon: Heart,
        tag: "#敷礼ゼロ #初期費用安め",
        queryParam: "deposit=0&keyMoney=0",
      },
      {
        id: "walk5",
        label: "駅徒歩5分以内",
        sublabel: "雨の日も寝坊した朝も安心",
        icon: Compass,
        tag: "#駅徒歩5分 #エキチカ",
        queryParam: "walkMinutes=5",
      },
    ],
  },
];

const ARCHETYPES: Record<string, { title: string; badge: string; desc: string; link: string; tags: string[] }> = {
  default: {
    title: "ナチュラル＆居心地重視派",
    badge: "癒やしの暮らし",
    desc: "陽当たり良好で木の温もりを感じるお部屋がベストマッチ。淡色インテリアや間接照明が映える空間で、毎日をごきげんに過ごせます。",
    link: "/search?deposit=0&keyMoney=0",
    tags: ["#敷礼ゼロ", "#淡色インテリア", "#独立洗面台", "#日当たり良好"],
  },
  homebody: {
    title: "おこもり推し活＆リラックスタイプ",
    badge: "推し活＆シアター",
    desc: "白壁プロジェクターが映える広めワンルームや1LDKがおすすめ。Wi-Fi無料で動画配信もサクサク、居心地満点のプライベート空間！",
    link: "/search?deposit=0&keyMoney=0&layout=1DK/1LDK",
    tags: ["#推し活ルーム", "#ネット無料", "#バストイレ別", "#防音性"],
  },
  cafe: {
    title: "カフェ風リノベ＆デザイナーズタイプ",
    badge: "洗練デザイン",
    desc: "コンクリート打ちっぱなしやアイアン素材、無垢フローリングが好きなあなたへ。下北沢・中目黒・蔵前などのカルチャー街がぴったりです。",
    link: "/search?propertyType=MANSION&walkMinutes=7",
    tags: ["#デザイナーズ", "#リノベーション", "#カフェが近い街", "#おしゃれ"],
  },
  work: {
    title: "タイパ最強！スマートリモートワークタイプ",
    badge: "スマート生活",
    desc: "デスクとベッドのゾーニングがしやすい1LDKや、高速ネット完備の駅近物件が最適。オンオフの切り替えがスムーズな住環境をご提案！",
    link: "/search?walkMinutes=5&layout=1DK/1LDK",
    tags: ["#リモート部屋", "#宅配ボックス", "#独立洗面台", "#駅徒歩5分"],
  },
  active: {
    title: "エキチカ＆身軽フットワークタイプ",
    badge: "駅近アクティブ",
    desc: "主要駅まで徒歩5分以内、周辺にサウナや飲食店が充実した好立地。敷金礼金ゼロで初期費用もスマートに抑えて身軽に新生活スタート！",
    link: "/search?deposit=0&keyMoney=0&walkMinutes=5",
    tags: ["#駅徒歩3〜5分", "#敷金礼金0円", "#24hゴミ出し可", "#コンビニ近"],
  },
};

export function LifestyleQuiz() {
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
    <div className="rounded-3xl bg-gradient-to-br from-amber-50/70 via-rose-50/30 to-emerald-50/50 p-5 sm:p-8 border border-slate-200/90 shadow-sm">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Quiz Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-black text-rose-500 shadow-2xs border border-rose-100">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>30秒でわかる！タイプ診断</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            あなたにぴったりの暮らし方・お部屋診断
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            直感でタップするだけ！Z世代に人気のこだわり条件から、理想のマッチングをご提案。
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
                {QUESTIONS[currentStep].title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {QUESTIONS[currentStep].subtitle}
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
                        {opt.label}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {opt.sublabel}
                      </span>
                      <span className="inline-block text-[10px] font-bold text-rose-500/80 bg-rose-50 px-2 py-0.5 rounded-md mt-2">
                        {opt.tag}
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
                  {matchedArchetype.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {matchedArchetype.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>もう一度診断する</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {matchedArchetype.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {matchedArchetype.tags.map((t, idx) => (
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
                <span>このタイプのおすすめ物件を見る</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

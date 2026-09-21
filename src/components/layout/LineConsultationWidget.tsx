"use client";

import React, { useState } from "react";
import { MessageCircle, X, CheckCircle2, ShieldCheck, QrCode, Sparkles, Send, ArrowRight } from "lucide-react";

export function LineConsultationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const QUICK_QUESTIONS = [
    "気になるお部屋の最新の空室状況を知りたい",
    "敷金・礼金0円で初期費用を抑えて入居したい",
    "遠方に住んでいるので、オンライン内見を予約したい",
    "はじめての一人暮らしで家賃の目安を相談したい",
  ];

  const handleCopyId = () => {
    navigator.clipboard?.writeText("@havensuumo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Action Button on Bottom-Right */}
      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-200/80 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-[#06C755] animate-ping" />
            <span>LINEでサクッと相談・内見予約</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white shadow-xl shadow-[#06C755]/35 hover:scale-105 transition-all duration-300 animate-line-pulse"
          aria-label="LINEで無料相談する"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <>
              {/* Cute LINE Chat Icon */}
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white">
                1
              </span>
            </>
          )}
        </button>
      </div>

      {/* Interactive LINE Consultation Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[88vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-150 transform transition-all duration-300 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#06C755] to-[#00a854] p-4 sm:p-5 text-white shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#06C755] shadow-sm font-black text-lg">
                    L
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-black">HavenSUUMO 公式LINE</h3>
                      <span className="bg-white/25 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        24h受付
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-emerald-50 mt-0.5">
                      お部屋探し相談・オンライン内見・初期費用見積もり
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Gen-Z Peace of Mind Banner */}
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-black/15 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-100">
                <ShieldCheck className="h-4 w-4 text-emerald-200 shrink-0" />
                <span>しつこい営業電話は一切ありません。チャットのみで完結！</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
              {/* Step Prompt */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">
                  気になる内容をタップすると、LINEですぐに質問できます：
                </p>
                <div className="space-y-1.5">
                  {QUICK_QUESTIONS.map((q, idx) => {
                    const isPicked = selectedQuestion === q;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedQuestion(isPicked ? null : q)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                          isPicked
                            ? "bg-emerald-50 border-[#06C755] text-emerald-950 font-bold"
                            : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="line-clamp-1">{q}</span>
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 transition-opacity ${
                            isPicked ? "text-[#06C755] opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QR / ID Area */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <QrCode className="h-7 w-7 text-slate-800" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">LINE ID 検索</span>
                    <span className="text-sm font-mono font-black text-slate-900">@havensuumo</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="rounded-lg bg-white border border-slate-200 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
                >
                  {copied ? "コピー完了！" : "IDコピー"}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href="https://line.me/R/ti/p/@havensuumo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#06C755] hover:bg-[#05b34c] py-3 text-sm font-black text-white shadow-md shadow-[#06C755]/25 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>LINE友だち追加して相談する</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <p className="text-[10px] text-center text-slate-400">
                  平日・休日も専任のルームアドバイザーがスピーディーに返信いたします。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

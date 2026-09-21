"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, HelpCircle, Coins } from "lucide-react";

export function InitialCostExplainer() {
  const [rentYen, setRentYen] = useState<number>(80000); // 8万円 default for single youth
  const [hasZeroShikikinReikin, setHasZeroShikikinReikin] = useState<boolean>(true);
  const [discountBrokerage, setDiscountBrokerage] = useState<boolean>(true);

  // Standard vs Smart Cost Calculation
  const managementFee = 8000;
  const deposit = hasZeroShikikinReikin ? 0 : rentYen; // 1 month or 0
  const keyMoney = hasZeroShikikinReikin ? 0 : rentYen; // 1 month or 0
  const brokerageRate = discountBrokerage ? 0.55 : 1.1; // 0.5 month or 1 month + tax
  const brokerageFee = Math.round(rentYen * brokerageRate);
  const guaranteeFee = Math.round((rentYen + managementFee) * 0.5); // 50%
  const fireInsurance = 18000; // 2 years
  const lockChange = 16500;

  const totalCost = rentYen + managementFee + deposit + keyMoney + brokerageFee + guaranteeFee + fireInsurance + lockChange;
  const standardCostWithoutSaving = rentYen + managementFee + rentYen + rentYen + Math.round(rentYen * 1.1) + guaranteeFee + fireInsurance + lockChange;
  const savedAmount = standardCostWithoutSaving - totalCost;

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-black text-emerald-700">
            <Coins className="h-3.5 w-3.5 text-emerald-600" />
            <span>初期費用の不安をゼロに</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            はじめての一人暮らし 初期費用シミュレーター
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            「敷金礼金0円」や「仲介手数料の割引」で、引っ越し費用がどれだけ節約できるかを即時計算！
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200/70 flex items-center gap-3 shrink-0">
          <ShieldCheck className="h-6 w-6 text-amber-600 shrink-0" />
          <div className="text-[11px]">
            <span className="font-black text-slate-900 block">不当な付帯料金ゼロ保証</span>
            <span className="text-slate-600">不要な消臭代や安心サポート等の強制上乗せは一切ナシ</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Sliders & Toggles */}
        <div className="lg:col-span-6 space-y-5">
          {/* Rent Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>想定の家賃 (Rent):</span>
              <span className="text-base sm:text-lg font-black text-rose-600">
                {(rentYen / 10000).toFixed(1)} 万円 /月
              </span>
            </div>
            <input
              type="range"
              min={40000}
              max={200000}
              step={5000}
              value={rentYen}
              onChange={(e) => setRentYen(Number(e.target.value))}
              className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1">
              <span>4.0万円 (学生・単身)</span>
              <span>10.0万円 (都心標準)</span>
              <span>20.0万円 (広々・同棲)</span>
            </div>
          </div>

          {/* Toggle Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setHasZeroShikikinReikin(!hasZeroShikikinReikin)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                hasZeroShikikinReikin
                  ? "bg-rose-50 border-rose-300 text-rose-950 font-bold shadow-2xs"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <div>
                <span className="text-xs block">敷金0円・礼金0円</span>
                <span className="text-[10px] text-slate-500 block">
                  {hasZeroShikikinReikin ? "約2ヶ月分おトク！" : "通常(敷1礼1)"}
                </span>
              </div>
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center text-white text-xs ${
                  hasZeroShikikinReikin ? "bg-rose-500" : "bg-slate-300"
                }`}
              >
                {hasZeroShikikinReikin ? "✓" : ""}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDiscountBrokerage(!discountBrokerage)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                discountBrokerage
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-2xs"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <div>
                <span className="text-xs block">仲介手数料 半額適用</span>
                <span className="text-[10px] text-slate-500 block">
                  {discountBrokerage ? "0.5ヶ月分節約" : "通常(1ヶ月分)"}
                </span>
              </div>
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center text-white text-xs ${
                  discountBrokerage ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                {discountBrokerage ? "✓" : ""}
              </div>
            </button>
          </div>
        </div>

        {/* Right: Output Summary Card */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6 text-white space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-xs text-slate-300 font-bold">概算初期費用 (目安総額)</span>
            {savedAmount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                約 ¥{savedAmount.toLocaleString()} 節約！
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              ¥{totalCost.toLocaleString()}
            </span>
            <span className="text-xs text-slate-300">
              (約 {(totalCost / 10000).toFixed(1)} 万円)
            </span>
          </div>

          {/* Quick Breakdown Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-800/80 p-3 rounded-xl text-slate-300">
            <div>前家賃＋共益費: <strong className="text-white">¥{(rentYen + managementFee).toLocaleString()}</strong></div>
            <div>敷金・礼金: <strong className="text-white">¥{(deposit + keyMoney).toLocaleString()}</strong></div>
            <div>仲介手数料: <strong className="text-white">¥{brokerageFee.toLocaleString()}</strong></div>
            <div>保証会社・保険: <strong className="text-white">¥{(guaranteeFee + fireInsurance).toLocaleString()}</strong></div>
          </div>

          <Link
            href={`/search?deposit=0&keyMoney=0&maxPrice=${rentYen}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 py-3 text-xs font-black text-white shadow-md transition-all"
          >
            <span>この予算で敷礼0のお部屋を探す</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

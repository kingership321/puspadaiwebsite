"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";

interface InitialCostSimulatorProps {
  rent: number;
  managementFee?: number;
  deposit?: number;
  keyMoney?: number;
  currency?: string;
  isRent?: boolean;
}

export function InitialCostSimulator({
  rent,
  managementFee = 10000,
  deposit = 0,
  keyMoney = 0,
  currency = "JPY",
  isRent = true,
}: InitialCostSimulatorProps) {
  const [includeLockChange, setIncludeLockChange] = useState(true);
  const [brokerageDiscount, setBrokerageDiscount] = useState(false); // 50% discount campaign
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isRent) return null;

  // Breakdown Calculations
  const firstMonthRent = rent;
  const firstMonthMaint = managementFee;
  const depositAmount = deposit;
  const keyMoneyAmount = keyMoney;
  const brokerageRate = brokerageDiscount ? 0.55 : 1.1; // 1 month or 0.5 month + tax (10%)
  const brokerageFee = Math.round(rent * brokerageRate);
  const guaranteeFee = Math.round((rent + managementFee) * 0.5); // 50% of monthly total
  const fireInsurance = 20000; // Flat standard 2-year fire insurance
  const lockChangeFee = includeLockChange ? 22000 : 0;

  const totalInitialCost =
    firstMonthRent +
    firstMonthMaint +
    depositAmount +
    keyMoneyAmount +
    brokerageFee +
    guaranteeFee +
    fireInsurance +
    lockChangeFee;

  const rentInManYen = (rent / 10000).toFixed(1);
  const totalInManYen = (totalInitialCost / 10000).toFixed(1);
  const multiplier = (totalInitialCost / rent).toFixed(1);

  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>初期費用概算シミュレーション</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                概算自動計算
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Estimated Move-in Cost Breakdown &amp; Cash Requirements
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-slate-600 p-1"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {/* Summary Big Card */}
      <div className="mt-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-emerald-900">概算初期費用 合計 (目安)</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-black text-emerald-800 tracking-tight">
              ¥{totalInitialCost.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-emerald-700">
              (約{totalInManYen}万円 / 賃料の約{multiplier}ヶ月分)
            </span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mt-1">
            ※契約開始日（日割り日数）や保証会社プランにより多少前後します。
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-emerald-200/80 shadow-2xs">
            <input
              type="checkbox"
              checked={brokerageDiscount}
              onChange={(e) => setBrokerageDiscount(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>仲介手数料50%割</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-emerald-200/80 shadow-2xs">
            <input
              type="checkbox"
              checked={includeLockChange}
              onChange={(e) => setIncludeLockChange(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>鍵シリンダー交換</span>
          </label>
        </div>
      </div>

      {/* Detailed Itemized Table */}
      {isExpanded && (
        <div className="mt-4 divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">当月日割・翌月前家賃</span>
              <span className="text-[10px] text-slate-400">(初月1ヶ月分満額換算)</span>
            </div>
            <span className="font-bold text-slate-900">¥{firstMonthRent.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">共益費・管理費</span>
              <span className="text-[10px] text-slate-400">(翌月1ヶ月分)</span>
            </div>
            <span className="font-bold text-slate-900">¥{firstMonthMaint.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">敷金 (保証金)</span>
              <span className="text-[10px] text-slate-400">
                {depositAmount === 0 ? "敷金なし (0ヶ月)" : "退去時原状回復等"}
              </span>
            </div>
            <span className={`font-bold ${depositAmount === 0 ? "text-emerald-600" : "text-slate-900"}`}>
              {depositAmount === 0 ? "¥0 (敷金0円)" : `¥${depositAmount.toLocaleString()}`}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">礼金 (契約謝礼金)</span>
              <span className="text-[10px] text-slate-400">
                {keyMoneyAmount === 0 ? "礼金なし (0ヶ月)" : "オーナー様への謝礼金"}
              </span>
            </div>
            <span className={`font-bold ${keyMoneyAmount === 0 ? "text-emerald-600" : "text-slate-900"}`}>
              {keyMoneyAmount === 0 ? "¥0 (礼金0円)" : `¥${keyMoneyAmount.toLocaleString()}`}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">仲介手数料</span>
              <span className="text-[10px] text-slate-400">
                {brokerageDiscount ? "キャンペーン適用 (0.5ヶ月+税)" : "法律上限 (賃料1ヶ月+消費税)"}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{brokerageFee.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">初回賃貸保証委託料</span>
              <span className="text-[10px] text-slate-400">連帯保証人不要プラン (総賃料の約50%)</span>
            </div>
            <span className="font-bold text-slate-900">¥{guaranteeFee.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">火災・家財保険料</span>
              <span className="text-[10px] text-slate-400">2年間借家人賠償責任担保</span>
            </div>
            <span className="font-bold text-slate-900">¥{fireInsurance.toLocaleString()}</span>
          </div>

          {includeLockChange && (
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">鍵交換シリンダー費用</span>
                <span className="text-[10px] text-slate-400">ディンプルキー防犯シリンダー交換</span>
              </div>
              <span className="font-bold text-slate-900">¥{lockChangeFee.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>💡 クレジットカード決済・分割支払い相談可能</span>
        <span className="text-emerald-700 font-semibold">見積書の即日PDF発行可</span>
      </div>
    </div>
  );
}

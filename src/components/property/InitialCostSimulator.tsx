"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { lang } = useLanguage();
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
              <span>{lang === "ja" ? "初期費用概算シミュレーション" : "Move-in Cost Simulator"}</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                {lang === "ja" ? "概算自動計算" : "Auto Calculated"}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === "ja"
                ? "Estimated Move-in Cost Breakdown & Cash Requirements"
                : "Estimated Move-in Cost Breakdown & Cash Requirements"}
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
          <span className="text-xs font-semibold text-emerald-900">
            {lang === "ja" ? "概算初期費用 合計 (目安)" : "Total Estimated Upfront Costs"}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-black text-emerald-800 tracking-tight">
              ¥{totalInitialCost.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-emerald-700">
              {lang === "ja"
                ? `(約${totalInManYen}万円 / 賃料の約${multiplier}ヶ月分)`
                : `(~¥${(totalInitialCost / 1000).toFixed(0)}k / ~${multiplier}x rent)`}
            </span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mt-1">
            {lang === "ja"
              ? "※契約開始日（日割り日数）や保証会社プランにより多少前後します。"
              : "*Subject to move-in start date pro-ration and guarantor company plan."}
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
            <span>{lang === "ja" ? "仲介手数料50%割" : "50% Brokerage Campaign"}</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-emerald-200/80 shadow-2xs">
            <input
              type="checkbox"
              checked={includeLockChange}
              onChange={(e) => setIncludeLockChange(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>{lang === "ja" ? "鍵シリンダー交換" : "Lock Replacement"}</span>
          </label>
        </div>
      </div>

      {/* Detailed Itemized Table */}
      {isExpanded && (
        <div className="mt-4 divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "当月日割・翌月前家賃" : "Advance First Month Rent"}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === "ja" ? "(初月1ヶ月分満額換算)" : "(1 full month)"}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{firstMonthRent.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "共益費・管理費" : "Management / Maintenance Fee"}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === "ja" ? "(翌月1ヶ月分)" : "(1 month)"}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{firstMonthMaint.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "敷金 (保証金)" : "Security Deposit (敷金)"}
              </span>
              <span className="text-[10px] text-slate-400">
                {depositAmount === 0
                  ? (lang === "ja" ? "敷金なし (0ヶ月)" : "Zero Deposit (¥0)")
                  : (lang === "ja" ? "退去時原状回復等" : "Refundable deposit")}
              </span>
            </div>
            <span className={`font-bold ${depositAmount === 0 ? "text-emerald-600" : "text-slate-900"}`}>
              {depositAmount === 0 ? "¥0" : `¥${depositAmount.toLocaleString()}`}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "礼金 (契約謝礼金)" : "Key Money (礼金)"}
              </span>
              <span className="text-[10px] text-slate-400">
                {keyMoneyAmount === 0
                  ? (lang === "ja" ? "礼金なし (0ヶ月)" : "Zero Key Money (¥0)")
                  : (lang === "ja" ? "オーナー様への謝礼金" : "Non-refundable fee to owner")}
              </span>
            </div>
            <span className={`font-bold ${keyMoneyAmount === 0 ? "text-emerald-600" : "text-slate-900"}`}>
              {keyMoneyAmount === 0 ? "¥0" : `¥${keyMoneyAmount.toLocaleString()}`}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "仲介手数料" : "Agent Brokerage Fee"}
              </span>
              <span className="text-[10px] text-slate-400">
                {brokerageDiscount
                  ? (lang === "ja" ? "キャンペーン適用 (0.5ヶ月+税)" : "50% Discount (0.5mo + tax)")
                  : (lang === "ja" ? "法律上限 (賃料1ヶ月+消費税)" : "Standard 1 month + tax")}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{brokerageFee.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "初回賃貸保証委託料" : "Guarantor Company Fee"}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === "ja" ? "連帯保証人不要プラン (総賃料の約50%)" : "No guarantor required (~50% of rent)"}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{guaranteeFee.toLocaleString()}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === "ja" ? "火災・家財保険料" : "Renter's Fire & Casualty Insurance"}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === "ja" ? "2年間借家人賠償責任担保" : "Standard 2-year tenant liability"}
              </span>
            </div>
            <span className="font-bold text-slate-900">¥{fireInsurance.toLocaleString()}</span>
          </div>

          {includeLockChange && (
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">
                  {lang === "ja" ? "鍵交換シリンダー費用" : "Lock Cylinder Replacement"}
                </span>
                <span className="text-[10px] text-slate-400">
                  {lang === "ja" ? "ディンプルキー防犯シリンダー交換" : "High-security dimple cylinder"}
                </span>
              </div>
              <span className="font-bold text-slate-900">¥{lockChangeFee.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>{lang === "ja" ? "💡 クレジットカード決済・分割支払い相談可能" : "💡 Credit card & installment payments available"}</span>
        <span className="text-emerald-700 font-semibold">{lang === "ja" ? "見積書の即日PDF発行可" : "Instant PDF estimate available"}</span>
      </div>
    </div>
  );
}

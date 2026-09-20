"use client";

import React, { useState, useId } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MortgageCalculatorProps {
  price: number;
  currency?: string;
  isRent?: boolean;
}

export function MortgageCalculator({
  price,
  currency = "USD",
  isRent = false,
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(price);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const priceInputId = useId();
  const downPaymentInputId = useId();
  const interestRateInputId = useId();
  const loanTermInputId = useId();

  if (isRent) {
    // Rental affordability calculator
    const suggestedIncomeAnnual = price * 40;
    const suggestedIncomeMonthly = suggestedIncomeAnnual / 12;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 pb-4 border-b border-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold">Rental Affordability Breakdown</h3>
            <p className="text-xs text-slate-500">Industry standard 40x gross income guideline</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Monthly Rent</span>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{formatCurrency(price, currency)}</p>
            <span className="text-[11px] text-slate-400">Due 1st of each month</span>
          </div>

          <div className="rounded-xl bg-brand-50/60 p-4 border border-brand-100">
            <span className="text-xs font-semibold text-brand-800">Recommended Annual Income</span>
            <p className="text-2xl font-black text-brand-700 mt-0.5">{formatCurrency(suggestedIncomeAnnual, currency)}</p>
            <span className="text-[11px] text-brand-600">~{formatCurrency(suggestedIncomeMonthly, currency)} / month gross</span>
          </div>
        </div>
      </div>
    );
  }

  // Mortgage Calculator
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principal = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    monthlyRate === 0
      ? principal / numberOfPayments
      : (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const estimatedPropertyTax = (homePrice * 0.012) / 12;
  const estimatedHomeInsurance = (homePrice * 0.005) / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + estimatedPropertyTax + estimatedHomeInsurance;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Mortgage & Payment Estimator</h3>
            <p className="text-xs text-slate-500">Principal, interest, taxes, and insurance</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-medium text-slate-500 block">Est. Monthly</span>
          <span className="text-2xl font-black text-brand-700">
            {formatCurrency(Math.round(totalMonthlyPayment), currency)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor={priceInputId} className="text-xs font-bold text-slate-700">Home Price</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
            <input
              id={priceInputId}
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 pl-7 pr-3 py-2 text-sm font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor={downPaymentInputId} className="text-xs font-bold text-slate-700">Down Payment ({downPaymentPercent}%)</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
            <input
              id={downPaymentInputId}
              type="number"
              value={Math.round(downPaymentAmount)}
              onChange={(e) => {
                const val = Number(e.target.value) || 0;
                setDownPaymentPercent(Math.round((val / homePrice) * 100));
              }}
              className="w-full rounded-xl border border-slate-200 pl-7 pr-3 py-2 text-sm font-semibold focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor={interestRateInputId} className="text-xs font-bold text-slate-700">Interest Rate</label>
          <div className="relative mt-1">
            <input
              id={interestRateInputId}
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 pl-3 pr-7 py-2 text-sm font-semibold focus:border-brand-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">%</span>
          </div>
        </div>

        <div>
          <label htmlFor={loanTermInputId} className="text-xs font-bold text-slate-700">Loan Term</label>
          <select
            id={loanTermInputId}
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="w-full mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold focus:border-brand-500 focus:outline-none"
          >
            <option value={15}>15 Years Fixed</option>
            <option value={20}>20 Years Fixed</option>
            <option value={30}>30 Years Fixed</option>
          </select>
        </div>
      </div>

      {/* Payment breakdown bars */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-brand-600" />
          <span className="text-slate-600">Principal & Interest:</span>
          <span className="font-bold text-slate-900">{formatCurrency(Math.round(monthlyPrincipalAndInterest), currency)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-slate-600">Property Taxes:</span>
          <span className="font-bold text-slate-900">{formatCurrency(Math.round(estimatedPropertyTax), currency)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-slate-600">Homeowners Insurance:</span>
          <span className="font-bold text-slate-900">{formatCurrency(Math.round(estimatedHomeInsurance), currency)}</span>
        </div>
      </div>
    </div>
  );
}

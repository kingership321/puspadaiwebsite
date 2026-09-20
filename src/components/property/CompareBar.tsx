"use client";

import React from "react";
import Link from "next/link";
import { Scale, X, ArrowRight } from "lucide-react";
import { PropertyDto } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CompareBarProps {
  comparedProperties: PropertyDto[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareBar({
  comparedProperties,
  onRemove,
  onClear,
}: CompareBarProps) {
  if (comparedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Compare Mode ({comparedProperties.length}/4)
            </p>
            <p className="text-xs text-slate-300 hidden sm:block">
              Side-by-side specs, price/sqft, and amenities
            </p>
          </div>
        </div>

        {/* Thumbnail previews */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {comparedProperties.map((prop) => (
            <div
              key={prop.id}
              className="group relative flex items-center gap-2 rounded-xl bg-slate-800/80 px-2.5 py-1.5 border border-slate-700 text-xs shrink-0"
            >
              <img
                src={prop.images?.[0]?.url || ""}
                alt={prop.title}
                className="h-7 w-7 rounded-lg object-cover"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold text-white leading-tight">
                  {formatCurrency(prop.price, prop.currency)}
                </span>
                <span className="text-[10px] text-slate-400 line-clamp-1 max-w-[90px]">
                  {prop.city?.name}
                </span>
              </div>
              <button
                onClick={() => onRemove(prop.id)}
                className="ml-1 text-slate-400 hover:text-rose-400 transition-colors"
                aria-label="Remove from compare"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>
          <Link
            href="/account/compare"
            className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow hover:bg-brand-400 transition-colors"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Grid,
  List,
  Columns,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

interface FilterBarProps {
  totalResults: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  viewMode: "split" | "grid" | "list";
  onViewChange: (mode: "split" | "grid" | "list") => void;
  onOpenFilterDrawer: () => void;
  activeFilters: Record<string, string>;
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export function FilterBar({
  totalResults,
  currentSort,
  onSortChange,
  viewMode,
  onViewChange,
  onOpenFilterDrawer,
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: FilterBarProps) {
  const { lang, t } = useLanguage();
  const activeKeys = Object.entries(activeFilters).filter(
    ([k, v]) => v && !["sort", "page", "limit", "view"].includes(k)
  );

  return (
    <div className="w-full space-y-3 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Filter Drawer Trigger & Result Count */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFilterDrawer}
            className="flex items-center gap-2 font-bold text-slate-800 border-slate-300"
          >
            <SlidersHorizontal className="h-4 w-4 text-brand-700" />
            <span>{t.allFilters}</span>
            {activeKeys.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                {activeKeys.length}
              </span>
            )}
          </Button>

          <span className="text-xs sm:text-sm font-semibold text-slate-600">
            {lang === "ja" ? (
              <>
                <strong className="text-slate-900 font-extrabold">{totalResults}</strong> 件の物件
              </>
            ) : (
              <>
                <strong className="text-slate-900 font-extrabold">{totalResults}</strong> properties found
              </>
            )}
          </span>
        </div>

        {/* Right: Sort & View Mode Switches */}
        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
              <option value="area_desc">{t.sortAreaDesc}</option>
            </select>
          </div>

          {/* View Mode Toggle (Split, Grid, List) */}
          <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              onClick={() => onViewChange("split")}
              title="Split View (Map + Cards)"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === "split"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Columns className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewChange("grid")}
              title="Grid View"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              title="List View"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeKeys.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in">
          <span className="text-xs font-medium text-slate-400">Active:</span>
          {activeKeys.map(([k, v]) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800"
            >
              <span className="capitalize">{k}:</span>
              <span>{v}</span>
              <button
                onClick={() => onRemoveFilter(k)}
                className="ml-1 text-brand-600 hover:text-brand-900"
                aria-label={`Remove filter ${k}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onClearAll}
            className="text-xs font-bold text-rose-600 hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PropertyDto } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () => import("@/components/map/PropertyMap").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-semibold animate-pulse border border-slate-200">
        地図を読み込み中 (Loading Map)...
      </div>
    ),
  }
);
import { FilterBar } from "@/components/search/FilterBar";
import { FilterDrawer } from "@/components/search/FilterDrawer";
import { CompareBar } from "@/components/property/CompareBar";
import { Button } from "@/components/ui/Button";
import {
  Search,
  SlidersHorizontal,
  Home,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, t } = useLanguage();

  const [properties, setProperties] = useState<PropertyDto[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [viewMode, setViewMode] = useState<"split" | "grid" | "list">("split");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Compare properties state
  const [comparedProperties, setComparedProperties] = useState<PropertyDto[]>([]);

  // Current query params object
  const currentFilters: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    currentFilters[key] = val;
  });

  const sort = searchParams.get("sort") || "newest";

  // Fetch properties whenever searchParams changes
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/search?${query}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data.results || []);
          setTotalResults(data.total || 0);
          setTotalPages(data.totalPages || 1);
          setCurrentPage(data.page || 1);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  // Update query params helper
  const updateQuery = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === "" || val === undefined) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    // Reset to page 1 on filter change if page wasn't explicitly changed
    if (!newParams.page && params.has("page")) {
      params.set("page", "1");
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    updateQuery({ sort: newSort });
  };

  const handleRemoveFilter = (key: string) => {
    updateQuery({ [key]: null });
  };

  const handleClearAll = () => {
    const type = searchParams.get("type") || "RENT";
    router.push(`/search?type=${type}`);
  };

  const handleApplyDrawerFilters = (filters: Record<string, string>) => {
    updateQuery(filters);
  };

  const handleToggleCompare = (property: PropertyDto) => {
    if (comparedProperties.some((p) => p.id === property.id)) {
      setComparedProperties(comparedProperties.filter((p) => p.id !== property.id));
    } else {
      if (comparedProperties.length >= 4) {
        alert("You can compare up to 4 properties simultaneously.");
        return;
      }
      setComparedProperties([...comparedProperties, property]);
    }
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedProperties(comparedProperties.filter((p) => p.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Filter Controls */}
      <FilterBar
        totalResults={totalResults}
        currentSort={sort}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewChange={setViewMode}
        onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
        activeFilters={currentFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      {/* Main View Layout */}
      {viewMode === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-230px)]">
          {/* Left Column: Listings */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <EmptyState onClearAll={handleClearAll} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {properties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isCompared={comparedProperties.some((p) => p.id === prop.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-200 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => updateQuery({ page: (currentPage - 1).toString() })}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {lang === "ja" ? "前へ" : "Previous"}
                </Button>
                <span className="text-xs font-semibold text-slate-600 px-3">
                  {lang === "ja" ? `${currentPage} / ${totalPages} ページ` : `Page ${currentPage} of ${totalPages}`}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => updateQuery({ page: (currentPage + 1).toString() })}
                >
                  {lang === "ja" ? "次へ" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Interactive Map */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="sticky top-20 h-[calc(100vh-100px)] w-full">
              <PropertyMap
                properties={properties}
                selectedPropertyId={selectedPropertyId}
                onSelectProperty={(p) => setSelectedPropertyId(p ? p.id : null)}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Full Grid or List Mode */
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <EmptyState onClearAll={handleClearAll} />
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {properties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  viewMode={viewMode}
                  isCompared={comparedProperties.some((p) => p.id === prop.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 border-t border-slate-200 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => updateQuery({ page: (currentPage - 1).toString() })}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs font-semibold text-slate-600 px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => updateQuery({ page: (currentPage + 1).toString() })}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Advanced Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={currentFilters}
        onApply={handleApplyDrawerFilters}
        onReset={handleClearAll}
      />

      {/* Compare Floating Dock */}
      <CompareBar
        comparedProperties={comparedProperties}
        onRemove={handleRemoveFromCompare}
        onClear={() => setComparedProperties([])}
      />
    </div>
  );
}

function EmptyState({ onClearAll }: { onClearAll: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 mb-4">
        <Home className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{t.noResultsTitle}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        {t.noResultsDesc}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="md" onClick={onClearAll}>
          <RefreshCw className="h-4 w-4 mr-1.5" />
          {t.resetAll}
        </Button>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-center text-slate-500">
          Loading property search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

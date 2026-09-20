import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Search, Bell, ArrowRight, ArrowLeft, Trash2, CheckCircle2 } from "lucide-react";

export default async function SavedSearchesPage() {
  const user = await getCurrentUser();

  const savedSearches = user
    ? await prisma.savedSearch.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Account</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Saved Search Alerts</h1>
            <p className="text-xs text-slate-500">
              Receive notifications when new properties matching your specifications become available.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      {savedSearches.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <Search className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-base font-bold text-slate-900">No Saved Searches</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Apply filters on the search page and click &quot;Save this search&quot; to receive automated email digests.
          </p>
          <div className="mt-6">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-bold text-white"
            >
              Start a Search
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {savedSearches.map((item) => {
            const filters = JSON.parse(item.filtersJson || "{}");
            const filterEntries = Object.entries(filters);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 uppercase">
                      {item.searchType}
                    </span>
                  </div>

                  {/* Filter tags summary */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                    {filterEntries.map(([k, v]) => (
                      <span
                        key={k}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium"
                      >
                        {k}: <strong>{String(v)}</strong>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Bell className="h-3.5 w-3.5 text-brand-600" />
                    <span>Frequency: <strong className="text-slate-700 capitalize">{item.notificationFrequency.toLowerCase()}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <Link
                    href={`/search?${new URLSearchParams(filters).toString()}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 text-brand-700 px-4 py-2 text-xs font-bold hover:bg-brand-100 transition-colors"
                  >
                    <span>Execute Search</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

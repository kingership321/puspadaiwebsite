import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Building, PlusCircle, ArrowLeft, ExternalLink, ShieldAlert } from "lucide-react";

export default async function DashboardListingsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status || "ALL";

  const where = statusFilter === "ALL" ? {} : { status: statusFilter };

  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      city: true,
      neighborhood: true,
      images: { take: 1 },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Manage Properties</h1>
              <p className="text-xs text-slate-500">
                Full inventory of {properties.length} residential listings.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/listings/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Listing</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: "ALL", label: "All Properties" },
          { key: "PUBLISHED", label: "Published" },
          { key: "PENDING_REVIEW", label: "Pending Review" },
          { key: "DRAFT", label: "Drafts" },
          { key: "PAUSED", label: "Paused" },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={`/dashboard/listings?status=${tab.key}`}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              statusFilter === tab.key
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Property</th>
                <th className="p-4">Mode / Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-3 min-w-[280px]">
                    <img
                      src={p.images?.[0]?.url || ""}
                      alt={p.title}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-slate-400">{p.address}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800 uppercase block">{p.listingType}</span>
                    <span className="text-[11px] text-slate-500 capitalize">{p.propertyType.toLowerCase()}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {formatCurrency(p.price, p.currency)}
                    </span>
                    {p.listingType === "RENT" && <span className="text-slate-500"> /mo</span>}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        p.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "PENDING_REVIEW"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{p.neighborhood.name}, {p.city.name}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/property/${p.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline"
                    >
                      <span>Preview</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AdminModerationActions } from "./AdminModerationActions";
import {
  ShieldCheck,
  Building,
  Users,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default async function AdminPortalPage() {
  const [
    totalUsers,
    totalListings,
    pendingListings,
    reports,
    auditLogs,
    usersList,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.property.findMany({
      where: { status: "PENDING_REVIEW" },
      include: {
        city: true,
        neighborhood: true,
        agent: true,
        images: { take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.listingReport.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          include: { city: true },
        },
      },
    }),
    prisma.auditLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-0.5 text-xs font-bold text-purple-700">
              Platform Administration
            </span>
            <span className="text-xs text-slate-400">• Security Level: Full Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Admin & Moderation Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review listing submissions, enforce marketplace trust standards, and inspect audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Public Marketplace
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Registered Users</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{totalUsers}</p>
          <span className="text-xs text-slate-500 mt-1 block">Seekers, Owners & Agents</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</span>
          <p className="text-3xl font-black text-amber-600 mt-1">{pendingListings.length}</p>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">Requires manual approval</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Properties</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{totalListings}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Published across 5 cities</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Fraud Reports</span>
          <p className="text-3xl font-black text-rose-600 mt-1">{reports.length}</p>
          <span className="text-xs text-rose-600 font-semibold mt-1 block">Flagged by community</span>
        </div>
      </div>

      {/* Listing Moderation Queue */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Listing Moderation Queue ({pendingListings.length} Awaiting Review)
              </h2>
              <p className="text-xs text-slate-500">
                Inspect details, confirm broker legitimacy, and approve or reject submissions.
              </p>
            </div>
          </div>
        </div>

        {pendingListings.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500 mb-2" />
            <p className="font-bold text-slate-800">Queue is Clear</p>
            <p className="text-slate-400 mt-0.5">All listing submissions have been moderated.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingListings.map((listing) => (
              <div
                key={listing.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={listing.images?.[0]?.url || ""}
                    alt={listing.title}
                    className="h-20 w-24 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                        {listing.listingType} • {listing.propertyType}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {listing.neighborhood.name}, {listing.city.name}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{listing.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{listing.address} • Submitted by {listing.agent?.name || "Broker"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/property/${listing.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <span>Preview</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <AdminModerationActions propertyId={listing.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reports & System Audit Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 cols: Flagged Reports */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">User Flagged Reports</h3>
          </div>
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700 uppercase tracking-wide">
                    {r.reason}
                  </span>
                  <span className="text-slate-400">{formatDate(r.createdAt)}</span>
                </div>
                <p className="font-semibold text-slate-800 mt-1">{r.property?.title}</p>
                <p className="text-slate-600 mt-1 italic">&ldquo;{r.details}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Immutable Audit Log */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Platform Audit Trail</h3>
          </div>
          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                <div>
                  <span className="font-bold text-slate-800">{log.action}</span>
                  <span className="text-slate-500 ml-2">by {log.actorName || "System"}</span>
                </div>
                <span className="text-slate-400 text-[11px]">{formatDate(log.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

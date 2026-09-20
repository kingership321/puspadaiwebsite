import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Briefcase,
  PlusCircle,
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp,
  Eye,
  ArrowRight,
  ListFilter,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const [totalPublished, totalPending, totalInquiries, recentProperties] = await Promise.all([
    prisma.property.count({ where: { status: "PUBLISHED" } }),
    prisma.property.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.inquiry.count(),
    prisma.property.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        city: true,
        neighborhood: true,
        images: { take: 1 },
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-50 border border-brand-200 px-3 py-0.5 text-xs font-bold text-brand-700">
              Agent & Owner Portal
            </span>
            <span className="text-xs text-slate-400">• Active Persona: {user?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Listing Operations & Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create listings, manage client leads, and track inquiry status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Listing</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published Listings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{totalPublished}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Live in marketplace search</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Under Moderation</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{totalPending}</p>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">Awaiting admin review</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Inquiries</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{totalInquiries}</p>
          <span className="text-xs text-blue-600 font-semibold mt-1 block">Tour & message leads</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Views</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">12,480</p>
          <span className="text-xs text-purple-600 font-semibold mt-1 block">+18% this month</span>
        </div>
      </div>

      {/* Navigation Sub-Links */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <Link
          href="/dashboard/listings"
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-900"
        >
          All Listings
        </Link>
        <Link
          href="/dashboard/leads"
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        >
          Inquiries CRM
        </Link>
      </div>

      {/* Recent Listings Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Listings Portfolio</h3>
            <p className="text-xs text-slate-500">Overview of recent submissions and published residences.</p>
          </div>
          <Link
            href="/dashboard/listings"
            className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Property</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProperties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.images?.[0]?.url || ""}
                      alt={p.title}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-slate-400">{p.address}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 uppercase">{p.propertyType}</td>
                  <td className="p-4 font-bold text-slate-900">{formatCurrency(p.price, p.currency)}</td>
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
                      className="font-bold text-brand-700 hover:underline"
                    >
                      Inspect →
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

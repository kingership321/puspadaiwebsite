import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  User,
  Heart,
  Search,
  MessageSquare,
  Scale,
  Settings,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default async function AccountPage() {
  const user = await getCurrentUser();

  const [favCount, searchCount, inquiryCount] = await Promise.all([
    user ? prisma.favorite.count({ where: { userId: user.id } }) : 0,
    user ? prisma.savedSearch.count({ where: { userId: user.id } }) : 0,
    user ? prisma.inquiry.count({ where: { userId: user.id } }) : 0,
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt={user?.name || "User"}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name}</h1>
              <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {user?.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{user?.email}</p>
          </div>
        </div>

        {user?.role === "ADMIN" ? (
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-purple-800 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin Moderation</span>
          </Link>
        ) : user?.role === "AGENT" || user?.role === "OWNER" ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
          >
            <Briefcase className="h-4 w-4" />
            <span>Listing Dashboard</span>
          </Link>
        ) : null}
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/account/saved"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Heart className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">{favCount}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-4 group-hover:text-brand-700 transition-colors">
            Saved Properties
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Shortlisted residences and custom notes.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-700">
            <span>View Saved</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        <Link
          href="/account/searches"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Search className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">{searchCount}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-4 group-hover:text-brand-700 transition-colors">
            Saved Searches
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Custom notification alerts and filter presets.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-700">
            <span>Manage Alerts</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        <Link
          href="/account/inquiries"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">{inquiryCount}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-4 group-hover:text-brand-700 transition-colors">
            Inquiries & Tours
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Status of viewing requests and agent conversations.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-700">
            <span>View Inquiries</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </div>

      {/* Property Comparison Shortcut */}
      <div className="rounded-3xl bg-gradient-to-tr from-brand-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="h-4 w-4" />
            <span>Decision Support</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Compare Shortlisted Properties
          </h2>
          <p className="text-xs text-slate-300 max-w-lg">
            Evaluate square footage, price per sqft, amenities, and locations in a clean side-by-side matrix.
          </p>
        </div>
        <Link
          href="/account/compare"
          className="rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-900 shadow hover:bg-slate-100 transition-all shrink-0"
        >
          Open Comparison Table →
        </Link>
      </div>
    </div>
  );
}

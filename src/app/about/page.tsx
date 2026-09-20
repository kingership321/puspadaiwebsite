import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Award, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1 text-xs font-bold text-brand-700">
          <Building2 className="h-3.5 w-3.5" />
          <span>About HavenEstate</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Redefining the standard of property discovery.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          HavenEstate was founded on a simple principle: high-value real estate transactions deserve a digital experience marked by transparency, verified inventory, and architectural reverence.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Ghost Listings</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every home on HavenEstate is verified directly through licensed brokers and property registries. No outdated bait-and-switch listings.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Architectural Pedigree</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We celebrate fine residential craftsmanship, showcasing full-resolution photography, authentic floor plans, and comprehensive amenity details.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Fiduciary Respect</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your inquiry inquiries are private and routed only to designated representatives. We never sell your personal contact information to third-party telemarketers.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to discover your next home?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Explore over 100+ active residences across Tokyo, Osaka, Kyoto, Yokohama, and Fukuoka.
        </p>
        <div className="pt-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-brand-400 transition-colors"
          >
            <span>Search All Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

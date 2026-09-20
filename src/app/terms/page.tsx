import React from "react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-700">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
      <p className="text-xs text-slate-400">Effective Date: September 20, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using HavenEstate, you agree to comply with and be bound by these Terms of Service and all applicable real estate licensing regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Equal Housing Opportunity</h2>
          <p>
            HavenEstate conducts all business in strict accordance with federal, state, and international Fair Housing legislation. We prohibit any advertising or practices that express preference or discrimination based on race, color, religion, sex, handicap, familial status, or national origin.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Accuracy of Listing Data</h2>
          <p>
            While all listings are verified through licensed representatives, information including price, square footage, and availability are subject to prior sale, lease, or withdrawal without notice.
          </p>
        </section>
      </div>
    </div>
  );
}

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-700">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Effective Date: September 20, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            HavenEstate collects information you provide directly to us when you create an account, save properties, configure automated search alerts, or submit a viewing inquiry through our platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Information</h2>
          <p>
            We use collected data solely to deliver real estate discovery services, route inquiries to licensed listing brokers, and maintain platform security. We do not sell or monetize personal contact information to third-party telemarketing operations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            All transmission occurs over secure encrypted protocols. Data is maintained within high-compliance data centers with strict access authorization and audit log monitoring.
          </p>
        </section>
      </div>
    </div>
  );
}

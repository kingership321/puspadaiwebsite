import React from "react";
import Link from "next/link";
import { BookOpen, Compass, ShieldCheck, Key, Calculator, ArrowRight } from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      slug: "first-time-homebuyer-roadmap",
      title: "The Comprehensive First-Time Homebuyer Roadmap",
      category: "Buying Guide",
      readTime: "8 min read",
      description: "Everything you need to know from mortgage pre-approval and escrow to appraisal inspections and closing day fees.",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    },
    {
      slug: "luxury-rental-checklist",
      title: "Navigating High-End Urban Rentals: The Executive Checklist",
      category: "Tenant Guide",
      readTime: "6 min read",
      description: "Understanding board packages, lease guarantees, pet deposits, and negotiating private amenities in premier metropolitan buildings.",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    },
    {
      slug: "real-estate-investment-yields",
      title: "Maximizing Cap Rates and Rental Yields in Global Metropolises",
      category: "Investment",
      readTime: "10 min read",
      description: "A deep dive into property appreciation cycles, short-term vs. long-term residential yields, and tax incentives.",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    },
    {
      slug: "sustainable-home-renovation",
      title: "Architectural Retrofits: Increasing Asset Value with Green Tech",
      category: "Sustainability",
      readTime: "5 min read",
      description: "How EV charging infrastructure, solar glass, and smart energy automation increase property equity and buyer demand.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="h-4 w-4" />
          <span>Real Estate Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Guides, Market Insights & Relocation Advice
        </h1>
        <p className="mt-3 text-base text-slate-500 leading-relaxed">
          Authoritative intelligence curated by certified property specialists to help you make informed real estate acquisitions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((g) => (
          <div
            key={g.slug}
            className="group rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <img
                src={g.imageUrl}
                alt={g.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                {g.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400">{g.readTime}</span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors mt-1">
                  {g.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {g.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-brand-700">
                <span>Read Full Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

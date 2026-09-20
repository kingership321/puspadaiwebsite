import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Mail, Phone, MapPin, Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Haven<span className="text-brand-400">Estate</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
              HavenEstate is a modern, transparent real-estate marketplace connecting discerning seekers, owners, and licensed agents across premier global metropolises.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verified broker listings & encrypted inquiry routing.</span>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Discovery</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rent" className="hover:text-white transition-colors">Homes for Rent</Link></li>
              <li><Link href="/buy" className="hover:text-white transition-colors">Properties for Sale</Link></li>
              <li><Link href="/search?propertyType=APARTMENT" className="hover:text-white transition-colors">Apartments & Flats</Link></li>
              <li><Link href="/search?propertyType=CONDO" className="hover:text-white transition-colors">Luxury Condominiums</Link></li>
              <li><Link href="/search?propertyType=HOUSE" className="hover:text-white transition-colors">Single Family Estates</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Metropolises</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/city/new-york" className="hover:text-white transition-colors">New York City, NY</Link></li>
              <li><Link href="/city/london" className="hover:text-white transition-colors">London, UK</Link></li>
              <li><Link href="/city/seattle" className="hover:text-white transition-colors">Seattle, WA</Link></li>
              <li><Link href="/city/austin" className="hover:text-white transition-colors">Austin, TX</Link></li>
              <li><Link href="/city/chicago" className="hover:text-white transition-colors">Chicago, IL</Link></li>
            </ul>
          </div>

          {/* Platform & Company */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Resources</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="hover:text-white transition-colors">Buyer & Tenant Guides</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About HavenEstate</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HavenEstate Inc. All rights reserved. Equal Housing Opportunity.</p>
          <div className="flex items-center gap-4">
            <span>Built strictly to specifications</span>
            <span>•</span>
            <Link href="/admin" className="text-slate-400 hover:text-slate-200">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

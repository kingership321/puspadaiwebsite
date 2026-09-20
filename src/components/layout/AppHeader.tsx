"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Heart,
  User,
  Menu,
  X,
  Compass,
  Layers,
  ChevronDown,
  ShieldCheck,
  Briefcase,
  Home,
  CheckCircle2,
  Scale,
  Globe,
  PlusCircle,
} from "lucide-react";
import { UserRole } from "@/types";
import { useLanguage } from "@/lib/LanguageContext";

interface AppHeaderProps {
  initialRole?: UserRole;
  favoritesCount?: number;
}

export function AppHeader({ initialRole = "SEEKER", favoritesCount = 0 }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>(initialRole);
  const [favCount, setFavCount] = useState(favoritesCount);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    // Read role cookie if present
    const match = document.cookie.match(new RegExp("(^| )haven_role=([^;]+)"));
    if (match && match[2]) {
      setCurrentRole(match[2] as UserRole);
    }
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    document.cookie = `haven_role=${role}; path=/; max-age=31536000`;
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    router.refresh();
  };

  const navLinks = [
    { href: "/rent", label: t.rent },
    { href: "/buy", label: t.buy },
    { href: "/search", label: t.all },
    { href: "/guides", label: t.guides },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 text-slate-900 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Haven<span className="text-brand-600">SUUMO</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                {t.brandTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons & Persona Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bilingual Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all active:scale-95"
            title="Switch Language / 言語切替"
          >
            <Globe className="h-3.5 w-3.5 text-brand-600" />
            <span className={lang === "ja" ? "text-brand-700 font-bold" : "text-slate-400"}>JP</span>
            <span className="text-slate-300">|</span>
            <span className={lang === "en" ? "text-brand-700 font-bold" : "text-slate-400"}>EN</span>
          </button>

          {/* Compare shortcut */}
          <Link
            href="/account/compare"
            className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            title="Property comparison"
          >
            <Scale className="h-4 w-4 text-slate-500" />
            <span>{t.compare}</span>
          </Link>

          {/* Favorites link */}
          <Link
            href="/account/saved"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition-colors"
            title="Saved Properties"
          >
            <Heart className="h-5 w-5" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
                {favCount}
              </span>
            )}
          </Link>

          {/* Persona / Demo Role Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-all focus:outline-none"
              title="Switch demo user persona"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="capitalize">{currentRole.toLowerCase()} Mode</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Switch Active Persona
                </div>
                {(["SEEKER", "OWNER", "AGENT", "ADMIN"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleSwitchRole(role)}
                    className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {role === "SEEKER" && <User className="h-4 w-4 text-blue-500" />}
                      {role === "OWNER" && <Home className="h-4 w-4 text-amber-500" />}
                      {role === "AGENT" && <Briefcase className="h-4 w-4 text-emerald-500" />}
                      {role === "ADMIN" && <ShieldCheck className="h-4 w-4 text-purple-500" />}
                      <span className="capitalize">{role.toLowerCase()}</span>
                    </div>
                    {currentRole === role && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role specific CTA button */}
          {currentRole === "ADMIN" ? (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-800 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Center
            </Link>
          ) : currentRole === "OWNER" ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/dashboard/listings/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Post Housing (物件掲載)</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Home className="h-3.5 w-3.5 text-amber-500" />
                <span>Owner Portal</span>
              </Link>
            </div>
          ) : currentRole === "AGENT" ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/dashboard/listings/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>New Listing</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Briefcase className="h-3.5 w-3.5 text-brand-600" />
                <span>Dashboard</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/account"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <User className="h-3.5 w-3.5 text-slate-500" />
              My Account
            </Link>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden animate-fade-in space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-slate-500" />
              My Account
            </Link>
            {currentRole === "OWNER" && (
              <>
                <Link
                  href="/dashboard/listings/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-amber-50 text-amber-700 px-3 py-2 text-sm font-semibold"
                >
                  <PlusCircle className="h-4 w-4" />
                  Post Housing (物件掲載)
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <Home className="h-4 w-4 text-amber-500" />
                  Owner Portal
                </Link>
              </>
            )}
            {currentRole === "AGENT" && (
              <>
                <Link
                  href="/dashboard/listings/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-brand-50 text-brand-700 px-3 py-2 text-sm font-semibold"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Listing
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <Briefcase className="h-4 w-4 text-brand-600" />
                  Agent Dashboard
                </Link>
              </>
            )}
            {currentRole === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg bg-purple-50 text-purple-700 px-3 py-2 text-sm font-semibold"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Moderation
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

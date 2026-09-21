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
  LogOut,
  Sparkles,
  Phone,
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>(initialRole);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [favCount, setFavCount] = useState(favoritesCount);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    // Check logged out cookie
    const loggedOutMatch = document.cookie.match(new RegExp("(^| )haven_logged_out=([^;]+)"));
    if (loggedOutMatch && loggedOutMatch[2] === "true") {
      setIsLoggedOut(true);
    }

    // Fetch user from API
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          setCurrentRole(data.user.role as UserRole);
          setIsLoggedOut(false);
        } else {
          setIsLoggedOut(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    document.cookie = `haven_role=${role}; path=/; max-age=31536000`;
    document.cookie = "haven_logged_out=; path=/; max-age=0";
    setCurrentRole(role);
    setIsLoggedOut(false);
    setUserDropdownOpen(false);
    router.refresh();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    document.cookie = "haven_logged_out=true; path=/; max-age=604800";
    document.cookie = "haven_user_id=; path=/; max-age=0";
    setCurrentUser(null);
    setIsLoggedOut(true);
    setUserDropdownOpen(false);
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/rent", label: lang === "ja" ? "賃貸" : "Rent" },
    { href: "/buy", label: lang === "ja" ? "購入" : "Buy" },
    { href: "/search", label: lang === "ja" ? "物件一覧" : "Listings" },
    { href: "/guides", label: lang === "ja" ? "ガイド" : "Guides" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/98 shadow-xs transition-all">
      {/* 0. Youth-Friendly Top Utility Ribbon */}
      <div className="hidden lg:block bg-gradient-to-r from-emerald-50 via-slate-50 to-amber-50/50 border-b border-slate-200/80 text-xs text-slate-600 py-1.5 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-2.5 text-[11px] shrink-0 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
              <Sparkles className="h-3 w-3 text-emerald-600 shrink-0" />
              <span className="shrink-0 whitespace-nowrap">Z世代・若者の住まい探し</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-bold hidden xl:flex items-center gap-1 shrink-0 whitespace-nowrap">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="shrink-0 whitespace-nowrap">営業電話ゼロ保証 • オンライン内見OK</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] shrink-0 whitespace-nowrap ml-auto">
            <a
              href="https://line.me/R/ti/p/@havensuumo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#06C755] font-black hover:underline shrink-0 whitespace-nowrap"
            >
              <span className="shrink-0 whitespace-nowrap">LINEでサクッと相談</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#06C755] animate-ping shrink-0" />
            </a>
            <span className="text-slate-300">|</span>
            <Link href="/guides" className="text-slate-500 hover:text-emerald-700 transition-colors shrink-0 whitespace-nowrap">
              一人暮らしガイド
            </Link>
            <Link href="/about" className="text-slate-500 hover:text-emerald-700 transition-colors shrink-0 whitespace-nowrap">
              運営会社
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-1.5 sm:gap-2 px-3 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 lg:gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-2 text-slate-900 group shrink-0 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00a854] to-[#10b981] text-white shadow-md shadow-[#00a854]/20 group-hover:scale-105 transition-transform shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none shrink-0 whitespace-nowrap">
                  Haven<span className="text-[#00a854]">SUUMO</span>
                </span>
                <span className="rounded bg-emerald-100 text-[#008836] text-[9px] font-extrabold px-1 py-0.2 shrink-0 whitespace-nowrap">
                  公式
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-0.5 hidden sm:block whitespace-nowrap truncate max-w-[150px] lg:max-w-[210px]">
                {lang === "ja" ? "理想のお部屋探しポータル" : "Lifestyle Housing Portal"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-[#008836] border border-emerald-200"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#00a854]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons & Auth Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Direct LINE Consultation Quick Button */}
          <a
            href="https://line.me/R/ti/p/@havensuumo"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white px-2.5 lg:px-3 py-1.5 text-xs font-black shadow-xs transition-all hover:scale-[1.02] shrink-0 whitespace-nowrap"
            title="LINEで無料相談・空室確認"
          >
            <span className="text-[10px] font-black bg-white/25 px-1 rounded-sm shrink-0">LINE</span>
            <span className="shrink-0 whitespace-nowrap">{lang === "ja" ? "相談" : "Consult"}</span>
          </a>

          {/* Bilingual Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all active:scale-95 shrink-0 whitespace-nowrap"
            title="Switch Language / 言語切替"
          >
            <Globe className="h-3.5 w-3.5 text-brand-600 shrink-0" />
            <span className={lang === "ja" ? "text-brand-700 font-bold shrink-0" : "text-slate-400 shrink-0"}>JP</span>
            <span className="text-slate-300 shrink-0">|</span>
            <span className={lang === "en" ? "text-brand-700 font-bold shrink-0" : "text-slate-400 shrink-0"}>EN</span>
          </button>

          {/* Compare shortcut */}
          <Link
            href="/account/compare"
            className="hidden xl:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors shrink-0 whitespace-nowrap"
            title="Property comparison"
          >
            <Scale className="h-4 w-4 text-slate-500 shrink-0" />
            <span className="shrink-0 whitespace-nowrap">{t.compare}</span>
          </Link>

          {/* Favorites link */}
          <Link
            href="/account/saved"
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition-colors shrink-0"
            title="Saved Properties"
          >
            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow shrink-0">
                {favCount}
              </span>
            )}
          </Link>

          {/* Auth State: Logged In vs Logged Out (Hidden on mobile top bar, accessible in hamburger menu) */}
          {isLoggedOut ? (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shrink-0 whitespace-nowrap"
              >
                {lang === "ja" ? "ログイン" : "Log In"}
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-brand-600 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors shrink-0 whitespace-nowrap"
              >
                {lang === "ja" ? "新規登録" : "Sign Up"}
              </Link>
            </div>
          ) : (
            <>
              {/* User Account / Persona Dropdown (shown on sm+ screens) */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-all focus:outline-none"
                  title="User profile & role"
                >
                  <span className={`h-2 w-2 rounded-full ${
                    currentRole === "OWNER"
                      ? "bg-amber-500"
                      : currentRole === "ADMIN"
                      ? "bg-purple-500"
                      : currentRole === "AGENT"
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                  }`} />
                  <span className="font-bold truncate max-w-[90px] sm:max-w-[120px]">
                    {currentUser?.name || `${currentRole} Mode`}
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl z-50 animate-fade-in divide-y divide-slate-100">
                    {/* User Info Header */}
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser?.name || "Marketplace User"}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser?.email || `${currentRole.toLowerCase()}@havenestate.com`}
                      </p>
                      <span className={`inline-block mt-1.5 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        currentRole === "OWNER"
                          ? "bg-amber-100 text-amber-800"
                          : currentRole === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : currentRole === "AGENT"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {currentRole} ROLE
                      </span>
                    </div>

                    {/* Navigation Actions */}
                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <User className="h-4 w-4 text-slate-500" />
                        <span>My Account (マイページ)</span>
                      </Link>

                      {(currentRole === "OWNER" || currentRole === "AGENT") && (
                        <Link
                          href="/dashboard/listings/new"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50"
                        >
                          <PlusCircle className="h-4 w-4 text-amber-600" />
                          <span>Post Housing (物件掲載)</span>
                        </Link>
                      )}

                      {(currentRole === "OWNER" || currentRole === "AGENT") && (
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Briefcase className="h-4 w-4 text-slate-500" />
                          <span>Management Dashboard</span>
                        </Link>
                      )}

                      {currentRole === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50"
                        >
                          <ShieldCheck className="h-4 w-4 text-purple-600" />
                          <span>Admin Moderation Center</span>
                        </Link>
                      )}
                    </div>

                    {/* Fast Persona Switcher (For Demo/Evaluation) */}
                    <div className="py-1 px-2">
                      <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        Switch Persona (体験切替)
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {(["SEEKER", "OWNER", "AGENT", "ADMIN"] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => handleSwitchRole(r)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              currentRole === r
                                ? "bg-slate-100 font-bold text-brand-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span className="capitalize">{r.toLowerCase()}</span>
                            {currentRole === r && <CheckCircle2 className="h-3 w-3 text-brand-600 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Log Out */}
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out (ログアウト)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Role-specific CTA button */}
              {currentRole === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-purple-800 transition-colors shrink-0 whitespace-nowrap"
                >
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  <span className="shrink-0 whitespace-nowrap">Admin Center</span>
                </Link>
              ) : currentRole === "OWNER" ? (
                <Link
                  href="/dashboard/listings/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 transition-colors shrink-0 whitespace-nowrap"
                >
                  <PlusCircle className="h-3.5 w-3.5 shrink-0" />
                  <span className="shrink-0 whitespace-nowrap">Post Housing</span>
                </Link>
              ) : currentRole === "AGENT" ? (
                <Link
                  href="/dashboard/listings/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors shrink-0 whitespace-nowrap"
                >
                  <PlusCircle className="h-3.5 w-3.5 shrink-0" />
                  <span className="shrink-0 whitespace-nowrap">New Listing</span>
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0 whitespace-nowrap"
                >
                  <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="shrink-0 whitespace-nowrap">My Account</span>
                </Link>
              )}
            </>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden animate-fade-in space-y-3">
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
            {isLoggedOut ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                {/* Mobile User Role Switcher Card */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser?.name || "Marketplace User"}
                      </p>
                      <span className={`inline-block mt-0.5 rounded px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider ${
                        currentRole === "OWNER"
                          ? "bg-amber-100 text-amber-800"
                          : currentRole === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : currentRole === "AGENT"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {currentRole} ROLE
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-200/80">
                    {(["SEEKER", "OWNER", "AGENT", "ADMIN"] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => handleSwitchRole(r)}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                          currentRole === r
                            ? "bg-white font-bold text-brand-700 shadow-2xs"
                            : "text-slate-600 hover:bg-white"
                        }`}
                      >
                        <span className="capitalize">{r.toLowerCase()}</span>
                        {currentRole === r && <CheckCircle2 className="h-3 w-3 text-brand-600 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-slate-500" />
                  My Account (マイページ)
                </Link>

                {(currentRole === "OWNER" || currentRole === "AGENT") && (
                  <Link
                    href="/dashboard/listings/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-amber-50 text-amber-700 px-3 py-2 text-sm font-semibold"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Post Housing (物件掲載)
                  </Link>
                )}

                {(currentRole === "OWNER" || currentRole === "AGENT") && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    <Briefcase className="h-4 w-4 text-slate-600" />
                    Management Dashboard
                  </Link>
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

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out (ログアウト)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

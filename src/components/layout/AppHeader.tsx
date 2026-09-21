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

        {/* Right Action Icons & Auth Controls */}
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

          {/* Auth State: Logged In vs Logged Out */}
          {isLoggedOut ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              {/* User Account / Persona Dropdown */}
              <div className="relative">
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
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-800 transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin Center
                </Link>
              ) : currentRole === "OWNER" ? (
                <Link
                  href="/dashboard/listings/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Post Housing (物件掲載)</span>
                </Link>
              ) : currentRole === "AGENT" ? (
                <Link
                  href="/dashboard/listings/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>New Listing</span>
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  My Account
                </Link>
              )}
            </>
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
                  className="text-center rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center rounded-xl bg-brand-600 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-slate-500" />
                  My Account
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

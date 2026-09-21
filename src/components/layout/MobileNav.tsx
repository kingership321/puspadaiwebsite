"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Scale, User, PlusCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function MobileNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const items = [
    { href: "/search", label: lang === "ja" ? "さがす" : "Search", icon: Search },
    { href: "/account/saved", label: lang === "ja" ? "お気に入り" : "Saved", icon: Heart },
    { href: "/dashboard/listings/new", label: lang === "ja" ? "掲載する" : "Post", icon: PlusCircle },
    { href: "/account/compare", label: lang === "ja" ? "比較" : "Compare", icon: Scale },
    { href: "/account", label: lang === "ja" ? "マイページ" : "Account", icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 z-40 flex h-[calc(3.75rem+env(safe-area-inset-bottom,0px))] pb-[env(safe-area-inset-bottom,0px)] w-full items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-1 md:hidden shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center py-1 text-[10px] sm:text-[11px] font-bold transition-all active:scale-95 ${
              isActive ? "text-emerald-700 font-black" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon
              className={`h-5 w-5 mb-0.5 transition-transform ${
                isActive ? "text-emerald-700 stroke-[2.5] scale-110" : "text-slate-400"
              }`}
            />
            <span className="truncate max-w-[60px] text-center">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Scale, User, PlusCircle } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/search", label: "Search", icon: Search },
    { href: "/account/saved", label: "Saved", icon: Heart },
    { href: "/dashboard/listings/new", label: "Post", icon: PlusCircle },
    { href: "/account/compare", label: "Compare", icon: Scale },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 text-[11px] font-medium transition-colors ${
              isActive ? "text-brand-700 font-bold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className={`h-5 w-5 mb-0.5 ${isActive ? "text-brand-700 stroke-[2.5]" : "text-slate-400"}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

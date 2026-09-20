import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "JPY", lang: "en" | "ja" = "en"): string {
  if (currency === "JPY") {
    if (lang === "ja") {
      if (amount >= 10_000) {
        const man = amount / 10_000;
        return `${Number.isInteger(man) ? man : man.toFixed(1)}万円`;
      }
      return `¥${amount.toLocaleString("ja-JP")}`;
    }
    return `¥${amount.toLocaleString("en-US")}`;
  }

  return new Intl.NumberFormat(lang === "ja" ? "ja-JP" : "en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatJapanesePrice(amount: number, isRent = false, lang: "en" | "ja" = "ja"): string {
  if (lang === "ja") {
    if (amount >= 10_000) {
      const man = amount / 10_000;
      const formatted = isRent 
        ? `${Number.isInteger(man) ? man : man.toFixed(1)}万円` 
        : `${Math.floor(man).toLocaleString("ja-JP")}万円`;
      return formatted;
    }
    return `¥${amount.toLocaleString("ja-JP")}`;
  }
  return `¥${amount.toLocaleString("en-US")}`;
}

export function formatPriceCompact(amount: number, currency = "JPY", lang: "en" | "ja" = "en"): string {
  if (currency === "JPY") {
    if (amount >= 100_000_000) {
      const oku = (amount / 100_000_000).toFixed(1);
      return lang === "ja" ? `${oku}億円` : `¥${oku}00M`;
    }
    if (amount >= 10_000) {
      const man = (amount / 10_000).toFixed(amount % 10_000 === 0 ? 0 : 1);
      return lang === "ja" ? `${man}万円` : `¥${man}0k`;
    }
    return `¥${amount.toLocaleString()}`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}k`;
  }
  return formatCurrency(amount, currency, lang);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

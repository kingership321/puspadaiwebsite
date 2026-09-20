import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "SUUMO Style — Japan Bilingual Real Estate Marketplace (住まい・賃貸・売買)",
  description:
    "Japan's premier bilingual real estate marketplace. Explore rental apartments, tower mansions, and architectural homes across Tokyo, Osaka, Kyoto, Yokohama, and Fukuoka with station walk distances and 万円 pricing.",
  keywords: [
    "Japan real estate",
    "Tokyo apartments for rent",
    "Osaka mansions",
    "Kyoto machiya",
    "SUUMO",
    "賃貸",
    "マンション",
    "不動産",
    "駅徒歩",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans pb-16 md:pb-0">
        <LanguageProvider>
          <AppHeader initialRole={user?.role} />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </LanguageProvider>
      </body>
    </html>
  );
}

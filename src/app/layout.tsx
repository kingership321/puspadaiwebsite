import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
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

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

import { LanguageProvider } from "@/lib/LanguageContext";

import { LineConsultationWidget } from "@/components/layout/LineConsultationWidget";

export const metadata: Metadata = {
  title: "HavenSUUMO — 暮らしを楽しむ、お部屋探しポータル (賃貸・売買)",
  description:
    "Z世代・ミレニアル世代に向けた次世代の住まい探し。写真とリアルな口コミ、LINE相談、敷金礼金0円特集、駅近5分マンションを網羅。",
  keywords: [
    "賃貸",
    "一人暮らし",
    "デザイナーズ",
    "リノベーション",
    "敷金礼金0円",
    "LINE相談",
    "SUUMO",
    "マンション",
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
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 font-sans pb-16 md:pb-0 selection:bg-rose-500 selection:text-white w-full max-w-full overflow-x-hidden">
        <LanguageProvider>
          <AppHeader initialRole={user?.role} />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
          <MobileNav />
          <LineConsultationWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}

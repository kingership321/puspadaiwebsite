import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Mail, Phone, MapPin, Compass, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      {/* Association Badges & Trust Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              おとり広告防止ガイドライン準拠
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>一般社団法人 不動産公正取引協議会賛助</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>国土交通大臣免許 (3) 第88204号 提携ネットワーク</span>
          </div>
          <span className="text-slate-500 font-mono">ALL LISTINGS VERIFIED DAILY</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Haven<span className="text-emerald-400">SUUMO</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold tracking-wider mt-0.5">
                  暮らしを楽しむ、お部屋探しポータル
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs text-slate-400 leading-relaxed">
              HavenSUUMOは、Z世代・ミレニアル世代に向けた次世代の住まい探しポータルです。全物件おとり広告ゼロ・LINEでサクッと相談＆来店不要オンライン内見に対応しています。
            </p>

            <div className="pt-2">
              <a
                href="https://line.me/R/ti/p/@havensuumo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#06C755] hover:bg-[#05b34c] px-4 py-2 text-xs font-black text-white shadow-md transition-all"
              >
                <span>公式LINEで無料相談・空室確認</span>
              </a>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">賃貸・売買を探す</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/rent" className="hover:text-emerald-400 transition-colors">賃貸マンション・アパート</Link></li>
              <li><Link href="/buy" className="hover:text-emerald-400 transition-colors">新築・中古マンション購入</Link></li>
              <li><Link href="/search?deposit=0&keyMoney=0" className="hover:text-emerald-400 transition-colors">敷金・礼金0円物件特集</Link></li>
              <li><Link href="/search?walkMinutes=5" className="hover:text-emerald-400 transition-colors">駅近・徒歩5分以内</Link></li>
              <li><Link href="/search?propertyType=MANSION" className="hover:text-emerald-400 transition-colors">分譲賃貸・タワーマンション</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">主要エリア・沿線</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/search?city=tokyo" className="hover:text-emerald-400 transition-colors">東京都心 (港区・渋谷区・新宿区)</Link></li>
              <li><Link href="/search?query=山手線" className="hover:text-emerald-400 transition-colors">JR山手線沿線</Link></li>
              <li><Link href="/search?city=osaka" className="hover:text-emerald-400 transition-colors">大阪 (梅田・難波・本町)</Link></li>
              <li><Link href="/search?city=kyoto" className="hover:text-emerald-400 transition-colors">京都 (烏丸・四条・中京区)</Link></li>
              <li><Link href="/search?city=yokohama" className="hover:text-emerald-400 transition-colors">横浜 (みなとみらい・中区)</Link></li>
            </ul>
          </div>

          {/* Platform & Company */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">企業情報・サポート</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/guides" className="hover:text-emerald-400 transition-colors">お部屋探しの基礎知識・ガイド</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">運営会社概要</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">個人情報保護方針</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">利用規約</Link></li>
              <li><Link href="/dashboard/listings/new" className="hover:text-[#ff6b00] font-bold transition-colors">オーナー様 物件無料掲載</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} HavenSUUMO Real Estate Co., Ltd. All rights reserved. 宅地建物取引業者免許証番号: 国土交通大臣 (3) 第88204号</p>
          <div className="flex items-center gap-4">
            <Link href="/login?redirect=/admin&requiredRole=ADMIN" className="hover:text-slate-300">管理画面ログイン</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-300">プライバシーポリシー</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">サイトマップ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

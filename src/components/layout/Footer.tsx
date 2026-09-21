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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-700/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Haven<span className="text-emerald-400">SUUMO</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase mt-0.5">
                  Professional Japanese Real Estate Portal
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs text-slate-400 leading-relaxed">
              HavenSUUMO（ヘイブンスーモ）は、東京都心・首都圏・関西・主要都市の優良物件を網羅する次世代リアルエステートポータルです。全物件おとり広告ゼロ・専任宅建士監修の正確な物件概要をお届けします。
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>東京都千代田区丸の内1-9-1 丸の内中央ビル</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>0120-800-928（平日 09:30〜19:00）</span>
              </p>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">賃貸・売買を探す</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/rent" className="hover:text-white transition-colors">賃貸物件を探す (Rent)</Link></li>
              <li><Link href="/buy" className="hover:text-white transition-colors">売買マンション・戸建 (Buy)</Link></li>
              <li><Link href="/search?deposit=0&keyMoney=0" className="hover:text-white transition-colors">敷金・礼金0円物件</Link></li>
              <li><Link href="/search?walkMinutes=5" className="hover:text-white transition-colors">駅近・徒歩5分以内</Link></li>
              <li><Link href="/search?propertyType=MANSION" className="hover:text-white transition-colors">分譲賃貸・タワーマンション</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">主要エリア・沿線</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/search?city=tokyo" className="hover:text-white transition-colors">東京都心 (港区・渋谷区・新宿区)</Link></li>
              <li><Link href="/search?city=osaka" className="hover:text-white transition-colors">大阪 (梅田・難波・本町)</Link></li>
              <li><Link href="/search?city=kyoto" className="hover:text-white transition-colors">京都 (烏丸・四条・中京区)</Link></li>
              <li><Link href="/search?city=yokohama" className="hover:text-white transition-colors">横浜 (みなとみらい・中区)</Link></li>
              <li><Link href="/search?city=fukuoka" className="hover:text-white transition-colors">福岡 (天神・博多・中央区)</Link></li>
            </ul>
          </div>

          {/* Platform & Company */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">企業情報・サポート</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/guides" className="hover:text-white transition-colors">お部屋探しの基礎知識・ガイド</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">運営会社概要</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">個人情報保護方針</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors">宅建業者・管理会社ポータル</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} HavenSUUMO Real Estate Co., Ltd. All rights reserved. 宅地建物取引業者免許証番号: 国土交通大臣 (3) 第88204号</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-300">管理画面ログイン</Link>
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

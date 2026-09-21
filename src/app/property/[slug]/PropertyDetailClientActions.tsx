"use client";

import React, { useState } from "react";
import { PropertyDto } from "@/types";
import { Button } from "@/components/ui/Button";
import { InquiryModal } from "@/components/property/InquiryModal";
import { ShareModal } from "@/components/property/ShareModal";
import { Heart, Share2, Calendar, FileText, Check, PhoneCall, Sparkles } from "lucide-react";

interface Props {
  property: PropertyDto;
}

export function PropertyDetailClientActions({ property }: Props) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"MESSAGE" | "TOUR">("TOUR");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleToggleSave = async () => {
    setSaveLoading(true);
    try {
      if (isSaved) {
        await fetch(`/api/favorites?propertyId=${property.id}`, { method: "DELETE" });
        setIsSaved(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: property.id }),
        });
        setIsSaved(true);
      }
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleOpenInquiry = (type: "MESSAGE" | "TOUR") => {
    setInquiryType(type);
    setInquiryModalOpen(true);
  };

  return (
    <>
      <div className="rounded-2xl border-2 border-emerald-600/30 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              内見・空室お問い合わせ (無料)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleSave}
              disabled={saveLoading}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 ${
                isSaved
                  ? "border-rose-300 bg-rose-50 text-rose-600"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-rose-500"
              }`}
              title="お気に入りに追加"
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95"
              title="物件を共有"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 active:scale-[0.99] transition-all"
            onClick={() => handleOpenInquiry("TOUR")}
          >
            <Calendar className="h-4 w-4" />
            <span>空室確認・内見予約をする（無料）</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2.5 px-4 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-[0.99] transition-all"
            onClick={() => handleOpenInquiry("MESSAGE")}
          >
            <FileText className="h-4 w-4" />
            <span>最新の資料・間取り図を取り寄せる</span>
          </button>
        </div>

        <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>現地待ち合わせ・オンライン内見可能</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>宅建士が最新の空室状況を即日ご返答</span>
          </div>
        </div>
      </div>

      {/* Inquiry & Tour Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={property}
        initialType={inquiryType}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        property={property}
      />
    </>
  );
}

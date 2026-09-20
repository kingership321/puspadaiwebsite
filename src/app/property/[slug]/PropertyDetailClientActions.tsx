"use client";

import React, { useState } from "react";
import { PropertyDto } from "@/types";
import { Button } from "@/components/ui/Button";
import { InquiryModal } from "@/components/property/InquiryModal";
import { ShareModal } from "@/components/property/ShareModal";
import { Heart, Share2, Calendar, MessageSquare, Check } from "lucide-react";

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
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Direct Inquiries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleSave}
              disabled={saveLoading}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isSaved
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-rose-500"
              }`}
              title="Save to favorites"
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
              title="Share listing"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2 font-bold shadow-md shadow-brand-700/20"
            onClick={() => handleOpenInquiry("TOUR")}
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Private Tour</span>
          </Button>

          <Button
            variant="outline"
            size="md"
            className="w-full flex items-center justify-center gap-2 font-bold text-slate-800"
            onClick={() => handleOpenInquiry("MESSAGE")}
          >
            <MessageSquare className="h-4 w-4 text-brand-700" />
            <span>Send Direct Message</span>
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400">
          Verified response within 2 business hours.
        </p>
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

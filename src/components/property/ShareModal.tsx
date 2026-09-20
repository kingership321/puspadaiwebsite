"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PropertyDto } from "@/types";
import { Copy, Check, Share2, Mail, Send } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyDto;
}

export function ShareModal({ isOpen, onClose, property }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Take a look at this property: ${property.title}`);
    const body = encodeURIComponent(
      `Check out this listing on HavenEstate: ${property.title}\n\nPrice: $${property.price.toLocaleString()}\nAddress: ${property.address}\n\nLink: ${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Property" maxWidth="sm">
      <div className="space-y-4">
        <p className="text-xs text-slate-500">
          Share this listing with family, friends, or your representative.
        </p>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-2 text-xs text-slate-600 focus:outline-none"
          />
          <Button
            size="sm"
            variant={copied ? "secondary" : "primary"}
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </Button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4">
          <button
            onClick={handleEmailShare}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">Email</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

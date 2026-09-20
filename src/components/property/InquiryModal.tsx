"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PropertyDto } from "@/types";
import { Calendar, Mail, Phone, User, CheckCircle2, MessageSquare, Clock } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyDto;
  initialType?: "MESSAGE" | "TOUR";
}

export function InquiryModal({
  isOpen,
  onClose,
  property,
  initialType = "MESSAGE",
}: InquiryModalProps) {
  const [type, setType] = useState<"MESSAGE" | "TOUR">(initialType);
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.seeker@havenestate.com");
  const [phone, setPhone] = useState("+1 (555) 012-3456");
  const [preferredTime, setPreferredTime] = useState("Saturday afternoon");
  const [message, setMessage] = useState(
    initialType === "TOUR"
      ? "I would like to schedule a private walkthrough of this property at your earliest convenience."
      : "Hello, I am interested in this listing. Please provide additional information regarding lease terms and availability."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          agencyId: property.agencyId,
          agentId: property.agentId,
          name,
          email,
          phone,
          message,
          preferredViewingTime: type === "TOUR" ? preferredTime : undefined,
          inquiryType: type,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? "Request Submitted" : "Contact Listing Representative"}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">Thank You, {name}!</h4>
            <p className="mt-1 text-sm text-slate-600 max-w-sm mx-auto">
              Your inquiry regarding <strong className="text-slate-800">{property.title}</strong> has been transmitted directly to {property.agent?.name || property.agency?.name || "the listing representative"}.
            </p>
          </div>
          <div className="pt-4">
            <Button onClick={handleReset} variant="primary" className="w-full">
              Back to Listing
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Listing Mini Card */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <img
              src={property.images?.[0]?.url || ""}
              alt={property.title}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{property.title}</p>
              <p className="text-xs text-slate-500 truncate">{property.address}</p>
            </div>
          </div>

          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setType("MESSAGE")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                type === "MESSAGE"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              General Question
            </button>
            <button
              type="button"
              onClick={() => setType("TOUR")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                type === "TOUR"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Schedule Tour
            </button>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {type === "TOUR" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time / Day</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  placeholder="e.g. This Saturday after 2:00 PM"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs font-medium focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
            >
              {type === "TOUR" ? "Request Private Viewing" : "Send Direct Message"}
            </Button>
            <p className="mt-2 text-[11px] text-center text-slate-400">
              By sending, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}

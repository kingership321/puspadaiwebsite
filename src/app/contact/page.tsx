"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Connect with HavenEstate
        </h1>
        <p className="text-sm text-slate-500">
          Have an inquiry regarding listing syndication, brokerage partnership, or press inquiries? Our concierge team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left 5 cols info */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Headquarters</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Roppongi Hills Mori Tower 38F<br />Minato-ku, Tokyo 106-6138, Japan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-600 shrink-0" />
                <span>+81 3-5555-0199</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-600 shrink-0" />
                <span>concierge@havenestate.com</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-50 border border-brand-200 p-6 text-xs text-brand-900 space-y-2">
            <h4 className="font-bold">Broker Support Center</h4>
            <p className="text-brand-700 leading-relaxed">
              If you are a licensed brokerage principal seeking API listing ingestion or enterprise seat management, please email <span className="font-bold">brokers@havenestate.com</span>.
            </p>
          </div>
        </div>

        {/* Right 7 cols form */}
        <div className="md:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you, {name}. A HavenEstate client concierge will respond to your inquiry within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our team assist you today?"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Dispatch Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

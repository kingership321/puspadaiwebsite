import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Calendar, Mail, Phone, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";

export default async function LeadsPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: {
        include: {
          city: true,
          images: { take: 1 },
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Inquiry Leads CRM</h1>
            <p className="text-xs text-slate-500">
              Incoming prospective buyer and tenant viewing requests.
            </p>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Contact</th>
                <th className="p-4">Listing</th>
                <th className="p-4">Message / Request</th>
                <th className="p-4">Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{inq.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{inq.email}</span>
                      {inq.phone && <span>• {inq.phone}</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800 line-clamp-1 max-w-[200px]">
                      {inq.property?.title}
                    </p>
                    <span className="text-[11px] text-slate-400">{inq.property?.city?.name}</span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="italic text-slate-700 line-clamp-2">&ldquo;{inq.message}&rdquo;</p>
                    {inq.preferredViewingTime && (
                      <span className="text-[11px] text-brand-700 font-semibold block mt-1">
                        Preferred Tour: {inq.preferredViewingTime}
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-slate-700">{inq.inquiryType}</td>
                  <td className="p-4 text-slate-500">{formatDate(inq.createdAt)}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

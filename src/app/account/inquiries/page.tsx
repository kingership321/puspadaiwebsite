import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default async function InquiriesPage() {
  const user = await getCurrentUser();

  const inquiries = user
    ? await prisma.inquiry.findMany({
        where: { userId: user.id },
        include: {
          property: {
            include: {
              images: { orderBy: { sortOrder: "asc" }, take: 1 },
              city: true,
            },
          },
          agency: true,
          agent: true,
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
            Received by Broker
          </span>
        );
      case "CONTACTED":
        return (
          <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
            Agent Responded
          </span>
        );
      case "VIEWING_SCHEDULED":
        return (
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
            Viewing Confirmed
          </span>
        );
      case "CLOSED":
        return (
          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Account</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Inquiries & Tour Requests</h1>
            <p className="text-xs text-slate-500">
              Track status and replies from listing representatives and property owners.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      {inquiries.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-base font-bold text-slate-900">No Inquiries Sent Yet</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            When you schedule a private tour or ask a question about any property, your inquiry status will appear here.
          </p>
          <div className="mt-6">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-bold text-white"
            >
              Browse Homes
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="flex flex-col sm:flex-row gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow transition-shadow"
            >
              <img
                src={inq.property?.images?.[0]?.url || ""}
                alt={inq.property?.title || "Property"}
                className="h-28 w-full sm:w-36 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-400">
                    Sent on {formatDate(inq.createdAt)}
                  </span>
                  {getStatusBadge(inq.status)}
                </div>

                <Link
                  href={`/property/${inq.property?.slug}`}
                  className="text-base font-bold text-slate-900 hover:text-brand-700 line-clamp-1 block"
                >
                  {inq.property?.title}
                </Link>

                <p className="text-xs text-slate-500 line-clamp-1">{inq.property?.address}</p>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900 mb-0.5">Your Message:</p>
                  <p className="italic text-slate-600">&ldquo;{inq.message}&rdquo;</p>
                  {inq.preferredViewingTime && (
                    <div className="mt-2 flex items-center gap-1.5 text-brand-700 font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Requested Time: {inq.preferredViewingTime}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                  <span>Assigned Agent: <strong className="text-slate-800">{inq.agent?.name || inq.agency?.name || "Representative"}</strong></span>
                  <Link
                    href={`/property/${inq.property?.slug}`}
                    className="font-bold text-brand-700 hover:underline"
                  >
                    View Property →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

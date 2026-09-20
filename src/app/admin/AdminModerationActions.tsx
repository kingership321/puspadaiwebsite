"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle } from "lucide-react";

export function AdminModerationActions({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "APPROVE" | "REJECT") => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          action,
          rejectionReason: action === "REJECT" ? "Incomplete specifications or unverified credentials" : undefined,
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="primary"
        size="sm"
        disabled={loading}
        onClick={() => handleAction("APPROVE")}
        className="bg-emerald-600 hover:bg-emerald-700 font-bold"
      >
        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
        Approve
      </Button>

      <Button
        variant="danger"
        size="sm"
        disabled={loading}
        onClick={() => handleAction("REJECT")}
        className="font-bold"
      >
        <XCircle className="h-3.5 w-3.5 mr-1" />
        Reject
      </Button>
    </div>
  );
}

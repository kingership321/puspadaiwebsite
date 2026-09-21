"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  User,
  Home,
  Briefcase,
  Lock,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type AccountRole = "SEEKER" | "OWNER" | "AGENT";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<AccountRole>("SEEKER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          password,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      // Redirect based on selected role
      if (data.user.role === "OWNER" || data.user.role === "AGENT") {
        router.push("/dashboard");
      } else {
        router.push("/search");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-900 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Haven<span className="text-brand-600">Estate</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create Your Account (新規登録)
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Join the premier Japanese real estate marketplace for seekers, landlords, and licensed agencies.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Choose Your Account Type (利用目的)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("SEEKER")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  role === "SEEKER"
                    ? "border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-600/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-1.5">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Seeker</span>
                <span className="text-[10px] text-slate-500">部屋を探す</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("OWNER")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  role === "OWNER"
                    ? "border-amber-500 bg-amber-50/70 text-amber-900 ring-2 ring-amber-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-1.5">
                  <Home className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Owner</span>
                <span className="text-[10px] text-slate-500">貸す・売る</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("AGENT")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  role === "AGENT"
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-600/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-1.5">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Agent</span>
                <span className="text-[10px] text-slate-500">仲介業者</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name (氏名)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kenji Tanaka / 田中 健二"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
                <User className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address (メールアドレス)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Phone Number (電話番号 - Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090-1234-5678"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
                <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password (パスワード)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Minimum 6 characters with secure encryption.
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className={`w-full py-3 shadow-lg ${
              role === "OWNER"
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                : role === "AGENT"
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                : "shadow-brand-700/20"
            }`}
          >
            <span>Create Account (登録を完了する)</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Encrypted credentials saved in Supabase PostgreSQL</span>
          </div>
        </form>

        {/* Footer Link to Login */}
        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-600 hover:underline">
            Log In (ログイン)
          </Link>
        </p>
      </div>
    </div>
  );
}

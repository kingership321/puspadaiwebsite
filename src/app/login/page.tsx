"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  User,
  Home,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      if (redirectPath) {
        router.push(redirectPath);
      } else if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else if (data.user.role === "OWNER" || data.user.role === "AGENT") {
        router.push("/dashboard");
      } else {
        router.push("/search");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: "SEEKER" | "OWNER" | "AGENT" | "ADMIN") => {
    setDemoLoading(role);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demoRole: role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to log in as demo persona.");
      }

      if (redirectPath) {
        router.push(redirectPath);
      } else if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "OWNER" || role === "AGENT") {
        router.push("/dashboard");
      } else {
        router.push("/search");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Demo login failed.");
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
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
            Welcome Back (ログイン)
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to your account to manage housing, favorites, and inquiries.
          </p>
        </div>

        {/* Admin Required Alert Banner */}
        {(redirectPath === "/admin" || searchParams.get("requiredRole") === "ADMIN") && (
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900 shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">
                🔒 管理者認証が必要です (Admin Authentication Required)
              </span>
              <p className="text-slate-600 font-normal leading-relaxed">
                管理ポータル（/admin）へアクセスするには、システム管理者（ADMIN）権限のアカウントでログイン認証を行ってください。
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5"
        >
          <div className="space-y-4">
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password (パスワード)</label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-brand-500 focus:outline-none"
                />
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="w-full py-3 shadow-lg shadow-brand-700/20"
          >
            <span>Log In (ログイン)</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>

          {/* Quick 1-Click Demo Logins for Evaluators & Reviewers */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Quick Demo Access (ワンクリック体験)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={!!demoLoading}
                onClick={() => handleDemoLogin("SEEKER")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-2 text-left transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">Seeker</p>
                  <p className="text-[10px] text-slate-500">Alex M.</p>
                </div>
              </button>

              <button
                type="button"
                disabled={!!demoLoading}
                onClick={() => handleDemoLogin("OWNER")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-2 text-left transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Home className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">Owner</p>
                  <p className="text-[10px] text-slate-500">David S.</p>
                </div>
              </button>

              <button
                type="button"
                disabled={!!demoLoading}
                onClick={() => handleDemoLogin("AGENT")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-2 text-left transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">Agent</p>
                  <p className="text-[10px] text-slate-500">Elena R.</p>
                </div>
              </button>

              <button
                type="button"
                disabled={!!demoLoading}
                onClick={() => handleDemoLogin("ADMIN")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-2 text-left transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">Admin</p>
                  <p className="text-[10px] text-slate-500">Marcus V.</p>
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* Footer Link to Signup */}
        <p className="text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <Link href="/signup" className="font-bold text-brand-600 hover:underline">
            Sign Up (新規登録はこちら)
          </Link>
        </p>
      </div>
    </div>
  );
}

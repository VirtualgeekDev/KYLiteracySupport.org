"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon,
  Copy,
  Check,
  Ban,
  Search,
  Filter,
  LogOut,
  RefreshCw,
  Plus,
  DollarSign,
  Heart,
  Calendar,
  ExternalLink,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  Zap,
  FlaskConical,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export default function AdminDonationsPage() {
  const router = useRouter();

  // Authentication & data states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stripeSettings, setStripeSettings] = useState<any>({ stripe_active: false });
  const [stats, setStats] = useState<any>({});
  const [donations, setDonations] = useState<any[]>([]);
  const [paymentLinks, setPaymentLinks] = useState<any[]>([]);

  // Filter & search states
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Custom link generator form
  const [linkAmount, setLinkAmount] = useState("75");
  const [linkCurrency, setLinkCurrency] = useState<"usd" | "eur" | "gbp">("usd");
  const [linkLanguage, setLinkLanguage] = useState<"en" | "es" | "fr" | "de">("en");
  const [linkDonorName, setLinkDonorName] = useState("");
  const [linkDonorEmail, setLinkDonorEmail] = useState("");
  const [linkReference, setLinkReference] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [lastGeneratedUrl, setLastGeneratedUrl] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Status message alerts
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Load all admin data
  const fetchData = async () => {
    try {
      // 1. Fetch settings
      const settingsRes = await fetch("/api/admin/settings");
      if (settingsRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      const settingsData = await settingsRes.json();
      setStripeSettings(settingsData);

      // 2. Fetch donations & stats
      const query = new URLSearchParams();
      if (statusFilter !== "all") query.set("status", statusFilter);
      if (searchQuery) query.set("search", searchQuery);

      const donRes = await fetch(`/api/admin/donations?${query.toString()}`);
      if (donRes.ok) {
        const donData = await donRes.json();
        setDonations(donData.donations || []);
        setStats(donData.stats || {});
      }

      // 3. Fetch payment links
      const linksRes = await fetch("/api/admin/payment-links");
      if (linksRes.ok) {
        const linksData = await linksRes.json();
        setPaymentLinks(linksData.payment_links || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, searchQuery]);

  // Toggle Stripe Active state globally
  const handleToggleStripe = async () => {
    const newState = !stripeSettings.stripe_active;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripe_active: newState }),
      });
      const data = await res.json();
      if (res.ok) {
        setStripeSettings((prev: any) => ({ ...prev, stripe_active: newState }));
        setFeedbackMsg({
          type: "success",
          text: `Stripe checkout is now globally ${newState ? "ACTIVE" : "INACTIVE"}.`,
        });
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to update Stripe status." });
      }
    } catch (err) {
      setFeedbackMsg({ type: "error", text: "Network error updating settings." });
    }
  };

  // Switch Stripe Mode between Live and Test
  const handleSetMode = async (mode: "live" | "test") => {
    if (stripeSettings.stripe_mode === mode) return;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripe_mode: mode }),
      });
      const data = await res.json();
      if (res.ok) {
        setStripeSettings((prev: any) => ({
          ...prev,
          stripe_mode: mode,
          is_configured: data.is_configured,
          publishable_key: data.publishable_key,
        }));
        setFeedbackMsg({
          type: "success",
          text: `Stripe mode switched to ${
            mode === "live" ? "⚡ LIVE PRODUCTION" : "🧪 TEST / SANDBOX"
          } mode.`,
        });
      } else {
        setFeedbackMsg({
          type: "error",
          text: data.error || "Failed to switch Stripe mode.",
        });
      }
    } catch (err) {
      setFeedbackMsg({ type: "error", text: "Network error updating Stripe mode." });
    }
  };

  // Generate Custom Payment Link
  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLink(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch("/api/admin/payment-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(linkAmount),
          currency: linkCurrency,
          language: linkLanguage,
          donor_name: linkDonorName.trim() || undefined,
          donor_email: linkDonorEmail.trim() || undefined,
          reference: linkReference.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        const symbol = linkCurrency === "eur" ? "€" : linkCurrency === "gbp" ? "£" : "$";
        setLastGeneratedUrl(data.url);
        setFeedbackMsg({
          type: "success",
          text: `Successfully generated custom payment link for ${symbol}${parseFloat(linkAmount).toFixed(2)} (${linkCurrency.toUpperCase()}, ${linkLanguage.toUpperCase()}).`,
        });
        setLinkDonorName("");
        setLinkDonorEmail("");
        setLinkReference("");
        fetchData();
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to create payment link." });
      }
    } catch (err) {
      setFeedbackMsg({ type: "error", text: "Network error creating payment link." });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // Revoke a Payment Link
  const handleRevokeLink = async (token: string) => {
    if (!confirm("Are you sure you want to revoke this payment link? Donors will no longer be able to use it.")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/payment-links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "revoke" }),
      });
      if (res.ok) {
        setFeedbackMsg({ type: "success", text: "Payment link revoked successfully." });
        fetchData();
      }
    } catch (err) {
      setFeedbackMsg({ type: "error", text: "Failed to revoke link." });
    }
  };

  // Copy URL to clipboard
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-navy-800 mx-auto" />
          <p className="text-sm font-semibold text-navy-700">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-light text-navy-900 pb-20">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 border-b border-navy-800 bg-navy-900 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo variant="footer" showSubtitle={false} />
            <span className="hidden sm:inline-block rounded-md bg-navy-800 px-2.5 py-1 text-xs font-semibold text-gold-400 border border-white/10">
              Admin Donation Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                fetchData();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs font-semibold text-navy-200 hover:bg-navy-700"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-1.5 text-xs font-bold text-red-200 hover:bg-red-900/60 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={cn(
              "rounded-2xl p-4 text-sm font-medium flex items-center justify-between",
              feedbackMsg.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border border-red-200 bg-red-50 text-red-900"
            )}
          >
            <div className="flex items-center gap-2">
              {feedbackMsg.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-xs font-bold underline opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Global Stripe Activation Control & Metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Global Stripe Status, Mode & Toggle Switch */}
          <div className="lg:col-span-6 rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                  Global Payment Gate
                </span>
                <div className="flex items-center gap-2">
                  {/* Mode Badge */}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide",
                      stripeSettings.stripe_mode === "live"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    )}
                  >
                    {stripeSettings.stripe_mode === "live" ? (
                      <>
                        <Zap className="h-3 w-3 text-emerald-600 fill-emerald-500" />
                        <span>Live Mode</span>
                      </>
                    ) : (
                      <>
                        <FlaskConical className="h-3 w-3 text-amber-600" />
                        <span>Test / Sandbox</span>
                      </>
                    )}
                  </span>

                  {/* Active/Inactive Badge */}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide",
                      stripeSettings.stripe_active
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-100 text-slate-800 border border-slate-300"
                    )}
                  >
                    {stripeSettings.stripe_active ? (
                      <>
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-3 w-3 text-amber-600" />
                        <span>Inactive</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-xl font-bold text-navy-950">
                  Stripe Payment Settings
                </h2>
                <p className="mt-1 text-xs text-navy-600 leading-relaxed">
                  Switch between <strong>Test / Sandbox</strong> mode for simulated transactions and <strong>Live Production</strong> mode for real donations.
                </p>
              </div>

              {/* Mode Switcher Segmented Control */}
              <div className="rounded-2xl border border-navy-100 bg-surface-light p-1.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSetMode("test")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all",
                    stripeSettings.stripe_mode === "test"
                      ? "bg-white text-navy-950 shadow-sm border border-navy-200/80 ring-1 ring-black/5"
                      : "text-navy-600 hover:text-navy-900 hover:bg-white/50"
                  )}
                >
                  <FlaskConical className="h-3.5 w-3.5 text-amber-600" />
                  <span>Test (Sandbox) Mode</span>
                  {stripeSettings.stripe_mode === "test" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSetMode("live")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all",
                    stripeSettings.stripe_mode === "live"
                      ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-700"
                      : "text-navy-600 hover:text-navy-900 hover:bg-white/50"
                  )}
                >
                  <Zap className="h-3.5 w-3.5 text-emerald-200" />
                  <span>Live Production Mode</span>
                  {stripeSettings.stripe_mode === "live" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </button>
              </div>

              {/* Key Diagnostic Info */}
              <div className="rounded-xl border border-navy-50 bg-navy-50/50 p-3 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-navy-600">Active Mode API Key:</span>
                  {stripeSettings.is_configured ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Configured &amp; Ready
                    </span>
                  ) : (
                    <span className="font-bold text-amber-700 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Missing {stripeSettings.stripe_mode === "live" ? "STRIPE_LIVE_SECRET_KEY" : "STRIPE_TEST_SECRET_KEY"}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-navy-500 pt-1 border-t border-navy-100/60">
                  <span>Environment Keys Status:</span>
                  <span className="font-semibold">
                    Test Sandbox: {stripeSettings.is_test_configured ? "✅ Configured" : "⚠️ Missing"} | Live: {stripeSettings.is_live_configured ? "✅ Configured" : "⚠️ Missing"}
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleToggleStripe}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  stripeSettings.stripe_active
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
              >
                {stripeSettings.stripe_active ? (
                  <>
                    <ToggleRight className="h-4 w-4" />
                    <span>Deactivate Stripe (Switch to Pledge Form)</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="h-4 w-4" />
                    <span>Activate Stripe Payments Globally</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Summary Stats */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-navy-500">Total Raised</span>
              <div className="font-heading text-2xl font-black text-navy-950 mt-2">
                ${stats.totalRaised?.toFixed(2) || "0.00"}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium mt-1">Confirmed payments</span>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-navy-500">Paid Gifts</span>
              <div className="font-heading text-2xl font-black text-navy-950 mt-2">
                {stats.totalSucceededCount || 0}
              </div>
              <span className="text-[11px] text-navy-400 mt-1">Transactions</span>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-navy-500">Pledge Requests</span>
              <div className="font-heading text-2xl font-black text-amber-700 mt-2">
                {stats.pendingRequestsCount || 0}
              </div>
              <span className="text-[11px] text-amber-600 mt-1">Manual follow-ups</span>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-navy-500">Active Links</span>
              <div className="font-heading text-2xl font-black text-gold-600 mt-2">
                {stats.activePaymentLinksCount || 0}
              </div>
              <span className="text-[11px] text-navy-400 mt-1">Custom URLs</span>
            </div>
          </div>
        </div>

        {/* Section: Custom Payment Link Generator */}
        <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-100 pb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-950 flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-gold-600" />
                <span>Generate Custom Payment Link</span>
              </h2>
              <p className="text-xs text-navy-600 mt-1">
                Create a secure, personalized URL for a donor with a pre-filled amount (e.g. $75)
                and optional memo.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateLink} className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-navy-500">
                  {linkCurrency === "eur" ? "€" : linkCurrency === "gbp" ? "£" : "$"}
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  required
                  value={linkAmount}
                  onChange={(e) => setLinkAmount(e.target.value)}
                  placeholder="75"
                  className="w-full rounded-xl border border-navy-200 py-2.5 pl-8 pr-3 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                value={linkCurrency}
                onChange={(e) => setLinkCurrency(e.target.value as any)}
                className="w-full rounded-xl border border-navy-200 py-2.5 px-3 text-sm font-bold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="usd">USD ($) - US Dollar</option>
                <option value="eur">EUR (€) - Euro</option>
                <option value="gbp">GBP (£) - British Pound</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Language <span className="text-red-500">*</span>
              </label>
              <select
                value={linkLanguage}
                onChange={(e) => setLinkLanguage(e.target.value as any)}
                className="w-full rounded-xl border border-navy-200 py-2.5 px-3 text-sm font-bold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="en">English (EN)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Recipient Name <span className="font-normal text-navy-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={linkDonorName}
                onChange={(e) => setLinkDonorName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full rounded-xl border border-navy-200 px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Recipient Email <span className="font-normal text-navy-400">(Optional)</span>
              </label>
              <input
                type="email"
                value={linkDonorEmail}
                onChange={(e) => setLinkDonorEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-navy-200 px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                Reference / Memo <span className="font-normal text-navy-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={linkReference}
                onChange={(e) => setLinkReference(e.target.value)}
                placeholder="e.g. Educational Sponsorship"
                className="w-full rounded-xl border border-navy-200 px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="sm:col-span-6 pt-2">
              <button
                type="submit"
                disabled={isGeneratingLink}
                className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-xs font-bold text-white hover:bg-navy-700 transition-colors disabled:opacity-60"
              >
                {isGeneratingLink ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating Link...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Generate Unique Payment Link</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Show freshly generated link */}
          {lastGeneratedUrl && (
            <div className="rounded-2xl border border-gold-200 bg-gold-50/60 p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-900 block">
                Latest Generated Link Ready to Share:
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={lastGeneratedUrl}
                  className="flex-1 rounded-xl border border-gold-300 bg-white px-3 py-2 text-xs font-mono text-navy-900 select-all"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(lastGeneratedUrl)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold-600 px-4 py-2 text-xs font-bold text-white hover:bg-gold-700"
                >
                  {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedUrl ? "Copied!" : "Copy Link"}</span>
                </button>
                <a
                  href={lastGeneratedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-800 hover:bg-navy-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Section: Custom Payment Links Table */}
        <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-navy-950">
              Active &amp; Past Payment Links ({paymentLinks.length})
            </h2>
          </div>

          {paymentLinks.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-navy-100">
              <table className="min-w-full divide-y divide-navy-100 text-left text-xs">
                <thead className="bg-surface-light font-bold text-navy-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Recipient / Memo</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {paymentLinks.map((link) => {
                    const host = typeof window !== "undefined" ? window.location.origin : "";
                    const fullLinkUrl = `${host}/donate/pay/${link.token}`;

                    return (
                      <tr key={link.id} className="hover:bg-navy-50/40">
                        <td className="px-4 py-3 font-extrabold text-navy-900 whitespace-nowrap">
                          {link.currency === "eur" ? "€" : link.currency === "gbp" ? "£" : "$"}
                          {link.amount.toFixed(2)}{" "}
                          <span className="text-[10px] text-navy-500 font-bold uppercase">
                            {link.currency || "usd"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-navy-900">
                              {link.donor_name || "General Payer"}
                            </span>
                            <span className="rounded bg-navy-100 text-navy-800 px-1.5 py-0.5 text-[9px] font-extrabold uppercase border border-navy-200/60">
                              {(link.language || "en").toUpperCase()}
                            </span>
                          </div>
                          {link.donor_email && (
                            <div className="text-[11px] text-navy-500">{link.donor_email}</div>
                          )}
                          {link.reference && (
                            <div className="text-[10px] text-gold-700 italic">
                              Ref: {link.reference}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-navy-500">
                          {new Date(link.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                              link.status === "active"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : link.status === "completed"
                                ? "bg-blue-50 text-blue-800 border border-blue-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            )}
                          >
                            {link.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(fullLinkUrl)}
                            className="inline-flex items-center gap-1 rounded-lg border border-navy-200 px-2 py-1 text-[11px] font-semibold text-navy-700 hover:bg-navy-50"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </button>

                          {link.status === "active" && (
                            <button
                              type="button"
                              onClick={() => handleRevokeLink(link.token)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100"
                            >
                              <Ban className="h-3 w-3" />
                              <span>Revoke</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-navy-500 py-4 text-center">
              No custom payment links created yet. Use the form above to generate one.
            </p>
          )}
        </div>

        {/* Section: Donation Records & Pledges */}
        <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-100 pb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-navy-950">
                Donation &amp; Pledge Records ({donations.length})
              </h2>
              <p className="text-xs text-navy-600 mt-0.5">
                Full ledger of completed Stripe payments and offline donation requests.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search donor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-navy-200 py-1.5 pl-8 pr-3 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-navy-200 py-1.5 px-3 text-xs text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="all">All Statuses</option>
                <option value="succeeded">Succeeded</option>
                <option value="request_submitted">Request Submitted</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {donations.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-navy-100">
              <table className="min-w-full divide-y divide-navy-100 text-left text-xs">
                <thead className="bg-surface-light font-bold text-navy-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Donor</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Frequency</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Memo / Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {donations.map((don) => (
                    <tr key={don.id} className="hover:bg-navy-50/40">
                      <td className="px-4 py-3 text-navy-500 whitespace-nowrap">
                        {new Date(don.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-navy-900">{don.donor_name}</div>
                        <div className="text-[11px] text-navy-500">{don.donor_email || "No email"}</div>
                      </td>
                      <td className="px-4 py-3 font-extrabold text-navy-900">
                        ${don.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-navy-600 capitalize">
                        {don.frequency === "monthly" ? "Monthly" : "One-Time"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                              don.status === "succeeded"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : don.status === "request_submitted"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : don.status === "pending"
                                ? "bg-blue-50 text-blue-800 border border-blue-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            )}
                          >
                            {don.status.replace("_", " ")}
                          </span>

                          {don.stripe_mode && (
                            <span
                              className={cn(
                                "rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                                don.stripe_mode === "test"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              )}
                            >
                              {don.stripe_mode === "test" ? "Sandbox" : "Live"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-navy-600 max-w-xs truncate">
                        {don.message || don.admin_reference || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-navy-500 py-6 text-center">
              No donation records match the selected criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

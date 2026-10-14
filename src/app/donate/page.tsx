"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Sparkles,
  BookOpen,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function DonatePage() {
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  // Donor form fields
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [message, setMessage] = useState("");

  // Payment system state
  const [stripeActive, setStripeActive] = useState<boolean | null>(null);
  const [stripeMode, setStripeMode] = useState<"live" | "test">("test");
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch current payment status (Active vs Inactive) from the server
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/donate/config");
        const data = await res.json();
        setStripeActive(Boolean(data.stripeActive));
        if (data.stripeMode) setStripeMode(data.stripeMode);
      } catch (err) {
        console.error("Failed to load donation configuration:", err);
        setStripeActive(false);
      } finally {
        setLoadingConfig(false);
      }
    }
    loadConfig();
  }, []);

  const effectiveAmount =
    selectedAmount === "custom" ? parseFloat(customAmount) || 0 : selectedAmount;

  // Handle donation submission (Stripe checkout if active, request form if inactive)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (effectiveAmount < 1) {
      setErrorMsg("Please select or enter a donation amount of at least $1.00 USD.");
      return;
    }

    setIsSubmitting(true);

    if (stripeActive) {
      // 1. Stripe Checkout Flow
      try {
        const res = await fetch("/api/donate/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: effectiveAmount,
            frequency,
            donorName: donorName.trim() || undefined,
            donorEmail: donorEmail.trim() || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();

        if (res.ok && data.url) {
          // Redirect to Stripe's secure checkout page
          window.location.href = data.url;
        } else {
          setErrorMsg(data.error || "Unable to initiate payment. Please try again.");
          setIsSubmitting(false);
        }
      } catch (err) {
        setErrorMsg("A network connection error occurred. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      // 2. Donation Request Flow (Stripe Inactive)
      if (!donorName.trim()) {
        setErrorMsg("Please provide your full name so our team can follow up with you.");
        setIsSubmitting(false);
        return;
      }
      if (!donorEmail.trim()) {
        setErrorMsg("Please provide your email address.");
        setIsSubmitting(false);
        return;
      }

      try {
        const res = await fetch("/api/donate/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: effectiveAmount,
            frequency,
            donorName: donorName.trim(),
            donorEmail: donorEmail.trim(),
            phone: donorPhone.trim() || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccessMsg(
            data.message ||
              "Thank you for reaching out! Your donation request has been received. Our team will contact you shortly."
          );
          setDonorName("");
          setDonorEmail("");
          setDonorPhone("");
          setMessage("");
          setCustomAmount("");
          setSelectedAmount(50);
        } else {
          setErrorMsg(data.error || "Failed to submit donation request. Please try again.");
        }
      } catch (err) {
        setErrorMsg("Network error. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Support Literacy & Education | Kentucky Literacy Foundation, Inc."
        pageDescription="Make a tax-deductible donation or request educational donation coordination to support Kentucky literacy and tutoring programs."
        pageUrl={`${siteConfig.url}/donate`}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-navy-50/80 via-white to-white py-14 sm:py-18 border-b border-navy-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-800">
            <Heart className="h-4 w-4 text-gold-700 fill-current" />
            <span>Support Literacy &amp; Education</span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
            Empower Readers Across Kentucky
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-navy-700">
            Your contribution helps provide free literacy resources, tutoring, homework assistance,
            books, and educational support to children and families who need it most.
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="py-12 sm:py-18 bg-surface-light">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-10 shadow-lg">
            {/* Frequency Toggle: One-Time vs Monthly */}
            <div className="flex rounded-2xl bg-surface-light p-1.5 border border-navy-100 mb-8">
              <button
                type="button"
                onClick={() => setFrequency("one_time")}
                className={cn(
                  "flex-1 rounded-xl py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  frequency === "one_time"
                    ? "bg-navy-800 text-white shadow-sm"
                    : "text-navy-700 hover:text-navy-900"
                )}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className={cn(
                  "flex-1 rounded-xl py-3 text-sm font-bold transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  frequency === "monthly"
                    ? "bg-navy-800 text-white shadow-sm"
                    : "text-navy-700 hover:text-navy-900"
                )}
              >
                <Calendar className="h-4 w-4 text-gold-400" />
                <span>Monthly Recurring</span>
              </button>
            </div>

            {/* Amount Selection Grid */}
            <div className="space-y-3 mb-8">
              <label className="block text-sm font-bold text-navy-900">
                Select Donation Amount (USD)
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-2xl border py-4 text-lg font-extrabold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                      selectedAmount === amt
                        ? "border-gold-500 bg-gold-50/70 text-navy-900 ring-2 ring-gold-500"
                        : "border-navy-200 bg-white text-navy-800 hover:bg-navy-50/60"
                    )}
                  >
                    <span>${amt}</span>
                    <span className="text-[11px] font-normal text-navy-500 mt-0.5">
                      {frequency === "monthly" ? "/month" : "one-time"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="pt-2">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-navy-600">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Other Custom Amount (e.g. 75)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount("custom");
                    }}
                    className={cn(
                      "w-full rounded-2xl border py-3.5 pl-8 pr-4 text-base font-bold text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500",
                      selectedAmount === "custom"
                        ? "border-gold-500 bg-gold-50/30 ring-2 ring-gold-500"
                        : "border-navy-200 bg-white"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Error & Success Alerts */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900 flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 flex items-start gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base">Request Successfully Received</h4>
                  <p className="mt-1 text-sm text-emerald-800 leading-relaxed">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Mode-Specific Status Banner */}
            {!loadingConfig && (
              <div className="mb-8">
                {stripeActive ? (
                  stripeMode === "test" ? (
                    <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 flex items-center justify-between gap-3 text-xs text-amber-950">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        <span>
                          <strong>Sandbox Mode Active:</strong> Test donations enabled. No real credit card charges will occur.
                        </span>
                      </div>
                      <span className="rounded-full bg-amber-200 px-2.5 py-0.5 font-extrabold uppercase tracking-wider text-[10px] text-amber-900 shrink-0 border border-amber-300">
                        Test Mode
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-center justify-between gap-3 text-xs text-emerald-900">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span>
                          <strong>Instant Checkout Active:</strong> Secure 256-bit encrypted checkout powered by Stripe.
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-200/80 px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px] text-emerald-800 shrink-0">
                        Live / Stripe
                      </span>
                    </div>
                  )
                ) : (
                  <div className="rounded-2xl border border-navy-200 bg-navy-50/70 p-5 text-navy-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-navy-900">
                      <ShieldCheck className="h-5 w-5 text-navy-700" />
                      <span>Direct Donation Request Portal</span>
                    </div>
                    <p className="text-xs leading-relaxed text-navy-600">
                      Instant credit card checkout is currently being updated by our administration.
                      Please submit the quick pledge form below—our nonprofit team will contact you
                      promptly to coordinate your donation securely.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Form Fields & Submit Action */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Your Name {!stripeActive && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    required={!stripeActive}
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Email Address {!stripeActive && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    required={!stripeActive}
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {!stripeActive && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Phone Number <span className="font-normal text-navy-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Optional Note or Dedication
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="In honor of someone, or any specific program focus..."
                  className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loadingConfig}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-600 px-6 py-4 text-base font-extrabold text-white shadow-md hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : stripeActive ? (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>
                        Donate ${effectiveAmount > 0 ? effectiveAmount.toFixed(2) : "0.00"}{" "}
                        {frequency === "monthly" ? "Monthly" : "Now"} via Stripe
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 fill-current" />
                      <span>
                        Send Donation Request for $
                        {effectiveAmount > 0 ? effectiveAmount.toFixed(2) : "0.00"}
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-navy-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  PCI-DSS Compliant
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-navy-600" />
                  No Card Data Stored
                </span>
              </div>
            </form>
          </div>

          {/* Educational Impact Highlight */}
          <div className="mt-12 rounded-3xl border border-navy-100 bg-white p-6 sm:p-8">
            <h3 className="font-heading text-lg font-bold text-navy-950 mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-600" />
              <span>How Your Contribution Supports Learning</span>
            </h3>
            <p className="text-sm text-navy-600 leading-relaxed">
              Donations directly fund literacy workbooks, free book distributions for children,
              essential classroom school supplies, and volunteer tutoring materials. Kentucky
              Literacy Foundation, Inc. is organized around educational and charitable activities
              focused on literacy and learning support across the Commonwealth of Kentucky.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  Sparkles,
  FileQuestion,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function CustomPaymentLinkPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [linkData, setLinkData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");

  useEffect(() => {
    async function loadLink() {
      if (!token) return;
      try {
        const res = await fetch(`/api/donate/pay/${token}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setLinkData(data);
          if (data.donorName) setDonorName(data.donorName);
          if (data.donorEmail) setDonorEmail(data.donorEmail);
        } else {
          setErrorMsg(data.error || "This payment link is invalid or has expired.");
        }
      } catch (err) {
        setErrorMsg("Failed to verify payment link. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    }
    loadLink();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkData) return;

    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    if (linkData.stripeActive) {
      // 1. Stripe Checkout Flow
      try {
        const res = await fetch("/api/donate/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: linkData.amount,
            frequency,
            donorName: donorName.trim() || undefined,
            donorEmail: donorEmail.trim() || undefined,
            paymentLinkToken: token,
            adminReference: linkData.reference || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
        } else {
          setErrorMsg(data.error || "Unable to proceed to payment. Please try again.");
          setIsSubmitting(false);
        }
      } catch (err) {
        setErrorMsg("Connection error. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      // 2. Donation Request Flow (Stripe Inactive)
      if (!donorName.trim()) {
        setErrorMsg("Please provide your name.");
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
            amount: linkData.amount,
            frequency,
            donorName: donorName.trim(),
            donorEmail: donorEmail.trim(),
            paymentLinkToken: token,
            adminReference: linkData.reference || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setSuccessMsg(
            data.message ||
              "Thank you! Your donation request has been received. Our team will contact you shortly."
          );
        } else {
          setErrorMsg(data.error || "Failed to submit request.");
        }
      } catch (err) {
        setErrorMsg("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface-light">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-navy-700 mx-auto" />
          <p className="text-sm font-semibold text-navy-600">Verifying secure donation link...</p>
        </div>
      </div>
    );
  }

  // Link revoked or not found
  if (!linkData || linkData.status === "revoked" || linkData.status === "completed") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-surface-light">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-md text-center space-y-5">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mx-auto">
            <FileQuestion className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold text-navy-950">
              {linkData?.status === "completed"
                ? "Donation Already Completed"
                : "Payment Link Inactive"}
            </h1>
            <p className="text-sm text-navy-600 leading-relaxed">
              {linkData?.status === "completed"
                ? "This personalized donation link has already been fulfilled. Thank you for your support!"
                : "This custom payment link has expired, been revoked, or is no longer accessible."}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white hover:bg-navy-700"
            >
              <span>Go to General Donation Page</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="text-xs font-semibold text-navy-600 hover:text-navy-900"
            >
              Need assistance? Contact our team
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Personalized Donation | Kentucky Literacy Foundation, Inc."
        pageDescription="Custom donation request for Kentucky Literacy Foundation, Inc."
        pageUrl={`${siteConfig.url}/donate/pay/${token}`}
      />

      <div className="min-h-[80vh] bg-surface-light py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Card Container */}
          <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-10 shadow-xl space-y-6">
            {/* Header Brand */}
            <div className="text-center space-y-3 pb-6 border-b border-navy-100">
              <div className="flex justify-center">
                <Logo variant="header" />
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800">
                <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                <span>Personalized Donation Invitation</span>
              </div>
            </div>

            {/* Requested Amount Display */}
            <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white text-center shadow-inner space-y-1">
              <span className="text-xs font-semibold text-navy-300 uppercase tracking-wider">
                Requested Donation Amount
              </span>
              <div className="font-heading text-4xl sm:text-5xl font-black text-gold-400">
                ${linkData.amount.toFixed(2)}{" "}
                <span className="text-lg font-normal text-navy-200">USD</span>
              </div>
              {linkData.reference && (
                <p className="text-xs text-navy-300 pt-1">
                  Reference: <span className="text-white font-medium">{linkData.reference}</span>
                </p>
              )}
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900 text-sm flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 text-sm flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Request Received</h4>
                  <p className="mt-1 text-xs text-emerald-800 leading-relaxed">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Donation Form */}
            {!successMsg && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Frequency selection */}
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-light p-1 border border-navy-100 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFrequency("one_time")}
                    className={cn(
                      "py-2.5 rounded-lg transition-colors",
                      frequency === "one_time" ? "bg-navy-800 text-white" : "text-navy-700"
                    )}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={cn(
                      "py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1",
                      frequency === "monthly" ? "bg-navy-800 text-white" : "text-navy-700"
                    )}
                  >
                    <Calendar className="h-3.5 w-3.5 text-gold-400" />
                    <span>Monthly Recurring</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Optional Note
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add an optional comment or dedication..."
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-600 px-6 py-4 text-base font-extrabold text-white shadow-md hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : linkData.stripeActive ? (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>
                          Complete ${linkData.amount.toFixed(2)}{" "}
                          {frequency === "monthly" ? "/ Month" : ""} with Stripe
                        </span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    ) : (
                      <>
                        <Heart className="h-5 w-5 fill-current" />
                        <span>Submit ${linkData.amount.toFixed(2)} Donation Request</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-navy-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Encrypted &amp; Secure
                  </span>
                  <span>&bull;</span>
                  <span>Kentucky Literacy Foundation, Inc.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

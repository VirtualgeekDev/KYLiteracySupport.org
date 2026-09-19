"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Heart,
  ArrowRight,
  BookOpen,
  Printer,
  Calendar,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const donationId = searchParams.get("donation_id");

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const query = new URLSearchParams();
        if (sessionId) query.set("session_id", sessionId);
        if (donationId) query.set("donation_id", donationId);

        const res = await fetch(`/api/donate/verify-session?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setDetails(data);
        }
      } catch (err) {
        console.error("Verification failed:", err);
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [sessionId, donationId]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="rounded-3xl border border-navy-100 bg-white p-8 sm:p-12 shadow-xl text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Payment Confirmed
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Thank You for Your Gift!
          </h1>
          <p className="text-base text-navy-600 leading-relaxed max-w-md mx-auto">
            Your generous contribution to Kentucky Literacy Foundation, Inc. directly supports
            essential literacy programs, free book distributions, and educational tutoring.
          </p>
        </div>

        {/* Receipt Box */}
        {loading ? (
          <div className="py-8 flex items-center justify-center gap-2 text-sm text-navy-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Confirming receipt details...</span>
          </div>
        ) : details ? (
          <div className="rounded-2xl border border-navy-100 bg-surface-light p-6 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-navy-200/60 pb-3">
              <span className="text-xs font-semibold uppercase text-navy-500">Amount</span>
              <span className="font-heading text-2xl font-extrabold text-navy-900">
                ${details.amount?.toFixed(2)} {details.currency || "USD"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-navy-500">Frequency:</span>
              <span className="font-semibold text-navy-800">
                {details.frequency === "monthly" ? "Monthly Recurring Donation" : "One-Time Donation"}
              </span>
            </div>

            {details.donorName && (
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-navy-500">Donor:</span>
                <span className="font-semibold text-navy-800">{details.donorName}</span>
              </div>
            )}

            {details.donationId && (
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-navy-500">Reference ID:</span>
                <span className="font-mono text-[11px] text-navy-600">{details.donationId}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-navy-500">Date:</span>
              <span className="font-semibold text-navy-800">
                {new Date(details.createdDate || Date.now()).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white px-5 py-3 text-xs font-bold text-navy-800 hover:bg-navy-50 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print Receipt</span>
          </button>

          <Link
            href="/programs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3 text-xs font-bold text-white hover:bg-navy-700 transition-colors"
          >
            <span>Explore Educational Programs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="pt-4 text-xs text-navy-400">
          A receipt has been sent to your email address if provided during checkout.
        </div>
      </div>
    </div>
  );
}

export default function DonateSuccessPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Donation Successful | Kentucky Literacy Foundation, Inc."
        pageDescription="Thank you for your donation to Kentucky Literacy Foundation, Inc."
        pageUrl={`${siteConfig.url}/donate/success`}
      />
      <div className="min-h-[70vh] bg-surface-light flex items-center justify-center">
        <Suspense fallback={<div className="p-12 text-center text-navy-600">Loading receipt...</div>}>
          <SuccessContent />
        </Suspense>
      </div>
    </>
  );
}

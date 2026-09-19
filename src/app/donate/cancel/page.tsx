import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export default function DonateCancelPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Donation Canceled | Kentucky Literacy Foundation, Inc."
        pageDescription="Your donation was not processed."
        pageUrl={`${siteConfig.url}/donate/cancel`}
      />

      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-surface-light">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-sm">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-8 ring-amber-50/50 mx-auto">
            <Heart className="h-8 w-8 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Checkout Canceled
            </span>
            <h1 className="font-heading text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Donation Not Completed
            </h1>
            <p className="text-sm text-navy-600 leading-relaxed">
              Your donation session was canceled and your card was not charged. If you encountered an
              issue or would like to give another way, we would love to assist you.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white hover:bg-navy-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Donation Form</span>
            </Link>

            <Link
              href="/contact?reason=Donation"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-navy-600" />
              <span>Contact Us Regarding Donations</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

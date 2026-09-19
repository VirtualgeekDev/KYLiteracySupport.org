import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Kentucky Literacy Foundation, Inc. Have questions about our literacy programs, tutoring, volunteering, book donations, or partnerships? Get in touch with us.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Kentucky Literacy Foundation",
    description:
      "Reach out to Kentucky Literacy Foundation, Inc. regarding educational support, tutoring, donations, or volunteer opportunities.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Contact Kentucky Literacy Foundation, Inc."
        pageDescription="Connect with our team regarding literacy programs, tutoring, volunteering, and educational resources."
        pageUrl={`${siteConfig.url}/contact`}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-16 sm:py-20 border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Contact Kentucky Literacy Foundation, Inc.
            </h1>
            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              Have a question about our programs, resources, volunteering, donations, or educational
              support? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-8 text-center text-navy-600">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Right Column: Inquiries Info & Assistance */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Details Card */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="font-heading text-xl font-bold text-navy-950">
                  Inquiry Guidelines
                </h2>
                <p className="text-sm leading-relaxed text-navy-600">
                  Whether you are a parent seeking tutoring assistance, an educator looking for
                  study resources, or a community member interested in volunteering, your message
                  will be directed to the appropriate team member.
                </p>

                <div className="space-y-4 pt-2 border-t border-navy-100">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-navy-900 uppercase">Response Time</h3>
                      <p className="text-xs text-navy-600 mt-0.5">
                        Inquiries are typically reviewed within 2–3 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-navy-900 uppercase">Service Scope</h3>
                      <p className="text-xs text-navy-600 mt-0.5">
                        Statewide educational support across the Commonwealth of Kentucky.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-navy-900 uppercase">General Inquiries</h3>
                      <p className="text-xs text-navy-600 mt-0.5">
                        Please submit all inquiries using our web form above for prompt routing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factual Notice Card */}
              <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-navy-800 shrink-0 mt-0.5" />
                  <div className="text-xs text-navy-700 leading-relaxed">
                    <span className="font-bold block mb-1">Nonprofit Verification Policy</span>
                    Kentucky Literacy Foundation, Inc. is organized around educational and
                    charitable activities focused on literacy and learning support. We do not
                    publish unverified telephone lines or private physical locations until official
                    public office hours are scheduled.
                  </div>
                </div>
              </div>

              {/* Common Questions Card */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-xs">
                <h3 className="font-heading text-base font-bold text-navy-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-gold-600" />
                  <span>Looking for Quick Answers?</span>
                </h3>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Many common questions about our programs, materials, and volunteer qualifications
                  are answered in our comprehensive FAQ section.
                </p>
                <div className="mt-4">
                  <Link
                    href="/#faq"
                    className="text-xs font-bold text-navy-800 underline underline-offset-4 decoration-gold-500 hover:text-gold-700"
                  >
                    View Frequently Asked Questions &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

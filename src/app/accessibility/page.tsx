import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Eye, Keyboard, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility Statement for Kentucky Literacy Foundation, Inc. Our commitment to digital accessibility for all learners and visitors.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  const practices = [
    {
      title: "Semantic HTML Structure",
      description:
        "Using semantic landmarks (<header>, <nav>, <main>, <section>, <article>, <footer>) and structured headings (H1, H2, H3) to facilitate screen reader navigation.",
    },
    {
      title: "Keyboard Navigation & Focus States",
      description:
        "Ensuring interactive elements (links, buttons, form controls, modals, accordions) can be operated via standard keyboard controls with visible high-contrast focus rings.",
    },
    {
      title: "Skip to Content Link",
      description:
        "Providing a direct keyboard-accessible shortcut at the top of every page allowing users to jump directly to primary page content.",
    },
    {
      title: "Color Contrast & Readability",
      description:
        "Selecting text and background color pairings with strong visual contrast ratios to maintain comfortable readability for users with low vision or color perception variations.",
    },
    {
      title: "Form Accessibility",
      description:
        "Pairing all input fields and dropdowns with explicit semantic labels, clear error states, and helper instructions.",
    },
    {
      title: "Reduced Motion Support",
      description:
        "Respecting operating system preferences for reduced motion (prefers-reduced-motion) by disabling unnecessary transitions and animations.",
    },
  ];

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Accessibility Statement | Kentucky Literacy Foundation, Inc."
        pageDescription="Our ongoing commitment to making digital educational resources accessible to all learners."
        pageUrl={`${siteConfig.url}/accessibility`}
      />

      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-14 sm:py-18 border-b border-navy-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center rounded-full bg-navy-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
            Universal Access
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Accessibility Statement
          </h1>
          <p className="text-sm text-navy-600">
            Kentucky Literacy Foundation, Inc. &bull; KYLiteracySupport.org
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-navy-800 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              Our Commitment
            </h2>
            <p>
              Kentucky Literacy Foundation, Inc. is committed to ensuring digital accessibility for
              people of all abilities. We believe that literacy, educational resources, and learning
              opportunities should be welcoming, accessible, and barrier-free for every student,
              parent, educator, and community member who visits our website.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-4">
              Accessibility Practices Implemented
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {practices.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-navy-100 bg-surface-light p-5"
                >
                  <h3 className="font-heading text-base font-bold text-navy-900 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              Ongoing Continuous Improvement
            </h2>
            <p>
              We continuously evaluate our website architecture and new content additions to uphold
              these accessibility principles. Because technology and web standards evolve, we
              regularly review interactive elements, contrast levels, and keyboard compatibility.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              Feedback &amp; Assistance
            </h2>
            <p className="mb-3">
              If you experience any difficulty accessing content or navigating any feature on
              KYLiteracySupport.org, or if you have suggestions for improvement, we warmly welcome
              your feedback.
            </p>
            <p>
              Please contact us through our{" "}
              <Link
                href="/contact?reason=Other"
                className="font-bold text-navy-900 underline underline-offset-4 hover:text-gold-700"
              >
                Contact Form
              </Link>
              , and our team will work to provide the requested information in an alternate format.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

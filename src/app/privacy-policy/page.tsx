import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, Eye, FileText } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Kentucky Literacy Foundation, Inc. Learn how we collect, use, and protect information submitted via our website.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Privacy Policy | Kentucky Literacy Foundation, Inc."
        pageDescription="Privacy policy explaining information collection, usage, and security."
        pageUrl={`${siteConfig.url}/privacy-policy`}
      />

      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-14 sm:py-18 border-b border-navy-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center rounded-full bg-navy-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
            Legal &amp; Transparency
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-navy-600">
            Effective Date: {lastUpdated} &bull; Kentucky Literacy Foundation, Inc.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-navy-800 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              1. Overview
            </h2>
            <p>
              Kentucky Literacy Foundation, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              respects your privacy. This Privacy Policy outlines the types of information we may
              collect when you visit <strong>KYLiteracySupport.org</strong>, how we use that
              information, and the measures we take to safeguard your personal details.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you voluntarily provide directly to us when interacting
              with our website, specifically through our contact and inquiry forms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-navy-700">
              <li>Contact details such as your first and last name, email address, and phone number.</li>
              <li>
                Inquiry context, such as your selected reason for reaching out (e.g., educational
                support, tutoring inquiries, volunteer interests, or book donations).</li>
              <li>Any written messages, feedback, or comments included in form submissions.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">
              Any personal information you provide is used strictly for legitimate nonprofit
              educational and communication purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-navy-700">
              <li>Responding to your specific questions, program requests, or support inquiries.</li>
              <li>Coordinating volunteer participation and mentor onboarding.</li>
              <li>Providing information regarding book distributions and school supply drives.</li>
              <li>Maintaining administrative records of community partnerships and inquiries.</li>
            </ul>
            <p className="mt-3">
              <strong>We do not sell, rent, trade, or monetize your personal information</strong>{" "}
              under any circumstances.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              4. Cookies and Web Analytics
            </h2>
            <p>
              Our website may use standard technical cookies and minimal session data to provide
              essential site navigation and form submission functionality. We do not use intrusive
              cross-site tracking or behavioral advertising pixels. If analytics tools (such as
              privacy-conscious web metrics) are enabled in the future to understand overall site
              traffic patterns, this policy will be updated to describe the implementation.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              5. Third-Party Services
            </h2>
            <p>
              When external tools are utilized (such as reliable email delivery infrastructure or
              secure donation processing platforms), your interactions are governed by the respective
              privacy standards of those verified providers. We ensure that any future third-party
              partners adhere to strict data protection regulations.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              6. Data Security &amp; Retention
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards designed to
              protect personal information submitted to us against unauthorized access, loss, or
              misuse. Information is retained only as long as necessary to fulfill the purpose of your
              inquiry or as required by applicable legal and administrative standards.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              7. Your Rights &amp; Choices
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              information you have submitted to us. If you would like to review or update your
              contact details, please contact us using the information below.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              8. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or our data
              practices, please contact Kentucky Literacy Foundation, Inc. through our{" "}
              <Link
                href="/contact"
                className="font-bold text-navy-900 underline underline-offset-4 hover:text-gold-700"
              >
                Contact Form
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

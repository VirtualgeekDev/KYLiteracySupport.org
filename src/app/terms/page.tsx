import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for KYLiteracySupport.org, published by Kentucky Literacy Foundation, Inc.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Terms of Use | Kentucky Literacy Foundation, Inc."
        pageDescription="Terms and conditions governing the use of the Kentucky Literacy Foundation website."
        pageUrl={`${siteConfig.url}/terms`}
      />

      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-14 sm:py-18 border-b border-navy-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center rounded-full bg-navy-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
            Legal Terms
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Terms of Use
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the website at <strong>KYLiteracySupport.org</strong>, you agree
              to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any
              part of these terms, please do not use this site.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              2. Website Purpose &amp; Usage
            </h2>
            <p>
              This website is operated by Kentucky Literacy Foundation, Inc. to provide general
              information about our educational mission, literacy programs, learning resources, and
              community involvement opportunities. You agree to use the site solely for lawful
              purposes and in a manner that does not infringe upon the rights of others.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              3. Educational Resources &amp; Guidance
            </h2>
            <p>
              Educational materials, tips, guides, and suggestions provided on this website are for
              informational and supportive purposes only. While curated with care, these resources
              do not constitute formal diagnostic assessments, accredited academic certification, or
              individualized clinical learning advice.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              4. Intellectual Property
            </h2>
            <p>
              The content, text, layout, branding, logos, and original educational outlines on this
              site are the property of Kentucky Literacy Foundation, Inc. or its licensors and are
              protected by intellectual property laws. Educators, parents, and community partners
              are permitted to view, download, and print individual educational pages for personal or
              non-commercial educational use, provided all attribution notices are maintained.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              5. External Links
            </h2>
            <p>
              This site may contain links to external third-party websites or services. Kentucky
              Literacy Foundation, Inc. has no control over and assumes no responsibility for the
              content, privacy policies, or practices of any external sites. Inclusion of any link
              does not imply endorsement.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p>
              This website and all content and services are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis, without warranties of any kind, whether express or
              implied. We do not guarantee uninterrupted, secure, or error-free site operation.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Kentucky Literacy Foundation, Inc.,
              its directors, officers, volunteers, and agents shall not be liable for any direct,
              indirect, incidental, or consequential damages resulting from your use of or inability
              to use the website or its materials.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              8. Changes to These Terms
            </h2>
            <p>
              We reserve the right to revise these Terms of Use at any time. Any changes will become
              effective upon posting the updated terms with a revised effective date. Continued use
              of the site after revisions constitutes acceptance of the amended terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl mb-3">
              9. Corporation &amp; Contact Details
            </h2>
            <p className="mb-4">
              For any questions regarding these Terms of Use or our organizational operations,
              please contact Kentucky Literacy Foundation, Inc. using our official corporate details:
            </p>
            <div className="rounded-2xl border border-navy-100 bg-surface-light p-5 space-y-2.5 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-navy-200/60 pb-2">
                <span className="font-semibold text-navy-600">Business Name:</span>
                <span className="font-bold text-navy-950">Kentucky Literacy Foundation, Inc.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-navy-200/60 pb-2">
                <span className="font-semibold text-navy-600">Business Address:</span>
                <span className="font-medium text-navy-900">271 W. Short St Ste 410 #2963, Lexington, KY 40507</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-navy-200/60 pb-2">
                <span className="font-semibold text-navy-600">Website:</span>
                <a href="https://KYLiteracySupport.org" className="font-medium text-navy-900 underline hover:text-gold-700">
                  KYLiteracySupport.org
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-navy-200/60 pb-2">
                <span className="font-semibold text-navy-600">Phone Number:</span>
                <a href="tel:+17195124541" className="font-medium text-navy-900 hover:text-gold-700">
                  +17195124541
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-navy-600">Email:</span>
                <a href="mailto:contact@kyliteracysupport.org" className="font-medium text-navy-900 underline hover:text-gold-700">
                  contact@kyliteracysupport.org
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs text-navy-500">
              You may also reach our team anytime via our online{" "}
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

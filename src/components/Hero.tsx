import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/60 via-white to-surface-light pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Decorative gradient blur */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div className="h-[28rem] w-[56rem] bg-gradient-to-tr from-gold-200/40 via-navy-100/40 to-white opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-200/70 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-800 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-gold-500" />
              <span>Kentucky Educational Support Initiative</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-6xl leading-[1.15]">
              Building Stronger Readers.{" "}
              <span className="text-navy-700 underline decoration-gold-400 decoration-4 underline-offset-8">
                Creating More Opportunities.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="max-w-2xl text-lg leading-relaxed text-navy-700 sm:text-xl">
              Kentucky Literacy Foundation, Inc. helps children, students, adults, and families
              access literacy resources, tutoring, homework assistance, and educational support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-all"
              >
                <span>Explore Our Programs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-300 bg-white px-6 py-3.5 text-base font-semibold text-navy-800 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-all"
              >
                <span>Get Involved</span>
              </Link>
            </div>

            {/* Three Value Trust Pillars (Conservative, Non-Statistical) */}
            <div className="pt-6 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-navy-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                <span>Free Educational Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                <span>Literacy &amp; Tutoring Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                <span>Community-Driven Learning</span>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl border border-navy-100 bg-white p-6 shadow-xl ring-1 ring-navy-900/5 sm:p-8">
              {/* Decorative corner tag */}
              <div className="flex items-center justify-between border-b border-navy-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-navy-600" />
                  <div className="h-3 w-3 rounded-full bg-gold-400" />
                  <div className="h-3 w-3 rounded-full bg-navy-200" />
                </div>
                <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  KY Community Learning
                </span>
              </div>

              {/* Graphic Illustration */}
              <div className="rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 p-6 text-white text-center relative overflow-hidden shadow-inner">
                <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <BookOpen className="mx-auto h-14 w-14 text-gold-400 mb-3" />
                <h3 className="font-heading font-bold text-lg text-white">
                  Literacy Strengthens Families
                </h3>
                <p className="mt-2 text-xs text-navy-200 leading-relaxed">
                  Connecting learners with reading materials, academic guidance, and foundational
                  study habits.
                </p>
              </div>

              {/* Interactive Core Offerings List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3.5 rounded-xl bg-surface-light p-3 border border-navy-100/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">Guided Literacy &amp; Reading</h4>
                    <p className="text-[11px] text-navy-500">Phonics, comprehension, and vocabulary</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl bg-surface-light p-3 border border-navy-100/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">Tutoring &amp; Homework Assistance</h4>
                    <p className="text-[11px] text-navy-500">Individualized study and problem solving</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl bg-surface-light p-3 border border-navy-100/60">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">Books &amp; School Supplies</h4>
                    <p className="text-[11px] text-navy-500">Essential resources for home and classroom</p>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 text-center">
                <span className="text-[11px] text-navy-500 font-medium">
                  Focused on educational access across the Commonwealth of Kentucky.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

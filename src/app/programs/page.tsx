import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Pencil,
  Users,
  Laptop,
  BookMarked,
  School,
  Clock,
  HeartHandshake,
  Globe,
  CheckCircle2,
  Calendar,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { programsData } from "@/data/programs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Educational Programs",
  description:
    "Explore our free educational programs: literacy programs, tutoring, homework assistance, book distributions, digital literacy, and parent workshops.",
  alternates: {
    canonical: "/programs",
  },
  openGraph: {
    title: "Educational Programs | Kentucky Literacy Foundation",
    description:
      "Free literacy programs, tutoring, homework assistance, and educational support across Kentucky communities.",
    url: `${siteConfig.url}/programs`,
  },
};

const iconMap = {
  BookOpen,
  Pencil,
  Users,
  Laptop,
  BookMarked,
  School,
  Clock,
  HeartHandshake,
  Globe,
};

export default function ProgramsPage() {
  const statusColors = {
    "Core Offering": "bg-navy-50 text-navy-800 border-navy-200",
    "Expanding Initiative": "bg-gold-50 text-gold-800 border-gold-200",
    "Planned Program": "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Our Educational Programs | Kentucky Literacy Foundation"
        pageDescription="Comprehensive overview of literacy programs, tutoring, homework support, and learning resources."
        pageUrl={`${siteConfig.url}/programs`}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-16 sm:py-20 border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Community Learning
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Our Educational Programs
            </h1>
            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              Kentucky Literacy Foundation, Inc. provides educational programs and resources
              designed to support learners at different stages of their educational journey.
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {programsData.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-navy-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors shadow-xs"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tracks Detailed List */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programsData.map((program, index) => {
              const IconComp = iconMap[program.iconName] || BookOpen;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={program.id}
                  id={program.id}
                  className="scroll-mt-28 rounded-3xl border border-navy-100 bg-surface-light p-6 sm:p-10 transition-all hover:border-navy-200 hover:shadow-card"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                    {/* Left Column: Title & Description */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-400">
                          <IconComp className="h-6 w-6" />
                        </div>
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold",
                            statusColors[program.status]
                          )}
                        >
                          {program.status}
                        </span>
                      </div>

                      <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
                        {program.title}
                      </h2>

                      <p className="text-base leading-relaxed text-navy-700 sm:text-lg">
                        {program.fullDescription}
                      </p>

                      <div className="pt-2 text-xs text-navy-500 font-medium">
                        <span className="font-bold text-navy-800">Target Learners:</span>{" "}
                        {program.audience}
                      </div>

                      {program.scheduleNote && (
                        <div className="flex items-start gap-2 rounded-xl bg-white p-3.5 border border-navy-100 text-xs text-navy-600">
                          <Calendar className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
                          <span>
                            <strong className="text-navy-800">Availability:</strong>{" "}
                            {program.scheduleNote}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Key Activities & Request CTA */}
                    <div className="lg:col-span-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-xs flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-gold-600" />
                          <span>Key Program Activities</span>
                        </h3>

                        <ul className="space-y-2.5">
                          {program.activities.map((act, aIdx) => (
                            <li
                              key={aIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-700 leading-relaxed"
                            >
                              <span className="flex h-1.5 w-1.5 rounded-full bg-navy-600 mt-2 shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <Link
                          href={`/contact?reason=${encodeURIComponent(
                            program.title.includes("Tutoring")
                              ? "Tutoring"
                              : program.title.includes("Books")
                              ? "Books & Supplies"
                              : "Educational Support"
                          )}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-navy-700 transition-colors"
                        >
                          <span>Request Support</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href="/get-involved#volunteer"
                          className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-navy-200 px-4 py-2.5 text-xs font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                        >
                          Volunteer in This Area
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Availability Notice Box */}
      <section className="bg-surface-light py-12 border-t border-navy-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-800 mx-auto">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-navy-900">
            Program Scheduling &amp; Implementation Notice
          </h3>
          <p className="text-sm text-navy-600 leading-relaxed max-w-2xl mx-auto">
            Program availability, class sizes, and workshop schedules vary based on seasonal cycles,
            community host locations, and volunteer educator capacity. Please reach out via our
            contact form to confirm current session dates or request personalized support.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CTASection
          title="Have Questions About Our Programs?"
          description="We are here to assist learners, caregivers, educators, and community partners. Reach out today to explore educational resources or learn about joining our volunteer network."
          primaryBtnText="Contact Our Programs Team"
          primaryBtnHref="/contact"
          secondaryBtnText="Explore Free Resources"
          secondaryBtnHref="/resources"
        />
      </div>
    </>
  );
}

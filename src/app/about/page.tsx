import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kentucky Literacy Foundation, Inc., our mission to expand literacy and educational resources, our vision, and core educational values.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Kentucky Literacy Foundation",
    description:
      "Kentucky Literacy Foundation is dedicated to expanding access to literacy and educational support for children, families, and learners.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Access",
      description:
        "Making educational resources, books, and learning assistance easier to access across Kentucky communities.",
      icon: Compass,
    },
    {
      title: "Learning",
      description:
        "Encouraging lifelong learning, curiosity, and practical skill development for learners of every age.",
      icon: BookOpen,
    },
    {
      title: "Community",
      description:
        "Working collaboratively to strengthen families and local communities through literacy and education.",
      icon: Users,
    },
    {
      title: "Inclusion",
      description:
        "Creating welcoming, supportive learning opportunities for individuals from diverse backgrounds and circumstances.",
      icon: HeartHandshake,
    },
    {
      title: "Empowerment",
      description:
        "Helping learners build personal confidence, self-reliance, and academic skills that open future opportunities.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="About Kentucky Literacy Foundation, Inc."
        pageDescription="Our mission, vision, and core educational values."
        pageUrl={`${siteConfig.url}/about`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-16 sm:py-20 border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Our Organization
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              About Kentucky Literacy Foundation, Inc.
            </h1>
            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              Dedicated to expanding access to literacy and educational support for children,
              families, and adult learners throughout Kentucky.
            </p>
          </div>
        </div>
      </section>

      {/* Organization Overview & Narrative */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6 text-navy-700 leading-relaxed text-base sm:text-lg">
              <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
                Dedicated to Educational Access
              </h2>
              <p>
                <strong>Kentucky Literacy Foundation, Inc.</strong> is a nonprofit organization
                dedicated to expanding access to literacy and educational support.
              </p>
              <p>
                Our work focuses on practical programs and resources that help learners strengthen
                reading, writing, homework, study, and digital skills. By prioritizing fundamental
                learning capabilities, we seek to reduce barriers that hold learners back.
              </p>
              <p>
                We believe that access to educational resources can help individuals build
                confidence, pursue opportunities, and participate more fully in their communities.
              </p>

              <div className="rounded-2xl border border-navy-100 bg-surface-light p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-navy-700 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-navy-900">
                      Organizational Governance &amp; Purpose
                    </h3>
                    <p className="mt-1 text-xs text-navy-600 leading-relaxed">
                      {siteConfig.legalStatus} Our programs are structured conservatively with a focus
                      on tangible community impact, sound oversight, and transparent educational
                      stewardship.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-900 to-navy-800 p-8 text-white shadow-xl">
                <h3 className="font-heading text-xl font-bold text-white mb-4">
                  Guiding Principles
                </h3>
                <ul className="space-y-4 text-sm text-navy-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>Free learning support and educational assistance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>Encouragement for both children and adult literacy learners.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>Direct distribution of books and essential study materials.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>Respectful, patient, and welcoming educational environments.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-navy-700/80">
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-300 hover:text-gold-200 transition-colors"
                  >
                    <span>Explore our educational programs</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 bg-surface-light border-y border-navy-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                Our Foundation
              </span>
              <h2 className="font-heading text-2xl font-bold text-navy-950 mt-1 sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700 sm:text-lg">
                Our mission is to provide accessible educational and literacy support to children,
                families, and learners who need additional resources to succeed academically and
                develop lifelong learning skills.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-3xl border border-gold-100 bg-white p-8 shadow-sm sm:p-10 ring-1 ring-gold-200/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                Our Aspiration
              </span>
              <h2 className="font-heading text-2xl font-bold text-navy-950 mt-1 sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700 sm:text-lg">
                A Kentucky where every learner has access to the educational resources, literacy
                support, and learning opportunities needed to reach their potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
            subtitle="These principles shape our educational programs, community partnerships, and volunteer initiatives."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-navy-100 bg-surface-light p-6 transition-all hover:border-navy-200 hover:shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800 mb-4">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy-900">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <CTASection
          title="Join Us in Supporting Kentucky Learners"
          description="Whether through volunteer tutoring, donating educational books, or partnering on community literacy events, your participation makes a lasting difference."
          primaryBtnText="Get Involved"
          primaryBtnHref="/get-involved"
          secondaryBtnText="Contact Our Team"
          secondaryBtnHref="/contact"
        />
      </div>
    </>
  );
}

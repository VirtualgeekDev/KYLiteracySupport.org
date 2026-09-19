import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Heart,
  Laptop,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProgramCard } from "@/components/ProgramCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { programsData } from "@/data/programs";
import { faqsData } from "@/data/faqs";

export default function HomePage() {
  // Select the 6 featured programs for the homepage grid
  const featuredPrograms = programsData.slice(0, 6);

  const coreValues = [
    {
      title: "Access to Learning",
      description:
        "Providing free educational support, books, and study assistance to reduce barriers for learners across Kentucky communities.",
      icon: Compass,
    },
    {
      title: "Literacy Development",
      description:
        "Strengthening foundational reading and writing skills to help students build confidence and academic independence.",
      icon: BookOpen,
    },
    {
      title: "Family Support",
      description:
        "Equipping parents and caregivers with practical strategies and reading materials to nurture learning at home.",
      icon: Users,
    },
    {
      title: "Community Education",
      description:
        "Collaborating with local educators, mentors, and community members to foster supportive learning environments.",
      icon: Heart,
    },
  ];

  const whoWeSupport = [
    {
      title: "Children & Students",
      description:
        "Support with reading, writing, homework, study skills, and educational resources.",
      icon: GraduationCap,
      highlights: ["Phonics & Reading Circles", "Homework Guidance", "School Supplies"],
    },
    {
      title: "Families & Caregivers",
      description:
        "Resources and guidance that help parents and caregivers support learning at home.",
      icon: Users,
      highlights: ["Home Reading Routines", "Family Literacy Tips", "Educational Packets"],
    },
    {
      title: "Adult Learners",
      description:
        "Literacy and digital learning resources that support continued education and skill development.",
      icon: Sparkles,
      highlights: ["Basic Reading & Writing", "Computer Navigation", "Self-Paced Guides"],
    },
    {
      title: "Underserved Communities",
      description:
        "Educational resources for individuals and families who may have limited access to learning support.",
      icon: Heart,
      highlights: ["Free Book Distributions", "Community Outreach", "Virtual Learning Options"],
    },
  ];

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Kentucky Literacy Foundation | Literacy & Educational Support"
        pageDescription="Kentucky Literacy Foundation provides literacy resources, tutoring, homework assistance, educational support, and learning opportunities for children and families."
        pageUrl="https://KYLiteracySupport.org"
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Mission Introduction Section: "Education Opens Doors" */}
      <section className="py-16 sm:py-24 bg-white border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Our Purpose
            </span>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl md:text-5xl">
              Education Opens Doors
            </h2>

            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              Access to quality learning resources can make a meaningful difference in a
              student&apos;s educational journey. Kentucky Literacy Foundation, Inc. works to make
              literacy support, tutoring, learning materials, and educational opportunities more
              accessible to families and communities.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-base font-bold text-navy-800 hover:text-gold-600 transition-colors underline underline-offset-8 decoration-gold-400 hover:decoration-gold-600"
              >
                <span>Learn About Our Mission &amp; Values</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Programs Section: "How We Support Learning" */}
      <section className="py-16 sm:py-24 bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Educational Support"
            title="How We Support Learning"
            subtitle="Explore our core initiatives designed to help children, families, and learners strengthen reading, writing, and academic confidence."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-xl border border-navy-300 bg-white px-6 py-3 text-sm font-bold text-navy-800 shadow-sm hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
            >
              <span>View All 9 Educational Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Impact / Mission Editorial Section: "Every Learner Deserves an Opportunity to Learn" */}
      <section className="py-16 sm:py-24 bg-navy-900 text-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-400/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-gold-400/30">
              Our Guiding Belief
            </span>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Every Learner Deserves an Opportunity to Learn
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-navy-200">
              We believe educational support should be accessible to everyone. Our work focuses on
              reducing barriers to learning by connecting children, families, and learners with
              practical literacy resources, educational assistance, and opportunities to develop
              skills and confidence.
            </p>
          </div>

          {/* 4 Visual Values */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 backdrop-blur-sm transition-all hover:bg-navy-800 hover:border-gold-400/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 mb-4">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs leading-relaxed text-navy-300">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Who We Support: "Supporting Learners and Families" */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Community Reach"
            title="Supporting Learners and Families"
            subtitle="Our programs are structured to offer welcoming, accessible guidance tailored to learners of various ages and educational backgrounds."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoWeSupport.map((group, idx) => {
              const IconComp = group.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-navy-100 bg-surface-light p-6 transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-card"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800 mb-4">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy-900">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {group.description}
                    </p>
                  </div>

                  <ul className="mt-5 pt-4 border-t border-navy-100/80 space-y-1.5">
                    {group.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs font-medium text-navy-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 sm:py-24 bg-surface-light border-t border-navy-100/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Questions &amp; Answers"
            title="Frequently Asked Questions"
            subtitle="Find clear, factual answers regarding our mission, educational support offerings, and ways to get involved."
          />

          <div className="mt-10">
            <FAQAccordion items={faqsData} allowMultiple={false} />
          </div>

          <div className="mt-8 text-center text-sm text-navy-600">
            Have a question that isn&apos;t covered here?{" "}
            <Link
              href="/contact"
              className="font-bold text-navy-900 underline underline-offset-4 decoration-gold-500 hover:text-gold-700"
            >
              Reach out to our team directly
            </Link>
            .
          </div>
        </div>
      </section>

      {/* 7. Homepage Final CTA: "Help Make Learning More Accessible" */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CTASection
          title="Help Make Learning More Accessible"
          description="Whether you want to support educational programs, volunteer your time, provide books or school supplies, or connect with us about educational resources, there are many ways to help strengthen learning opportunities in our communities."
          primaryBtnText="Get Involved"
          primaryBtnHref="/get-involved"
          secondaryBtnText="Contact Us"
          secondaryBtnHref="/contact"
        />
      </div>
    </>
  );
}

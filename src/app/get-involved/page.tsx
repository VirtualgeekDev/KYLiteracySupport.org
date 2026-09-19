"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  BookMarked,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Mail,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { DonationModal } from "@/components/DonationModal";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export default function GetInvolvedPage() {
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleDonateClick = (e: React.MouseEvent) => {
    if (!siteConfig.donationUrl) {
      e.preventDefault();
      setDonationModalOpen(true);
    }
  };

  const volunteerRoles = [
    {
      title: "Reading Mentors",
      description:
        "Guide emerging and young readers through weekly reading circles, phonics exercises, and vocabulary practice.",
    },
    {
      title: "Homework Assistants & Tutors",
      description:
        "Provide patient guidance to students with school assignments, project planning, and study organization.",
    },
    {
      title: "Educational Workshop Helpers",
      description:
        "Assist educators during parent workshops, digital literacy classes, and family learning events.",
    },
    {
      title: "Book Drive & Supply Coordinators",
      description:
        "Help sort, pack, and distribute donated books, backpacks, notebooks, and learning toolkits.",
    },
    {
      title: "Community Outreach & Administration",
      description:
        "Support communication, event coordination, and logistics to broaden educational awareness.",
    },
  ];

  const bookDonationGuidelines = [
    "New or gently used children's books and chapter books",
    "High-interest young adult novels and educational non-fiction",
    "Elementary flashcards, early reading sets, and phonics materials",
    "Unused notebooks, binders, folders, and filler paper",
    "Pencils, pens, erasers, highlighters, and colored markers",
  ];

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Get Involved | Kentucky Literacy Foundation"
        pageDescription="Discover ways to get involved: volunteer as a reading mentor or tutor, donate books and school supplies, or form a community partnership."
        pageUrl={`${siteConfig.url}/get-involved`}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-16 sm:py-20 border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Community Action
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Get Involved
            </h1>
            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              There are many ways to support literacy and educational opportunities in your
              community. Whether you give your time, share educational supplies, or support
              learning initiatives, your involvement helps strengthen readers across Kentucky.
            </p>
          </div>

          {/* Jump Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#volunteer"
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-50 shadow-xs"
            >
              1. Volunteer With Us
            </a>
            <a
              href="#donate"
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-50 shadow-xs"
            >
              2. Financial Support
            </a>
            <a
              href="#books-supplies"
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-50 shadow-xs"
            >
              3. Donate Books &amp; Supplies
            </a>
            <a
              href="#partnerships"
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-50 shadow-xs"
            >
              4. Community Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Volunteer */}
      <section id="volunteer" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                <Users className="h-4 w-4 text-gold-600" />
                <span>Service &amp; Mentorship</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
                Volunteer With Us
              </h2>
              <p className="text-base leading-relaxed text-navy-700 sm:text-lg">
                Dedicated volunteers are central to expanding educational access. By sharing your
                time and encouragement, you can help learners build confidence, master reading
                skills, and experience the joy of learning.
              </p>

              <div className="rounded-2xl border border-navy-100 bg-surface-light p-6 space-y-3">
                <h3 className="font-bold text-sm text-navy-900 uppercase tracking-wide">
                  Who Can Volunteer?
                </h3>
                <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                  We welcome current and retired educators, college students, high school peer
                  mentors, parents, and community members passionate about literacy. No prior
                  professional teaching degree is required—training and guidance are provided.
                </p>
              </div>

              <div>
                <Link
                  href="/contact?reason=Volunteer"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-navy-700 transition-colors"
                >
                  <Users className="h-4 w-4 text-gold-400" />
                  <span>Volunteer With Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Volunteer Roles List */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-navy-900">
                Volunteer Opportunities
              </h3>
              <div className="space-y-3">
                {volunteerRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xs transition-all hover:border-navy-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800 text-xs font-bold">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-heading text-base font-bold text-navy-900">
                          {role.title}
                        </h4>
                        <p className="mt-1 text-xs text-navy-600 leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Financial Support / Donate */}
      <section id="donate" className="scroll-mt-24 py-16 sm:py-24 bg-surface-light border-b border-navy-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800 mx-auto">
              <Heart className="h-4 w-4 text-gold-700" />
              <span>Financial Contributions</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
              Support Our Mission
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-navy-700">
              Financial support helps Kentucky Literacy Foundation, Inc. purchase educational
              resources, print learning materials, acquire reading books for children, and expand
              tutoring and community literacy workshops.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-4xl">
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-2xl bg-surface-light p-5 border border-navy-100 text-center">
                  <BookMarked className="h-8 w-8 text-gold-600 mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-navy-900">Books &amp; Materials</h3>
                  <p className="mt-1 text-xs text-navy-600">
                    Acquiring quality reading books and family literacy packets.
                  </p>
                </div>

                <div className="rounded-2xl bg-surface-light p-5 border border-navy-100 text-center">
                  <PackageCheck className="h-8 w-8 text-navy-700 mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-navy-900">School Supplies</h3>
                  <p className="mt-1 text-xs text-navy-600">
                    Providing notebooks, writing tools, and classroom preparation tools.
                  </p>
                </div>

                <div className="rounded-2xl bg-surface-light p-5 border border-navy-100 text-center">
                  <Users className="h-8 w-8 text-gold-600 mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-navy-900">Tutoring &amp; Workshops</h3>
                  <p className="mt-1 text-xs text-navy-600">
                    Supporting tutoring materials and parent education resources.
                  </p>
                </div>
              </div>

              {/* Status and Transparency Notice */}
              <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-navy-800 shrink-0 mt-0.5" />
                  <div className="text-xs text-navy-700 leading-relaxed">
                    <span className="font-bold block mb-1">Nonprofit Stewardship Notice</span>
                    {siteConfig.legalStatus} Automated online donation gateway processing is
                    currently being configured. In the interim, supporters are encouraged to connect
                    with us directly regarding contributions or sponsorships.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                {siteConfig.donationUrl ? (
                  <a
                    href={siteConfig.donationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-gold-700 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Support Our Mission</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleDonateClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-gold-700 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Support Our Mission</span>
                  </button>
                )}

                <Link
                  href="/contact?reason=Donation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-6 py-3.5 text-base font-semibold text-navy-800 hover:bg-navy-50 transition-colors"
                >
                  <Mail className="h-4 w-4 text-navy-600" />
                  <span>Contact Regarding Contributions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Donate Books & Supplies */}
      <section id="books-supplies" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                <BookMarked className="h-4 w-4 text-gold-600" />
                <span>Material Contributions</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
                Donate Books &amp; Supplies
              </h2>
              <p className="text-base leading-relaxed text-navy-700 sm:text-lg">
                Books in the home inspire a lifetime of curiosity and academic confidence. We
                gladly accept contributions of new and gently used books as well as essential school
                supplies for distribution to learners and families who need them.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact?reason=Books+%26+Supplies"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-navy-700 transition-colors"
                >
                  <BookMarked className="h-4 w-4 text-gold-400" />
                  <span>Contact Us About Donations</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-navy-100 bg-surface-light p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-gold-600" />
                  <span>Items Most Frequently Distributed</span>
                </h3>
                <ul className="space-y-3">
                  {bookDonationGuidelines.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-4 border-t border-navy-200/60 text-xs text-navy-500 leading-relaxed">
                  Note: Books should be in good, readable condition without missing pages or heavy
                  damage. Contact us in advance for bulk drop-off or pickup arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Community Partnerships */}
      <section id="partnerships" className="scroll-mt-24 py-16 sm:py-24 bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-800 mx-auto">
              <Building2 className="h-4 w-4 text-navy-700" />
              <span>Collaborative Initiatives</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
              Community Partnerships
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-navy-700">
              Schools, community centers, public libraries, local businesses, and educational
              advocates play a vital role in connecting learners with literacy support. We welcome
              exploring opportunities to collaborate on educational initiatives across Kentucky.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 text-center">
              <h3 className="font-heading text-base font-bold text-navy-900">Schools &amp; Educators</h3>
              <p className="mt-2 text-xs text-navy-600 leading-relaxed">
                Collaborate on after-school study support, student referrals, and book distribution
                events.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6 text-center">
              <h3 className="font-heading text-base font-bold text-navy-900">Community Centers</h3>
              <p className="mt-2 text-xs text-navy-600 leading-relaxed">
                Host parent literacy workshops, weekend study sessions, or community reading
                corners.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6 text-center">
              <h3 className="font-heading text-base font-bold text-navy-900">Businesses &amp; Groups</h3>
              <p className="mt-2 text-xs text-navy-600 leading-relaxed">
                Sponsor school supply drives, employee book donations, or educational material
                printing.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact?reason=Partnership"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-navy-700 transition-colors"
            >
              <Building2 className="h-4 w-4 text-gold-400" />
              <span>Discuss a Partnership</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CTASection
          title="Together We Can Strengthen Literacy"
          description="Every volunteer hour, book contribution, and community connection expands learning opportunities for a child or family in Kentucky."
          primaryBtnText="Contact Our Team"
          primaryBtnHref="/contact"
          secondaryBtnText="Explore Our Programs"
          secondaryBtnHref="/programs"
        />
      </div>
    </>
  );
}

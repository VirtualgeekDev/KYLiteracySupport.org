import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Help Make Learning More Accessible",
  description = "Whether you want to support educational programs, volunteer your time, provide books or school supplies, or connect with us about educational resources, there are many ways to help strengthen learning opportunities in our communities.",
  primaryBtnText = "Get Involved",
  primaryBtnHref = "/get-involved",
  secondaryBtnText = "Contact Us",
  secondaryBtnHref = "/contact",
  className,
}) => {
  return (
    <section
      aria-label="Call to action"
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16 lg:px-16",
        className
      )}
    >
      {/* Subtle background decorative shapes */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-navy-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-navy-700/80 px-3.5 py-1 text-xs font-semibold text-gold-300 ring-1 ring-white/10 mb-4">
          <HeartHandshake className="h-4 w-4" />
          <span>Community &bull; Learning &bull; Opportunity</span>
        </div>

        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-navy-200 sm:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryBtnHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 transition-colors sm:w-auto"
          >
            <span>{primaryBtnText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={secondaryBtnHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy-600 bg-navy-800/80 px-6 py-3.5 text-base font-semibold text-white hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 transition-colors sm:w-auto"
          >
            <Mail className="h-4 w-4 text-gold-300" />
            <span>{secondaryBtnText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

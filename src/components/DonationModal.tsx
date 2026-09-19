"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Heart, BookMarked, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-navy-900/10 sm:p-8 focus:outline-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 text-gold-600 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gold-700">
            Support Our Mission
          </span>
        </div>

        <h3 id="donation-modal-title" className="text-xl font-bold text-navy-900 sm:text-2xl">
          Empower Learning in Kentucky
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-navy-600">
          Financial contributions will help Kentucky Literacy Foundation, Inc. purchase books,
          distribute school supplies, and expand free educational tutoring for children and families.
        </p>

        {/* Transparent Status Box */}
        <div className="mt-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-navy-700 shrink-0 mt-0.5" />
            <div className="text-xs text-navy-700 leading-relaxed">
              <span className="font-semibold block mb-1">Direct Online Giving Update</span>
              Online automated credit card processing is currently being finalized with our verified
              charitable merchant account. In the meantime, you can connect directly with our team
              to discuss contributions, book drives, or community sponsorships.
            </div>
          </div>
        </div>

        {/* Action Options */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/contact?reason=Donation"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Us Regarding Support
          </Link>

          <Link
            href="/get-involved#books-supplies"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
          >
            <BookMarked className="h-4 w-4 text-gold-600" />
            Donate Books &amp; School Supplies
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-navy-400">
          Kentucky Literacy Foundation, Inc. &bull; KYLiteracySupport.org
        </p>
      </div>
    </div>
  );
};

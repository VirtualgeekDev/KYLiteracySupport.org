"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, BookOpen, CheckCircle, FileText, Info, ArrowRight } from "lucide-react";
import { ResourceItem } from "@/data/resources";

interface ResourceModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen || !resource) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-navy-900/10 sm:p-8 focus:outline-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Category & Format Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800">
            {resource.category}
          </span>
          <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800">
            {resource.format}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Audience: {resource.level}
          </span>
        </div>

        {/* Title */}
        <h3
          id="resource-modal-title"
          className="text-2xl font-bold tracking-tight text-navy-900"
        >
          {resource.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-navy-700">
          {resource.description}
        </p>

        {/* Core Principles / Summary */}
        <div className="mt-6 rounded-xl border border-navy-100 bg-surface-light p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
            <BookOpen className="h-4 w-4 text-gold-600" />
            Key Concepts &amp; Strategies
          </h4>
          <ul className="space-y-2.5">
            {resource.summary.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-navy-700 leading-relaxed">
                <CheckCircle className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Informative Placement Notice */}
        {resource.placeholderNotice && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold block mb-1">Resource Availability Note</span>
                {resource.placeholderNotice}
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/contact?reason=Educational+Support"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
          >
            Inquire About Workshop Materials
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};

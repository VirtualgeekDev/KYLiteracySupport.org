import React from "react";
import Link from "next/link";
import { BookOpen, Home, ArrowRight, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-surface-light">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-sm">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
          <BookOpen className="h-8 w-8 text-gold-600" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
            Page Not Found &bull; Error 404
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-navy-950 sm:text-4xl">
            We Couldn&apos;t Find That Page
          </h1>
          <p className="text-sm text-navy-600 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily
            unavailable. Please use the links below to return to our educational resources.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white hover:bg-navy-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50 transition-colors"
          >
            <span>Explore Educational Programs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-navy-600 hover:text-navy-900 pt-2"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Need assistance? Contact our team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

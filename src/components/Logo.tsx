import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer" | "standalone";
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = "header",
  showSubtitle = true,
}) => {
  const isLight = variant === "footer";

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-lg py-1",
        className
      )}
      aria-label="Kentucky Literacy Foundation, Inc. - Return to Homepage"
    >
      {/* Brand Icon: Education Open Book with Ascending Leaf/Sprout */}
      <div
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-sm",
          isLight
            ? "bg-navy-800 text-gold-400 ring-1 ring-white/15"
            : "bg-gradient-to-br from-navy-800 to-navy-700 text-gold-400 ring-1 ring-navy-900/10"
        )}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Open Book Base */}
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          {/* Subtle central growth sprout accent */}
          <path
            d="M12 7v5"
            stroke="currentColor"
            className="text-gold-300"
            strokeWidth="2.2"
          />
          <path
            d="M10 8.5c1-1 2-1 2-1s1 0 2 1"
            stroke="currentColor"
            className="text-gold-300"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-heading font-bold tracking-tight leading-snug",
            variant === "header"
              ? "text-lg text-navy-900 md:text-xl"
              : "text-lg text-white md:text-xl"
          )}
        >
          Kentucky Literacy Foundation
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "text-xs font-medium tracking-wide",
              isLight ? "text-navy-300" : "text-navy-500"
            )}
          >
            Inc. &bull; Educational &amp; Community Support
          </span>
        )}
      </div>
    </Link>
  );
};

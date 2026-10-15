"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Hide the global website header on custom payment link pages
  if (pathname?.startsWith("/donate/pay")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-100/80 bg-white/95 backdrop-blur-md transition-shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <Logo variant="header" />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 md:flex lg:gap-2"
        >
          {siteConfig.mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  isActive
                    ? "text-navy-900 bg-navy-50/70"
                    : "text-navy-700 hover:text-navy-900 hover:bg-navy-50/40"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Call to Action - Direct link to /donate */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors"
          >
            <Heart className="h-4 w-4 fill-current" />
            Support Our Mission
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-navy-700 hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-b border-navy-100 bg-white px-4 pt-2 pb-6 md:hidden shadow-xl animate-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {siteConfig.mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                    isActive
                      ? "bg-navy-50 text-navy-900 font-bold border-l-4 border-gold-500"
                      : "text-navy-700 hover:bg-navy-50/60 hover:text-navy-900"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.title}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-navy-100 flex flex-col gap-2">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-600 px-4 py-3 text-center text-base font-bold text-white shadow-sm hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <Heart className="h-5 w-5 fill-current" />
                Support Our Mission
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-navy-800 hover:bg-navy-50"
              >
                Get Educational Support
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

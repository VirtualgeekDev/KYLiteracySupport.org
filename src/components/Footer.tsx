import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-navy-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <Logo variant="footer" />
            <p className="text-sm leading-relaxed text-navy-300">
              Helping learners and families access literacy resources, educational support, and
              opportunities to learn across Kentucky communities.
            </p>
            <div className="pt-2 text-xs leading-relaxed text-navy-400">
              <span className="font-semibold text-navy-200 block mb-1">Organizational Status</span>
              {siteConfig.legalStatus}
            </div>
          </div>

          {/* Column 2: Organization Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Organization
            </h3>
            <ul role="list" className="mt-4 space-y-2.5">
              {siteConfig.footerNav.organization.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get Involved
            </h3>
            <ul role="list" className="mt-4 space-y-2.5">
              {siteConfig.footerNav.getInvolved.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Engagement */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact &amp; Inquiries
            </h3>
            <p className="mt-4 text-xs text-navy-300 leading-relaxed">
              We welcome inquiries from learners, caregivers, volunteers, and potential partners.
            </p>
            <ul role="list" className="mt-4 space-y-3 text-sm text-navy-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <span>Service Region: {siteConfig.contact.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-navy-600 hover:decoration-gold-400"
                >
                  Direct Contact Web Form
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <span>Inquiry response: {siteConfig.contact.inquiriesResponseTime}</span>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-200 transition-colors"
              >
                Send an inquiry message <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 border-t border-navy-800/80 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            &copy; 2026 {siteConfig.name} All rights reserved.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 sm:mt-0">
            {siteConfig.footerNav.legal.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-xs text-navy-400 hover:text-navy-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

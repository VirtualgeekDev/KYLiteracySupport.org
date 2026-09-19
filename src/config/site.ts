export interface NavItem {
  title: string;
  href: string;
}

export const siteConfig = {
  name: "Kentucky Literacy Foundation, Inc.",
  shortName: "Kentucky Literacy Foundation",
  legalName: "Kentucky Literacy Foundation, Inc.",
  domain: "KYLiteracySupport.org",
  url: "https://KYLiteracySupport.org",
  industry: "Education / Nonprofit & Community Services",
  tagline: "Building Stronger Readers. Creating More Opportunities.",
  description:
    "Kentucky Literacy Foundation provides literacy resources, tutoring, homework assistance, educational support, and learning opportunities for children and families.",
  legalStatus:
    "Kentucky Literacy Foundation, Inc. is organized around educational and charitable activities focused on literacy and learning support.",

  // Contact Information & Configuration
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@kyliteracysupport.org",
    displayEmail: "info@kyliteracysupport.org",
    phone: "Contact via web form",
    serviceArea: "Commonwealth of Kentucky",
    inquiriesResponseTime: "Within 2-3 business days",
  },

  // Donation Platform Integration
  donationUrl: "/donate",

  // Navigation Links
  mainNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Programs", href: "/programs" },
    { title: "Resources", href: "/resources" },
    { title: "Get Involved", href: "/get-involved" },
    { title: "Contact", href: "/contact" },
  ] as NavItem[],

  // Footer Navigation Sections
  footerNav: {
    organization: [
      { title: "About Us", href: "/about" },
      { title: "Educational Programs", href: "/programs" },
      { title: "Free Learning Resources", href: "/resources" },
      { title: "Contact Us", href: "/contact" },
    ],
    getInvolved: [
      { title: "Donate to Mission", href: "/donate" },
      { title: "Volunteer", href: "/get-involved#volunteer" },
      { title: "Donate Books & Supplies", href: "/get-involved#books-supplies" },
      { title: "Community Partnerships", href: "/get-involved#partnerships" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Use", href: "/terms" },
      { title: "Accessibility Statement", href: "/accessibility" },
    ],
  },
};

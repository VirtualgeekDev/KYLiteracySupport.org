import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipToContent } from "@/components/SkipToContent";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kentucky Literacy Foundation | Literacy & Educational Support",
    template: "%s | Kentucky Literacy Foundation",
  },
  description: siteConfig.description,
  keywords: [
    "Kentucky literacy programs",
    "literacy support Kentucky",
    "educational support Kentucky",
    "tutoring assistance Kentucky",
    "homework assistance",
    "literacy resources",
    "children's literacy",
    "educational nonprofit Kentucky",
    "reading support",
    "digital literacy",
    "free educational resources",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Kentucky Literacy Foundation | Literacy & Educational Support",
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kentucky Literacy Foundation, Inc. - Literacy and Educational Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kentucky Literacy Foundation | Literacy & Educational Support",
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-navy-950 font-sans">
        <SkipToContent />
        <JsonLd type="Organization" />
        <JsonLd type="WebSite" />
        <Navbar />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

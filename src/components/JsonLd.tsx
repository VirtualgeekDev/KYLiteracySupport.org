import React from "react";
import { siteConfig } from "@/config/site";

interface JsonLdProps {
  type?: "Organization" | "WebSite" | "WebPage";
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
}

export const JsonLd: React.FC<JsonLdProps> = ({
  type = "Organization",
  pageTitle,
  pageDescription,
  pageUrl,
}) => {
  const currentUrl = pageUrl || siteConfig.url;
  const currentTitle = pageTitle || siteConfig.name;
  const currentDescription = pageDescription || siteConfig.description;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kentucky",
    },
    knowsAbout: [
      "Literacy programs",
      "Tutoring",
      "Homework assistance",
      "Reading education",
      "School supply assistance",
      "Free educational resources",
      "Digital literacy",
    ],
    nonprofitStatus: "NonprofitType", // Factual general classification
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${currentUrl}/#webpage`,
    url: currentUrl,
    name: currentTitle,
    description: currentDescription,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    inLanguage: "en-US",
  };

  let schemaData: any;
  if (type === "Organization") schemaData = organizationSchema;
  else if (type === "WebSite") schemaData = websiteSchema;
  else schemaData = webpageSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ResourceCard } from "@/components/ResourceCard";
import { ResourceModal } from "@/components/ResourceModal";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import {
  resourcesData,
  resourceCategories,
  ResourceCategory,
  ResourceItem,
} from "@/data/resources";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle="Free Learning Resources | Kentucky Literacy Foundation"
        pageDescription="Access free reading, homework, parenting, and digital literacy resources and guides."
        pageUrl={`${siteConfig.url}/resources`}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-navy-50/70 via-white to-white py-16 sm:py-20 border-b border-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-gold-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Curated Materials
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Free Learning Resources
            </h1>
            <p className="text-lg leading-relaxed text-navy-700 sm:text-xl">
              Practical educational materials, reading strategies, study guides, and family
              learning tips designed to support learners and caregivers.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 mx-auto max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by title or topic (e.g. comprehension, study, family)..."
                className="w-full rounded-2xl border border-navy-200 bg-white pl-12 pr-4 py-3.5 text-sm text-navy-900 shadow-sm placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                aria-label="Search learning resources"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-navy-400 hover:text-navy-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {resourceCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-xl px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                    isActive
                      ? "bg-navy-800 text-white shadow-sm"
                      : "bg-white text-navy-700 border border-navy-200 hover:bg-navy-50"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onSelect={handleOpenResource}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-navy-200 p-10 text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-navy-400 mb-3" />
              <h3 className="font-heading text-lg font-bold text-navy-900">
                No Resources Found
              </h3>
              <p className="mt-2 text-sm text-navy-600">
                We couldn&apos;t find any resources matching &quot;{searchQuery}&quot; in the{" "}
                {selectedCategory} category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-xl bg-navy-800 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Educational Notice Banner */}
      <section className="bg-surface-light py-12 border-t border-navy-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-800 mx-auto">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-navy-900">
            Expanding Our Educational Repository
          </h3>
          <p className="text-sm text-navy-600 leading-relaxed max-w-2xl mx-auto">
            Kentucky Literacy Foundation, Inc. continuously collaborates with volunteer educators
            to develop and review practical study tools. Need a specific subject guide or have a
            resource suggestion? Let us know through our contact form.
          </p>
        </div>
      </section>

      {/* Resource Details Modal */}
      <ResourceModal
        resource={selectedResource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CTASection
          title="Looking for Personalized Educational Support?"
          description="While self-guided resources are valuable, one-on-one guidance and tutoring can make all the difference. Reach out to discuss how our programs can support your family."
          primaryBtnText="Request Educational Support"
          primaryBtnHref="/contact?reason=Educational+Support"
          secondaryBtnText="Explore Programs"
          secondaryBtnHref="/programs"
        />
      </div>
    </>
  );
}

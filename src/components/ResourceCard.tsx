import React from "react";
import { BookOpen, FileText, CheckSquare, Eye, Sparkles } from "lucide-react";
import { ResourceItem } from "@/data/resources";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: ResourceItem;
  onSelect: (resource: ResourceItem) => void;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onSelect,
  className,
}) => {
  const formatIcons = {
    Guide: BookOpen,
    Checklist: CheckSquare,
    "Activity Sheet": FileText,
    Overview: Eye,
    Toolkit: Sparkles,
  };

  const IconComponent = formatIcons[resource.format] || FileText;

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-card-hover",
        className
      )}
    >
      <div>
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-800">
            {resource.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold text-gold-800">
            <IconComponent className="h-3 w-3" />
            {resource.format}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-navy-900 leading-snug">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-navy-600">
          {resource.description}
        </p>

        {/* Target Level */}
        <div className="mt-4 pt-3 border-t border-navy-50 text-xs text-navy-500">
          <span className="font-semibold text-navy-700">Recommended for:</span>{" "}
          {resource.level}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-2">
        <button
          type="button"
          onClick={() => onSelect(resource)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-bold text-navy-800 hover:bg-navy-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors"
          aria-label={`View educational details for ${resource.title}`}
        >
          <Eye className="h-4 w-4" />
          <span>View Resource</span>
        </button>
      </div>
    </div>
  );
};

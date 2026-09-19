import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Pencil,
  Users,
  Laptop,
  BookMarked,
  School,
  Clock,
  HeartHandshake,
  Globe,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { Program } from "@/data/programs";
import { cn } from "@/lib/utils";

const iconMap: Record<Program["iconName"], LucideIcon> = {
  BookOpen,
  Pencil,
  Users,
  Laptop,
  BookMarked,
  School,
  Clock,
  HeartHandshake,
  Globe,
};

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  className,
}) => {
  const IconComponent = iconMap[program.iconName] || BookOpen;

  const statusColors = {
    "Core Offering": "bg-navy-50 text-navy-700 border-navy-200",
    "Expanding Initiative": "bg-gold-50 text-gold-800 border-gold-200",
    "Planned Program": "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-gold-500",
        className
      )}
    >
      <div>
        {/* Header: Icon & Status Badge */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800 group-hover:bg-navy-800 group-hover:text-gold-400 transition-colors duration-200">
            <IconComponent className="h-6 w-6" aria-hidden="true" />
          </div>

          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
              statusColors[program.status]
            )}
          >
            {program.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
          {program.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-navy-600">
          {program.shortDescription}
        </p>

        {/* Audience / Activity Tag */}
        <div className="mt-4 pt-4 border-t border-navy-50 text-xs text-navy-500">
          <span className="font-semibold text-navy-700">Learners:</span>{" "}
          {program.audience}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-2">
        <Link
          href={`/programs#${program.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-800 hover:text-gold-600 focus:outline-none transition-colors"
          aria-label={`Learn more about ${program.title}`}
        >
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

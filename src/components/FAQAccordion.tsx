"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  allowMultiple?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className,
  allowMultiple = false,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white overflow-hidden shadow-sm", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        const buttonId = `faq-trigger-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div key={idx} className="transition-colors">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold text-navy-900 hover:bg-navy-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-inset transition-colors sm:p-6 sm:text-lg"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-navy-500 transition-transform duration-200",
                    isOpen && "rotate-180 text-gold-600"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "px-5 pb-6 pt-1 sm:px-6",
                !isOpen && "hidden"
              )}
            >
              <p className="text-sm leading-relaxed text-navy-600 sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

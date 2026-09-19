"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const contactReasons = [
  "General Question",
  "Educational Support",
  "Tutoring",
  "Volunteer",
  "Donation",
  "Books & Supplies",
  "Partnership",
  "Other",
] as const;

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const initialReason = searchParams.get("reason") || "General Question";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: contactReasons.includes(initialReason as any)
      ? initialReason
      : "General Question",
    message: "",
    honeypot: "", // Hidden field for bot detection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    const reasonParam = searchParams.get("reason");
    if (reasonParam && contactReasons.includes(reasonParam as any)) {
      setFormData((prev) => ({ ...prev, reason: reasonParam }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message describing your inquiry.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setServerMessage(
          data.message || "Thank you for reaching out. Your message has been received."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          reason: "General Question",
          message: "",
          honeypot: "",
        });
      } else {
        setSubmitStatus("error");
        setServerMessage(data.error || "Unable to send message. Please try again later.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setServerMessage(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-10">
      {/* Success Banner */}
      {submitStatus === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base">Inquiry Successfully Received</h4>
              <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
                {serverMessage}
              </p>
              <p className="mt-2 text-xs text-emerald-700">
                A member of the Kentucky Literacy Foundation team will review your message and
                respond within 2–3 business days.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {submitStatus === "error" && (
        <div
          role="alert"
          className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-900"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base">Message Could Not Be Sent</h4>
              <p className="mt-1 text-sm text-red-800 leading-relaxed">
                {serverMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam honeypot (hidden from human users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Leave this field blank</label>
          <input
            type="text"
            id="website_url"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
            }
          />
        </div>

        {/* Row 1: First and Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-navy-900"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              className={cn(
                "mt-2 block w-full rounded-xl border px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500",
                errors.firstName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-navy-200 focus:border-gold-500"
              )}
              placeholder="e.g. Sarah"
            />
            {errors.firstName && (
              <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-navy-900"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              className={cn(
                "mt-2 block w-full rounded-xl border px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500",
                errors.lastName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-navy-200 focus:border-gold-500"
              )}
              placeholder="e.g. Jenkins"
            />
            {errors.lastName && (
              <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-navy-900"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={cn(
                "mt-2 block w-full rounded-xl border px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500",
                errors.email
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-navy-200 focus:border-gold-500"
              )}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-navy-900"
            >
              Phone Number <span className="text-xs font-normal text-navy-500">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="mt-2 block w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>

        {/* Reason for Contact */}
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-semibold text-navy-900"
          >
            Reason for Contact <span className="text-red-500">*</span>
          </label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, reason: e.target.value }))
            }
            className="mt-2 block w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            {contactReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-navy-900"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, message: e.target.value }));
              if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
            }}
            className={cn(
              "mt-2 block w-full rounded-xl border px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500",
              errors.message
                ? "border-red-400 bg-red-50/20 focus:border-red-500"
                : "border-navy-200 focus:border-gold-500"
            )}
            placeholder="Please let us know how we can support you, or share details about your volunteer, book donation, or partnership inquiry..."
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 text-gold-400" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-navy-500">
          Your information will only be used to respond to your inquiry in accordance with our{" "}
          <a
            href="/privacy-policy"
            className="underline underline-offset-2 hover:text-navy-800"
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  Sparkles,
  FileQuestion,
  CreditCard,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const CURRENCY_MAP: Record<string, { symbol: string; code: string }> = {
  usd: { symbol: "$", code: "USD" },
  eur: { symbol: "€", code: "EUR" },
  gbp: { symbol: "£", code: "GBP" },
};

const I18N: Record<string, any> = {
  en: {
    pageTitle: "Personalized Payment | Kentucky Literacy Foundation, Inc.",
    badge: "Personalized Payment Invitation",
    requestedAmount: "Requested Payment Amount",
    reference: "Reference",
    sandboxNotice: "Sandbox Test Mode Active",
    simulated: "Simulated",
    oneTime: "One-Time Payment",
    monthly: "Monthly Recurring",
    yourName: "Your Name",
    namePlaceholder: "Jane Doe",
    emailAddress: "Email Address",
    emailPlaceholder: "jane@example.com",
    optionalNote: "Optional Note",
    notePlaceholder: "Add an optional comment or reference...",
    processing: "Processing...",
    completeWithStripe: "Complete {amount} with Stripe",
    completeMonthlyWithStripe: "Complete {amount} / Month with Stripe",
    submitRequest: "Submit {amount} Payment Request",
    encryptedSecure: "Encrypted & Secure",
    requestReceived: "Payment Request Received",
    requestReceivedBody:
      "Thank you! Your payment request has been received. Our team will contact you shortly.",
    linkCompletedTitle: "Payment Already Completed",
    linkCompletedBody:
      "This personalized payment link has already been fulfilled. Thank you for your support!",
    linkInactiveTitle: "Payment Link Inactive",
    linkInactiveBody:
      "This custom payment link has expired, been revoked, or is no longer accessible.",
    goHome: "Go to Homepage",
    contactSupport: "Need assistance? Contact our team",
    verifying: "Verifying secure payment link...",
  },
  es: {
    pageTitle: "Pago Personalizado | Kentucky Literacy Foundation, Inc.",
    badge: "Invitación de Pago Personalizada",
    requestedAmount: "Monto de Pago Solicitado",
    reference: "Referencia",
    sandboxNotice: "Modo de Prueba Sandbox Activo",
    simulated: "Simulado",
    oneTime: "Pago Único",
    monthly: "Mensual Recurrente",
    yourName: "Su Nombre",
    namePlaceholder: "Juan Pérez",
    emailAddress: "Correo Electrónico",
    emailPlaceholder: "juan@ejemplo.com",
    optionalNote: "Nota Opcional",
    notePlaceholder: "Añada un comentario o referencia opcional...",
    processing: "Procesando...",
    completeWithStripe: "Completar {amount} con Stripe",
    completeMonthlyWithStripe: "Completar {amount} / Mes con Stripe",
    submitRequest: "Enviar Solicitud de Pago de {amount}",
    encryptedSecure: "Encriptado y Seguro",
    requestReceived: "Solicitud de Pago Recibida",
    requestReceivedBody:
      "¡Gracias! Su solicitud de pago ha sido recibida. Nuestro equipo se comunicará pronto con usted.",
    linkCompletedTitle: "Pago Ya Completado",
    linkCompletedBody:
      "Este enlace de pago personalizado ya ha sido completado. ¡Gracias por su colaboración!",
    linkInactiveTitle: "Enlace de Pago Inactivo",
    linkInactiveBody:
      "Este enlace de pago ha expirado, fue revocado o ya no está disponible.",
    goHome: "Ir a la Página Principal",
    contactSupport: "¿Necesita ayuda? Contacte a nuestro equipo",
    verifying: "Verificando enlace de pago seguro...",
  },
  fr: {
    pageTitle: "Paiement Personnalisé | Kentucky Literacy Foundation, Inc.",
    badge: "Invitation de Paiement Personnalisée",
    requestedAmount: "Montant de Paiement Demandé",
    reference: "Référence",
    sandboxNotice: "Mode Test Sandbox Actif",
    simulated: "Simulé",
    oneTime: "Paiement Unique",
    monthly: "Paiement Mensuel",
    yourName: "Votre Nom",
    namePlaceholder: "Jean Dupont",
    emailAddress: "Adresse E-mail",
    emailPlaceholder: "jean@exemple.com",
    optionalNote: "Remarque Facultative",
    notePlaceholder: "Ajoutez un commentaire ou une référence...",
    processing: "Traitement en cours...",
    completeWithStripe: "Payer {amount} avec Stripe",
    completeMonthlyWithStripe: "Payer {amount} / Mois avec Stripe",
    submitRequest: "Envoyer la Demande de Paiement de {amount}",
    encryptedSecure: "Chiffré et Sécurisé",
    requestReceived: "Demande de Paiement Reçue",
    requestReceivedBody:
      "Merci ! Votre demande de paiement a été bien reçue. Notre équipe vous contactera prochainement.",
    linkCompletedTitle: "Paiement Déjà Effectué",
    linkCompletedBody:
      "Ce lien de paiement personnalisé a déjà été réglé. Merci pour votre soutien !",
    linkInactiveTitle: "Lien de Paiement Inactif",
    linkInactiveBody:
      "Ce lien de paiement a expiré, a été révoqué ou n'est plus accessible.",
    goHome: "Aller à la Page d'Accueil",
    contactSupport: "Besoin d'aide ? Contactez notre équipe",
    verifying: "Vérification du lien de paiement sécurisé...",
  },
  de: {
    pageTitle: "Personalisierte Zahlung | Kentucky Literacy Foundation, Inc.",
    badge: "Personalisierte Zahlungseinladung",
    requestedAmount: "Angeforderter Zahlungsbetrag",
    reference: "Referenz",
    sandboxNotice: "Sandbox-Testmodus Aktiv",
    simulated: "Simuliert",
    oneTime: "Einmalige Zahlung",
    monthly: "Monatlich Wiederkehrend",
    yourName: "Ihr Name",
    namePlaceholder: "Max Mustermann",
    emailAddress: "E-Mail-Adresse",
    emailPlaceholder: "max@beispiel.de",
    optionalNote: "Optionale Notiz",
    notePlaceholder: "Fügen Sie eine optionale Bemerkung oder Referenz hinzu...",
    processing: "Wird verarbeitet...",
    completeWithStripe: "{amount} mit Stripe bezahlen",
    completeMonthlyWithStripe: "{amount} / Monat mit Stripe bezahlen",
    submitRequest: "Zahlungsanfrage über {amount} senden",
    encryptedSecure: "Verschlüsselt & Sicher",
    requestReceived: "Zahlungsanfrage Erhalten",
    requestReceivedBody:
      "Vielen Dank! Ihre Zahlungsanfrage ist eingegangen. Unser Team wird sich in Kürze bei Ihnen melden.",
    linkCompletedTitle: "Zahlung Bereits Abgeschlossen",
    linkCompletedBody:
      "Dieser personalisierte Zahlungslink wurde bereits beglichen. Vielen Dank für Ihre Unterstützung!",
    linkInactiveTitle: "Zahlungslink Inaktiv",
    linkInactiveBody:
      "Dieser Zahlungslink ist abgelaufen, wurde widerrufen oder ist nicht mehr verfügbar.",
    goHome: "Zur Startseite",
    contactSupport: "Benötigen Sie Hilfe? Kontaktieren Sie unser Team",
    verifying: "Sicherer Zahlungslink wird überprüft...",
  },
};

export default function CustomPaymentLinkPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [linkData, setLinkData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");

  useEffect(() => {
    async function loadLink() {
      if (!token) return;
      try {
        const res = await fetch(`/api/donate/pay/${token}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setLinkData(data);
          if (data.donorName) setDonorName(data.donorName);
          if (data.donorEmail) setDonorEmail(data.donorEmail);
        } else {
          setErrorMsg(data.error || "This payment link is invalid or has expired.");
        }
      } catch (err) {
        setErrorMsg("Failed to verify payment link. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    }
    loadLink();
  }, [token]);

  // Determine active language dictionary
  const langKey = (linkData?.language || "en").toLowerCase();
  const t = I18N[langKey] || I18N.en;

  // Determine currency representation
  const currKey = (linkData?.currency || "usd").toLowerCase();
  const currInfo = CURRENCY_MAP[currKey] || CURRENCY_MAP.usd;
  const formattedAmount = `${currInfo.symbol}${linkData?.amount?.toFixed(2) || "0.00"} ${currInfo.code}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkData) return;

    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    if (linkData.stripeActive) {
      // 1. Stripe Checkout Flow
      try {
        const res = await fetch("/api/donate/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: linkData.amount,
            currency: linkData.currency || "usd",
            frequency,
            donorName: donorName.trim() || undefined,
            donorEmail: donorEmail.trim() || undefined,
            paymentLinkToken: token,
            adminReference: linkData.reference || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
        } else {
          setErrorMsg(data.error || "Unable to proceed to payment. Please try again.");
          setIsSubmitting(false);
        }
      } catch (err) {
        setErrorMsg("Connection error. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      // 2. Offline Request Flow
      if (!donorName.trim()) {
        setErrorMsg(langKey === "es" ? "Por favor ingrese su nombre." : langKey === "fr" ? "Veuillez fournir votre nom." : langKey === "de" ? "Bitte geben Sie Ihren Namen an." : "Please provide your name.");
        setIsSubmitting(false);
        return;
      }
      if (!donorEmail.trim()) {
        setErrorMsg(langKey === "es" ? "Por favor ingrese su correo electrónico." : langKey === "fr" ? "Veuillez fournir votre adresse e-mail." : langKey === "de" ? "Bitte geben Sie Ihre E-Mail-Adresse an." : "Please provide your email address.");
        setIsSubmitting(false);
        return;
      }

      try {
        const res = await fetch("/api/donate/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: linkData.amount,
            currency: linkData.currency || "usd",
            frequency,
            donorName: donorName.trim(),
            donorEmail: donorEmail.trim(),
            paymentLinkToken: token,
            adminReference: linkData.reference || undefined,
            message: message.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setSuccessMsg(data.message || t.requestReceivedBody);
        } else {
          setErrorMsg(data.error || "Failed to submit request.");
        }
      } catch (err) {
        setErrorMsg("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface-light">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-navy-700 mx-auto" />
          <p className="text-sm font-semibold text-navy-600">{t.verifying}</p>
        </div>
      </div>
    );
  }

  // Link revoked or completed
  if (!linkData || linkData.status === "revoked" || linkData.status === "completed") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-surface-light">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-md text-center space-y-5">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mx-auto">
            <FileQuestion className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold text-navy-950">
              {linkData?.status === "completed"
                ? t.linkCompletedTitle
                : t.linkInactiveTitle}
            </h1>
            <p className="text-sm text-navy-600 leading-relaxed">
              {linkData?.status === "completed"
                ? t.linkCompletedBody
                : t.linkInactiveBody}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white hover:bg-navy-700"
            >
              <span>{t.goHome}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="text-xs font-semibold text-navy-600 hover:text-navy-900"
            >
              {t.contactSupport}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        type="WebPage"
        pageTitle={t.pageTitle}
        pageDescription={`${t.badge} - Kentucky Literacy Foundation, Inc.`}
        pageUrl={`${siteConfig.url}/donate/pay/${token}`}
      />

      <div className="min-h-[80vh] bg-surface-light py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Card Container */}
          <div className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-10 shadow-xl space-y-6">
            {/* Header Brand */}
            <div className="text-center space-y-3 pb-6 border-b border-navy-100">
              <div className="flex justify-center">
                <Logo variant="header" />
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3.5 py-1 text-xs font-semibold text-gold-800 border border-gold-200/60">
                <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                <span>{t.badge}</span>
              </div>
              {linkData.note && (
                <p className="text-sm sm:text-base font-medium text-navy-600 max-w-md mx-auto pt-1 leading-relaxed">
                  {linkData.note}
                </p>
              )}
            </div>

            {/* Requested Amount Display */}
            <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white text-center shadow-inner space-y-1">
              <span className="text-xs font-semibold text-navy-300 uppercase tracking-wider">
                {t.requestedAmount}
              </span>
              <div className="font-heading text-4xl sm:text-5xl font-black text-gold-400">
                {currInfo.symbol}{linkData.amount.toFixed(2)}{" "}
                <span className="text-lg font-normal text-navy-200">{currInfo.code}</span>
              </div>
              {linkData.reference && (
                <p className="text-xs text-navy-300 pt-1">
                  {t.reference}: <span className="text-white font-medium">{linkData.reference}</span>
                </p>
              )}
            </div>

            {/* Test Sandbox Badge */}
            {linkData?.stripeActive && linkData?.stripeMode === "test" && (
              <div className="rounded-xl border border-amber-300 bg-amber-50/80 px-3.5 py-2 text-xs text-amber-950 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  {t.sandboxNotice}
                </span>
                <span className="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded border border-amber-300">
                  {t.simulated}
                </span>
              </div>
            )}

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900 text-sm flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 text-sm flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">{t.requestReceived}</h4>
                  <p className="mt-1 text-xs text-emerald-800 leading-relaxed">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {!successMsg && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Frequency selection */}
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-light p-1 border border-navy-100 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFrequency("one_time")}
                    className={cn(
                      "py-2.5 rounded-lg transition-colors",
                      frequency === "one_time" ? "bg-navy-800 text-white shadow-xs" : "text-navy-700 hover:text-navy-950"
                    )}
                  >
                    {t.oneTime}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={cn(
                      "py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1",
                      frequency === "monthly" ? "bg-navy-800 text-white shadow-xs" : "text-navy-700 hover:text-navy-950"
                    )}
                  >
                    <Calendar className="h-3.5 w-3.5 text-gold-400" />
                    <span>{t.monthly}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    {t.optionalNote}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.notePlaceholder}
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-600 px-6 py-4 text-base font-extrabold text-white shadow-md hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{t.processing}</span>
                      </>
                    ) : linkData.stripeActive ? (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>
                          {frequency === "monthly"
                            ? t.completeMonthlyWithStripe.replace("{amount}", formattedAmount)
                            : t.completeWithStripe.replace("{amount}", formattedAmount)}
                        </span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        <span>{t.submitRequest.replace("{amount}", formattedAmount)}</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-navy-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    {t.encryptedSecure}
                  </span>
                  <span>&bull;</span>
                  <span>Kentucky Literacy Foundation, Inc.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

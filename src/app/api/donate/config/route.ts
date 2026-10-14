import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import { isStripeConfigured, getStripePublishableKey } from "@/lib/stripe";

export async function GET() {
  const settings = getSettings();
  const activeMode = settings.stripe_mode || "test";
  const configured = isStripeConfigured(activeMode);
  const publishableKey = getStripePublishableKey(activeMode);

  // Stripe is only active if the global setting is TRUE and secret keys are configured for the active mode
  const stripeActive = settings.stripe_active && configured;

  return NextResponse.json({
    stripeActive,
    globalSettingActive: settings.stripe_active,
    stripeMode: activeMode,
    isConfigured: configured,
    publishableKey: stripeActive ? publishableKey : "",
  });
}

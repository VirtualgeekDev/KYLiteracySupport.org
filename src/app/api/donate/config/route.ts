import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import { isStripeConfigured, getStripePublishableKey } from "@/lib/stripe";

export async function GET() {
  const settings = getSettings();
  const configured = isStripeConfigured();
  const publishableKey = getStripePublishableKey();

  // Stripe is only active if the global setting is TRUE and secret keys are configured
  const stripeActive = settings.stripe_active && configured;

  return NextResponse.json({
    stripeActive,
    globalSettingActive: settings.stripe_active,
    isConfigured: configured,
    publishableKey: stripeActive ? publishableKey : "",
  });
}

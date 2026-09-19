import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/db";
import { isStripeConfigured, getStripePublishableKey } from "@/lib/stripe";

export async function GET() {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getSettings();
  const configured = isStripeConfigured();

  return NextResponse.json({
    stripe_active: settings.stripe_active,
    is_configured: configured,
    publishable_key: getStripePublishableKey(),
    updated_at: settings.updated_at,
  });
}

export async function POST(request: Request) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { stripe_active } = body;

    if (typeof stripe_active !== "boolean") {
      return NextResponse.json(
        { error: "stripe_active must be a boolean" },
        { status: 400 }
      );
    }

    const updated = updateSettings({ stripe_active });
    const configured = isStripeConfigured();

    return NextResponse.json({
      success: true,
      message: `Stripe donations globally ${stripe_active ? "ACTIVATED" : "DEACTIVATED"}.`,
      stripe_active: updated.stripe_active,
      is_configured: configured,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

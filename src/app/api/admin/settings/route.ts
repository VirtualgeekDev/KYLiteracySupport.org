import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/db";
import {
  isStripeConfigured,
  isLiveConfigured,
  isTestConfigured,
  getStripePublishableKey,
  StripeMode,
} from "@/lib/stripe";

export async function GET() {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getSettings();
  const activeMode = settings.stripe_mode || "test";

  return NextResponse.json({
    stripe_active: settings.stripe_active,
    stripe_mode: activeMode,
    is_configured: isStripeConfigured(activeMode),
    is_live_configured: isLiveConfigured(),
    is_test_configured: isTestConfigured(),
    publishable_key: getStripePublishableKey(activeMode),
    live_publishable_key: getStripePublishableKey("live"),
    test_publishable_key: getStripePublishableKey("test"),
    updated_at: settings.updated_at,
  });
}

export async function POST(request: Request) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { stripe_active, stripe_mode } = body;

    const updates: any = {};

    if (stripe_active !== undefined) {
      if (typeof stripe_active !== "boolean") {
        return NextResponse.json(
          { error: "stripe_active must be a boolean" },
          { status: 400 }
        );
      }
      updates.stripe_active = stripe_active;
    }

    if (stripe_mode !== undefined) {
      if (stripe_mode !== "live" && stripe_mode !== "test") {
        return NextResponse.json(
          { error: "stripe_mode must be either 'live' or 'test'" },
          { status: 400 }
        );
      }
      updates.stripe_mode = stripe_mode as StripeMode;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid settings provided to update" },
        { status: 400 }
      );
    }

    const updated = updateSettings(updates);
    const activeMode = updated.stripe_mode || "test";

    let msg = "";
    if (updates.stripe_mode !== undefined && updates.stripe_active !== undefined) {
      msg = `Stripe donations are ${
        updated.stripe_active ? "ACTIVE" : "INACTIVE"
      } in ${activeMode.toUpperCase()} mode.`;
    } else if (updates.stripe_mode !== undefined) {
      msg = `Switched Stripe to ${activeMode.toUpperCase()} mode.`;
    } else if (updates.stripe_active !== undefined) {
      msg = `Stripe checkout globally ${
        updated.stripe_active ? "ACTIVATED" : "DEACTIVATED"
      }.`;
    }

    return NextResponse.json({
      success: true,
      message: msg,
      stripe_active: updated.stripe_active,
      stripe_mode: activeMode,
      is_configured: isStripeConfigured(activeMode),
      is_live_configured: isLiveConfigured(),
      is_test_configured: isTestConfigured(),
      publishable_key: getStripePublishableKey(activeMode),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

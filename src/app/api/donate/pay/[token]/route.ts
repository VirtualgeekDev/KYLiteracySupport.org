import { NextResponse } from "next/server";
import { getPaymentLinkByToken, getSettings } from "@/lib/db";
import { isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const link = getPaymentLinkByToken(token);

  if (!link) {
    return NextResponse.json(
      { error: "Payment link not found or does not exist." },
      { status: 404 }
    );
  }

  const settings = getSettings();
  const activeMode = settings.stripe_mode || "test";
  const configured = isStripeConfigured(activeMode);
  const stripeActive = settings.stripe_active && configured;

  return NextResponse.json(
    {
      valid: true,
      status: link.status,
      amount: link.amount,
      currency: link.currency,
      donorName: link.donor_name || "",
      donorEmail: link.donor_email || "",
      reference: link.reference || "",
      language: link.language || "en",
      stripeActive,
      stripeMode: activeMode,
      isConfigured: configured,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

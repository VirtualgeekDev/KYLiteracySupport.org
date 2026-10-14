import { NextResponse } from "next/server";
import { getSettings, createDonation, getPaymentLinkByToken } from "@/lib/db";
import { isStripeConfigured, createDonationCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, frequency = "one_time", donorName, donorEmail, message, paymentLinkToken, adminReference } = body;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json(
        { error: "Please provide a valid donation amount (minimum $1.00 USD)." },
        { status: 400 }
      );
    }

    if (frequency !== "one_time" && frequency !== "monthly") {
      return NextResponse.json(
        { error: "Frequency must be either 'one_time' or 'monthly'." },
        { status: 400 }
      );
    }

    // Check if Stripe is active and configured
    const settings = getSettings();
    const activeMode = settings.stripe_mode || "test";
    const configured = isStripeConfigured(activeMode);

    if (!settings.stripe_active || !configured) {
      return NextResponse.json(
        {
          error:
            "Online credit card checkout is currently inactive. Please use the donation request form to complete your gift.",
          fallbackToRequest: true,
        },
        { status: 400 }
      );
    }

    let currency = "usd";
    // Verify custom payment link if token provided
    if (paymentLinkToken) {
      const link = getPaymentLinkByToken(paymentLinkToken);
      if (!link || link.status !== "active") {
        return NextResponse.json(
          { error: "This custom payment link has expired or has been revoked." },
          { status: 400 }
        );
      }
      if (link.currency) {
        currency = link.currency.toLowerCase();
      }
    } else if (body.currency) {
      const c = body.currency.toLowerCase();
      if (["usd", "eur", "gbp"].includes(c)) {
        currency = c;
      }
    }

    // Determine base URL for redirects
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    // 1. Create a pending donation record in our local database
    const amountCents = Math.round(numAmount * 100);
    const donation = createDonation({
      donor_name: donorName?.trim() || "Anonymous Donor",
      donor_email: donorEmail?.trim() || "",
      amount: numAmount,
      amount_cents: amountCents,
      currency,
      frequency,
      status: "pending",
      payment_link_token: paymentLinkToken,
      admin_reference: adminReference,
      message: message?.trim(),
      stripe_mode: activeMode,
    });

    // 2. Create Stripe Checkout session
    const successUrl = `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}&donation_id=${donation.id}`;
    const cancelUrl = paymentLinkToken
      ? `${origin}/donate/pay/${paymentLinkToken}?canceled=true`
      : `${origin}/donate/cancel?donation_id=${donation.id}`;

    const session = await createDonationCheckoutSession({
      amount: numAmount,
      currency,
      frequency,
      donorName: donorName?.trim(),
      donorEmail: donorEmail?.trim(),
      donationId: donation.id,
      paymentLinkToken,
      adminReference,
      message,
      successUrl,
      cancelUrl,
      stripeMode: activeMode,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.sessionId,
      donationId: donation.id,
    });
  } catch (error: any) {
    console.error("[Donate Checkout API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate Stripe checkout." },
      { status: 500 }
    );
  }
}

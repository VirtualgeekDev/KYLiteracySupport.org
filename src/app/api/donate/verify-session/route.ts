import { NextResponse } from "next/server";
import { retrieveCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { getDonationById, getDonationBySessionId, updateDonation, completePaymentLink } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const donationId = searchParams.get("donation_id");

  if (!sessionId && !donationId) {
    return NextResponse.json(
      { error: "Missing session_id or donation_id parameter" },
      { status: 400 }
    );
  }

  try {
    let donation = donationId ? getDonationById(donationId) : undefined;
    if (!donation && sessionId) {
      donation = getDonationBySessionId(sessionId);
    }

    // If Stripe is configured and we have a session ID, verify directly with Stripe
    if (sessionId && isStripeConfigured()) {
      try {
        const session = await retrieveCheckoutSession(sessionId);
        const isPaid = session.payment_status === "paid";

        if (isPaid && donation && donation.status !== "succeeded") {
          donation = updateDonation(donation.id, {
            status: "succeeded",
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
            donor_name: donation.donor_name || session.customer_details?.name || "Donor",
            donor_email: donation.donor_email || session.customer_details?.email || "",
          }) || donation;

          if (donation.payment_link_token) {
            completePaymentLink(donation.payment_link_token);
          }
        }

        return NextResponse.json({
          verified: true,
          status: isPaid ? "succeeded" : donation?.status || "pending",
          amount: (session.amount_total || 0) / 100,
          currency: (session.currency || "usd").toUpperCase(),
          donorName: donation?.donor_name || session.customer_details?.name || "Supporter",
          donorEmail: donation?.donor_email || session.customer_details?.email || "",
          frequency: session.mode === "subscription" ? "monthly" : "one_time",
          sessionId: session.id,
          donationId: donation?.id,
          createdDate: donation?.created_at || new Date().toISOString(),
        });
      } catch (stripeErr: any) {
        console.warn("[Stripe Verify Session Warning]:", stripeErr.message);
      }
    }

    // Fallback to local DB record
    if (donation) {
      return NextResponse.json({
        verified: true,
        status: donation.status,
        amount: donation.amount,
        currency: donation.currency.toUpperCase(),
        donorName: donation.donor_name,
        donorEmail: donation.donor_email,
        frequency: donation.frequency,
        sessionId: donation.stripe_session_id,
        donationId: donation.id,
        createdDate: donation.created_at,
      });
    }

    return NextResponse.json({ error: "Donation record not found" }, { status: 404 });
  } catch (error: any) {
    console.error("[Verify Session API Error]:", error);
    return NextResponse.json(
      { error: "Could not verify payment session" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import {
  updateDonation,
  getDonationBySessionId,
  createDonation,
  completePaymentLink,
} from "@/lib/db";
import { notifyTeamDonationSuccess, sendDonorReceipt } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = constructWebhookEvent(rawBody, signature);
  } catch (err: any) {
    console.error("[Stripe Webhook Verification Error]:", err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  console.log(`[Stripe Webhook Received] Event: ${event.type} (ID: ${event.id})`);

  try {
    switch (event.type) {
      // 1. Checkout Session Completed
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const donationId = session.metadata?.donationId;
        const token = session.metadata?.paymentLinkToken;
        const amountCents = session.amount_total || 0;
        const amountDollars = amountCents / 100;
        const donorName =
          session.metadata?.donorName || session.customer_details?.name || "Anonymous Donor";
        const donorEmail =
          session.metadata?.donorEmail || session.customer_details?.email || "";
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;
        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id;

        let record = donationId
          ? updateDonation(donationId, {
              status: "succeeded",
              stripe_payment_intent_id: paymentIntentId,
              stripe_customer_id: customerId,
              donor_name: donorName,
              donor_email: donorEmail,
            })
          : null;

        // If not found by ID, search by session ID
        if (!record && session.id) {
          const existing = getDonationBySessionId(session.id);
          if (existing) {
            record = updateDonation(existing.id, {
              status: "succeeded",
              stripe_payment_intent_id: paymentIntentId,
              stripe_customer_id: customerId,
              donor_name: donorName,
              donor_email: donorEmail,
            });
          }
        }

        // If still no record (e.g. initiated directly), create record
        if (!record) {
          record = createDonation({
            donor_name: donorName,
            donor_email: donorEmail,
            amount: amountDollars,
            amount_cents: amountCents,
            currency: session.currency || "usd",
            frequency: session.mode === "subscription" ? "monthly" : "one_time",
            stripe_session_id: session.id,
            stripe_payment_intent_id: paymentIntentId,
            stripe_customer_id: customerId,
            status: "succeeded",
            payment_link_token: token,
            admin_reference: session.metadata?.adminReference,
          });
        }

        // If linked to a custom payment link token, mark that link completed
        if (token) {
          completePaymentLink(token);
        }

        // Send notifications
        await notifyTeamDonationSuccess({
          donorName,
          donorEmail,
          amount: amountDollars,
          frequency: session.mode === "subscription" ? "monthly" : "one_time",
          stripePaymentId: paymentIntentId || session.id,
        });

        if (donorEmail) {
          await sendDonorReceipt({
            donorName,
            donorEmail,
            amount: amountDollars,
            frequency: session.mode === "subscription" ? "monthly" : "one_time",
          });
        }

        break;
      }

      // 2. Recurring subscription invoice paid
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        // Avoid duplicate log for the initial invoice already handled by checkout.session.completed
        if (invoice.billing_reason === "subscription_cycle") {
          const amountDollars = (invoice.amount_paid || 0) / 100;
          const donorName = invoice.customer_name || "Monthly Donor";
          const donorEmail = invoice.customer_email || "";

          createDonation({
            donor_name: donorName,
            donor_email: donorEmail,
            amount: amountDollars,
            amount_cents: invoice.amount_paid || 0,
            currency: invoice.currency || "usd",
            frequency: "monthly",
            stripe_payment_intent_id:
              typeof (invoice as any).payment_intent === "string"
                ? (invoice as any).payment_intent
                : undefined,
            stripe_customer_id:
              typeof (invoice as any).customer === "string"
                ? (invoice as any).customer
                : undefined,
            status: "succeeded",
            admin_reference: `Recurring renewal: ${invoice.id}`,
          });

          await notifyTeamDonationSuccess({
            donorName,
            donorEmail,
            amount: amountDollars,
            frequency: "monthly",
            stripePaymentId: invoice.id,
          });
        }
        break;
      }

      // 3. Payment Intent Failed
      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const donationId = intent.metadata?.donationId;
        if (donationId) {
          updateDonation(donationId, { status: "failed" });
        }
        console.warn(
          `[Stripe Webhook] Payment failed for Intent: ${intent.id}. Reason: ${
            intent.last_payment_error?.message || "Unknown"
          }`
        );
        break;
      }

      // 4. Subscription canceled
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        console.log(`[Stripe Webhook] Subscription canceled: ${sub.id}`);
        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true, event: event.type }, { status: 200 });
  } catch (error: any) {
    console.error("[Stripe Webhook Processing Error]:", error);
    return NextResponse.json(
      { error: "Webhook handler failed internally" },
      { status: 500 }
    );
  }
}

import Stripe from "stripe";

// Initialize Stripe singleton
let stripeInstance: Stripe | null = null;

export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured in environment variables. Please set it in .env.local"
    );
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2024-06-20" as any,
      appInfo: {
        name: "Kentucky Literacy Foundation Donation Portal",
        version: "1.0.0",
      },
    });
  }

  return stripeInstance;
}

export function isStripeConfigured(): boolean {
  const secret = process.env.STRIPE_SECRET_KEY;
  return Boolean(secret && (secret.startsWith("sk_") || secret.startsWith("rk_")));
}

export function getStripePublishableKey(): string {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "";
}

export interface CreateCheckoutParams {
  amount: number; // in dollars (e.g. 50 or 75.50)
  frequency: "one_time" | "monthly";
  donorName?: string;
  donorEmail?: string;
  donationId: string;
  paymentLinkToken?: string;
  adminReference?: string;
  message?: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createDonationCheckoutSession(params: CreateCheckoutParams): Promise<{
  sessionId: string;
  url: string | null;
}> {
  const stripe = getStripeClient();
  const amountCents = Math.round(params.amount * 100);

  if (amountCents < 100) {
    throw new Error("Minimum donation amount is $1.00 USD");
  }

  const isRecurring = params.frequency === "monthly";

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    mode: isRecurring ? "subscription" : "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amountCents,
          product_data: {
            name: isRecurring
              ? "Monthly Literacy Support Donation"
              : "Kentucky Literacy Foundation Donation",
            description: isRecurring
              ? "Recurring monthly donation helping provide free literacy resources, tutoring, and books to Kentucky families."
              : "One-time contribution supporting free educational resources and literacy programs across Kentucky.",
            images: ["https://KYLiteracySupport.org/og-image.png"],
          },
          ...(isRecurring ? { recurring: { interval: "month" } } : {}),
        },
      },
    ],
    metadata: {
      donationId: params.donationId,
      donorName: params.donorName || "",
      donorEmail: params.donorEmail || "",
      frequency: params.frequency,
      paymentLinkToken: params.paymentLinkToken || "",
      adminReference: params.adminReference || "",
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  };

  if (params.donorEmail) {
    sessionConfig.customer_email = params.donorEmail;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  return {
    sessionId: session.id,
    url: session.url,
  };
}

export async function retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent", "customer", "subscription"],
  });
}

export function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured in environment variables.");
  }

  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}

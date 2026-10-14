import Stripe from "stripe";
import { getSettings } from "./db";

export type StripeMode = "live" | "test";

// Multi-mode Stripe client cache
const stripeInstances: { live: Stripe | null; test: Stripe | null } = {
  live: null,
  test: null,
};

/**
 * Returns the currently effective Stripe mode ("live" or "test").
 * If an explicit mode is provided, it is returned; otherwise, it reads the admin setting.
 */
export function getEffectiveStripeMode(explicitMode?: StripeMode): StripeMode {
  if (explicitMode === "live" || explicitMode === "test") {
    return explicitMode;
  }
  try {
    const settings = getSettings();
    return settings.stripe_mode || "test";
  } catch {
    return "test";
  }
}

/**
 * Retrieve the Secret Key for the specified or active mode.
 */
export function getStripeSecretKey(mode?: StripeMode): string {
  const targetMode = getEffectiveStripeMode(mode);
  if (targetMode === "test") {
    return (
      process.env.STRIPE_TEST_SECRET_KEY ||
      (process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ||
      process.env.STRIPE_SECRET_KEY?.startsWith("rk_test_")
        ? process.env.STRIPE_SECRET_KEY
        : "")
    );
  } else {
    return (
      process.env.STRIPE_LIVE_SECRET_KEY ||
      (process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ||
      process.env.STRIPE_SECRET_KEY?.startsWith("rk_live_")
        ? process.env.STRIPE_SECRET_KEY
        : "")
    );
  }
}

/**
 * Retrieve the Publishable Key for the specified or active mode.
 */
export function getStripePublishableKey(mode?: StripeMode): string {
  const targetMode = getEffectiveStripeMode(mode);
  if (targetMode === "test") {
    return (
      process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY ||
      process.env.STRIPE_TEST_PUBLISHABLE_KEY ||
      (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_")
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        : "") ||
      (process.env.STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_")
        ? process.env.STRIPE_PUBLISHABLE_KEY
        : "")
    );
  } else {
    return (
      process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLISHABLE_KEY ||
      process.env.STRIPE_LIVE_PUBLISHABLE_KEY ||
      (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_")
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        : "") ||
      (process.env.STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_")
        ? process.env.STRIPE_PUBLISHABLE_KEY
        : "")
    );
  }
}

/**
 * Retrieve the Webhook Signing Secret for the specified or active mode.
 */
export function getStripeWebhookSecret(mode?: StripeMode): string {
  const targetMode = getEffectiveStripeMode(mode);
  if (targetMode === "test") {
    return process.env.STRIPE_TEST_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "";
  } else {
    return process.env.STRIPE_LIVE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "";
  }
}

/**
 * Check if Stripe is configured for the specified or currently active mode.
 */
export function isStripeConfigured(mode?: StripeMode): boolean {
  const secret = getStripeSecretKey(mode);
  return Boolean(secret && (secret.startsWith("sk_") || secret.startsWith("rk_")));
}

/**
 * Check specifically if Live mode is configured.
 */
export function isLiveConfigured(): boolean {
  return isStripeConfigured("live");
}

/**
 * Check specifically if Test mode is configured.
 */
export function isTestConfigured(): boolean {
  return isStripeConfigured("test");
}

/**
 * Get the Stripe instance for the specified or active mode.
 */
export function getStripeClient(mode?: StripeMode): Stripe {
  const targetMode = getEffectiveStripeMode(mode);
  const secretKey = getStripeSecretKey(targetMode);

  if (!secretKey) {
    throw new Error(
      `STRIPE_${targetMode.toUpperCase()}_SECRET_KEY is not configured in environment variables. Please check your settings.`
    );
  }

  if (!stripeInstances[targetMode]) {
    stripeInstances[targetMode] = new Stripe(secretKey, {
      apiVersion: "2024-06-20" as any,
      appInfo: {
        name: "Kentucky Literacy Foundation Donation Portal",
        version: "1.0.0",
      },
    });
  }

  return stripeInstances[targetMode]!;
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
  stripeMode?: StripeMode;
}

export async function createDonationCheckoutSession(params: CreateCheckoutParams): Promise<{
  sessionId: string;
  url: string | null;
  stripeMode: StripeMode;
}> {
  const targetMode = getEffectiveStripeMode(params.stripeMode);
  const stripe = getStripeClient(targetMode);
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
      stripeMode: targetMode,
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
    stripeMode: targetMode,
  };
}

export async function retrieveCheckoutSession(
  sessionId: string,
  mode?: StripeMode
): Promise<Stripe.Checkout.Session> {
  const targetMode = getEffectiveStripeMode(mode);
  const stripe = getStripeClient(targetMode);
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent", "customer", "subscription"],
  });
}

/**
 * Resilient Webhook Event Construction:
 * Attempts verification with active mode's secret first, then alternate mode's secret,
 * ensuring webhooks for both Live and Test mode work seamlessly.
 */
export function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string
): Stripe.Event {
  const activeMode = getEffectiveStripeMode();
  const altMode: StripeMode = activeMode === "live" ? "test" : "live";

  // 1. Try active mode first
  const activeSecret = getStripeWebhookSecret(activeMode);
  if (activeSecret && isStripeConfigured(activeMode)) {
    try {
      const client = getStripeClient(activeMode);
      return client.webhooks.constructEvent(rawBody, signature, activeSecret);
    } catch (err: any) {
      console.warn(
        `[Stripe Webhook] Active (${activeMode}) signature check failed: ${err.message}. Trying ${altMode}...`
      );
    }
  }

  // 2. Try alternate mode
  const altSecret = getStripeWebhookSecret(altMode);
  if (altSecret && isStripeConfigured(altMode)) {
    try {
      const client = getStripeClient(altMode);
      return client.webhooks.constructEvent(rawBody, signature, altSecret);
    } catch (err: any) {
      console.warn(
        `[Stripe Webhook] Alternate (${altMode}) signature check failed: ${err.message}.`
      );
    }
  }

  // 3. Fallback to generic secret if different
  const genericSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (
    genericSecret &&
    genericSecret !== activeSecret &&
    genericSecret !== altSecret
  ) {
    try {
      const client = getStripeClient(activeMode);
      return client.webhooks.constructEvent(rawBody, signature, genericSecret);
    } catch {
      // Ignored
    }
  }

  throw new Error("Stripe webhook signature verification failed for all configured signing secrets.");
}

import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import {
  getPaymentLinks,
  createPaymentLink,
  revokePaymentLink,
} from "@/lib/db";

export async function GET() {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = getPaymentLinks();
  return NextResponse.json({ payment_links: links });
}

export async function POST(request: Request) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { amount, donor_name, donor_email, reference } = body;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json(
        { error: "Please enter a valid amount ($1.00 USD or more)." },
        { status: 400 }
      );
    }

    const newLink = createPaymentLink({
      amount: numAmount,
      donor_name,
      donor_email,
      reference,
    });

    // Determine host for generated link URL
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const fullUrl = `${protocol}://${host}/donate/pay/${newLink.token}`;

    return NextResponse.json({
      success: true,
      payment_link: newLink,
      url: fullUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { token, action } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing link token" }, { status: 400 });
    }

    if (action === "revoke") {
      const revoked = revokePaymentLink(token);
      if (!revoked) {
        return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "Payment link has been revoked.",
        payment_link: revoked,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createDonation, getPaymentLinkByToken } from "@/lib/db";
import { notifyTeamDonationRequest } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorName,
      donorEmail,
      amount,
      frequency = "one_time",
      message,
      phone,
      paymentLinkToken,
      adminReference,
    } = body;

    // Validation
    if (!donorName || !donorName.trim()) {
      return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
    }

    if (!donorEmail || !donorEmail.trim()) {
      return NextResponse.json({ error: "Please provide your email address." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json(
        { error: "Please provide a valid donation amount ($1.00 USD or more)." },
        { status: 400 }
      );
    }

    // Check payment link token if provided
    if (paymentLinkToken) {
      const link = getPaymentLinkByToken(paymentLinkToken);
      if (!link || link.status !== "active") {
        return NextResponse.json(
          { error: "This payment link has expired or has been revoked." },
          { status: 400 }
        );
      }
    }

    const amountCents = Math.round(numAmount * 100);
    const combinedMessage = [
      phone ? `Phone: ${phone}` : null,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // Save record with status 'request_submitted'
    const donation = createDonation({
      donor_name: donorName.trim(),
      donor_email: donorEmail.trim(),
      amount: numAmount,
      amount_cents: amountCents,
      currency: "usd",
      frequency: frequency === "monthly" ? "monthly" : "one_time",
      status: "request_submitted",
      payment_link_token: paymentLinkToken,
      admin_reference: adminReference,
      message: combinedMessage,
    });

    // Notify nonprofit team via email
    await notifyTeamDonationRequest({
      donorName: donation.donor_name,
      donorEmail: donation.donor_email,
      amount: donation.amount,
      frequency: donation.frequency,
      message: combinedMessage,
      adminReference,
      donationId: donation.id,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your generous pledge! Our team has received your donation request and will contact you shortly to coordinate your gift.",
      donationId: donation.id,
    });
  } catch (error: any) {
    console.error("[Donate Request API Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your donation request." },
      { status: 500 }
    );
  }
}

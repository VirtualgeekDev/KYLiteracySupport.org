import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, reason, message, honeypot } = body;

    // 1. Anti-spam honeypot check: If the hidden honeypot field is filled, silently return success to deter bots
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json(
        { message: "Thank you for reaching out. Your message has been received." },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Please provide all required fields (first name, last name, email, message)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3. Sanitize inputs
    const sanitizedData = {
      firstName: String(firstName).slice(0, 100).trim(),
      lastName: String(lastName).slice(0, 100).trim(),
      email: String(email).slice(0, 150).trim(),
      phone: phone ? String(phone).slice(0, 30).trim() : null,
      reason: String(reason || "General Question").slice(0, 50).trim(),
      message: String(message).slice(0, 3000).trim(),
      submittedAt: new Date().toISOString(),
    };

    // 4. Log the submission cleanly in server console
    console.log("[Contact Inquiry Received]:", {
      from: `${sanitizedData.firstName} ${sanitizedData.lastName} <${sanitizedData.email}>`,
      reason: sanitizedData.reason,
      phone: sanitizedData.phone || "None provided",
      time: sanitizedData.submittedAt,
    });

    /**
     * =========================================================================
     * TODO: EMAIL PROVIDER INTEGRATION
     * =========================================================================
     * When the organization administrator is ready to forward contact form inquiries
     * to a designated inbox (e.g. info@kyliteracysupport.org), connect one of the
     * following services using environment variables:
     *
     * Example 1: Resend (https://resend.com)
     *   import { Resend } from 'resend';
     *   const resend = new Resend(process.env.RESEND_API_KEY);
     *   await resend.emails.send({
     *     from: 'KY Literacy Support <contact@kyliteracysupport.org>',
     *     to: process.env.CONTACT_EMAIL || 'info@kyliteracysupport.org',
     *     subject: `New Inquiry [${sanitizedData.reason}]: ${sanitizedData.firstName} ${sanitizedData.lastName}`,
     *     text: sanitizedData.message,
     *   });
     *
     * Example 2: Formspree / SendGrid / Custom SMTP / Webhook
     * =========================================================================
     */

    return NextResponse.json(
      {
        message: "Thank you for reaching out. Your message has been received.",
        data: {
          name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          reason: sanitizedData.reason,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred while processing your message." },
      { status: 500 }
    );
  }
}

import { siteConfig } from "@/config/site";

export interface DonationEmailData {
  donorName: string;
  donorEmail: string;
  amount: number;
  frequency: "one_time" | "monthly";
  currency?: string;
  donationId?: string;
  message?: string;
  adminReference?: string;
  stripePaymentId?: string;
  createdDate?: string;
}

// 1. Notify Nonprofit Team about a new manual Donation Request (Stripe inactive)
export async function notifyTeamDonationRequest(data: DonationEmailData): Promise<void> {
  const teamEmail = process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL || "info@kyliteracysupport.org";
  const formattedAmount = `$${data.amount.toFixed(2)}`;

  console.log(`[Email Notification -> Nonprofit Team] New Donation Request Received:`, {
    to: teamEmail,
    subject: `New Donation Request: ${formattedAmount} from ${data.donorName}`,
    donorName: data.donorName,
    donorEmail: data.donorEmail,
    amount: formattedAmount,
    frequency: data.frequency === "monthly" ? "Monthly Recurring" : "One-Time",
    message: data.message || "No message attached",
    reference: data.adminReference || "None",
  });

  /**
   * TODO: To connect an external provider (e.g. Resend, SendGrid, Formspree),
   * add your API key in .env.local:
   *
   * if (process.env.RESEND_API_KEY) {
   *   const resend = new Resend(process.env.RESEND_API_KEY);
   *   await resend.emails.send({
   *     from: 'KY Literacy Support <donations@kyliteracysupport.org>',
   *     to: teamEmail,
   *     subject: `New Donation Request (${formattedAmount}) from ${data.donorName}`,
   *     html: `<p>A donor requested to make a donation...</p>`
   *   });
   * }
   */
}

// 2. Notify Nonprofit Team when a Stripe donation succeeds
export async function notifyTeamDonationSuccess(data: DonationEmailData): Promise<void> {
  const teamEmail = process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL || "info@kyliteracysupport.org";
  const formattedAmount = `$${data.amount.toFixed(2)}`;

  console.log(`[Email Notification -> Nonprofit Team] Stripe Donation Succeeded:`, {
    to: teamEmail,
    subject: `Donation Confirmed: ${formattedAmount} from ${data.donorName}`,
    donorName: data.donorName,
    donorEmail: data.donorEmail,
    amount: formattedAmount,
    frequency: data.frequency === "monthly" ? "Monthly Recurring" : "One-Time",
    stripePaymentId: data.stripePaymentId,
  });
}

// 3. Send Donor Confirmation Receipt
export async function sendDonorReceipt(data: DonationEmailData): Promise<void> {
  const formattedAmount = `$${data.amount.toFixed(2)}`;

  console.log(`[Email Notification -> Donor Receipt]:`, {
    to: data.donorEmail,
    subject: `Thank you for supporting Kentucky Literacy Foundation, Inc.`,
    body: `Dear ${data.donorName}, thank you for your generous gift of ${formattedAmount}. Your contribution helps provide free literacy resources, tutoring, homework assistance, and books to children and families across Kentucky.`,
  });
}

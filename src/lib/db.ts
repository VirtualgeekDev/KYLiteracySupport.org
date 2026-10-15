import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface DonationRecord {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number; // in USD (e.g. 50.00)
  amount_cents: number; // in cents (e.g. 5000)
  currency: string;
  frequency: "one_time" | "monthly";
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  stripe_customer_id?: string;
  stripe_mode?: "live" | "test";
  status: "pending" | "succeeded" | "failed" | "request_submitted" | "cancelled";
  payment_link_token?: string;
  admin_reference?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentLinkRecord {
  id: string;
  token: string;
  amount: number;
  currency: string;
  language?: string;
  donor_name?: string;
  donor_email?: string;
  reference?: string;
  note?: string;
  status: "active" | "completed" | "revoked";
  created_at: string;
  updated_at: string;
  revoked_at?: string;
}

export interface SettingsRecord {
  stripe_active: boolean;
  stripe_mode: "live" | "test";
  updated_at: string;
}

export interface AdminSessionRecord {
  token: string;
  username: string;
  expires_at: number; // epoch ms
}

interface DatabaseSchema {
  settings: SettingsRecord;
  donations: DonationRecord[];
  payment_links: PaymentLinkRecord[];
  admin_sessions: AdminSessionRecord[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "donations.db.json");

const DEFAULT_DB: DatabaseSchema = {
  settings: {
    stripe_active: true, // Activated
    stripe_mode: "test", // User requested test mode active
    updated_at: new Date().toISOString(),
  },
  donations: [],
  payment_links: [],
  admin_sessions: [],
};

// Ensure data directory exists
function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    saveDb(DEFAULT_DB);
    return DEFAULT_DB;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const data = JSON.parse(raw);
    return {
      settings: { ...DEFAULT_DB.settings, ...(data.settings || {}) },
      donations: Array.isArray(data.donations) ? data.donations : [],
      payment_links: Array.isArray(data.payment_links) ? data.payment_links : [],
      admin_sessions: Array.isArray(data.admin_sessions) ? data.admin_sessions : [],
    };
  } catch (error) {
    console.error("[Database Read Error]:", error);
    return DEFAULT_DB;
  }
}

// Atomic file write using temporary file + rename to prevent race conditions
function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const tmpFile = `${DB_FILE}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmpFile, DB_FILE);
}

// =============================================================================
// SETTINGS
// =============================================================================

export function getSettings(): SettingsRecord {
  const db = ensureDb();
  return db.settings;
}

export function updateSettings(updates: Partial<SettingsRecord>): SettingsRecord {
  const db = ensureDb();
  db.settings = {
    ...db.settings,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveDb(db);
  return db.settings;
}

// =============================================================================
// DONATIONS
// =============================================================================

export function getDonations(filters?: {
  status?: string;
  search?: string;
  limit?: number;
}): DonationRecord[] {
  const db = ensureDb();
  let results = [...db.donations];

  if (filters?.status && filters.status !== "all") {
    results = results.filter((d) => d.status === filters.status);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (d) =>
        d.donor_name.toLowerCase().includes(q) ||
        d.donor_email.toLowerCase().includes(q) ||
        (d.admin_reference && d.admin_reference.toLowerCase().includes(q))
    );
  }

  // Sort newest first
  results.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (filters?.limit) {
    results = results.slice(0, filters.limit);
  }

  return results;
}

export function getDonationById(id: string): DonationRecord | undefined {
  const db = ensureDb();
  return db.donations.find((d) => d.id === id);
}

export function getDonationBySessionId(sessionId: string): DonationRecord | undefined {
  const db = ensureDb();
  return db.donations.find((d) => d.stripe_session_id === sessionId);
}

export function createDonation(
  data: Omit<DonationRecord, "id" | "created_at" | "updated_at">
): DonationRecord {
  const db = ensureDb();
  const id = `don_${crypto.randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();

  const record: DonationRecord = {
    ...data,
    id,
    created_at: now,
    updated_at: now,
  };

  db.donations.unshift(record);
  saveDb(db);
  return record;
}

export function updateDonation(
  id: string,
  updates: Partial<DonationRecord>
): DonationRecord | null {
  const db = ensureDb();
  const index = db.donations.findIndex((d) => d.id === id);
  if (index === -1) return null;

  db.donations[index] = {
    ...db.donations[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  saveDb(db);
  return db.donations[index];
}

// =============================================================================
// PAYMENT LINKS
// =============================================================================

export function getPaymentLinks(): PaymentLinkRecord[] {
  const db = ensureDb();
  return [...db.payment_links].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getPaymentLinkByToken(token: string): PaymentLinkRecord | undefined {
  const db = ensureDb();
  return db.payment_links.find((p) => p.token === token);
}

export function createPaymentLink(data: {
  amount: number;
  currency?: string;
  language?: string;
  donor_name?: string;
  donor_email?: string;
  reference?: string;
  note?: string;
}): PaymentLinkRecord {
  const db = ensureDb();
  const id = `plink_${crypto.randomBytes(6).toString("hex")}`;
  const token = crypto.randomBytes(24).toString("hex"); // 48-char cryptographically secure unguessable token
  const now = new Date().toISOString();

  const validCurrencies = ["usd", "eur", "gbp"];
  const currency = data.currency && validCurrencies.includes(data.currency.toLowerCase())
    ? data.currency.toLowerCase()
    : "usd";

  const validLanguages = ["en", "es", "fr", "de"];
  const language = data.language && validLanguages.includes(data.language.toLowerCase())
    ? data.language.toLowerCase()
    : "en";

  const record: PaymentLinkRecord = {
    id,
    token,
    amount: Math.round(data.amount * 100) / 100,
    currency,
    language,
    donor_name: data.donor_name?.trim() || undefined,
    donor_email: data.donor_email?.trim() || undefined,
    reference: data.reference?.trim() || undefined,
    note: data.note?.trim() || undefined,
    status: "active",
    created_at: now,
    updated_at: now,
  };

  db.payment_links.unshift(record);
  saveDb(db);
  return record;
}

export function revokePaymentLink(token: string): PaymentLinkRecord | null {
  const db = ensureDb();
  const index = db.payment_links.findIndex((p) => p.token === token);
  if (index === -1) return null;

  db.payment_links[index] = {
    ...db.payment_links[index],
    status: "revoked",
    revoked_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  saveDb(db);
  return db.payment_links[index];
}

export function completePaymentLink(token: string): PaymentLinkRecord | null {
  const db = ensureDb();
  const index = db.payment_links.findIndex((p) => p.token === token);
  if (index === -1) return null;

  db.payment_links[index] = {
    ...db.payment_links[index],
    status: "completed",
    updated_at: new Date().toISOString(),
  };

  saveDb(db);
  return db.payment_links[index];
}

// =============================================================================
// ADMIN SESSIONS
// =============================================================================

export function createAdminSession(
  username: string,
  durationSeconds: number = 86400 * 7 // 7 days
): string {
  const db = ensureDb();
  const token = crypto.randomBytes(32).toString("hex");
  const expires_at = Date.now() + durationSeconds * 1000;

  // Prune expired sessions
  db.admin_sessions = db.admin_sessions.filter((s) => s.expires_at > Date.now());

  db.admin_sessions.push({
    token,
    username,
    expires_at,
  });

  saveDb(db);
  return token;
}

export function validateAdminSession(token?: string | null): boolean {
  if (!token) return false;
  const db = ensureDb();
  const session = db.admin_sessions.find((s) => s.token === token);
  if (!session) return false;

  if (session.expires_at < Date.now()) {
    // Session expired, remove it
    db.admin_sessions = db.admin_sessions.filter((s) => s.token !== token);
    saveDb(db);
    return false;
  }

  return true;
}

export function destroyAdminSession(token: string): void {
  const db = ensureDb();
  db.admin_sessions = db.admin_sessions.filter((s) => s.token !== token);
  saveDb(db);
}

// =============================================================================
// STATISTICS
// =============================================================================

export function getDonationStats() {
  const db = ensureDb();
  const succeeded = db.donations.filter((d) => d.status === "succeeded");
  const totalAmount = succeeded.reduce((sum, d) => sum + d.amount, 0);
  const requests = db.donations.filter((d) => d.status === "request_submitted");
  const activeLinks = db.payment_links.filter((p) => p.status === "active");

  return {
    totalSucceededCount: succeeded.length,
    totalRaised: Math.round(totalAmount * 100) / 100,
    pendingRequestsCount: requests.length,
    activePaymentLinksCount: activeLinks.length,
    allDonationsCount: db.donations.length,
  };
}

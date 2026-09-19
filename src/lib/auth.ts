import crypto from "crypto";
import { cookies } from "next/headers";
import { createAdminSession, validateAdminSession, destroyAdminSession } from "@/lib/db";

export const ADMIN_COOKIE_NAME = "ky_admin_session";

// Rate limiting in-memory store for failed attempts
interface RateLimitEntry {
  attempts: number;
  blockedUntil: number;
}
const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

// Hash password with scrypt
export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

// Generate random cryptographic salt
export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

// Constant-time string comparison to prevent timing attacks
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf-8");
    const bufB = Buffer.from(b, "utf-8");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Verify entered password against environment or stored hash
export function verifyAdminPassword(inputPassword: string): boolean {
  const envPassword = process.env.ADMIN_PASSWORD || "AdminKY2026!Literacy";
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  const envSalt = process.env.ADMIN_PASSWORD_SALT || "default_ky_salt_2026";

  if (envHash) {
    const inputHash = hashPassword(inputPassword, envSalt);
    return timingSafeCompare(inputHash, envHash);
  }

  // If no hash is set, compare with hashed representation of env password
  const expectedHash = hashPassword(envPassword, envSalt);
  const inputHash = hashPassword(inputPassword, envSalt);
  return timingSafeCompare(inputHash, expectedHash);
}

// Check rate limit for an identifier (e.g. IP)
export function checkRateLimit(identifier: string): { allowed: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) return { allowed: true };

  if (entry.blockedUntil > now) {
    const remainingMinutes = Math.ceil((entry.blockedUntil - now) / 60000);
    return { allowed: false, remainingMinutes };
  }

  // Lockout expired, reset
  if (entry.blockedUntil > 0 && entry.blockedUntil <= now) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

// Record a failed login attempt
export function recordFailedAttempt(identifier: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(identifier) || { attempts: 0, blockedUntil: 0 };
  entry.attempts += 1;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + LOCKOUT_MS;
    console.warn(`[Admin Security] Rate limit exceeded for identifier: ${identifier}. Locked for 15m.`);
  }

  loginAttempts.set(identifier, entry);
}

// Clear attempts on successful login
export function clearLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

// Get session token from incoming request cookies
export function getAdminSessionFromCookies(): string | null {
  try {
    const cookieStore = cookies();
    return cookieStore.get(ADMIN_COOKIE_NAME)?.value || null;
  } catch {
    return null;
  }
}

// Verify if the current user is authenticated as admin
export function isAuthenticatedAdmin(): boolean {
  const token = getAdminSessionFromCookies();
  return validateAdminSession(token);
}

// Create and set admin session cookie
export function setAdminSessionCookie(username: string): string {
  const token = createAdminSession(username);
  const cookieStore = cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400 * 7, // 7 days
  });

  return token;
}

// Clear admin session cookie
export function clearAdminSessionCookie(): void {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (token) {
      destroyAdminSession(token);
    }
    cookieStore.delete(ADMIN_COOKIE_NAME);
  } catch (error) {
    console.error("[Auth] Error clearing session cookie:", error);
  }
}

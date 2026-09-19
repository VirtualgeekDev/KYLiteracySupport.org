import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  checkRateLimit,
  recordFailedAttempt,
  clearLoginAttempts,
  setAdminSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Get client identifier for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "admin_login_client";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateCheck.remainingMinutes} minute(s) before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Please enter both username and password." },
        { status: 400 }
      );
    }

    // Verify username and password
    const isUsernameMatch = username.trim().toLowerCase() === expectedUsername.toLowerCase();
    const isPasswordValid = verifyAdminPassword(password);

    if (!isUsernameMatch || !isPasswordValid) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Login successful - clear failed attempts and set session cookie
    clearLoginAttempts(ip);
    setAdminSessionCookie(expectedUsername);

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      username: expectedUsername,
    });
  } catch (error: any) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json({ error: "Internal authentication error." }, { status: 500 });
  }
}

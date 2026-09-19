import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getDonations, getDonationStats } from "@/lib/db";

export async function GET(request: Request) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const donations = getDonations({ status, search, limit });
  const stats = getDonationStats();

  return NextResponse.json({
    donations,
    stats,
  });
}

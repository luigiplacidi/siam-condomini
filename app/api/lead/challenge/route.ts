import { NextResponse } from "next/server";

import { createLeadChallenge } from "@/lib/lead-challenge";

export function GET() {
  return NextResponse.json(createLeadChallenge(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

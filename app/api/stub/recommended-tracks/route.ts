import { NextResponse } from "next/server";
import { mockRecommendedTracks } from "@/data/mock";

export function GET() {
  return NextResponse.json({ items: mockRecommendedTracks });
}

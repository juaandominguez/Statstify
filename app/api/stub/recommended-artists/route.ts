import { NextResponse } from "next/server";
import { mockRecommendedArtists } from "@/data/mock";

export function GET() {
  return NextResponse.json({ items: mockRecommendedArtists });
}

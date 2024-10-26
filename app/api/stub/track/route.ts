import { NextResponse } from "next/server";
import { mockIndividualTrack } from "@/data/mock";

export function GET() {
  return NextResponse.json({ item: mockIndividualTrack });
}

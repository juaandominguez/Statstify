import { NextResponse } from "next/server";
import { mockTrackFeatures } from "@/data/mock";

export function GET() {
  return NextResponse.json({ item: mockTrackFeatures });
}

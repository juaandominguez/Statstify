import { NextResponse } from "next/server";
import { mockIndividualArtist } from "@/data/mock";

export function GET() {
  return NextResponse.json({ item: mockIndividualArtist });
}

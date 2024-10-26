import { NextResponse } from "next/server";
import { mockIndividualArtistTopTracks } from "@/data/mock";

export function GET() {
  return NextResponse.json({ items: mockIndividualArtistTopTracks });
}

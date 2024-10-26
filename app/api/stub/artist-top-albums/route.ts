import { NextResponse } from "next/server";
import { mockIndividualArtistTopAlbums } from "@/data/mock";

export function GET() {
  return NextResponse.json({ items: mockIndividualArtistTopAlbums });
}

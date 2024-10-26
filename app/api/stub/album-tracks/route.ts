import { NextResponse } from "next/server";
import { mockAlbumTracks } from "@/data/mock";

export function GET() {
  return NextResponse.json({ items: mockAlbumTracks });
}

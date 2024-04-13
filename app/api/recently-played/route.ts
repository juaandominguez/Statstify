import { NextResponse } from "next/server";
import { mockRecentTracks } from "@/data/mock";

export function GET(req: Request) {
  let url = new URL(req.url!);
  let searchParams = url.searchParams;
  let limit = searchParams.get("limit");
  let tracks = [];
  if (limit === null) {
    tracks = Array.from({ length: 50 }, () => mockRecentTracks);
  } else {
    tracks = Array.from({ length: Number(limit) }, () => mockRecentTracks);
  }
  return NextResponse.json({ items: tracks });
}

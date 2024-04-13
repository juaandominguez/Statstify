import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { mockArtist } from "@/data/mock";

export function GET(req: NextApiRequest) {
  let url = new URL(req.url!);
  let searchParams = url.searchParams;
  let limit = searchParams.get("limit");
  let artists = [];
  if (limit === null) {
    artists = Array.from({ length: 50 }, () => mockArtist);
  } else {
    artists = Array.from({ length: Number(limit) }, () => mockArtist);
  }
  return NextResponse.json({ items: artists });
}

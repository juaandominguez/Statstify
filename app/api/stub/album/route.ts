import { NextResponse } from "next/server";
import { mockAlbum } from "@/data/mock";

export function GET() {
  return NextResponse.json({ item: mockAlbum });
}

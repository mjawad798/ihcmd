import { NextResponse } from "next/server";
import FlashNews from "@/models/FlashNews";

// Returns the single most recent flash news item, since the homepage shows
// one popup at a time. Returns null if none exist.
export async function GET() {
    const latest = await FlashNews.findOne({ where: { isActive: true }, order: [["id", "DESC"]] });
    return NextResponse.json(latest);
}

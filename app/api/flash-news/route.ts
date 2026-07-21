import { NextRequest, NextResponse } from "next/server";
import FlashNews from "@/models/FlashNews";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("flash-news", "view");
    if (error) return error;

    const items = await FlashNews.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("flash-news", "add");
    if (error) return error;

    const body = await request.json();
    const { title, description, isActive } = body;

    if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const item = await FlashNews.create({ title, description, isActive: isActive !== false });
    return NextResponse.json(item, { status: 201 });
}

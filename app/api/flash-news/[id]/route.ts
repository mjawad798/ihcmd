import { NextRequest, NextResponse } from "next/server";
import FlashNews from "@/models/FlashNews";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("flash-news", "view");
    if (error) return error;

    const { id } = await params;
    const item = await FlashNews.findByPk(id);
    if (!item) return NextResponse.json({ error: "Flash news not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("flash-news", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await FlashNews.findByPk(id);
    if (!item) return NextResponse.json({ error: "Flash news not found." }, { status: 404 });

    const body = await request.json();
    const { title, description, isActive } = body;

    if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    await item.update({ title, description, isActive: isActive !== false });
    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("flash-news", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await FlashNews.findByPk(id);
    if (!item) return NextResponse.json({ error: "Flash news not found." }, { status: 404 });

    await item.destroy();
    return NextResponse.json({ success: true });
}

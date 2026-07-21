import { NextRequest, NextResponse } from "next/server";
import Achievement from "@/models/Achievement";
import { requireApiPermission } from "@/lib/permissions";
import { ACHIEVEMENT_ICONS } from "@/lib/achievementIcons";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("achievements", "view");
    if (error) return error;

    const { id } = await params;
    const item = await Achievement.findByPk(id);
    if (!item) return NextResponse.json({ error: "Achievement not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("achievements", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await Achievement.findByPk(id);
    if (!item) return NextResponse.json({ error: "Achievement not found." }, { status: 404 });

    const body = await request.json();
    const { icon, count, label, displayOrder, isActive } = body;

    if (!icon || !count || !label) {
        return NextResponse.json({ error: "Icon, count and label are required." }, { status: 400 });
    }
    if (!ACHIEVEMENT_ICONS.includes(icon)) {
        return NextResponse.json({ error: "Invalid icon." }, { status: 400 });
    }

    await item.update({
        icon,
        count,
        label,
        displayOrder: Number(displayOrder ?? 0),
        isActive: isActive !== false,
    });

    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("achievements", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await Achievement.findByPk(id);
    if (!item) return NextResponse.json({ error: "Achievement not found." }, { status: 404 });

    await item.destroy();
    return NextResponse.json({ success: true });
}

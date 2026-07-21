import { NextRequest, NextResponse } from "next/server";
import Achievement from "@/models/Achievement";
import { requireApiPermission } from "@/lib/permissions";
import { ACHIEVEMENT_ICONS } from "@/lib/achievementIcons";

export async function GET() {
    const { error } = await requireApiPermission("achievements", "view");
    if (error) return error;

    const items = await Achievement.findAll({ order: [["displayOrder", "ASC"], ["id", "ASC"]] });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("achievements", "add");
    if (error) return error;

    const body = await request.json();
    const { icon, count, label, displayOrder, isActive } = body;

    if (!icon || !count || !label) {
        return NextResponse.json({ error: "Icon, count and label are required." }, { status: 400 });
    }
    if (!ACHIEVEMENT_ICONS.includes(icon)) {
        return NextResponse.json({ error: "Invalid icon." }, { status: 400 });
    }

    const item = await Achievement.create({
        icon,
        count,
        label,
        displayOrder: Number(displayOrder ?? 0),
        isActive: isActive !== false,
    });

    return NextResponse.json(item, { status: 201 });
}

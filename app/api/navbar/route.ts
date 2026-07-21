import { NextRequest, NextResponse } from "next/server";
import NavItem from "@/models/NavItem";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("navbar", "view");
    if (error) return error;

    const items = await NavItem.findAll({
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
        include: [{ model: NavItem, as: "parent", attributes: ["id", "title"] }],
    });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("navbar", "add");
    if (error) return error;

    const body = await request.json();
    const { title, type, link, parentId, displayOrder } = body;

    if (!title || !type) {
        return NextResponse.json({ error: "Title and type are required." }, { status: 400 });
    }
    if (type === "submenu" && !parentId) {
        return NextResponse.json({ error: "Submenu items require a parent." }, { status: 400 });
    }

    const item = await NavItem.create({
        title,
        type,
        link: link || null,
        parentId: type === "submenu" ? parentId : null,
        displayOrder: Number(displayOrder ?? 0),
    });

    return NextResponse.json(item, { status: 201 });
}

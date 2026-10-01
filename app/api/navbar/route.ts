import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    const { title, type, link, parentId, displayOrder, placement } = body;

    if (!title || !type) {
        return NextResponse.json({ error: "Title and type are required." }, { status: 400 });
    }
    if (type === "submenu" && !parentId) {
        return NextResponse.json({ error: "Submenu items require a parent." }, { status: 400 });
    }
    if (placement === "topbar" && type === "submenu") {
        return NextResponse.json({ error: "Top bar items cannot be submenu items." }, { status: 400 });
    }

    const item = await NavItem.create({
        title,
        type,
        placement: placement === "topbar" ? "topbar" : "main",
        link: link || null,
        parentId: type === "submenu" ? parentId : null,
        displayOrder: Number(displayOrder ?? 0),
    });

    // The navbar renders on every public page via the shared site layout —
    // revalidate it immediately instead of waiting for the layout's 60s ISR
    // window, so admin edits show up on next request.
    revalidatePath("/", "layout");

    return NextResponse.json(item, { status: 201 });
}

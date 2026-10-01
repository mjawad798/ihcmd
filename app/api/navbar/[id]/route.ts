import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import NavItem from "@/models/NavItem";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("navbar", "view");
    if (error) return error;

    const { id } = await params;
    const item = await NavItem.findByPk(id);
    if (!item) return NextResponse.json({ error: "Nav item not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("navbar", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await NavItem.findByPk(id);
    if (!item) return NextResponse.json({ error: "Nav item not found." }, { status: 404 });

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
    if (Number(parentId) === item.id) {
        return NextResponse.json({ error: "An item cannot be its own parent." }, { status: 400 });
    }

    await item.update({
        title,
        type,
        placement: placement === "topbar" ? "topbar" : "main",
        link: link || null,
        parentId: type === "submenu" ? parentId : null,
        displayOrder: Number(displayOrder ?? item.displayOrder),
    });

    revalidatePath("/", "layout");

    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("navbar", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await NavItem.findByPk(id);
    if (!item) return NextResponse.json({ error: "Nav item not found." }, { status: 404 });

    const childCount = await NavItem.count({ where: { parentId: item.id } });
    if (childCount > 0) {
        return NextResponse.json(
            { error: "Delete or reassign this item's submenu items first." },
            { status: 409 }
        );
    }

    await item.destroy();

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
}

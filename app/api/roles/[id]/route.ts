import { NextRequest, NextResponse } from "next/server";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import { requireApiPermission } from "@/lib/permissions";
import { FORM_KEYS } from "@/lib/forms";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("roles", "view");
    if (error) return error;

    const { id } = await params;
    const role = await Role.findByPk(id, { include: [{ model: Permission, as: "permissions" }] });
    if (!role) return NextResponse.json({ error: "Role not found." }, { status: 404 });
    return NextResponse.json(role);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("roles", "edit");
    if (error) return error;

    const { id } = await params;
    const role = await Role.findByPk(id);
    if (!role) return NextResponse.json({ error: "Role not found." }, { status: 404 });

    const body = await request.json();
    const { name, permissions } = body;

    if (!name) {
        return NextResponse.json({ error: "Role name is required." }, { status: 400 });
    }

    if (name !== role.name) {
        const existing = await Role.findOne({ where: { name } });
        if (existing) {
            return NextResponse.json({ error: "Role name already exists." }, { status: 400 });
        }
    }

    await role.update({ name });

    if (permissions) {
        for (const formName of FORM_KEYS) {
            const p = permissions[formName] ?? {};
            await Permission.upsert({
                roleId: role.id,
                formName,
                canAdd: !!p.add,
                canView: !!p.view,
                canEdit: !!p.edit,
                canDelete: !!p.delete,
            });
        }
    }

    const updated = await Role.findByPk(role.id, { include: [{ model: Permission, as: "permissions" }] });
    return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("roles", "delete");
    if (error) return error;

    const { id } = await params;
    const role = await Role.findByPk(id);
    if (!role) return NextResponse.json({ error: "Role not found." }, { status: 404 });

    await Permission.destroy({ where: { roleId: role.id } });
    await role.destroy();

    return NextResponse.json({ success: true });
}

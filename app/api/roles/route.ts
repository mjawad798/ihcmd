import { NextRequest, NextResponse } from "next/server";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import { requireApiPermission } from "@/lib/permissions";
import { FORM_KEYS } from "@/lib/forms";

export async function GET() {
    const { error } = await requireApiPermission("roles", "view");
    if (error) return error;

    const roles = await Role.findAll({
        include: [{ model: Permission, as: "permissions" }],
        order: [["id", "ASC"]],
    });
    return NextResponse.json(roles);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("roles", "add");
    if (error) return error;

    const body = await request.json();
    const { name, permissions } = body;

    if (!name) {
        return NextResponse.json({ error: "Role name is required." }, { status: 400 });
    }

    const existing = await Role.findOne({ where: { name } });
    if (existing) {
        return NextResponse.json({ error: "Role name already exists." }, { status: 400 });
    }

    const role = await Role.create({ name });

    const permissionRows = FORM_KEYS.map((formName) => {
        const p = permissions?.[formName] ?? {};
        return {
            roleId: role.id,
            formName,
            canAdd: !!p.add,
            canView: !!p.view,
            canEdit: !!p.edit,
            canDelete: !!p.delete,
        };
    });
    await Permission.bulkCreate(permissionRows);

    const created = await Role.findByPk(role.id, { include: [{ model: Permission, as: "permissions" }] });
    return NextResponse.json(created, { status: 201 });
}

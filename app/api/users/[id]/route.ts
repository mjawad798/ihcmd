import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Role from "@/models/Role";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("users", "view");
    if (error) return error;

    const { id } = await params;
    const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("users", "edit");
    if (error) return error;

    const { id } = await params;
    const user = await User.findByPk(id);
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const body = await request.json();
    const { username, password, roleId, isActive } = body;

    if (!username || !roleId) {
        return NextResponse.json({ error: "Username and role are required." }, { status: 400 });
    }

    if (username !== user.username) {
        const existing = await User.findOne({ where: { username } });
        if (existing) {
            return NextResponse.json({ error: "Username already exists." }, { status: 400 });
        }
    }

    const updates: Partial<{ username: string; password: string; roleId: number; isActive: boolean }> = {
        username,
        roleId,
        isActive: isActive !== false,
    };

    if (password) {
        updates.password = await bcrypt.hash(password, 10);
    }

    await user.update(updates);

    const { password: _pw, ...safeUser } = user.toJSON();
    return NextResponse.json(safeUser);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("users", "delete");
    if (error) return error;

    const { id } = await params;
    const user = await User.findByPk(id);
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    await user.destroy();
    return NextResponse.json({ success: true });
}

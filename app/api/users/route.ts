import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Role from "@/models/Role";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("users", "view");
    if (error) return error;

    const users = await User.findAll({
        attributes: { exclude: ["password"] },
        include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
        order: [["id", "ASC"]],
    });
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("users", "add");
    if (error) return error;

    const body = await request.json();
    const { username, password, roleId, isActive } = body;

    if (!username || !password || !roleId) {
        return NextResponse.json({ error: "Username, password and role are required." }, { status: 400 });
    }

    const existing = await User.findOne({ where: { username } });
    if (existing) {
        return NextResponse.json({ error: "Username already exists." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashed,
        roleId,
        isActive: isActive !== false,
    });

    const { password: _pw, ...safeUser } = user.toJSON();
    return NextResponse.json(safeUser, { status: 201 });
}

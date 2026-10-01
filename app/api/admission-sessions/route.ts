import { NextRequest, NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import AdmissionSession from "@/models/AdmissionSession";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("admission-sessions", "view");
    if (error) return error;

    const sessions = await AdmissionSession.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("admission-sessions", "add");
    if (error) return error;

    const body = await request.json().catch(() => ({}));
    const sessionName = String(body.sessionName ?? "").trim();
    const code = String(body.code ?? "").trim().toUpperCase();
    const isActive = body.isActive === true;
    const isOpenForAdmission = body.isOpenForAdmission === true;

    if (!sessionName || !code) {
        return NextResponse.json({ error: "Session name and code are required." }, { status: 400 });
    }
    if (!/^[A-Z0-9]{1,20}$/.test(code)) {
        return NextResponse.json({ error: "Code may contain only letters and numbers (e.g. F26)." }, { status: 400 });
    }
    if (await AdmissionSession.findOne({ where: { code } })) {
        return NextResponse.json({ error: "A session with this code already exists." }, { status: 409 });
    }

    // Only one session may be active at a time.
    const session = await sequelize.transaction(async (transaction) => {
        if (isActive) {
            await AdmissionSession.update({ isActive: false }, { where: { isActive: true }, transaction });
        }
        return AdmissionSession.create({ sessionName, code, isActive, isOpenForAdmission }, { transaction });
    });

    return NextResponse.json(session, { status: 201 });
}

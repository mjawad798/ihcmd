import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import sequelize from "@/lib/sequelize";
import AdmissionSession from "@/models/AdmissionSession";
import AdmissionApplication from "@/models/AdmissionApplication";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("admission-sessions", "edit");
    if (error) return error;

    const { id } = await params;
    const session = await AdmissionSession.findByPk(id);
    if (!session) return NextResponse.json({ error: "Session not found." }, { status: 404 });

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
    if (await AdmissionSession.findOne({ where: { code, id: { [Op.ne]: session.id } } })) {
        return NextResponse.json({ error: "A session with this code already exists." }, { status: 409 });
    }
    // Changing the code after applications exist would make numbers inconsistent.
    if (code !== session.code && (await AdmissionApplication.count({ where: { sessionId: session.id } })) > 0) {
        return NextResponse.json({ error: "The code cannot be changed once applications exist." }, { status: 409 });
    }

    // Only one session may be active at a time.
    await sequelize.transaction(async (transaction) => {
        if (isActive) {
            await AdmissionSession.update(
                { isActive: false },
                { where: { id: { [Op.ne]: session.id }, isActive: true }, transaction }
            );
        }
        await session.update({ sessionName, code, isActive, isOpenForAdmission }, { transaction });
    });

    return NextResponse.json(session);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("admission-sessions", "delete");
    if (error) return error;

    const { id } = await params;
    const session = await AdmissionSession.findByPk(id);
    if (!session) return NextResponse.json({ error: "Session not found." }, { status: 404 });

    if ((await AdmissionApplication.count({ where: { sessionId: session.id } })) > 0) {
        return NextResponse.json(
            { error: "This session has applications and cannot be deleted. Close it instead." },
            { status: 409 }
        );
    }

    await session.destroy();
    return NextResponse.json({ success: true });
}

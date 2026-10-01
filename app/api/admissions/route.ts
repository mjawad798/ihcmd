import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import AdmissionApplication, { AdmissionQualification } from "@/models/AdmissionApplication";
import AdmissionSession from "@/models/AdmissionSession";
import AcademicProgram from "@/models/AcademicProgram";
import { requireApiPermission } from "@/lib/permissions";

export async function GET(request: NextRequest) {
    const { error } = await requireApiPermission("admissions", "view");
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const programId = searchParams.get("programId");
    const q = searchParams.get("q")?.trim();

    const where: WhereOptions<AdmissionApplication> = {};
    if (sessionId) where.sessionId = Number(sessionId);
    if (programId) where.programId = Number(programId);
    if (q) {
        const like = `%${q}%`;
        Object.assign(where, {
            [Op.or]: [
                { fullName: { [Op.like]: like } },
                { cnic: { [Op.like]: `%${q.replace(/\D/g, "") || q}%` } },
                { applicationNo: { [Op.like]: like } },
            ],
        });
    }

    const applications = await AdmissionApplication.findAll({
        where,
        include: [
            { model: AdmissionQualification, as: "qualifications" },
            { model: AdmissionSession, as: "session", attributes: ["id", "sessionName"] },
            { model: AcademicProgram, as: "program", attributes: ["id", "name"] },
        ],
        order: [["id", "DESC"]],
        limit: 1000,
    });

    return NextResponse.json(applications);
}

import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import sequelize from "@/lib/sequelize";
import AdmissionApplication, { AdmissionQualification } from "@/models/AdmissionApplication";
import AcademicProgram from "@/models/AcademicProgram";
import { LEVEL_BY_PROGRAM_TYPE, validateApplication } from "@/lib/admission";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

// Admin edit of a submitted application: applicant details, qualifications and
// the program applied for. Uses the same validation as the public form. The
// application number and session never change.
export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("admissions", "edit");
    if (error) return error;

    const { id } = await params;
    const application = await AdmissionApplication.findByPk(id);
    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const result = validateApplication(body);
    if ("errors" in result) {
        return NextResponse.json({ error: "Please correct the highlighted fields.", errors: result.errors }, { status: 400 });
    }
    const { qualifications, ...fields } = result.data;

    // Admins may move an applicant to any program, even one that has since closed.
    const program = await AcademicProgram.findByPk(fields.programId);
    if (!program) return NextResponse.json({ error: "The selected program does not exist." }, { status: 400 });

    const duplicate = await AdmissionApplication.findOne({
        where: { sessionId: application.sessionId, cnic: fields.cnic, id: { [Op.ne]: application.id } },
    });
    if (duplicate) {
        return NextResponse.json(
            { error: `Another application in this session already uses this CNIC (${duplicate.applicationNo}).` },
            { status: 409 }
        );
    }

    await sequelize.transaction(async (transaction) => {
        await application.update(
            {
                ...fields,
                email: fields.email || null,
                programLevel: LEVEL_BY_PROGRAM_TYPE[program.type] ?? "Other",
            },
            { transaction }
        );
        await AdmissionQualification.destroy({ where: { applicationId: application.id }, transaction });
        await AdmissionQualification.bulkCreate(
            qualifications.map((q) => ({ ...q, applicationId: application.id })),
            { transaction }
        );
    });

    const updated = await AdmissionApplication.findByPk(application.id, {
        include: [
            { model: AdmissionQualification, as: "qualifications" },
            { association: "session", attributes: ["id", "sessionName"] },
            { association: "program", attributes: ["id", "name"] },
        ],
    });
    return NextResponse.json(updated);
}

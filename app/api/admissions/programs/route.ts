import { NextResponse } from "next/server";
import AcademicProgram from "@/models/AcademicProgram";
import { requireApiPermission } from "@/lib/permissions";

// All programs, for the admissions admin filter and edit dropdown. Gated on
// admissions access so reviewers don't also need Academic Programs permission.
export async function GET() {
    const { error } = await requireApiPermission("admissions", "view");
    if (error) return error;

    const programs = await AcademicProgram.findAll({
        attributes: ["id", "name", "type", "isOpenForAdmission"],
        order: [["type", "ASC"], ["name", "ASC"]],
    });
    return NextResponse.json(programs);
}

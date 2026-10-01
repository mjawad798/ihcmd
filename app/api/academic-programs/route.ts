import { NextRequest, NextResponse } from "next/server";
import AcademicProgram, { ACADEMIC_PROGRAM_TYPES } from "@/models/AcademicProgram";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("academic-programs", "view");
    if (error) return error;

    const programs = await AcademicProgram.findAll({ order: [["id", "ASC"]] });
    return NextResponse.json(programs);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("academic-programs", "add");
    if (error) return error;

    const formData = await request.formData();

    const type = formData.get("type") as string | null;
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("picture") as File | null;

    if (!type || !ACADEMIC_PROGRAM_TYPES.includes(type as (typeof ACADEMIC_PROGRAM_TYPES)[number])) {
        return NextResponse.json({ error: "A valid type is required." }, { status: 400 });
    }
    if (!name || !description) {
        return NextResponse.json({ error: "Name and description are required." }, { status: 400 });
    }

    let picturePath: string | null = null;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "academic-programs");
    }

    const program = await AcademicProgram.create({
        type: type as (typeof ACADEMIC_PROGRAM_TYPES)[number],
        name,
        description,
        picture: picturePath,
        isOpenForAdmission: formData.get("isOpenForAdmission") === "true",
    });

    return NextResponse.json(program, { status: 201 });
}

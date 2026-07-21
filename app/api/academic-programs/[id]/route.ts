import { NextRequest, NextResponse } from "next/server";
import AcademicProgram, { ACADEMIC_PROGRAM_TYPES } from "@/models/AcademicProgram";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("academic-programs", "view");
    if (error) return error;

    const { id } = await params;
    const program = await AcademicProgram.findByPk(id);
    if (!program) return NextResponse.json({ error: "Program not found." }, { status: 404 });
    return NextResponse.json(program);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("academic-programs", "edit");
    if (error) return error;

    const { id } = await params;
    const program = await AcademicProgram.findByPk(id);
    if (!program) return NextResponse.json({ error: "Program not found." }, { status: 404 });

    const formData = await request.formData();
    const type = formData.get("type") as string | null;
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const removePicture = formData.get("removePicture") === "true";
    const file = formData.get("picture") as File | null;

    if (!type || !ACADEMIC_PROGRAM_TYPES.includes(type as (typeof ACADEMIC_PROGRAM_TYPES)[number])) {
        return NextResponse.json({ error: "A valid type is required." }, { status: 400 });
    }
    if (!name || !description) {
        return NextResponse.json({ error: "Name and description are required." }, { status: 400 });
    }

    let picturePath = program.picture;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "academic-programs");
        await deleteUploadedFile(program.picture ?? "");
    } else if (removePicture && program.picture) {
        await deleteUploadedFile(program.picture);
        picturePath = null;
    }

    await program.update({
        type: type as (typeof ACADEMIC_PROGRAM_TYPES)[number],
        name,
        description,
        picture: picturePath,
    });

    return NextResponse.json(program);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("academic-programs", "delete");
    if (error) return error;

    const { id } = await params;
    const program = await AcademicProgram.findByPk(id);
    if (!program) return NextResponse.json({ error: "Program not found." }, { status: 404 });

    if (program.picture) await deleteUploadedFile(program.picture);
    await program.destroy();

    return NextResponse.json({ success: true });
}

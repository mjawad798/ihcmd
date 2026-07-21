import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import TeachingFaculty from "@/models/TeachingFaculty";
import TeachingFacultyDetail from "@/models/TeachingFacultyDetail";
import { slugify } from "@/lib/slugify";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty", "view");
    if (error) return error;

    const { id } = await params;
    const faculty = await TeachingFaculty.findByPk(id, {
        include: [{ model: TeachingFacultyDetail, as: "details", separate: true, order: [["displayOrder", "ASC"]] }],
    });
    if (!faculty) return NextResponse.json({ error: "Faculty member not found." }, { status: 404 });
    return NextResponse.json(faculty);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty", "edit");
    if (error) return error;

    const { id } = await params;
    const faculty = await TeachingFaculty.findByPk(id);
    if (!faculty) return NextResponse.json({ error: "Faculty member not found." }, { status: 404 });

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const name = formData.get("name") as string | null;
    const designation = formData.get("designation") as string | null;
    const qualification = formData.get("qualification") as string | null;
    const researchInterest = formData.get("researchInterest") as string | null;
    const email = formData.get("email") as string | null;
    const linkedIn = formData.get("linkedIn") as string | null;
    const researchGate = formData.get("researchGate") as string | null;
    const slugInput = formData.get("slug") as string | null;
    const removePicture = formData.get("removePicture") === "true";
    const file = formData.get("picture") as File | null;

    if (!title || !name || !designation || !qualification || !researchInterest) {
        return NextResponse.json(
            { error: "Title, name, designation, qualification, and research interest are required." },
            { status: 400 }
        );
    }

    const slug = slugify(slugInput || name);
    if (!slug) {
        return NextResponse.json({ error: "Could not generate a valid slug from the name." }, { status: 400 });
    }

    const existing = await TeachingFaculty.findOne({ where: { slug, id: { [Op.ne]: faculty.id } } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    let picturePath = faculty.picture;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "teaching-faculty");
        await deleteUploadedFile(faculty.picture ?? "");
    } else if (removePicture && faculty.picture) {
        await deleteUploadedFile(faculty.picture);
        picturePath = null;
    }

    await faculty.update({
        title,
        slug,
        name,
        designation,
        qualification,
        researchInterest,
        picture: picturePath,
        email: email || null,
        linkedIn: linkedIn || null,
        researchGate: researchGate || null,
    });

    return NextResponse.json(faculty);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty", "delete");
    if (error) return error;

    const { id } = await params;
    const faculty = await TeachingFaculty.findByPk(id);
    if (!faculty) return NextResponse.json({ error: "Faculty member not found." }, { status: 404 });

    if (faculty.picture) await deleteUploadedFile(faculty.picture);
    await TeachingFacultyDetail.destroy({ where: { teachingFacultyId: faculty.id } });
    await faculty.destroy();

    return NextResponse.json({ success: true });
}

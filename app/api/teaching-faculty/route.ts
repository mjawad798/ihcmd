import { NextRequest, NextResponse } from "next/server";
import TeachingFaculty from "@/models/TeachingFaculty";
import TeachingFacultyDetail from "@/models/TeachingFacultyDetail";
import { slugify } from "@/lib/slugify";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("teaching-faculty", "view");
    if (error) return error;

    const faculty = await TeachingFaculty.findAll({
        order: [["name", "ASC"]],
        include: [{ model: TeachingFacultyDetail, as: "details", attributes: ["id"] }],
    });
    return NextResponse.json(faculty);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("teaching-faculty", "add");
    if (error) return error;

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

    const existing = await TeachingFaculty.findOne({ where: { slug } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    let picturePath: string | null = null;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "teaching-faculty");
    }

    const faculty = await TeachingFaculty.create({
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

    return NextResponse.json(faculty, { status: 201 });
}

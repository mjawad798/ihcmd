import { NextRequest, NextResponse } from "next/server";
import Section from "@/models/Section";
import { slugify } from "@/lib/slugify";
import { saveUploadedFile, isAllowedExtension } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";
import { RESERVED_SLUGS } from "@/lib/reservedSlugs";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

export async function GET() {
    const { error } = await requireApiPermission("sections", "view");
    if (error) return error;

    const sections = await Section.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(sections);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("sections", "add");
    if (error) return error;

    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const isActive = formData.get("isActive") === "true";
    const slugInput = formData.get("slug") as string | null;
    const file = formData.get("picture") as File | null;

    const descriptionText = (description ?? "").replace(/<[^>]*>/g, "").trim();
    if (!name || !descriptionText) {
        return NextResponse.json({ error: "Name and description are required." }, { status: 400 });
    }

    const slug = slugify(slugInput || name);
    if (!slug) {
        return NextResponse.json({ error: "Could not generate a valid slug from the name." }, { status: 400 });
    }
    if (RESERVED_SLUGS.includes(slug)) {
        return NextResponse.json(
            { error: `"${slug}" is a reserved page path and can't be used as a slug.` },
            { status: 400 }
        );
    }

    const existing = await Section.findOne({ where: { slug } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    let picturePath: string | null = null;
    if (file && file.size > 0) {
        if (!isAllowedExtension(file.name, IMAGE_EXTENSIONS)) {
            return NextResponse.json({ error: "Only JPG and PNG images are allowed." }, { status: 400 });
        }
        picturePath = await saveUploadedFile(file, "sections");
    }

    const section = await Section.create({
        name,
        slug,
        isActive,
        picture: picturePath,
        description: description ?? "",
    });

    return NextResponse.json(section, { status: 201 });
}

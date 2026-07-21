import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import Section from "@/models/Section";
import { slugify } from "@/lib/slugify";
import { saveUploadedFile, deleteUploadedFile, isAllowedExtension } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";
import { RESERVED_SLUGS } from "@/lib/reservedSlugs";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("sections", "view");
    if (error) return error;

    const { id } = await params;
    const section = await Section.findByPk(id);
    if (!section) return NextResponse.json({ error: "Section not found." }, { status: 404 });
    return NextResponse.json(section);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("sections", "edit");
    if (error) return error;

    const { id } = await params;
    const section = await Section.findByPk(id);
    if (!section) return NextResponse.json({ error: "Section not found." }, { status: 404 });

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const isActive = formData.get("isActive") === "true";
    const slugInput = formData.get("slug") as string | null;
    const removePicture = formData.get("removePicture") === "true";
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

    const existing = await Section.findOne({ where: { slug, id: { [Op.ne]: section.id } } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    let picturePath = section.picture;
    if (file && file.size > 0) {
        if (!isAllowedExtension(file.name, IMAGE_EXTENSIONS)) {
            return NextResponse.json({ error: "Only JPG and PNG images are allowed." }, { status: 400 });
        }
        picturePath = await saveUploadedFile(file, "sections");
        if (section.picture) await deleteUploadedFile(section.picture);
    } else if (removePicture && section.picture) {
        await deleteUploadedFile(section.picture);
        picturePath = null;
    }

    await section.update({
        name,
        slug,
        isActive,
        picture: picturePath,
        description: description ?? "",
    });

    return NextResponse.json(section);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("sections", "delete");
    if (error) return error;

    const { id } = await params;
    const section = await Section.findByPk(id);
    if (!section) return NextResponse.json({ error: "Section not found." }, { status: 404 });

    if (section.picture) await deleteUploadedFile(section.picture);
    await section.destroy();

    return NextResponse.json({ success: true });
}

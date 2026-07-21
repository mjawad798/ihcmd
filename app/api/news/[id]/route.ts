import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import News from "@/models/News";
import { slugify } from "@/lib/slugify";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("news", "view");
    if (error) return error;

    const { id } = await params;
    const news = await News.findByPk(id);
    if (!news) return NextResponse.json({ error: "News item not found." }, { status: 404 });
    return NextResponse.json(news);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("news", "edit");
    if (error) return error;

    const { id } = await params;
    const news = await News.findByPk(id);
    if (!news) return NextResponse.json({ error: "News item not found." }, { status: 404 });

    const body = await request.json();
    const { title, description, isActive } = body;
    const slugInput = body.slug as string | undefined;

    if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const slug = slugify(slugInput || title);
    if (!slug) {
        return NextResponse.json({ error: "Could not generate a valid slug from the title." }, { status: 400 });
    }

    const existing = await News.findOne({ where: { slug, id: { [Op.ne]: news.id } } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    await news.update({
        title,
        slug,
        description,
        isActive: isActive !== false,
    });

    return NextResponse.json(news);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("news", "delete");
    if (error) return error;

    const { id } = await params;
    const news = await News.findByPk(id);
    if (!news) return NextResponse.json({ error: "News item not found." }, { status: 404 });

    await news.destroy();
    return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import News from "@/models/News";
import { slugify } from "@/lib/slugify";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("news", "view");
    if (error) return error;

    const news = await News.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(news);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("news", "add");
    if (error) return error;

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

    const existing = await News.findOne({ where: { slug } });
    if (existing) {
        return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
    }

    const news = await News.create({
        title,
        slug,
        description,
        isActive: isActive !== false,
    });

    return NextResponse.json(news, { status: 201 });
}

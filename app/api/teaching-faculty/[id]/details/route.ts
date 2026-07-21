import { NextRequest, NextResponse } from "next/server";
import TeachingFacultyDetail from "@/models/TeachingFacultyDetail";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty-details", "view");
    if (error) return error;

    const { id } = await params;
    const details = await TeachingFacultyDetail.findAll({
        where: { teachingFacultyId: id },
        order: [["displayOrder", "ASC"]],
    });
    return NextResponse.json(details);
}

export async function POST(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty-details", "add");
    if (error) return error;

    const { id } = await params;
    const body = await request.json();
    const { title, description, displayOrder, isActive } = body;

    if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const order = Number(displayOrder);
    if (!Number.isInteger(order) || order < 1 || order > 15) {
        return NextResponse.json({ error: "Display order must be a number between 1 and 15." }, { status: 400 });
    }

    const detail = await TeachingFacultyDetail.create({
        teachingFacultyId: Number(id),
        title,
        description,
        displayOrder: order,
        isActive: isActive !== false,
    });

    return NextResponse.json(detail, { status: 201 });
}

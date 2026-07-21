import { NextRequest, NextResponse } from "next/server";
import TeachingFacultyDetail from "@/models/TeachingFacultyDetail";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string; detailId: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty-details", "edit");
    if (error) return error;

    const { id, detailId } = await params;
    const detail = await TeachingFacultyDetail.findOne({ where: { id: detailId, teachingFacultyId: id } });
    if (!detail) return NextResponse.json({ error: "Detail not found." }, { status: 404 });

    const body = await request.json();
    const { title, description, displayOrder, isActive } = body;

    if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const order = Number(displayOrder);
    if (!Number.isInteger(order) || order < 1 || order > 15) {
        return NextResponse.json({ error: "Display order must be a number between 1 and 15." }, { status: 400 });
    }

    await detail.update({
        title,
        description,
        displayOrder: order,
        isActive: isActive !== false,
    });

    return NextResponse.json(detail);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("teaching-faculty-details", "delete");
    if (error) return error;

    const { id, detailId } = await params;
    const detail = await TeachingFacultyDetail.findOne({ where: { id: detailId, teachingFacultyId: id } });
    if (!detail) return NextResponse.json({ error: "Detail not found." }, { status: 404 });

    await detail.destroy();
    return NextResponse.json({ success: true });
}

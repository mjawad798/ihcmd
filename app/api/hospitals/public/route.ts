import { NextResponse } from "next/server";
import Hospital from "@/models/Hospital";

export async function GET() {
    const hospitals = await Hospital.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return NextResponse.json(hospitals);
}

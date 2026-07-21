import { NextResponse } from "next/server";
import Gallery from "@/models/Gallery";

export async function GET() {
    const items = await Gallery.findAll({
        where: { isActive: true },
        order: [["id", "DESC"]],
    });
    return NextResponse.json(items);
}

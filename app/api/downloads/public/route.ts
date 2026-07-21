import { NextResponse } from "next/server";
import Download from "@/models/Download";

export async function GET() {
    const items = await Download.findAll({
        where: { showInDownloads: true, isActive: true },
        order: [["id", "DESC"]],
    });
    return NextResponse.json(items);
}

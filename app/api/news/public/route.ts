import { NextResponse } from "next/server";
import News from "@/models/News";

export async function GET() {
    const news = await News.findAll({
        where: { isActive: true },
        order: [["id", "DESC"]],
        attributes: ["id", "title", "slug"],
    });
    return NextResponse.json(news);
}

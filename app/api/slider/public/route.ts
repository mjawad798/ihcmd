import { NextResponse } from "next/server";
import Slider from "@/models/Slider";

export async function GET() {
    const sliders = await Slider.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return NextResponse.json(sliders);
}

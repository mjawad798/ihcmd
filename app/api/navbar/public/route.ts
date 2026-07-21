import { NextResponse } from "next/server";
import NavItem from "@/models/NavItem";

export async function GET() {
    const items = await NavItem.findAll({
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });

    const topLevel = items.filter((item) => item.parentId === null);
    const tree = topLevel.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        link: item.link,
        children: items
            .filter((child) => child.parentId === item.id)
            .map((child) => ({
                id: child.id,
                title: child.title,
                type: child.type,
                link: child.link,
            })),
    }));

    return NextResponse.json(tree);
}

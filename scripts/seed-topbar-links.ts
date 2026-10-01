import "dotenv/config";
import sequelize from "../lib/sequelize";
import NavItem from "../models/NavItem";

const links = [
    { title: "ORIC", link: "#", displayOrder: 1 },
    { title: "QEC", link: "#", displayOrder: 2 },
    { title: "IHCMD JOURNAL", link: "#", displayOrder: 3 },
];

async function run() {
    await sequelize.authenticate();

    for (const l of links) {
        const existing = await NavItem.findOne({ where: { title: l.title, placement: "topbar" } });
        if (existing) {
            console.log(`Skipping "${l.title}" (already exists)`);
            continue;
        }
        await NavItem.create({ ...l, type: "direct", placement: "topbar", parentId: null });
        console.log(`Created "${l.title}"`);
    }

    await sequelize.close();
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});

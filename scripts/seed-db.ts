import "dotenv/config";
import sequelize from "../lib/sequelize";
import Slider from "../models/Slider";
import NavItem from "../models/NavItem";

async function run() {
    await sequelize.authenticate();

    const sliderCount = await Slider.count();
    if (sliderCount === 0) {
        await Slider.bulkCreate([
            {
                image: "/meeting2.jpg",
                heading: "Pursue Excellence in Healthcare Education",
                description:
                    "Join our esteemed institute and gain hands-on experience through practical training at IRM Hospital.",
                isActive: true,
                displayOrder: 1,
            },
            {
                image: "/meeting3.jpg",
                heading: "Empowering Future Health Professionals",
                description:
                    "Discover state-of-the-art facilities and a comprehensive curriculum designed to prepare you for a successful career in the medical field.",
                isActive: true,
                displayOrder: 2,
            },
        ]);
        console.log("Seeded sliders.");
    } else {
        console.log("Sliders already seeded, skipping.");
    }

    const navCount = await NavItem.count();
    if (navCount === 0) {
        const home = await NavItem.create({ title: "HOME", type: "direct", link: "/", displayOrder: 1 });
        const about = await NavItem.create({ title: "ABOUT", type: "direct", link: "/about", displayOrder: 2 });

        const affiliations = await NavItem.create({ title: "AFFILIATIONS", type: "direct", link: null, displayOrder: 3 });
        const programs = await NavItem.create({ title: "PROGRAMS", type: "direct", link: null, displayOrder: 4 });
        const hospitals = await NavItem.create({ title: "HOSPITALS", type: "direct", link: null, displayOrder: 5 });
        const academics = await NavItem.create({ title: "ACADEMICS", type: "direct", link: null, displayOrder: 6 });

        const journal = await NavItem.create({
            title: "IHCMD JOURNAL",
            type: "direct",
            link: "https://ijmmr.org/index.php/ijmmr/issue/view/1",
            displayOrder: 7,
        });
        const news = await NavItem.create({ title: "NEWS", type: "direct", link: "/news", displayOrder: 8 });
        const gallery = await NavItem.create({ title: "GALLERY", type: "direct", link: "/gallery", displayOrder: 9 });

        await NavItem.bulkCreate([
            { title: "Health Services Academy Islamabad", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 1 },
            { title: "Pakistan Nursing and Midwifery Council", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 2 },
            { title: "Allied Health Professional Council", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 3 },
            { title: "Shaheed Zulfiqar Ali Bhutto Medical Univ.", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 4 },
            { title: "Federal Board of Education", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 5 },
            { title: "Higher Education Regulatory Authority", type: "submenu", link: null, parentId: affiliations.id, displayOrder: 6 },

            { title: "Degree Programs", type: "submenu", link: "/academic-programs", parentId: programs.id, displayOrder: 1 },
            { title: "Post Graduate Diploma", type: "submenu", link: "/academic-programs", parentId: programs.id, displayOrder: 2 },
            { title: "Certificate Programs", type: "submenu", link: "/academic-programs", parentId: programs.id, displayOrder: 3 },
            { title: "F.SC Medical Technologies", type: "submenu", link: "/academic-programs", parentId: programs.id, displayOrder: 4 },
            { title: "LHV/CNA 2 YEARS", type: "submenu", link: "/lhv", parentId: programs.id, displayOrder: 5 },

            { title: "IRM Hospital Islamabad", type: "submenu", link: null, parentId: hospitals.id, displayOrder: 1 },
            { title: "Asia General Hospital", type: "submenu", link: null, parentId: hospitals.id, displayOrder: 2 },
            { title: "Fauji Foundation Hospital", type: "submenu", link: null, parentId: hospitals.id, displayOrder: 3 },
            { title: "Gulf Care International Hospital", type: "submenu", link: null, parentId: hospitals.id, displayOrder: 4 },

            { title: "Curriculum", type: "submenu", link: "/download", parentId: academics.id, displayOrder: 1 },
            { title: "ORIC", type: "submenu", link: "/oric", parentId: academics.id, displayOrder: 2 },
            { title: "QEC", type: "submenu", link: "/qec", parentId: academics.id, displayOrder: 3 },
        ]);

        void home;
        void about;
        void journal;
        void news;
        void gallery;

        console.log("Seeded nav items.");
    } else {
        console.log("Nav items already seeded, skipping.");
    }

    await sequelize.close();
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});

import type { MetadataRoute } from "next";
import AcademicProgram from "@/models/AcademicProgram";
import TeachingFaculty from "@/models/TeachingFaculty";
import News from "@/models/News";
import Section from "@/models/Section";
import { SITE_URL } from "@/lib/seo";

// Content is admin-managed and changes independently of deploys, so the
// sitemap needs to regenerate periodically rather than being frozen at
// build time.
export const revalidate = 3600;

const STATIC_ROUTES = [
    "",
    "/about",
    "/academic-programs",
    "/faculty",
    "/gallery",
    "/news",
    "/download",
    "/oric",
    "/qec",
    "/lhv",
    "/submissions",
    "/privacy",
    "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [programs, faculty, news, sections] = await Promise.all([
        AcademicProgram.findAll({ attributes: ["id", "updatedAt"] }),
        TeachingFaculty.findAll({ attributes: ["slug", "updatedAt"] }),
        News.findAll({ where: { isActive: true }, attributes: ["slug", "updatedAt"] }),
        Section.findAll({ where: { isActive: true }, attributes: ["slug", "updatedAt"] }),
    ]);

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
    }));

    const programEntries: MetadataRoute.Sitemap = programs.map((p) => ({
        url: `${SITE_URL}/academic-programs/${p.id}`,
        lastModified: p.updatedAt,
    }));

    const facultyEntries: MetadataRoute.Sitemap = faculty.map((f) => ({
        url: `${SITE_URL}/faculty/${f.slug}`,
        lastModified: f.updatedAt,
    }));

    const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
        url: `${SITE_URL}/news/${n.slug}`,
        lastModified: n.updatedAt,
    }));

    const sectionEntries: MetadataRoute.Sitemap = sections.map((s) => ({
        url: `${SITE_URL}/${s.slug}`,
        lastModified: s.updatedAt,
    }));

    return [...staticEntries, ...programEntries, ...facultyEntries, ...newsEntries, ...sectionEntries];
}

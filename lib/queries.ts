import { cache } from "react";
import NavItem from "@/models/NavItem";
import Slider from "@/models/Slider";
import Hospital from "@/models/Hospital";
import News from "@/models/News";
import Gallery from "@/models/Gallery";
import AcademicProgram from "@/models/AcademicProgram";
import TeachingFaculty from "@/models/TeachingFaculty";
import About from "@/models/About";
import FlashNews from "@/models/FlashNews";
import Download from "@/models/Download";
import Achievement from "@/models/Achievement";
import Affiliation from "@/models/Affiliation";
import FooterSetting, { FOOTER_SETTINGS_ID } from "@/models/FooterSetting";
import VerificationMaster from "@/models/VerificationMaster";
import Section from "@/models/Section";
import AdmissionSession from "@/models/AdmissionSession";
import { FOOTER_DEFAULTS } from "@/lib/footerDefaults";

export type NavChild = { id: number; title: string; link: string | null };
export type NavNode = { id: number; title: string; link: string | null; children: NavChild[] };
export type TopBarLink = { id: number; title: string; link: string | null };

export const getNavTree = cache(async (): Promise<NavNode[]> => {
    const items = await NavItem.findAll({
        where: { placement: "main" },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });

    const topLevel = items.filter((item) => item.parentId === null);
    return topLevel.map((item) => ({
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
});

export const getTopBarLinks = cache(async (): Promise<TopBarLink[]> => {
    const items = await NavItem.findAll({
        where: { placement: "topbar" },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return items.map((item) => ({ id: item.id, title: item.title, link: item.link }));
});

export const getActiveSlides = cache(async () => {
    const slides = await Slider.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return slides.map((s) => s.toJSON());
});

export const getActiveHospitals = cache(async () => {
    const hospitals = await Hospital.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return hospitals.map((h) => h.toJSON());
});

export const getActiveAffiliations = cache(async () => {
    const affiliations = await Affiliation.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return affiliations.map((a) => a.toJSON());
});

export const getFooterSettings = cache(async () => {
    const settings = await FooterSetting.findByPk(FOOTER_SETTINGS_ID);
    return settings ? settings.toJSON() : { id: FOOTER_SETTINGS_ID, ...FOOTER_DEFAULTS };
});

export const getVerificationMasters = cache(async () => {
    const masters = await VerificationMaster.findAll({ order: [["name", "ASC"]] });
    return masters.map((m) => m.toJSON());
});

export const getSectionBySlug = cache(async (slug: string) => {
    const section = await Section.findOne({ where: { slug, isActive: true } });
    return section ? section.toJSON() : null;
});

export const getActiveNews = cache(async () => {
    const news = await News.findAll({
        where: { isActive: true },
        order: [["id", "DESC"]],
        attributes: ["id", "title", "slug"],
    });
    return news.map((n) => n.toJSON());
});

export const getActiveGallery = cache(async () => {
    const items = await Gallery.findAll({
        where: { isActive: true },
        order: [["id", "DESC"]],
    });
    return items.map((g) => g.toJSON());
});

export const getAcademicPrograms = cache(async () => {
    const programs = await AcademicProgram.findAll({ order: [["id", "ASC"]] });
    return programs.map((p) => p.toJSON());
});

export const getAllFaculty = cache(async () => {
    const faculty = await TeachingFaculty.findAll({ order: [["name", "ASC"]] });
    return faculty.map((f) => f.toJSON());
});

export const getActiveAboutSections = cache(async () => {
    const sections = await About.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return sections.map((s) => s.toJSON());
});

export const getActiveAchievements = cache(async () => {
    const items = await Achievement.findAll({
        where: { isActive: true },
        order: [["displayOrder", "ASC"], ["id", "ASC"]],
    });
    return items.map((item) => item.toJSON());
});

export const getLatestFlashNews = cache(async () => {
    const latest = await FlashNews.findOne({ where: { isActive: true }, order: [["id", "DESC"]] });
    return latest ? latest.toJSON() : null;
});

export const getPublicDownloads = cache(async () => {
    const items = await Download.findAll({
        where: { showInDownloads: true, isActive: true },
        order: [["id", "DESC"]],
    });
    return items.map((d) => d.toJSON());
});

// Admission context for /apply-now: the single active session (if it is open)
// and the programs currently open for admission.
export const getAdmissionContext = cache(async () => {
    const session = await AdmissionSession.findOne({ where: { isActive: true, isOpenForAdmission: true } });
    if (!session) return { session: null, programs: [] };

    const programs = await AcademicProgram.findAll({
        where: { isOpenForAdmission: true },
        attributes: ["id", "name", "type"],
        order: [["type", "ASC"], ["name", "ASC"]],
    });

    return {
        session: { id: session.id, sessionName: session.sessionName, code: session.code },
        programs: programs.map((p) => ({ id: p.id, name: p.name, type: p.type })),
    };
});

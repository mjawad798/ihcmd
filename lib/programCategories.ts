export const CATEGORY_ORDER = [
    "Undergraduate Programs",
    "Postgraduate Diplomas",
    "Certificate Programs",
    "F.Sc Medical Technologies",
] as const;

export type ProgramCategory = (typeof CATEGORY_ORDER)[number];

export const CATEGORY_META: Record<ProgramCategory, { title: string; image: string; link: string }> = {
    "Undergraduate Programs": { title: "Degree Programs", image: "/nursing.jpg", link: "/academic-programs" },
    "Postgraduate Diplomas": { title: "Post Graduate Diploma", image: "/diploma.png", link: "/academic-programs" },
    "Certificate Programs": { title: "Certificate Programs", image: "/anesthesia.jpg", link: "/academic-programs" },
    "F.Sc Medical Technologies": { title: "FSc Medical Technologies", image: "/irmHospital.jpg", link: "/academic-programs" },
};

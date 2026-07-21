// Top-level route segments that already exist as static pages/routes under
// app/(site) (plus a few framework/infra paths). Next.js always resolves a
// matching static folder before falling back to app/(site)/[slug]/page.tsx,
// so a Section using one of these slugs would silently be unreachable —
// reject it up front instead of letting an admin create dead content.
export const RESERVED_SLUGS = [
    "about",
    "academic-programs",
    "document-verification",
    "download",
    "faculty",
    "gallery",
    "lhv",
    "news",
    "oric",
    "privacy",
    "qec",
    "submissions",
    "terms",
    "admin",
    "api",
    "ihcmduploads",
    "robots.txt",
    "sitemap.xml",
];

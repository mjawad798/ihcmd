export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_NAME = "IHCMD";

export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Institute of Health Care Management and Development",
        alternateName: "IHCMD",
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        description:
            "IHCMD is a leading private-sector postgraduate training institution focused on Health Management, Public Health, and Health Research.",
    };
}

export function stripHtml(html: string, maxLen = 160): string {
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > maxLen ? text.slice(0, maxLen - 1).trimEnd() + "…" : text;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getSectionBySlug } from "@/lib/queries";
import { stripHtml, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const section = await getSectionBySlug(slug);
    if (!section) return {};

    const description = stripHtml(section.description);

    return {
        title: section.name,
        description,
        alternates: { canonical: `/${section.slug}` },
        openGraph: {
            title: section.name,
            description,
            url: `/${section.slug}`,
            type: "website",
            images: section.picture ? [absoluteUrl(section.picture)] : undefined,
        },
    };
}

// Catch-all for admin-built pages (Page Builder / Sections) — only reached
// when the slug doesn't match any of the app's static routes, since
// Next.js always resolves a matching static folder first.
export default async function SectionPage({ params }: Props) {
    const { slug } = await params;
    const section = await getSectionBySlug(slug);

    if (!section) notFound();

    const breadcrumbs = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: section.name, path: `/${section.slug}` },
    ]);

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium truncate">{section.name}</span>
                </div>
            </div>

            {/* Header: picture banner if present, otherwise a plain navy header */}
            {section.picture ? (
                <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden bg-navy-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={section.picture}
                        alt={section.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                        <div className="w-full px-6 lg:px-12 pb-10">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                {section.name}
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-navy-900 py-16">
                    <div className="w-full px-6 lg:px-12 text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                            {section.name}
                        </h1>
                        <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
                    </div>
                </div>
            )}

            {/* Description */}
            <div className="w-full px-6 lg:px-12 py-16">
                <div
                    className="rich-content text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                />
            </div>
        </main>
    );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight } from "lucide-react";
import AcademicProgram from "@/models/AcademicProgram";
import { CATEGORY_META, ProgramCategory } from "@/lib/programCategories";
import { stripHtml, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const program = await AcademicProgram.findByPk(id);
    if (!program) return {};

    const description = stripHtml(program.description);

    return {
        title: program.name,
        description,
        alternates: { canonical: `/academic-programs/${program.id}` },
        openGraph: {
            title: program.name,
            description,
            url: `/academic-programs/${program.id}`,
            type: "article",
            images: program.picture ? [absoluteUrl(program.picture)] : undefined,
        },
    };
}

export default async function AcademicProgramPage({ params }: Props) {
    const { id } = await params;
    const program = await AcademicProgram.findByPk(id);

    if (!program) notFound();

    const category = CATEGORY_META[program.type as ProgramCategory];

    const courseJsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: program.name,
        description: stripHtml(program.description, 500),
        provider: {
            "@type": "EducationalOrganization",
            name: "Institute of Health Care Management and Development",
            sameAs: absoluteUrl("/"),
        },
    };

    const breadcrumbs = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: category?.title ?? program.type, path: category?.link ?? "/academic-programs" },
        { name: program.name, path: `/academic-programs/${program.id}` },
    ]);

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            {/* Header: cover image if present, otherwise a plain navy header */}
            {program.picture ? (
                <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden bg-navy-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={program.picture}
                        alt={program.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                        <div className="w-full px-6 lg:px-12 pb-10 w-full">
                            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
                                {program.type}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                {program.name}
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-navy-900 py-16">
                    <div className="w-full px-6 lg:px-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
                            {program.type}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                            {program.name}
                        </h1>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    {category ? (
                        <Link href={category.link} className="hover:text-navy-900 transition-colors">
                            {category.title}
                        </Link>
                    ) : (
                        <span>{program.type}</span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium truncate">{program.name}</span>
                </div>
            </div>

            {/* Description & CTAs */}
            <div className="w-full px-6 lg:px-12 py-16">
                <div className="w-16 h-1 bg-gold-500 rounded-full mb-8" />
                <div
                    className="rich-content text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: program.description }}
                />

                <div className="flex flex-wrap items-center gap-4 mt-10">
                    <Link
                        href="/submissions"
                        className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold border border-gold-500/40 shadow-[0_10px_20px_rgba(11,27,61,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                        Apply Now
                    </Link>
                    {category && (
                        <Link
                            href={category.link}
                            className="group/link inline-flex items-center text-navy-800 font-semibold hover:text-gold-600 transition-colors"
                        >
                            View all {category.title}
                            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Mail, Linkedin, BookMarked, UserRound } from "lucide-react";
import TeachingFaculty from "@/models/TeachingFaculty";
import TeachingFacultyDetail from "@/models/TeachingFacultyDetail";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const faculty = await TeachingFaculty.findOne({ where: { slug } });
    if (!faculty) return {};

    const title = `${faculty.title} ${faculty.name}`;
    const description = `${faculty.designation} at IHCMD. ${faculty.qualification}. Research interests: ${faculty.researchInterest}.`.slice(0, 200);

    return {
        title,
        description,
        alternates: { canonical: `/faculty/${faculty.slug}` },
        openGraph: {
            title,
            description,
            url: `/faculty/${faculty.slug}`,
            type: "profile",
            images: faculty.picture ? [absoluteUrl(faculty.picture)] : undefined,
        },
    };
}

export default async function FacultyProfilePage({ params }: Props) {
    const { slug } = await params;
    const faculty = await TeachingFaculty.findOne({
        where: { slug },
        include: [
            {
                model: TeachingFacultyDetail,
                as: "details",
                where: { isActive: true },
                required: false,
                separate: true,
                order: [["displayOrder", "ASC"]],
            },
        ],
    });

    if (!faculty) notFound();

    const details = faculty.get("details") as TeachingFacultyDetail[] | undefined;
    const interests = faculty.researchInterest
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: `${faculty.title} ${faculty.name}`,
        jobTitle: faculty.designation,
        email: faculty.email ?? undefined,
        image: faculty.picture ? absoluteUrl(faculty.picture) : undefined,
        url: absoluteUrl(`/faculty/${faculty.slug}`),
        sameAs: [faculty.linkedIn, faculty.researchGate].filter(Boolean),
        affiliation: {
            "@type": "EducationalOrganization",
            name: "Institute of Health Care Management and Development",
        },
    };

    const breadcrumbs = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Faculty", path: "/faculty" },
        { name: faculty.name, path: `/faculty/${faculty.slug}` },
    ]);

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/faculty" className="hover:text-navy-900 transition-colors">Faculty</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium truncate">{faculty.name}</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white border-t-4 border-navy-900 border-b border-gray-200">
                <div className="w-full px-6 lg:px-12 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                        {/* Photo */}
                        <div className="md:col-span-1">
                            <div className="relative w-full max-w-[200px] aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-100 bg-navy-900 mx-auto md:mx-0">
                                {faculty.picture ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={faculty.picture}
                                        alt={faculty.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <UserRound className="w-16 h-16 text-gold-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="md:col-span-3">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight">
                                {faculty.title} {faculty.name}
                            </h1>
                            <h3 className="text-lg font-bold uppercase tracking-wide text-gold-600 mt-1">
                                {faculty.designation}
                            </h3>
                            <p className="text-gray-500 text-base mt-1">{faculty.qualification}</p>

                            {/* Contact row */}
                            <div className="flex flex-wrap items-center gap-6 border-t border-b border-gray-100 py-3 mt-4">
                                {faculty.email && (
                                    <a
                                        href={`mailto:${faculty.email}`}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors"
                                    >
                                        <Mail className="w-4 h-4" /> {faculty.email}
                                    </a>
                                )}
                                {faculty.linkedIn && (
                                    <a
                                        href={faculty.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </a>
                                )}
                                {faculty.researchGate && (
                                    <a
                                        href={faculty.researchGate}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-gold-600 transition-colors"
                                    >
                                        <BookMarked className="w-4 h-4" /> ResearchGate
                                    </a>
                                )}
                            </div>

                            {/* Research Interests */}
                            {interests.length > 0 && (
                                <div className="mt-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-navy-900">
                                        Research Interests
                                    </span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {interests.map((interest, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded-full bg-gray-50 border border-navy-900/10 text-navy-900 text-sm"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Sections */}
            <div className="w-full px-6 lg:px-12 py-16 max-w-5xl">
                {details && details.length > 0 && (
                    <div className="space-y-12">
                        {details.map((detail) => (
                            <div key={detail.id}>
                                <h3 className="text-xl font-bold text-navy-900 mb-3">{detail.title}</h3>
                                <div className="w-12 h-1 bg-gold-500 rounded-full mb-4" />
                                <div
                                    className="rich-content text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: detail.description }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

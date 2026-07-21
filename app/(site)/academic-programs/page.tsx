import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { getAcademicPrograms } from "@/lib/queries";
import AcademicProgramsListClient from "@/components/AcademicProgramsListClient";

export const metadata: Metadata = {
    title: "Academic Programs",
    description:
        "Explore all undergraduate, postgraduate diploma, certificate, and F.Sc medical technology programs offered by the Institute of Health Care Management and Development (IHCMD).",
    alternates: { canonical: "/academic-programs" },
    openGraph: {
        title: "Academic Programs | IHCMD",
        description:
            "Explore all undergraduate, postgraduate diploma, certificate, and F.Sc medical technology programs offered by IHCMD.",
        url: "/academic-programs",
        type: "website",
    },
};

export default async function AcademicProgramsListPage() {
    const programs = await getAcademicPrograms();

    return (
        <main>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium">Academic Programs</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-navy-900 py-16">
                <div className="w-full px-6 lg:px-12 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">Academics</h2>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        All Academic Programs
                    </h1>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
                </div>
            </div>

            {/* Filters + Grid */}
            <div className="w-full px-6 lg:px-12 py-10">
                <AcademicProgramsListClient programs={programs} />
            </div>
        </main>
    );
}

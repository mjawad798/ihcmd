import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { getAllFaculty } from "@/lib/queries";
import FacultyListClient from "@/components/FacultyListClient";

export const metadata: Metadata = {
    title: "Teaching Faculty",
    description:
        "Meet the teaching faculty of the Institute of Health Care Management and Development (IHCMD) — search by name or research interest.",
    alternates: { canonical: "/faculty" },
    openGraph: {
        title: "Teaching Faculty | IHCMD",
        description: "Meet the teaching faculty of IHCMD — search by name or research interest.",
        url: "/faculty",
        type: "website",
    },
};

export default async function FacultyListPage() {
    const faculty = await getAllFaculty();

    return (
        <main>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium">Faculty</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-navy-900 py-16">
                <div className="w-full px-6 lg:px-12 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">Our People</h2>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Teaching Faculty
                    </h1>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
                </div>
            </div>

            {/* Search + Grid */}
            <div className="w-full px-6 lg:px-12 py-10">
                <FacultyListClient faculty={faculty} />
            </div>
        </main>
    );
}

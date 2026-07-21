"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { CATEGORY_ORDER, CATEGORY_META, ProgramCategory } from "@/lib/programCategories";

type AcademicProgramItem = {
    id: number;
    type: string;
    name: string;
    description: string;
    picture: string | null;
};

const FILTERS = ["All", ...CATEGORY_ORDER] as const;

export default function AcademicProgramsListClient({ programs }: { programs: AcademicProgramItem[] }) {
    const [activeType, setActiveType] = useState<(typeof FILTERS)[number]>("All");
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return programs.filter((p) => {
            const matchesType = activeType === "All" || p.type === activeType;
            const matchesSearch = !query || p.name.toLowerCase().includes(query);
            return matchesType && matchesSearch;
        });
    }, [programs, activeType, search]);

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                <div className="flex flex-wrap gap-2">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveType(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                activeType === filter
                                    ? "bg-navy-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {filter === "All" ? "All Programs" : CATEGORY_META[filter as ProgramCategory].title}
                        </button>
                    ))}
                </div>

                <div className="relative w-full lg:w-80 flex-shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search programs by name..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-400 py-16">No programs match your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((program) => {
                        const category = CATEGORY_META[program.type as ProgramCategory];
                        return (
                            <Link
                                key={program.id}
                                href={`/academic-programs/${program.id}`}
                                className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="relative h-48 w-full overflow-hidden bg-navy-900">
                                    {program.picture ? (
                                        <Image
                                            src={program.picture}
                                            alt={program.name}
                                            fill
                                            loader={({ src }) => src}
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <GraduationCap className="w-12 h-12 text-gold-500/50" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-navy-900/10 transition-opacity duration-300 group-hover:opacity-0" />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="inline-block w-fit px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-semibold uppercase tracking-wide mb-3">
                                        {category?.title ?? program.type}
                                    </span>
                                    <h4 className="text-lg font-bold text-navy-900 mb-2">{program.name}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-grow">
                                        {program.description.replace(/<[^>]*>/g, " ").trim()}
                                    </p>
                                    <span className="mt-4 group/link inline-flex items-center text-navy-800 font-semibold text-sm group-hover:text-gold-600 transition-colors">
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}

"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, UserRound, ArrowRight, Mail } from "lucide-react";

type FacultyItem = {
    id: number;
    title: string;
    slug: string;
    name: string;
    designation: string;
    qualification: string;
    researchInterest: string;
    picture: string | null;
    email: string | null;
};

export default function FacultyListClient({ faculty }: { faculty: FacultyItem[] }) {
    const [nameQuery, setNameQuery] = useState("");
    const [interestQuery, setInterestQuery] = useState("");

    const filtered = useMemo(() => {
        const name = nameQuery.trim().toLowerCase();
        const interest = interestQuery.trim().toLowerCase();
        return faculty.filter((f) => {
            const matchesName = !name || f.name.toLowerCase().includes(name);
            const matchesInterest = !interest || f.researchInterest.toLowerCase().includes(interest);
            return matchesName && matchesInterest;
        });
    }, [faculty, nameQuery, interestQuery]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                        placeholder="Search by faculty name..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                </div>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={interestQuery}
                        onChange={(e) => setInterestQuery(e.target.value)}
                        placeholder="Search by research interest..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-400 py-16">No faculty members match your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((member) => (
                        <Link
                            key={member.id}
                            href={`/faculty/${member.slug}`}
                            className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-navy-900">
                                    {member.picture ? (
                                        <Image
                                            src={member.picture}
                                            alt={member.name}
                                            fill
                                            loader={({ src }) => src}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <UserRound className="w-8 h-8 text-gold-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-lg font-bold text-navy-900 truncate">
                                        {member.title} {member.name}
                                    </h4>
                                    <p className="text-sm text-gold-600 font-medium truncate">{member.designation}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold text-navy-800">Qualification: </span>
                                {member.qualification}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                                <span className="font-semibold text-navy-800">Research Interest: </span>
                                {member.researchInterest}
                            </p>

                            {member.email && (
                                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5 truncate">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                    {member.email}
                                </p>
                            )}

                            <span className="mt-4 group/link inline-flex items-center text-navy-800 font-semibold text-sm group-hover:text-gold-600 transition-colors">
                                View Profile
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

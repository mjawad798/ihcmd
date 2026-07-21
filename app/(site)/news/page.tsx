import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight } from "lucide-react";
import News from "@/models/News";

export const metadata: Metadata = {
    title: "News",
    description: "Latest news and updates from the Institute of Health Care Management and Development (IHCMD).",
    alternates: { canonical: "/news" },
    openGraph: {
        title: "News | IHCMD",
        description: "Latest news and updates from IHCMD.",
        url: "/news",
        type: "website",
    },
};

export default async function NewsListPage() {
    const news = await News.findAll({
        where: { isActive: true },
        order: [["id", "DESC"]],
        attributes: ["id", "title", "slug"],
    });

    return (
        <main>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium">News</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-navy-900 py-16">
                <div className="w-full px-6 lg:px-12 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">Updates</h2>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">News</h1>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
                </div>
            </div>

            {/* List */}
            <div className="w-full px-6 lg:px-12 py-16 max-w-4xl mx-auto">
                {news.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">No news yet.</p>
                ) : (
                    <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                        {news.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug}`}
                                className="group flex items-center justify-between gap-4 py-5 hover:bg-gold-50/50 transition-colors px-2 -mx-2"
                            >
                                <span className="flex items-center gap-3 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                                    <span className="text-navy-900 font-medium group-hover:text-gold-600 transition-colors truncate">
                                        {item.title}
                                    </span>
                                </span>
                                <ArrowRight className="w-4 h-4 text-navy-400 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-600" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

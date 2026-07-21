import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import News from "@/models/News";
import { stripHtml, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const news = await News.findOne({ where: { slug, isActive: true } });
    if (!news) return {};

    const description = stripHtml(news.description);

    return {
        title: news.title,
        description,
        alternates: { canonical: `/news/${news.slug}` },
        openGraph: {
            title: news.title,
            description,
            url: `/news/${news.slug}`,
            type: "article",
            publishedTime: news.createdAt?.toISOString(),
            modifiedTime: news.updatedAt?.toISOString(),
        },
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { slug } = await params;
    const news = await News.findOne({ where: { slug, isActive: true } });

    if (!news) notFound();

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        description: stripHtml(news.description, 500),
        datePublished: news.createdAt?.toISOString(),
        dateModified: news.updatedAt?.toISOString(),
        publisher: {
            "@type": "EducationalOrganization",
            name: "Institute of Health Care Management and Development",
        },
    };

    const breadcrumbs = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: news.title, path: `/news/${news.slug}` },
    ]);

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/news" className="hover:text-navy-900 transition-colors">News</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-navy-900 font-medium truncate">{news.title}</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-navy-900 py-14">
                <div className="w-full px-6 lg:px-12">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight max-w-4xl">
                        {news.title}
                    </h1>
                </div>
            </div>

            {/* Description */}
            <div className="w-full px-6 lg:px-12 py-16 max-w-4xl">
                <div
                    className="rich-content text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: news.description }}
                />
            </div>
        </main>
    );
}

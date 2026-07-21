import Link from "next/link";
import { getActiveNews } from "@/lib/queries";

const NewsTicker = async () => {
    const news = await getActiveNews();

    if (news.length === 0) return null;

    return (
        <section className="bg-navy-900 border-y border-gold-500/20 overflow-hidden">
            <div className="flex items-center">
                <div className="flex-shrink-0 bg-gold-500 text-navy-900 font-bold text-xs md:text-sm uppercase tracking-wide px-4 md:px-6 py-3 z-10">
                    Latest News
                </div>
                <div className="relative flex-1 overflow-hidden py-3">
                    <div className="flex items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
                        {[...news, ...news].map((item, idx) => (
                            <span key={idx} className="flex items-center flex-shrink-0">
                                <Link
                                    href={`/news/${item.slug}`}
                                    className="text-sm font-medium text-white/90 hover:text-gold-400 transition-colors"
                                >
                                    {item.title}
                                </Link>
                                <span className="text-gold-500 mx-8">•</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsTicker;

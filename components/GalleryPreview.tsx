import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveGallery } from "@/lib/queries";

const PREVIEW_COUNT = 5;

const GalleryPreview = async () => {
    const images = await getActiveGallery();

    if (images.length === 0) return null;

    const preview = images.slice(0, PREVIEW_COUNT);

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">
                        Campus Life
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-navy-900">Gallery</h3>
                    <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {preview.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.picture}
                                alt={item.caption}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors" />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold border border-gold-500/40 shadow-[0_10px_20px_rgba(11,27,61,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                        View More
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GalleryPreview;

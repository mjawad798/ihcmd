"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

type GalleryItem = {
    id: number;
    caption: string;
    picture: string;
};

export default function GalleryGridClient({ images }: { images: GalleryItem[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (images.length === 0) {
        return <p className="text-center text-gray-400 py-16">No pictures yet.</p>;
    }

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {images.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        className="relative w-full block break-inside-avoid rounded-xl overflow-hidden bg-gray-100 group"
                    >
                        <Image
                            src={item.picture}
                            alt={item.caption}
                            width={600}
                            height={600}
                            loader={({ src }) => src}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-colors flex items-end">
                            {item.caption && (
                                <p className="w-full p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 to-transparent">
                                    {item.caption}
                                </p>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {activeIndex !== null && (
                <Lightbox
                    images={images.map((i) => ({ src: i.picture, caption: i.caption }))}
                    index={activeIndex}
                    onClose={() => setActiveIndex(null)}
                    onIndexChange={setActiveIndex}
                />
            )}
        </>
    );
}

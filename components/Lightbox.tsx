"use client";
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxImage = {
    src: string;
    caption?: string;
};

type Props = {
    images: LightboxImage[];
    index: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
};

export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
    const goPrev = useCallback(() => {
        onIndexChange((index - 1 + images.length) % images.length);
    }, [index, images.length, onIndexChange]);

    const goNext = useCallback(() => {
        onIndexChange((index + 1) % images.length);
    }, [index, images.length, onIndexChange]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, goPrev, goNext]);

    const current = images[index];
    if (!current) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close"
            >
                <X className="w-7 h-7" />
            </button>

            <span className="absolute top-4 left-4 text-sm text-white/60 font-medium">
                {index + 1} / {images.length}
            </span>

            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                    }}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            )}

            <div
                className="relative w-full max-w-4xl h-[70vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={current.src}
                        alt={current.caption ?? ""}
                        fill
                        loader={({ src }) => src}
                        className="object-contain"
                    />
                </div>
                {current.caption && (
                    <p className="mt-4 text-center text-white/80 text-sm max-w-2xl">{current.caption}</p>
                )}
            </div>

            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                    }}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            )}
        </div>
    );
}

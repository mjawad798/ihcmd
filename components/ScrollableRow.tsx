"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_SCROLL_INTERVAL_MS = 3000;
const AUTO_SCROLL_STEP_PX = 240;

const ScrollableRow = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [paused, setPaused] = useState(false);

    // Advances the track by `delta`, wrapping seamlessly: the track holds two
    // identical copies of the content back-to-back, so once we've scrolled
    // into the second copy we can snap back by that same width — the content
    // is identical, so the snap is invisible — then animate on from there.
    const advance = (delta: number) => {
        const track = trackRef.current;
        if (!track) return;
        const loopWidth = track.scrollWidth / 2;
        if (loopWidth <= 0) return;

        if (track.scrollLeft >= loopWidth) {
            track.scrollTo({ left: track.scrollLeft - loopWidth, behavior: "auto" });
        } else if (track.scrollLeft < 0) {
            track.scrollTo({ left: track.scrollLeft + loopWidth, behavior: "auto" });
        }

        track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
    };

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => advance(AUTO_SCROLL_STEP_PX), AUTO_SCROLL_INTERVAL_MS);
        return () => clearInterval(id);
    }, [paused]);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Vertical mouse wheels don't scroll a horizontal track by default;
        // redirect that delta into horizontal movement.
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            advance(e.deltaY);
            e.preventDefault();
        }
    };

    const items = React.Children.toArray(children);

    return (
        <div
            className="relative group/scroll"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <button
                type="button"
                aria-label="Scroll left"
                onClick={() => advance(-AUTO_SCROLL_STEP_PX)}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-gold-200 shadow-md text-navy-700 hover:text-gold-600 hover:border-gold-400 transition-all opacity-0 group-hover/scroll:opacity-100"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div
                ref={trackRef}
                onWheel={handleWheel}
                className={`flex items-center gap-10 md:gap-14 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 cursor-grab active:cursor-grabbing ${className}`}
            >
                {items.map((child, i) => (
                    <React.Fragment key={`a-${i}`}>{child}</React.Fragment>
                ))}
                {items.map((child, i) => (
                    <React.Fragment key={`b-${i}`}>{child}</React.Fragment>
                ))}
            </div>

            <button
                type="button"
                aria-label="Scroll right"
                onClick={() => advance(AUTO_SCROLL_STEP_PX)}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-gold-200 shadow-md text-navy-700 hover:text-gold-600 hover:border-gold-400 transition-all opacity-0 group-hover/scroll:opacity-100"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ScrollableRow;

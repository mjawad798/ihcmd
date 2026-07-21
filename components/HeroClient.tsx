"use client"
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
    id: number;
    image: string;
    heading: string;
    description: string | null;
};

const HeroClient = ({ slides }: { slides: Slide[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRef = useRef<HTMLDivElement>(null);

    const animateSlide = (direction: 'next' | 'prev', nextIdx?: number) => {
        const nextIndex = nextIdx !== undefined ? nextIdx : (direction === 'next'
            ? (currentIndex + 1) % slides.length
            : (currentIndex - 1 + slides.length) % slides.length);

        if (nextIndex === currentIndex) return;

        const currentSlide = slideRefs.current[currentIndex];
        const nextSlide = slideRefs.current[nextIndex];

        const tl = gsap.timeline();

        // Animate text out
        tl.to(textRef.current, {
            opacity: 0,
            y: direction === 'next' ? -30 : 30,
            duration: 0.4,
            ease: "power2.inOut",
        });

        // Fade out current background
        tl.to(currentSlide, {
            opacity: 0,
            scale: 1, // Reset scale slightly
            duration: 0.8,
            ease: "power2.inOut",
        }, "-=0.2");

        // Prepare next slide
        tl.set(nextSlide, {
            opacity: 0,
            scale: 1.1, // Start slightly zoomed in for zooming out effect or vice versa
            zIndex: 10,
        });
        tl.set(currentSlide, { zIndex: 0 });

        // Update state to trigger re-render for text content
        tl.add(() => {
            setCurrentIndex(nextIndex);
        });

        // Animate next slide in
        tl.to(nextSlide, {
            opacity: 1,
            scale: 1, // scale to normal
            duration: 1.2,
            ease: "power2.out",
        });

        // Animate text in
        tl.fromTo(textRef.current,
            { opacity: 0, y: direction === 'next' ? 30 : -30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.8"
        );
    };

    const handleManualNavigation = (direction: 'prev' | 'next') => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        animateSlide(direction);
        intervalRef.current = setInterval(() => animateSlide('next'), 6000);
    };

    React.useEffect(() => {
        if (slides.length < 2) return;
        intervalRef.current = setInterval(() => animateSlide('next'), 6000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, slides.length]);

    // Initialize first slide zoom effect slightly
    React.useEffect(() => {
        if (slideRefs.current[0]) {
            gsap.fromTo(slideRefs.current[0], { scale: 1.05 }, { scale: 1, duration: 6, ease: "power1.out" });
        }
    }, [slides]);

    if (slides.length === 0) {
        return <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] bg-navy-950" />;
    }

    return (
        <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] overflow-hidden bg-gray-950 group">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    ref={el => { slideRefs.current[index] = el; }}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.heading}
                        fill
                        sizes="100vw"
                        loader={({ src }) => src}
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
            ))}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-end pb-12 md:pb-16 justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div ref={textRef} className="text-left max-w-5xl">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-2xl mb-2 leading-tight">
                            {slides[currentIndex].heading}
                        </h3>
                        {slides[currentIndex].description && (
                            <p className="mt-2 text-sm md:text-base text-gray-200 drop-shadow-lg mb-4 max-w-3xl font-light">
                                {slides[currentIndex].description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={() => handleManualNavigation('prev')}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button
                        onClick={() => handleManualNavigation('next')}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-6 right-8 z-30 flex space-x-3 items-center">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => {
                                    if (index === currentIndex) return;
                                    const direction = index > currentIndex ? 'next' : 'prev';
                                    if (intervalRef.current) clearInterval(intervalRef.current);
                                    animateSlide(direction, index);
                                    intervalRef.current = setInterval(() => animateSlide('next'), 6000);
                                }}
                                className={`transition-all duration-500 rounded-full ${
                                    index === currentIndex
                                        ? 'w-12 h-3 bg-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.8)]'
                                        : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default HeroClient;

"use client"
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {

    // Testimonial data
    const galleryItems = [
        {
            image: "/meeting.jpg",
            title: " MoU Signing Ceremony between Rahim Medical Center & General Hospital and IHMS",
            description: "The MoU signing between Rahim Medical Center, General Hospital, and IHMS marks a significant milestone in healthcare education.This partnership enhances collaboration and ultrasound training through Six-Month and One-Year Diploma programs.Rahim Medical Center and General Hospital are committed to high-quality education and hands-on training, preparing students for global healthcare contributions.For more information or to enroll in the ultrasound programs, contact 📞 0334-9281219"
        },
        {
            image: "/meeting2.jpg",
            title: "Guest Lecture Series with High Government Officials",
            description: "Institute of Health Care Management & Development Islamabad Heartly welcome  on nomination high Govt: Officials as member of  IHCMD-Isld Board of Governors on first BOG's meeting.The meeting led by nominated Chairman BOGs  Dr. Zeeshan Ahmad (Chair BOGs) and breifly presentation has been given by Mr.Khalid Siddiqui  Director IHCMD-Isld (Secretary BOGs).The honorable board members shows satisfaction upon performance of institute and passed resolution to  continue provision of support in best interest of institute regarding managerial & academic concensis."
        },
        {
            image: "/meeting3.jpg",
            title: "Successful Inspection for FSc Medical Technology Program",
            description: "Institute of Health Care Management & Development Islamabad has successfully received inspection from the Private Educational Institute Regulatory Authority (PEIRA) for Fsc Medical Technology. Honorable Secretary PEIRA led the inspection along with his team of professionals and found it satisfactory. They also visited IHCMD's own hospital, IRM-Hospital Islamabad. The inspection team appreciated Dr. Zeeshan Ahmad (MD) & Mr. Khalid Siddiqui (Director) for their professional work in introducing a new concept to offer fully hospital-based FSc Medical Technology in Islamabad, which will be very beneficial for boys & girls to take admission in IHCMD-Islamabad."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const procedureRef = useRef<HTMLParagraphElement>(null);

    const animateSlide = (direction: 'next' | 'prev') => {
        const currentImage = imageRefs.current[currentIndex];
        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % galleryItems.length
            : (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const nextImage = imageRefs.current[nextIndex];

        // Create timeline for smooth transitions
        const tl = gsap.timeline();

        // Fade out current content
        tl.to([textRef.current, nameRef.current, procedureRef.current], {
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            duration: 0.3,
            stagger: 0.1,
        });

        // Animate images
        tl.to(currentImage, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
        }, "-=0.2");

        tl.set(nextImage, {
            opacity: 0,
            scale: 1.05,
        });

        // Update state
        tl.add(() => {
            setCurrentIndex(nextIndex);
        });

        // Animate in new content
        tl.to(nextImage, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
        });

        tl.to([textRef.current, nameRef.current, procedureRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
        }, "-=0.2");
    };

    // Modified navigation handlers
    const handleManualNavigation = (direction: 'prev' | 'next') => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        animateSlide(direction === 'prev' ? 'prev' : 'next');
        intervalRef.current = setInterval(() => animateSlide('next'), 5000);
    };

    // Auto-slide effect with GSAP animation
    useEffect(() => {
        intervalRef.current = setInterval(() => animateSlide('next'), 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex]);

    return (
        <section className="relative bg-gray-100 text-gray-900">


            <div className="relative z-10 flex flex-col items-center text-center py-16 md:pt-18 md:pb-10 px-4 md:px-10">
                {/* Institute Info */}
                <h1 className="text-3xl md:text-5xl font-bold text-blue-900 drop-shadow-md">
                    Pursue Excellence in Healthcare Education
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-800 drop-shadow-sm">
                    Join our esteemed institute and gain hands-on experience through practical training at IRM Hospital, preparing you for a fulfilling career in healthcare.
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                    <Link href="#programs">
                        <p className="bg-blue-600 text-white px-6 py-3 shadow-lg hover:bg-gradient-to-tr from-blue-800 to-blue-950 transition-all">
                            Explore Programs
                        </p>
                    </Link>
                    <Link href="/submissions">
                        <p className="bg-amber-700 text-white px-6 py-3 shadow-lg hover:bg-gradient-to-tr from-amber-800 to-amber-950 transition-all">
                            Apply Now
                        </p>
                    </Link>
                </div>



                {/* Image Slider */}
                <div className="mt-12 relative max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image Slider */}
                        <div className="relative h-[300px] md:h-[400px] md:w-1/2 w-full overflow-hidden">
                            {galleryItems.map((galleryItem, index) => (
                                <div
                                    key={index}
                                    ref={el => { imageRefs.current[index] = el }}
                                    className={`absolute w-full h-full ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <ExportedImage
                                        src={galleryItem.image}
                                        alt={galleryItem.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        quality={80}
                                        className="object-cover"
                                        priority={index === currentIndex}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            ))}

                            {/* Navigation Buttons */}
                            <button
                                onClick={() => handleManualNavigation('prev')}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
                            </button>
                            <button
                                onClick={() => handleManualNavigation('next')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {galleryItems.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const direction = index > currentIndex ? 'next' : 'prev';
                                            setCurrentIndex(index);
                                            animateSlide(direction);
                                            if (intervalRef.current) {
                                                clearInterval(intervalRef.current);
                                                intervalRef.current = setInterval(() => animateSlide('next'), 5000);
                                            }
                                        }}
                                        className={`w-2 h-2 transition-all duration-200 ${index === currentIndex
                                            ? 'bg-white w-4'
                                            : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Testimonial Text */}
                        <div className="md:w-1/2 bg-blue-50 flex flex-col justify-center items-center dark:bg-blue-900/30 p-8">
                            <blockquote className="text-center">
                                <p
                                    ref={textRef}
                                    className="text-xl italic text-gray-700 dark:text-gray-300 mb-4 min-h-[80px]"
                                >
                                    {galleryItems[currentIndex].description}
                                </p>
                                <footer className="text-gray-600 dark:text-gray-400">
                                    <p ref={nameRef} className="font-semibold">
                                        {galleryItems[currentIndex].title}
                                    </p>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* IRM Hospital Connection */}
                <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Title */}
                        <h3 className="text-center md:text-4xl text-3xl font-bold text-blue-900 tracking-wide mb-6">
                            Hands-On Training at IRM Hospital
                        </h3>

                        <div className="mt-12 flex flex-col md:flex-row items-center md:gap-8 gap-12">
                            {/* Hospital Image */}
                            <div className="relative w-full md:w-1/2 flex justify-center">
                                <ExportedImage
                                    src="/hospital.jpg"
                                    alt="IRM Hospital"
                                    width={600}
                                    height={600}
                                    className=" shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-0 left-0 bg-blue-900/10 w-full h-full shadow-inner"></div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2  md:text-left space-y-6">
                                <p className="text-gray-800 dark:text-gray-300 text-left text-lg leading-relaxed z-10">
                                    At the Institute of Regenerative Medicine (IRM) Hospital, students gain invaluable hands-on experience in a real-world healthcare setting. From radiology and anesthesia to nursing and specialized diplomas, our programs prepare students for impactful careers. With expert guidance, they apply knowledge in a supportive, professional environment.
                                </p>

                                <div className="flex justify-center md:justify-start">
                                    <Link href="/about">
                                        <p className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-3 shadow-md hover:shadow-lg hover:bg-gradient-to-tr from-blue-800 to-blue-950 transition duration-300">
                                            Learn More
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </section>
    );
};

export default HeroSection;

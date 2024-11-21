"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NewsPage = () => {

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

    const animateSlide = useCallback((direction: 'next' | 'prev') => {
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
    }, [currentIndex, galleryItems.length]);

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
    }, [animateSlide]);


  return (
    <>
    <div className="bg-gray-100 md:pt-10 pb-10">
        <div className="max-w-7xl mx-auto p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                Latest Updates
            </h1>

            <div className="text-gray-700 text-center mb-6">
                <p className="text-xl">
                    Stay tuned for the latest updates and highlights from the Institute of Healthcare Management And Development.
                    Don&apos;t miss our online session on May 10, 2023, focusing on mental health awareness and resources.
                </p>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-blue-800 text-center">Upcoming Events</h2>
                <ul className="list-disc list-inside text-gray-600 mt-4 text-lg">
                    <li>
                        <strong>Healthcare Innovation Conference:</strong> Join us on March 15, 2023, for a day of insightful discussions and networking.
                    </li>
                    <li>
                        <strong>Annual Health Fair:</strong> Mark your calendars for April 20, 2023, to participate in health screenings and educational workshops.
                    </li>
                    <li>
                        <strong>Webinar on Mental Health:</strong> Don't miss our online session on May 10, 2023, focusing on mental health awareness and resources.
                    </li>
                </ul>
            </div>

            <div className="mt-6 text-center">
                <Button className='bg-blue-600 text-white hover:bg-gradient-to-r from-blue-800 to-blue-900'>
                <Link href='/contact'>
                    Get In Touch For Further inquiries
                </Link>
                </Button>
            </div>
        </div>
    </div>

    {/* Image Slider */}
    <div className="mt-12 relative max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Image Slider */}
            <div className="relative h-[300px] md:h-[400px] md:w-1/2 w-full overflow-hidden rounded-xl">
                {galleryItems.map((galleryItem, index) => (
                    <div
                        key={index}
                        ref={el => { imageRefs.current[index] = el }}
                        className={`absolute w-full h-full ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={galleryItem.image}
                            alt={galleryItem.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={80}
                            className="object-cover rounded-xl"
                            priority={index === currentIndex}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                ))}

                {/* Navigation Buttons */}
                <button
                    onClick={() => handleManualNavigation('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
                <button
                    onClick={() => handleManualNavigation('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
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
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Testimonial Text */}
            <div className="md:w-1/2 bg-blue-50 flex flex-col justify-center items-center dark:bg-blue-900/30 p-8 rounded-xl">
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
    </>
  );
};

export default NewsPage;

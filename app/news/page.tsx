"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ExportedImage from "next-image-export-optimizer";import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NewsPage = () => {

   // Testimonial data
   const galleryItems = [
    {
        "image": "/img- (5).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "Alhamdulillah! We are proud to announce the successful completion of the Federal Board of Intermediate and Secondary Education inspection for our F.Sc Medical Technology Program. Special thanks to IRM for their unwavering support in achieving this milestone."
      },
      {
        "image": "/img- (6).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "The Federal Board inspection team conducted a thorough review of our advanced laboratory facilities and cutting-edge equipment, commending us for meeting the highest standards of educational excellence."
      },
      {
        "image": "/img- (7).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "Our dedicated faculty members showcased the innovative practical training methodologies that form the backbone of our FSc Medical Technology program, earning praise from the inspection team."
      },
      {
        "image": "/img- (8).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "The inspection committee meticulously reviewed our curriculum and teaching materials, expressing their satisfaction with our comprehensive and student-focused approach to medical education."
      },
      {
        "image": "/img- (1).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "Our talented students demonstrated their exceptional practical skills and in-depth knowledge during the inspection, highlighting the effectiveness of our training programs."
      },
      {
        "image": "/img- (2).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "The inspection team toured our state-of-the-art medical laboratories and training facilities, acknowledging the advanced infrastructure that supports our students' learning journey."
      },
      {
        "image": "/img- (3).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "Our administrative team presented detailed documentation and compliance records to the Federal Board inspection committee, showcasing our commitment to transparency and excellence."
      },
      {
        "image": "/img- (4).jpg",
        "title": "Federal Board Inspection Success for FSc Medical Technology Program",
        "description": "This successful inspection is a testament to our institution's dedication to providing world-class medical education and marks a significant step forward in our mission to shape the future of healthcare professionals."
      },
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
            Why Choose Us?
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
            Discover what sets us apart and how we empower our students to achieve their goals in healthcare and beyond.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg
                        className="w-12 h-12 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800">Industry-Leading Curriculum</h3>
                <p className="text-gray-600 mt-4">
                    Our courses are designed by healthcare professionals, ensuring you're learning the most up-to-date practices.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg
                        className="w-12 h-12 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800">Hands-On Training</h3>
                <p className="text-gray-600 mt-4">
                    Gain practical experience through working in hospitals like IRM Hospital, where you will collaborate with healthcare professionals and apply your skills in real-world situations.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg
                        className="w-12 h-12 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h11M9 21l6-6-6-6"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800">Career Advancement</h3>
                <p className="text-gray-600 mt-4">
                    Benefit from our strong industry connections to land internships and jobs in top healthcare organizations.
                </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <svg
                        className="w-12 h-12 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16l4-4 4 4m0-12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800">Supportive Community</h3>
                <p className="text-gray-600 mt-4">
                    Join a network of passionate peers and mentors who are committed to your success.
                </p>
            </div>

            
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
                        <ExportedImage
                            src={galleryItem.image}
                            alt={galleryItem.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
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

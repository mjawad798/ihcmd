"use client"
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const GalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = [
    { id: 1, src: "/img (1).jpg", alt: "Medical Facility Image 1" },
    { id: 2, src: "/img (2).jpg", alt: "Medical Facility Image 2" },
    { id: 3, src: "/img (3).jpg", alt: "Medical Facility Image 3" },
    { id: 4, src: "/img (4).jpg", alt: "Medical Facility Image 4" },
    { id: 5, src: "/img (5).jpg", alt: "Medical Facility Image 5" },
    { id: 6, src: "/img (6).jpg", alt: "Medical Facility Image 6" },
    { id: 7, src: "/img (7).jpg", alt: "Medical Facility Image 7" },
    { id: 8, src: "/img (8).jpg", alt: "Medical Facility Image 8" },
    { id: 9, src: "/img (9).jpg", alt: "Medical Facility Image 9" },
    { id: 10, src: "/img (10).jpg", alt: "Medical Facility Image 10" },
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
     

     {/* Image Slider Section */}
<div className="relative overflow-hidden bg-slate-900">
  <div className="relative overflow-hidden">
    <div
      className="flex transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          className="w-full flex-shrink-0 h-[500px] md:h-[600px]"
        >
          <ExportedImage
            src={image.src}
            alt={image.alt}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
          
        </div>
      ))}
    </div>

    {/* Navigation Arrows */}
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
    >
      <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
    >
      <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* Slide Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === currentIndex ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  </div>
</div>


      

      {/* Call to Action Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Experience Excellence in Healthcare
          </h2>
          <p className="text-lg text-blue-700 mb-8 max-w-2xl mx-auto">
            Join the thousands of satisfied patients who have chosen us for their healthcare needs.
          </p>
          <Link href='/submissions' className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Your Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
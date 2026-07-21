import React from 'react';
import ExportedImage from "next-image-export-optimizer";
import { Quote } from 'lucide-react';

const MessageSection = () => {
    return (
        <section className="relative bg-gray-50 py-24 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-navy-900/5 skew-y-3 transform origin-top-left -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
                        Director's Message
                    </h2>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Image Column */}
                    <div className="w-full lg:w-2/5 flex justify-center items-center relative bg-navy-950 p-12 lg:p-16">
                        {/* Decorative circle behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[320px] md:h-[320px] bg-navy-800/50 rounded-full -z-10"></div>
                        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-gold-500/80 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                            <ExportedImage
                                src="/director.jpg"
                                alt="Director"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-3/5 relative z-10 p-10 md:p-14 lg:p-20">
                        <Quote className="absolute top-10 left-6 md:left-10 w-20 h-20 text-gold-100 -z-10 rotate-180" />

                        <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light leading-relaxed">
                            <p>
                                Welcome to the Institute of Health Care Management and Development (IHCMD). It is an honor to lead an institution that is dedicated to fostering excellence in healthcare education, research, and professional development.
                            </p>
                            <p>
                                In today's rapidly evolving medical landscape, our goal is to empower future healthcare leaders with evidence-based knowledge and practical skills. Through our state-of-the-art facilities at IRM Hospital and our subsidized training programs, we remain steadfast in our commitment to accessible, high-quality education.
                            </p>
                            <p>
                                I invite you to explore our programs and join us in our mission to elevate healthcare services and create a lasting impact in our communities.
                            </p>
                        </div>

                        <div className="mt-12 border-t border-gold-100 pt-6">
                            <h4 className="text-2xl font-bold text-navy-900">
                                Mr. Khalid Siddiqui
                            </h4>
                            <p className="text-gold-600 font-medium tracking-wider uppercase text-sm mt-1">
                                Director
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MessageSection;

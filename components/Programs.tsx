import Link from "next/link";
import React from "react";

const Programs = () => {
    return (
        <section id="programs" className="py-16 bg-gray-100">
            <h2 className="text-4xl font-bold text-center text-blue-900 pb-6 mb-12 underline underline-offset-[8px]">
                Our Programs
            </h2>

            {/* Program Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
                {/* Degree Programs */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6">
                    <h3 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-3 mb-4">
                        Degree Programs
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Bachelor of Science in Nursing (BSN)</li>
                        <li>Bachelor of Anesthesia Technology</li>
                        <li>Bachelor of Radiology and Imaging Technology</li>
                        <li>Bachelor of Health Economics</li>
                        <li>Bachelor of Public Health</li>
                    </ul>
                    <Link
                        href="/degree"
                        className="inline-block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-2 mt-4 ease-in-out"
                    >
                        Learn More About Degree Programs
                    </Link>
                </div>

                {/* Diploma Programs */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6">
                    <h3 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-3 mb-4">
                        Post Graduate Diploma Programs
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Post Graduate Diploma in Ultrasound</li>
                        <li>Post Graduate Diploma in Central Sterile Supply Department (CSSD)</li>
                        <li>Post Graduate Diploma in Health Care Management</li>
                        <li>Post Graduate Diploma in Respiratory Therapy (PG-DRT)</li>
                        <li>Post Graduate Diploma in Disaster Management (DDM)</li>
                    </ul>
                    <Link
                        href="/diploma"
                        className="inline-block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-2 mt-4 ease-in-out"
                    >
                        Learn More About Post Graduate Diploma Programs
                    </Link>
                </div>

                {/* Certificate Programs */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6">
                    <h3 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-3 mb-4">
                        Certificate Programs
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Certificate in Health Profession Education (CHPE)</li>
                        <li>Certificate in Health Research (CHR)</li>
                        <li>Certificate in Infection Prevention and Control (IPC)</li>
                        <li>Certificate in Pharmacovigilance</li>
                        <li>Certificate in Operation Theatre Management</li>
                    </ul>
                    <Link
                        href="/certificate"
                        className="inline-block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-2 mt-4 ease-in-out"
                    >
                        Learn More About Certificate Programs
                    </Link>
                </div>

                {/* FCS Medical Technologies */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6">
                    <h3 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-3 mb-4">
                        FCS Medical Technologies
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>FSc. Dispensing Technology</li>
                        <li>FSc. Medical Lab Technology</li>
                        <li>FSc. Operation Theatre Technology</li>
                        <li>FSc. Physiotherapy Technology</li>
                        <li>FSc. Cardiology Technology</li>
                        <li>FSc. Dental Hygiene Technology</li>
                        <li>FSc. Ophthalmic Technology</li>
                        <li>FSc. Radiology Technology</li>
                    </ul>
                    <Link
                        href="/fsc"
                        className="inline-block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-2 mt-4 ease-in-out"
                    >
                        Learn More About FCS Medical Technologies
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Programs;

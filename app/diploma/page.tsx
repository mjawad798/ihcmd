"use client";
import React from "react";

const programs = [
  {
    title: "Post Graduate Diploma in Ultrasound",
    duration: "06 Months",
    eligibility:
      "MBBS or 16 years of Education in Health & Allied Sciences disciplines such as MBBS, Nursing, etc.",
  },
  {
    title: "Post Graduate Diploma in Central Sterile Supply Department (CSSD)",
    duration: "06 Months",
    eligibility: "Diploma in Surgical Technology or BS Surgical Technology.",
  },
  {
    title: "Post Graduate Diploma in Health Care Management",
    duration: "06 Months",
    eligibility: `
      • MBBS, BDS 
      • B. Pharmacy (Bachelor’s in Pharmacy) / D. Pharmacy 
      • BSc Nursing 
      • Graduation in Medical-Allied subjects 
      • DVM (Doctor of Veterinary Medicine) 
      • Master's Degree in relevant fields such as Anthropology, Business Administration, Economics, Sociology, and others.
    `,
  },
  {
    title: "Post Graduate Diploma in Respiratory Therapy (PG-DRT)",
    duration: "01 Year",
    eligibility: `
      • MBBS 
      • BS Emergency Care Technology 
      • BS Health Technology 
      • BS Intensive Care Technology (ICU) 
      • BS Anesthesia Technology.
    `,
  },
  {
    title: "Post Graduate Diploma in Disaster Management (DDM)",
    duration: "01 Year",
    eligibility: `
      • MBBS/BDS or 16 years of education in Health & Allied Sciences disciplines such as Nursing, Physiotherapy, Pharmacy, etc.
      • Additional relevant fields: Agriculture, Engineering, Economics, Environmental Sciences, Sociology, Psychology, and more.
    `,
  },
];

const DiplomaPrograms = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-4">
            Explore Our Diploma Programs
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Advance your career with our specialized Postgraduate Diploma programs designed for healthcare professionals.
          </p>
        </div>

        {/* Diploma Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="md:text-2xl text-xl font-semibold text-blue-800 dark:text-gray-200 mb-4">
                {program.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <strong>Duration:</strong> {program.duration}
              </p>
              <details className="group">
                <summary className="text-blue-600 dark:text-blue-400 cursor-pointer mb-2 font-medium group-hover:underline">
                  Eligibility Criteria
                </summary>
                <p className="text-gray-600 dark:text-gray-400 pl-4 mt-2">
                  {program.eligibility}
                </p>
              </details>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Enroll in one of our postgraduate diploma programs today and gain the skills and knowledge to excel in the healthcare industry.
          </p>
          <a
            href="/submissions"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md shadow-md font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default DiplomaPrograms;

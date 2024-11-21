"use client";
import React from "react";

const programs = [
  {
    title: "FSc. Dispensing Technology",
    description:
      "Focuses on training students in the preparation, dispensing, and management of medications in healthcare settings.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Medication preparation, Inventory management, Patient counseling",
      "Career Opportunities: Pharmacy Assistant, Medical Store Manager",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Medical Lab Technology",
    description:
      "Provides hands-on experience in medical laboratory techniques, specimen analysis, and diagnostic procedures.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Laboratory testing, Specimen handling, Diagnostic analysis",
      "Career Opportunities: Lab Technician, Diagnostic Assistant",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Operation Theatre Technology",
    description:
      "Trains students in assisting surgical procedures, managing operating room equipment, and ensuring patient safety.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Surgical assistance, Equipment sterilization, Patient safety protocols",
      "Career Opportunities: Operation Theatre Assistant, Surgical Technologist",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Physiotherapy Technology",
    description:
      "Covers techniques and practices to help patients recover from injuries and improve mobility through physiotherapy.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Rehabilitation techniques, Patient care, Mobility improvement",
      "Career Opportunities: Physiotherapy Assistant, Rehabilitation Technician",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Cardiology Technology",
    description:
      "Offers knowledge of diagnostic and therapeutic practices related to heart diseases and cardiac care.",
    details: [
      "Duration: 2 Years",
      "Key Skills: ECG interpretation, Cardiac care, Diagnostic procedures",
      "Career Opportunities: Cardiology Technician, ECG Assistant",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Dental Hygiene Technology",
    description:
      "Focuses on preventive dental care, oral hygiene practices, and patient education in dental health.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Oral hygiene techniques, Preventive care, Patient education",
      "Career Opportunities: Dental Hygienist, Dental Assistant",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Ophthalmic Technology",
    description:
      "Trains students in eye care, diagnostic tests, and assisting ophthalmologists in patient treatment.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Vision testing, Equipment handling, Patient care",
      "Career Opportunities: Ophthalmic Assistant, Vision Technician",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
  {
    title: "FSc. Radiology Technology",
    description:
      "Introduces radiological techniques, imaging technology, and diagnostic procedures for medical conditions.",
    details: [
      "Duration: 2 Years",
      "Key Skills: Imaging techniques, Equipment operation, Safety protocols",
      "Career Opportunities: Radiology Technician, Imaging Assistant",
      "Eligibility Criteria: Matric Science Group (Biology), Marks (45%), Age 15 to 18 years",
    ],
  },
];

const FCSPrograms = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-4">
            Explore Our FSc Medical Technology Programs
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Join us to specialize in diverse fields of medical technology. Admissions are open for the 2024-2026 session.
          </p>
        </div>

        {/* Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-gray-200 mb-4">
                {program.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {program.description}
              </p>
              <details className="group">
                <summary className="text-blue-600 dark:text-blue-400 cursor-pointer mb-2 font-medium group-hover:underline">
                  Learn More
                </summary>
                <ul className="text-gray-600 dark:text-gray-400 space-y-2 pl-4 list-disc">
                  {program.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Take the first step toward a rewarding career in medical technology.
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

export default FCSPrograms;

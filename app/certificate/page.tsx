"use client";
import React from "react";

const programs = [
  {
    title: "Certificate in Health Profession Education (CHPE)",
    duration: "06 Months",
    eligibility:
      "MBBS/BDS or 16 years of Education in Health & Allied Sciences disciplines such as MBBS, BDS, Nursing, Physiotherapy, Pharmacy, etc.",
    description:
      "Enhance your teaching capabilities with specialized training in educational techniques, curriculum design, and assessment methodologies for healthcare professionals.",
  },
  {
    title: "Certificate in Health Research (CHR)",
    duration: "06 Months",
    eligibility:
      "MBBS/BDS or 16 years of Education in Health & Allied Sciences disciplines such as MBBS, BDS, Nursing, Physiotherapy, Pharmacy, etc.",
    description:
      "Develop the skills to conduct high-quality healthcare research with a focus on methodology, ethical compliance, and statistical analysis.",
  },
  {
    title: "Certificate in Infection Prevention and Control (IPC)",
    duration: "06 Months",
    eligibility:
      "MBBS/BDS or 16 years of Education in Health & Allied Sciences disciplines such as MBBS, BDS, Nursing, Physiotherapy, Pharmacy, etc.",
    description:
      "Gain expertise in managing and preventing infections in healthcare settings through hygiene protocols, sterilization techniques, and outbreak management.",
  },
  {
    title: "Certificate in Pharmacovigilance",
    duration: "03 Months",
    eligibility:
      "Pharm-D, Pharm-B, MBBS, BS Nursing, or BS Allied Health Sciences.",
    description:
      "Learn to monitor, evaluate, and enhance drug safety practices, ensuring effective and safe use of pharmaceutical products in healthcare.",
  },
  {
    title: "Certificate in Operation Theatre Management",
    duration: "03 Months",
    eligibility:
      "Diploma in Surgical Technology or BS Surgical Technology.",
    description:
      "Master the skills required to efficiently manage operation theatres, including staff coordination, surgical scheduling, and equipment optimization.",
  },
];

const CertificatePrograms = () => {
  return (
    <section className="bg-gray-100 dark:bg-blue-900 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-4">
            Explore Our Certificate Programs
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Short-term certificate programs designed to advance your expertise
            in specialized healthcare fields and enhance your professional
            skills.
          </p>
        </div>

        {/* Certificate Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-gray-200 mb-4">
                {program.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <strong>Duration:</strong> {program.duration}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {program.description}
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
            Advance Your Career with Our Certificates
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Take the next step in your professional journey by enrolling in one
            of our certificate programs. Gain the skills and credentials to
            excel in specialized healthcare fields.
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

export default CertificatePrograms;

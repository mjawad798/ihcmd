"use client";
import React from "react";

const programs = [
  {
    title: "Bachelor of Science in Nursing (BSN)",
    description:
      "The BSN program prepares students to become professional nurses with a strong foundation in clinical and theoretical knowledge.",
    details: [
      "Duration: 4 Years",
      "Key Skills: Patient care, Clinical procedures, Nursing ethics",
      "Career Opportunities: Registered Nurse, Nurse Educator, Public Health Nurse",
    ],
  },
  {
    title: "Bachelor of Anesthesia Technology",
    description:
      "This program equips students with the knowledge and skills necessary to assist in anesthesia administration and patient monitoring during surgical procedures.",
    details: [
      "Duration: 4 Years",
      "Key Skills: Anesthesia techniques, Patient monitoring, Surgical assistance",
      "Career Opportunities: Anesthesia Technologist, Surgical Assistant, Clinical Support Specialist",
    ],
  },
  {
    title: "Bachelor of Radiology and Imaging Technology",
    description:
      "This program provides knowledge in radiological techniques for imaging and diagnostic purposes.",
    details: [
      "Duration: 4 Years",
      "Key Skills: Radiographic imaging, Safety protocols, Equipment handling",
      "Career Opportunities: Radiology Technologist, Imaging Specialist, MRI Technician",
    ],
  },
  {
    title: "Bachelor of Health Economics",
    description:
      "This program provides students with an understanding of economic principles as they apply to healthcare systems, policies, and practices.",
    details: [
      "Duration: 4 Years",
      "Key Skills: Economic analysis, Health policy evaluation, Data analysis",
      "Career Opportunities: Health Economist, Policy Analyst, Healthcare Consultant",
    ],
  },
  {
    title: "Bachelor of Public Health",
    description:
      "Prepares students to address community health challenges through prevention, education, and policy development.",
    details: [
      "Duration: 4 Years",
      "Key Skills: Health education, Epidemiology, Policy making",
      "Career Opportunities: Public Health Specialist, Health Educator, Policy Analyst",
    ],
  },
  { 
    title: " Bachelor of Cardiology",
    description:
   "Cardiologists specialize in managing conditions such as heart attacks, high blood pressure, arrhythmias, and heart failure.", 
    details: [
      "Duration: 4 Years",
      "Key Skills: medical and technical skills, analytical skills, research amd continue learning",
      "Career Opportunities: Heart Specialist, Medical professor and educator, Genetic Cardiologist",
    ], 
  }  
];

const DegreePrograms = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-4">
            Explore Our Degree Programs
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover a range of degree programs designed to equip you with the
            skills and knowledge for a successful career in healthcare and
            public service.
          </p>
        </div>

        {/* Degree Programs */}
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Enroll today to pursue a fulfilling career in healthcare and public
            health.
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

export default DegreePrograms;

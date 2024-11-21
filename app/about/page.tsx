"use client"
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section>
      <div className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4 text-blue-900">
              Institute of Health Care Management and Development (IHCMD)
            </h1>
            <p className="text-lg md:text-xl ">
              Empowering Healthcare Professionals Since 2019
            </p>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-blue-800">
                Our Mission
              </h2>
              <p className="text-lg leading-8 ">
                Established in 2019 with the support of Health Services Academy (HSA), a Degree Awarding Institute under the Ministry of Health, the **IHCMD** is dedicated to enhancing healthcare management and public health education in Pakistan. As a postgraduate training institution, we conduct operational and health research, focusing on developing models to improve health sector services in Khyber Pakhtunkhwa (KP).
              </p>
              <h2 className="text-3xl font-semibold text-blue-800">
                Expanding Opportunities
              </h2>
              <p className="text-lg leading-8 ">
                With campuses in **Peshawar** and **Islamabad**, our Islamabad campus, powered by IRM Hospital, now offers degree programs in **BS Nursing** and **BS Allied Health Sciences**. Our courses are essential for Continued Professional Development (CPD), empowering students and professionals with subsidized, accessible training opportunities.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <Image 
                src="/irmHospital.jpg" 
                alt="IHCMD Campus" 
                className="rounded-lg shadow-lg w-full border"
                width={500}
                height={500}
              />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-16 bg-gray-50-800 p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 text-blue-900 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold ">2019</h3>
                <p className="text-sm ">Established Year</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold ">2</h3>
                <p className="text-sm ">Campuses</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold ">100+</h3>
                <p className="text-sm ">Courses Offered</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold ">Thousands</h3>
                <p className="text-sm ">Professionals Trained</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page

"use client"
import ExportedImage from "next-image-export-optimizer";
import React from 'react'

const page = () => {
  return (
    <section>
      <div className="bg-gray-100 pt-8 md:pt-16 pb-16  px-6 md:px-12 lg:px-24">
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
                With campuses in **Mardan** and **Islamabad**, our Islamabad campus, powered by IRM Hospital, now offers degree programs in **BS Nursing** and **BS Allied Health Sciences**. Our courses are essential for Continued Professional Development (CPD), empowering students and professionals with subsidized, accessible training opportunities.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <ExportedImage 
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
                <h3 className="md:text-4xl text-2xl font-bold ">2019</h3>
                <p className="text-sm ">Established Year</p>
              </div>
              <div>
                <h3 className="md:text-4xl text-2xl font-bold ">2</h3>
                <p className="text-sm ">Campuses</p>
              </div>
              <div>
                <h3 className="md:text-4xl text-2xl font-bold ">50+</h3>
                <p className="text-sm ">Courses Offered</p>
              </div>
              <div>
                <h3 className="md:text-4xl text-2xl font-bold ">Thousands</h3>
                <p className="text-sm ">Professionals Trained</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-page py-12 max-w-7xl mx-auto">
      <div className="container mx-auto px-6">

        {/* MD Message */}
        <div className="md-message bg-white shadow-md rounded-lg p-6 mb-12">
          <div className="md:flex items-center gap-6">
            {/* MD Picture */}
            <div className="md:w-1/3">
              <ExportedImage
                src="/md.jpg" // Replace with the actual ExportedImage path
                alt="Dr. Zeeshan Ahmad"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            {/* MD Content */}
            <div className="md:w-2/3 mt-4 md:mt-0">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                Message from the Managing Director
              </h2>
              <p className="text-gray-600 mb-4">
                Institute of Health Care Management & Development (IHCMD), a
                promising medical institute, began its journey in Peshawar in
                2019. Today, it proudly operates two state-of-the-art campuses
                in Peshawar and Islamabad. This achievement is the result of
                the dedication and tireless efforts of my team of professionals
                who have devoted their best to the prosperity of IHCMD & IHCMNS.
              </p>
              <p className="text-gray-600 mb-4">
                Affiliated with prestigious universities, councils, boards, and
                regulatory authorities in Islamabad, IHCMD offers quality
                education in Generic Nursing, Allied Health Sciences,
                Post-Graduate Diplomas, and research. Our vision is to be the
                first choice among top institutions.
              </p>
              <p className="text-gray-600">
                At IHCMD, we are committed to fulfilling the expectations of our
                learners. We welcome the opportunity to contribute to your
                future success and professional development.
              </p>
              <p className="mt-6 text-gray-800 font-medium">
                Dr. Zeeshan Ahmad <br />
                Managing Director, IHCMD & IHCMNS
              </p>
            </div>
          </div>
        </div>

        {/* Director Message */}
        <div className="director-message bg-white shadow-md rounded-lg p-6">
          <div className="md:flex items-center gap-6">
            {/* Director Picture */}
            <div className="md:w-1/3">
              <ExportedImage
                src="/director.jpg" // Replace with the actual ExportedImage path
                alt="Khalid Ilyas Siddiqui"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            {/* Director Content */}
            <div className="md:w-2/3 mt-4 md:mt-0">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                Message from the Director
              </h2>
              <p className="text-gray-600 mb-4">
                IHCMD and IHCMNS, in its journey of five years, has identified
                and filled gaps in Generic Nursing, Allied Health Sciences,
                Post-Graduate Diplomas, and Research. Our mission is to provide
                opportunities in areas previously unavailable to the local
                community. Our first endeavors in Allied Health Sciences and
                now Generic Nursing are addressing public needs.
              </p>
              <p className="text-gray-600 mb-4">
                We envision doubling our infrastructure, faculty, and student
                seats to continue our growth. Additionally, we’ve established a
                Paramedics and Generic Nursing Institute to supply trained
                human resources to our affiliated IRM-Hospital in Islamabad. Our
                Bachelor’s programs offer specialization across various fields.
              </p>
              <p className="text-gray-600">
                Thank you for your support and confidence in our mission. Our
                team is dedicated to maintaining the highest standards of
                education and healthcare excellence.
              </p>
              <p className="mt-6 text-gray-800 font-medium">
                Khalid Ilyas Siddiqui <br />
                Director, IHCMD & IHCMNS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </section>
  )
}

export default page

import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="w-[100vw] bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-900 underline underline-offset-[6px] mb-6">
            About IHCMD
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how the Institute of Health Care Management and Development (IHCMD) is transforming healthcare education and research in Pakistan.
          </p>
        </div>

        <div className="mt-10 bg-white p-8 rounded-lg shadow-md">
          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative h-[24vh] md:h-[25vw]">
              <Image
                src="/irmHospital.jpg"
                alt="Institute of Health Care Management and Development"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>



            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 leading-relaxed mb-4">
                The Institute of Health Care Management and Development (IHCMD) is a leading private-sector postgraduate training institution focused on Health Management, Public Health, and Health Research, located on the 2nd and 3rd floors.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Through innovative operational research and evidence-based models, we aim to elevate healthcare services across KP. Our mission is to create sustainable solutions for healthcare challenges while fostering professional development in the field.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With a strong emphasis on Continued Professional Development (CPD), IHCMD empowers students and professionals through subsidized training programs, ensuring accessibility to all aspiring healthcare leaders.
              </p>

              {/* CTA Button */}
              <div className="mt-6">
                <Link href="/about">
                  <p className="inline-block px-8 py-3 text-white bg-blue-700 rounded-lg shadow-lg font-medium hover:bg-gradient-to-tr from-blue-800 to-blue-950 transition">
                    Learn More About Us
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Our Vision
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To become a premier institution in healthcare education and
                research, setting benchmarks for academic excellence and
                innovative solutions in the health sector.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Our Mission
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, high-quality education and training in
                healthcare management, research, and public health to shape the
                next generation of healthcare leaders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

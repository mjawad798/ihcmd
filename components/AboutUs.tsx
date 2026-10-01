import Link from "next/link";
import { getActiveAboutSections } from "@/lib/queries";

export default async function AboutUs() {
  const sections = await getActiveAboutSections();
  const mission = sections.find((s) => s.type === "content" && s.title === "Our Mission");
  const picture = mission?.picture || "/irmHospital.jpg";

  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Column */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={picture}
                alt="Institute of Health Care Management and Development"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-900/10 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
            {/* Decorative elements to make the design pop */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-navy-900 -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold-500 -z-10" />
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="block text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">
                About IHCMD
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight mb-6">
                Transforming Healthcare Education in Pakistan
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  The Institute of Health Care Management and Development (IHCMD) is a leading private-sector postgraduate training institution focused on Health Management, Public Health, and Health Research.
                </p>
                <p>
                  Through innovative operational research and evidence-based models, we aim to elevate healthcare services. Our mission is to create sustainable solutions for healthcare challenges while fostering professional development in the field.
                </p>
                <p>
                  With a strong emphasis on Continued Professional Development (CPD), IHCMD empowers students and professionals through subsidized training programs, ensuring accessibility to all aspiring healthcare leaders.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <button className="px-10 py-4 bg-navy-900 hover:bg-navy-800 text-white font-semibold border border-gold-500/40 shadow-[0_10px_20px_rgba(11,27,61,0.25)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

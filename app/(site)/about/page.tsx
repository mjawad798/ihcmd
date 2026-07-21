import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { getActiveAboutSections } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IHCMD's mission, history, and leadership. Established in 2019 with the support of Health Services Academy, IHCMD operates campuses in Islamabad and Peshawar offering nursing, allied health, and postgraduate programs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | IHCMD",
    description:
      "Learn about IHCMD's mission, history, and leadership across its Islamabad and Peshawar campuses.",
    url: "/about",
    type: "website",
  },
};

export default async function AboutPage() {
  const sections = await getActiveAboutSections();

  const hero = sections.find((s) => s.type === "hero");
  const contentSections = sections.filter((s) => s.type === "content");
  const stats = sections.filter((s) => s.type === "stat");
  const leadership = sections.filter((s) => s.type === "leadership");

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-900 font-medium">About Us</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-navy-900 py-16">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">About IHCMD</h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            {hero?.title ?? "Institute of Health Care Management and Development"}
          </h1>
          {hero?.subtitle && <p className="text-white/70 mt-4 text-lg">{hero.subtitle}</p>}
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Content Sections */}
      {contentSections.map((section, index) => (
        <section key={section.id} className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid ${section.picture ? "lg:grid-cols-2 gap-16" : ""} items-center`}>
              <div className={`space-y-4 ${section.picture && index % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="block text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">
                  {section.title}
                </span>
                {section.description && (
                  <div
                    className="rich-content text-lg text-gray-600 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}
              </div>

              {section.picture && (
                <div className={`relative group ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative h-[350px] lg:h-[450px] w-full overflow-hidden shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.picture}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy-900/10 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-navy-900 -z-10" />
                  <div className="absolute -top-8 -left-8 w-28 h-28 bg-gold-500 -z-10" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Stats */}
      {stats.length > 0 && (
        <section className="relative py-16 bg-navy-950 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-20 w-72 h-72 bg-navy-500 rounded-full mix-blend-screen filter blur-[80px]" />
            <div className="absolute top-0 -right-20 w-72 h-72 bg-gold-500 rounded-full mix-blend-screen filter blur-[80px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.title}</h3>
                  <p className="text-gold-100/80 text-sm font-medium tracking-wide">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Messages */}
      {leadership.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">Leadership</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-navy-900">A Message From Our Leadership</h3>
              <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="space-y-12">
              {leadership.map((person, index) => {
                const reversed = index % 2 === 1;
                return (
                  <div
                    key={person.id}
                    className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden`}
                  >
                    <div className="w-full lg:w-2/5 flex justify-center items-center relative bg-navy-950 p-12 lg:p-16">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[320px] md:h-[320px] bg-navy-800/50 rounded-full -z-10" />
                      <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-gold-500/80 shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-navy-900">
                        {person.picture && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.picture}
                            alt={person.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-3/5 relative z-10 p-10 md:p-14 lg:p-20">
                      <Quote
                        className={`absolute top-10 ${reversed ? "right-6 md:right-10" : "left-6 md:left-10"} w-20 h-20 text-gold-100 -z-10 rotate-180`}
                      />
                      {person.description && (
                        <div
                          className="rich-content space-y-6 text-gray-700 text-lg font-light leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: person.description }}
                        />
                      )}
                      <div className="mt-10 border-t border-gold-100 pt-6">
                        <h4 className="text-2xl font-bold text-navy-900">{person.title}</h4>
                        {person.subtitle && (
                          <p className="text-gold-600 font-medium tracking-wider uppercase text-sm mt-1">
                            {person.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

import React from "react";
import { Mail, Phone, Microscope, Key, Users, Rocket, BookOpen, Landmark, Download, Calendar } from "lucide-react";
import Link from "next/link"

const OricPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section with improved gradient and layout */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text">
            Office of Research, Innovation, and Commercialization
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Empowering Research and Innovation for a Brighter Tomorrow
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/submissions" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact Us
            </Link >
            <Link href="/submissions" className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors duration-200 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Schedule Meeting
            </Link >
          </div>
        </div>
      </header>

      {/* Mission and Vision Section with cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To foster a research culture that drives innovation, solves
                real-world problems, and contributes to society's progress through
                cutting-edge research and development.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a leading hub for cutting-edge research and
                commercialization, creating a sustainable future through innovation
                and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section with improved cards */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Values</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Integrity",
                icon: <Key className="w-6 h-6" />,
                description: "Upholding the highest ethical standards in all our research and innovation endeavors.",
                stats: "100+ Ethics Approvals"
              },
              {
                title: "Collaboration",
                icon: <Users className="w-6 h-6" />,
                description: "Promoting teamwork and partnerships to achieve groundbreaking results.",
                stats: "50+ Partner Institutions"
              },
              {
                title: "Excellence",
                icon: <Landmark className="w-6 h-6" />,
                description: "Striving for superior quality in research, innovation, and commercialization.",
                stats: "200+ Research Papers"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 mb-4">{value.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-blue-600 font-semibold">{value.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with hover effects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Research Funding Opportunities",
                description: "Access to grants, scholarships, and research funding programs",
                action: "Download Guidelines",
                icon: <Download />
              },
              {
                title: "Intellectual Property Management",
                description: "Patent filing, copyright protection, and IP portfolio management",
                action: "Schedule Consultation",
                icon: <Calendar />
              },
              {
                title: "Innovation Support",
                description: "Research facilities, equipment access, and technical expertise",
                action: "View Resources",
                icon: <Microscope />
              },
              {
                title: "Commercialization Assistance",
                description: "Market analysis, business planning, and startup support",
                action: "Explore Programs",
                icon: <Rocket />
              },
              {
                title: "Industry Collaboration",
                description: "Partnership opportunities, joint ventures, and technology transfer",
                action: "Partner Directory",
                icon: <Users />
              },
              {
                title: "Capacity Building Workshops",
                description: "Training sessions, seminars, and professional development",
                action: "View Schedule",
                icon: <BookOpen />
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-200">
                  <div className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-200">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 font-semibold inline-flex items-center gap-2">
                  {service.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with improved cards */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: "Dr. John Doe", 
                position: "Director of Research",
                expertise: "Research Strategy & Development",
                contact: "research.director@oric.edu"
              },
              { 
                name: "Dr. Jane Smith", 
                position: "Head of Innovation",
                expertise: "Technology Transfer & Innovation",
                contact: "innovation.head@oric.edu"
              },
              { 
                name: "Mr. Alan Turing", 
                position: "Commercialization Lead",
                expertise: "Business Development & Startups",
                contact: "commercial.lead@oric.edu"
              }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-teal-100 rounded-full mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.expertise}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">{member.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OricPage
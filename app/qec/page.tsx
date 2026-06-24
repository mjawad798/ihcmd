import React from "react";
import { BarChart, CheckCircle, Award, FileText, Calendar, Users, BookOpen, ClipboardCheck, Target, Book, ChartBar, Star, CircleDot, Database, GraduationCap } from "lucide-react";

const QecPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Quality Enhancement Cell
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Ensuring Academic Excellence Through Continuous Quality Improvement and Innovation
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold">HEC Recognized</div>
              <div className="text-sm">W Category</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold">ISO 9001:2015</div>
              <div className="text-sm">Certified Institution</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold">Quality Rating</div>
              <div className="text-sm">5-Star Excellence</div>
            </div>
          </div>
        </div>
      </header>

      {/* About QEC */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About QEC</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
              The Quality Enhancement Cell (QEC) serves as the cornerstone of academic excellence, ensuring the highest standards of education through systematic quality assurance processes and continuous improvement initiatives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Vision",
                icon: <Target className="w-6 h-6" />,
                description: "To be recognized as a leading institution in quality assurance and academic excellence, setting benchmarks for higher education institutions nationwide."
              },
              {
                title: "Mission",
                icon: <Star className="w-6 h-6" />,
                description: "To establish, maintain, and enhance quality standards in academic programs, research activities, and administrative processes through systematic evaluation and continuous improvement."
              },
              {
                title: "Objectives",
                icon: <CircleDot className="w-6 h-6" />,
                description: "To implement quality assurance mechanisms, foster a culture of excellence, and ensure compliance with national and international quality standards in higher education."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Core Functions</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Program Assessment",
                icon: <ClipboardCheck className="w-6 h-6" />,
                points: [
                  "Self-Assessment Reports (SAR)",
                  "Program Evaluation",
                  "Curriculum Review",
                  "Learning Outcomes Assessment",
                  "External Quality Audits"
                ]
              },
              {
                title: "Quality Assurance",
                icon: <CheckCircle className="w-6 h-6" />,
                points: [
                  "Quality Policy Implementation",
                  "Standard Operating Procedures",
                  "Quality Management System",
                  "Documentation Control",
                  "Process Improvement"
                ]
              },
              {
                title: "Academic Standards",
                icon: <BookOpen className="w-6 h-6" />,
                points: [
                  "Course Portfolio Management",
                  "Faculty Performance Evaluation",
                  "Student Feedback Analysis",
                  "Academic Audit",
                  "Best Practices Implementation"
                ]
              },
              {
                title: "Research Quality",
                icon: <Database className="w-6 h-6" />,
                points: [
                  "Research Output Monitoring",
                  "Publication Quality",
                  "Research Ethics Compliance",
                  "Impact Factor Analysis",
                  "Research Collaboration"
                ]
              },
              {
                title: "Capacity Building",
                icon: <Users className="w-6 h-6" />,
                points: [
                  "Faculty Development Programs",
                  "Quality Assurance Training",
                  "Professional Development",
                  "Workshop Organization",
                  "Skill Enhancement"
                ]
              },
              {
                title: "Performance Monitoring",
                icon: <ChartBar className="w-6 h-6" />,
                points: [
                  "KPI Development & Tracking",
                  "Performance Reports",
                  "Improvement Plans",
                  "Benchmark Analysis",
                  "Strategic Planning"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Enhancement Initiatives */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Quality Enhancement Initiatives</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Program Quality Improvement",
                description: "Comprehensive program review and enhancement system",
                activities: [
                  "Annual Program Reviews",
                  "Curriculum Enhancement",
                  "Industry Advisory Board",
                  "Graduate Employability Analysis",
                  "International Benchmarking"
                ]
              },
              {
                title: "Faculty Development",
                description: "Continuous professional development programs",
                activities: [
                  "Teaching Excellence Workshops",
                  "Research Methodology Training",
                  "Pedagogical Skills Enhancement",
                  "Technology Integration",
                  "Quality Assurance Training"
                ]
              },
              {
                title: "Student Support Enhancement",
                description: "Comprehensive student success initiatives",
                activities: [
                  "Academic Advising",
                  "Learning Resource Development",
                  "Student Satisfaction Surveys",
                  "Career Development Programs",
                  "Support Services Assessment"
                ]
              },
              {
                title: "Research Excellence",
                description: "Research quality and impact improvement",
                activities: [
                  "Research Quality Metrics",
                  "Publication Support",
                  "Research Ethics Training",
                  "Collaborative Research",
                  "Research Impact Assessment"
                ]
              }
            ].map((initiative, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{initiative.title}</h3>
                <p className="text-gray-600 mb-6">{initiative.description}</p>
                <ul className="space-y-3">
                  {initiative.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Documentation */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Resources & Documentation</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Quality Manual",
                icon: <Book className="w-6 h-6" />,
                items: [
                  "Quality Policy",
                  "Standard Operating Procedures",
                  "Process Documentation",
                  "Forms and Templates"
                ]
              },
              {
                title: "Assessment Tools",
                icon: <BarChart className="w-6 h-6" />,
                items: [
                  "Course Evaluation Forms",
                  "Faculty Assessment Tools",
                  "Program Review Templates",
                  "Survey Instruments"
                ]
              },
              {
                title: "Guidelines",
                icon: <FileText className="w-6 h-6" />,
                items: [
                  "Self-Assessment Manual",
                  "Quality Assurance Handbook",
                  "Academic Program Review Guide",
                  "Best Practices Documentation"
                ]
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{resource.title}</h3>
                <ul className="space-y-2">
                  {resource.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default QecPage;
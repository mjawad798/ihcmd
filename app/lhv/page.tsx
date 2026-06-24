import React from "react";

const ProgramsPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Healthcare Programs
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-blue-50">
            Discover our comprehensive Lady Health Visitor (LHV) and Certified Nursing Assistant (CNA) programs
          </p>
        </div>
      </header>

      {/* Program Details Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Our Programs</h2>
            <p className="text-lg text-blue-700 mt-3 max-w-2xl mx-auto">
              Empowering healthcare professionals with practical skills and comprehensive training
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* LHV Program */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Lady Health Visitor (LHV)</h3>
                <p className="text-slate-600 mb-6">
                  A comprehensive program focused on maternal and child healthcare, preparing you for essential community health services.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Maternal and child health expertise</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Community health education</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Practical clinical training</span>
                  </li>
                </ul>
                <button className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                  Program Details
                </button>
              </div>
            </div>

            {/* CNA Program */}
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Certified Nursing Assistant (CNA)</h3>
                <p className="text-slate-600 mb-6">
                  Learn essential nursing skills and patient care techniques to become a certified nursing assistant.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Basic nursing procedures</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Patient care and support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-slate-700">Clinical practice experience</span>
                  </li>
                </ul>
                <button className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                  Program Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Program Features</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Expert Faculty</h3>
              <p className="text-slate-600">Learn from experienced healthcare professionals and certified instructors</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Modern Facilities</h3>
              <p className="text-slate-600">Train in well-equipped labs with the latest medical equipment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Career Support</h3>
              <p className="text-slate-600">Get placement assistance and career guidance after completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Eligibility Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">LHV Program</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">Female candidates aged 18-30 years</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">High school diploma or equivalent</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">Basic healthcare knowledge preferred</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">CNA Program</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">Minimum age 18 years</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">High school diploma required</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-slate-700">Clear background check required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
import React from 'react';

const TermsOfService = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-8">
          Welcome to the Institute of Health Care Management and Development (IHCMD). By accessing or using our website, services, or enrolling in our programs, you agree to abide by these Terms of Service. Please read them carefully.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-8">
              By accessing our website or services, you acknowledge that you have read, understood, and agreed to these terms. If you do not agree, please discontinue using our services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              2. Use of Services
            </h2>
            <p className="text-gray-700 leading-8">
              Our website and services are intended for educational and informational purposes only. By using our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Provide accurate and truthful information during registration or enrollment.</li>
              <li>Use our services responsibly and in compliance with applicable laws.</li>
              <li>Not engage in activities that harm or disrupt our services or systems.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-8">
              All content, materials, and resources provided on our website are the property of IHCMD or its licensors. This includes, but is not limited to, text, images, videos, and logos. You may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Copy, reproduce, or distribute any content without prior written consent.</li>
              <li>Use our logo or branding for any unauthorized purpose.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              4. Enrollment and Payment
            </h2>
            <p className="text-gray-700 leading-8">
              Enrollment in our programs is subject to meeting the eligibility criteria and timely payment of fees. We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Cancel your enrollment for non-compliance with our policies.</li>
              <li>Modify course fees and schedules with prior notice.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-8">
              IHCMD is not liable for any indirect, incidental, or consequential damages arising from the use of our services. While we strive for accuracy, we do not guarantee the completeness or reliability of the information provided.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              6. User Conduct
            </h2>
            <p className="text-gray-700 leading-8">
              You agree to use our website and services ethically. Prohibited actions include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Uploading harmful or malicious content.</li>
              <li>Attempting to breach the security of our systems.</li>
              <li>Engaging in fraudulent or deceptive practices.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              7. Termination of Access
            </h2>
            <p className="text-gray-700 leading-8">
              We reserve the right to suspend or terminate your access to our services if you violate these terms or engage in misconduct.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-8">
              We may update these Terms of Service periodically to reflect changes in our policies or services. Updates will be posted on this page, and continued use of our services constitutes acceptance of the revised terms.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 leading-8">
              If you have any questions about these terms, please contact us at:
            </p>
            <address className="text-gray-700 mt-4">
              Institute of Health Care Management and Development (IHCMD) <br />
              Email: <a href="mailto:admissions.ihcmdpesh@gmail.com" className="text-blue-800 underline">admissions.ihcmdpesh@gmail.com</a> <br />
              Phone: 03009015804
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;


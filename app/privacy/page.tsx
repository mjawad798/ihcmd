import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-8">
          At the Institute of Health Care Management and Development (IHCMD), we are committed to protecting the privacy and confidentiality of our students, staff, and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your information in accordance with applicable laws.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-8">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Personal Information: Name, email address, phone number, and mailing address.</li>
              <li>Academic Information: Details related to your enrollment, academic performance, and professional certifications.</li>
              <li>Website Usage Data: IP address, browser type, and interactions with our website.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-8">
              Your information is used for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>To process your applications and manage your academic records.</li>
              <li>To communicate updates about courses, events, or institutional developments.</li>
              <li>To improve our services, website functionality, and user experience.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              3. Data Protection and Security
            </h2>
            <p className="text-gray-700 leading-8">
              We implement robust security measures to protect your information against unauthorized access, alteration, or disclosure. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Encryption of sensitive data.</li>
              <li>Regular security audits of our systems.</li>
              <li>Restricted access to personal information on a need-to-know basis.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-700 leading-8">
              We do not sell or rent your personal information to third parties. However, we may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Government or regulatory authorities when required by law.</li>
              <li>Service providers assisting us in operational tasks, such as IT support or data storage.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-8">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Access your personal data and request corrections if needed.</li>
              <li>Request deletion of your data where applicable.</li>
              <li>Opt-out of communications or specific uses of your information.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at <a href="mailto:info@ihcmd.edu.pk" className="text-blue-800 underline">info@ihcmd.edu.pk</a>.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              6. Cookies Policy
            </h2>
            <p className="text-gray-700 leading-8">
              Our website uses cookies to enhance user experience and analyze website traffic. By using our site, you agree to the use of cookies as outlined in our Cookies Policy. You can disable cookies in your browser settings if you prefer.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-8">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review it periodically.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-700 leading-8">
              If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:
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

export default PrivacyPolicy;


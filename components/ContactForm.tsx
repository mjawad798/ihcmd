"use client";
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="sm:text-4xl text-2xl font-bold text-center text-blue-900 dark:text-gray-100 mb-8">
          Contact Institute of Health Care Management And Development
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value="fbef4513-9d82-417d-b774-884af7b2edff" />

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="course">Course of Interest</label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Tell us more about your interests or any questions you have."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            {/* Contact Information */}
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="mailto:admissions.ihcmdpesh@gmail.com">Peshawar: admissions.ihcmdpesh@gmail.com</a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="mailto:hr.ihcmd@gmail.com">Islamabad: hr.ihcmd@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="tel:+92332-5257379">Peshawar: 0332-5257379</a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="tel:+92300-9015804">Peshawar: 0300-9015804</a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="tel:+9331-3400091">Islamabad: 0331-3400091</a>
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex items-center">
              <MapPin className="w-[50px] text-blue-600 mr-4 md:-ml-3" />
              <div className='md:-ml-3'>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200">Address</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Near Zia Medical Complex, Khyber Street, Gulabad, Peshawar
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  IRM-HOSPITAL, 397, Kortana, G.T Rd, Opposite Gate 4, DHA Phase II, Islamabad
                </p>
              </div>
            </div>

            {/* Google Map */}
            <iframe
              className="w-full h-[350px] rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.5230935547943!2d73.162523!3d33.5157711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dff374f326913b%3A0x78cee8166e11606f!2sInstitute%20of%20Regenerative%20Medicine%20(IRM%20Hospital)!5e0!3m2!1sen!2s!4v1691234567890!5m2!1sen!2s"
              loading="lazy"
              title="Location"
            />

          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 space-y-6 space-x-5 text-center">
          <a
            href="/submissions"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            Submit your Form
          </a>
          <a
            href="/news"
            className="inline-block px-6 py-3 bg-gray-100 text-blue-600 rounded-md shadow-md hover:bg-gray-200"
          >
            News / Updates
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

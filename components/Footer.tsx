import React from 'react';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900/5 to-blue-800/5 dark:from-purple-900/10 dark:to-pink-800/10 backdrop-blur-sm mt-20 border-t border-purple-100 dark:border-purple-900/20">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                IHCMD
              </span>
            </Link>
            <p className="mt-4 text-blue-950 leading-8 dark:text-blue-400 max-w-md">
              Empower your future with a world-class healthcare education that combines practical skills with in-depth knowledge.
              At IHCMD, we are committed to shaping competent healthcare professionals equipped to meet the challenges of modern medical practices.
              Your journey to excellence, innovation, and compassionate care begins here. Join us to make a difference in the healthcare industry
              and impact lives for the better.
            </p>

            <div className="flex mt-6 space-x-4">
              <a
                href="https://www.facebook.com/IHCMDIslamabad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-950 hover:text-pink-800 dark:text-blue-400 dark:hover:text-pink-600 transition-colors duration-300"
              >
                <BsFacebook className="w-[22px] h-[22px]" />
              </a>
              <a
                href="https://www.instagram.com/rejuvaaestheticsofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-950 hover:text-pink-800 dark:text-blue-400 dark:hover:text-pink-600 transition-colors duration-300"
              >
                <BsInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@rejuva_aesthetics_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-950 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300"
              >
                <BsTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:flex lg:justify-center">
            <div>
              <h2 className="mb-6 text-sm sm:text-[17px] font-semibold uppercase bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Quick Links
              </h2>
              <ul className="text-blue-950 dark:text-blue-400 space-y-5">
                <li>
                  <Link href="/" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/submissions" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    Submission Form
                  </Link>
                </li>
                <li>
                  <Link href="/download" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    Download Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    News / Update
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-sm sm:text-[17px] font-semibold uppercase bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Contact Info
            </h2>

            {/* Peshawar Credentials */}
            <div className="mb-6">
              <h3 className="text-sm sm:text-[16px] mb-2 font-semibold text-blue-950 dark:text-blue-400">Peshawar</h3>
              <ul className="text-blue-950 dark:text-blue-400 space-y-4">
                <li className="flex items-center gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+923325257379">0332-5257379</a>
                </li>
                <li className="flex items-center gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:admissions.ihcmdpesh@gmail.com">admissions.ihcmdpesh@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=IRM-HOSPITAL,+397,+Kortana,+G.T+Rd,+Opposite+Gate+4,+DHA+Phase+II,+IslamabadR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4 mt-1.5" />
                    <span className="flex-1">
                      Near KP PHSA Budhni Road, Duranpur, PESHAWAR
                    </span>
                  </a>
                </li>

              </ul>
            </div>

            {/* Islamabad Credentials */}
            <div>
              <h3 className="text-sm sm:text-[16px] mb-3 font-semibold text-blue-950 dark:text-blue-400">Islamabad</h3>
              <ul className="text-blue-950 dark:text-blue-400 space-y-4">
                <li className="flex items-center gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+923313400091">+92 331-3400091</a>
                </li>
                <li className="flex items-center gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hr.ihcmd@gmail.com">hr.ihcmd@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=IRM-HOSPITAL,+397,+Kortana,+G.T+Rd,+Opposite+Gate+4,+DHA+Phase+II,+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-pink-800 dark:hover:text-pink-600 transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4 mt-1.5" />
                    <span className="flex-1">
                      IRM-HOSPITAL, 397, Kortana, G.T Rd, Opposite Gate 4, DHA Phase II, Islamabad
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-6 border-purple-100 dark:border-purple-900/20" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-blue-950 dark:text-blue-400">
            © {new Date().getFullYear()} IHCMD™. All Rights Reserved.
          </span>

          <div className="my-4 sm:my2 sm:ml-4">
            <span className="text-sm text-blue-950">Developed and maintained by Adnan Afridi. </span>
            <span className="inline-block text-sm text-blue-950 hover:text-pink-800 dark:text-gray-400 dark:hover:text-pink-600 transition-colors duration-300">
              Contact: <a href="mailto:adnanafridi2007@gmail.com">adnanafridi2007@gmail.com</a>
            </span>
          </div>

          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link href="/privacy" className="text-sm text-blue-950 hover:text-pink-800 dark:text-blue-400 dark:hover:text-pink-600 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-blue-950 hover:text-pink-800 dark:text-blue-400 dark:hover:text-pink-600 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

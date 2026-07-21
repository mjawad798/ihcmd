import Link from 'next/link';
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getFooterSettings } from '@/lib/queries';

const Footer = async () => {
  const settings = await getFooterSettings();

  return (
    <footer className="bg-navy-900 border-t border-gold-500/20 mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold bg-gradient-to-r from-gold-300 to-white bg-clip-text text-transparent">
                IHCMD
              </span>
            </Link>
            <p className="mt-4 text-white leading-8 text-slate-300 max-w-md">
              {settings.description}
            </p>

            <div className="flex mt-6 space-x-4">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gold-400 text-slate-300 dark:hover:text-gold-300 transition-colors duration-300"
                >
                  <BsFacebook className="w-[22px] h-[22px]" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gold-400 text-slate-300 dark:hover:text-gold-300 transition-colors duration-300"
                >
                  <BsInstagram className="w-5 h-5" />
                </a>
              )}
              {settings.tiktokUrl && (
                <a
                  href={settings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300"
                >
                  <BsTiktok className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:flex lg:justify-center">
            <div>
              <h2 className="mb-6 text-sm sm:text-[17px] font-semibold uppercase bg-gradient-to-r from-gold-300 to-white bg-clip-text text-transparent">
                Quick Links
              </h2>
              <ul className="text-white text-slate-300 space-y-5">
                <li>
                  <Link href="/" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/submissions" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    Submission Form
                  </Link>
                </li>
                <li>
                  <Link href="/download" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    Download Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    News / Update
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-sm sm:text-[17px] font-semibold uppercase bg-gradient-to-r from-gold-300 to-white bg-clip-text text-transparent">
              Contact Info
            </h2>

            <div>
              <h3 className="text-sm sm:text-[16px] mb-3 font-semibold text-white text-slate-300">Islamabad</h3>
              <ul className="text-white text-slate-300 space-y-4">
                <li className="flex items-center gap-2 hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a>
                </li>
                <li className="flex items-center gap-2 hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
                <li className="flex items-start gap-2">
                  {settings.mapUrl ? (
                    <a
                      href={settings.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 hover:text-gold-400 dark:hover:text-gold-300 transition-colors duration-300"
                    >
                      <MapPin className="w-4 h-4 mt-1.5" />
                      <span className="flex-1">{settings.address}</span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1.5" />
                      <span className="flex-1">{settings.address}</span>
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-6 border-gold-500/20" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white text-slate-300">
            © {new Date().getFullYear()} {settings.copyrightText}
          </span>

          {settings.developerName && (
            <div className="my-4 sm:my2 sm:ml-4">
              <span className="text-sm text-white">Developed and maintained by {settings.developerName}. </span>
              {settings.developerEmail && (
                <span className="inline-block text-sm text-white hover:text-gold-400 dark:text-gray-400 dark:hover:text-gold-300 transition-colors duration-300">
                  Contact: <a href={`mailto:${settings.developerEmail}`}>{settings.developerEmail}</a>
                </span>
              )}
            </div>
          )}

          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link href="/privacy" className="text-sm text-white hover:text-gold-400 text-slate-300 dark:hover:text-gold-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white hover:text-gold-400 text-slate-300 dark:hover:text-gold-300 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

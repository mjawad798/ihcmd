"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { FaBars, FaChevronDown } from 'react-icons/fa';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from 'next/image';

const Navbar = () => {
    const [isProgramsSheetDropdownOpen, setProgramsSheetDropdownOpen] = useState(false);
    const [isHospitalDropdownOpen, setHospitalDropdownOpen] = useState(false);
    const [registrationDropdown, setRegistrationDropdown] = useState(false);
    const [campusDropdown, setCampusDropdown] = useState(false);
    const [academicsDropdown, setAcademicsDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="flex flex-col max-w-[100vw] z-50">
            {/* Top Bar - Logos & Socials */}
            <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm relative z-50 lg:px-8 xl:px-16">
                {/* Left Logo */}
                <div className="flex-shrink-0 z-10">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="IHCMD Logo"
                            width={180}
                            height={60}
                            loader={({ src, width }) => `${src}?w=${width}`}
                            className="w-[120px] sm:w-[150px] md:w-[180px] object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Central Campus Name */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center text-center">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#0b1b3d] tracking-widest uppercase">
                        Islamabad Campus
                    </h2>
                </div>

                {/* Right Area: Socials & Mobile Menu */}
                <div className="flex items-center gap-4 z-10">
                    {/* Right Social Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <SocialIcon href="https://www.facebook.com/share/1DZpqXFiMn/" icon={<BsFacebook size={22} />} hoverColor="hover:text-blue-600 hover:bg-blue-50" />
                        <SocialIcon href="https://www.instagram.com/ihcmdpeshawar?igsh=MThtbHE3MjF0d255cg==" icon={<BsInstagram size={22} />} hoverColor="hover:text-pink-600 hover:bg-pink-50" />
                        <SocialIcon href="https://wa.me/923009015804" icon={<BsWhatsapp size={22} />} hoverColor="hover:text-green-600 hover:bg-green-50" />
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex lg:hidden items-center">
                        <Sheet>
                        <SheetTrigger className="p-2 hover:bg-slate-100 transition-colors">
                            <FaBars className="text-2xl text-slate-700" />
                        </SheetTrigger>
                        <SheetContent side="right" className="max-h-[100vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-l-0 w-80">
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="text-2xl font-bold text-slate-800">IHCMD</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-1">
                                <MobileNavLink href="/">HOME</MobileNavLink>
                                <MobileNavLink href="/about">ABOUT US</MobileNavLink>
                                <MobileNavLink href="/submissions">ONLINE SUBMISSIONS</MobileNavLink>

                                <MobileDropdown
                                    title="AFFILIATION / REGISTRATION"
                                    isOpen={registrationDropdown}
                                    setIsOpen={setRegistrationDropdown}
                                >
                                    <MobileSubLink>Health Services Academy Islamabad</MobileSubLink>
                                    <MobileSubLink>Pakistan Nursing & Midwifery Council</MobileSubLink>
                                    <MobileSubLink>Allied Health Professional Council</MobileSubLink>
                                    <MobileSubLink>Shaheed Zulfiqar Ali Bhutto Med. Univ.</MobileSubLink>
                                    <MobileSubLink>Federal Board of Secondary & Intermediate Edu.</MobileSubLink>
                                    <MobileSubLink>Private Edu. Institution Regulatory Authority</MobileSubLink>
                                    <MobileSubLink>Higher Education Regulatory Authority</MobileSubLink>
                                </MobileDropdown>

                                <MobileDropdown
                                    title="HOSPITAL ATTACHMENT"
                                    isOpen={isHospitalDropdownOpen}
                                    setIsOpen={setHospitalDropdownOpen}
                                >
                                    <MobileSubLink>IRM Hospital Islamabad</MobileSubLink>
                                    <MobileSubLink>Asia General Hospital Islamabad</MobileSubLink>
                                    <MobileSubLink>Fauji Foundation Hospital Peshawar</MobileSubLink>
                                    <MobileSubLink>Rahim Medical College Peshawar</MobileSubLink>
                                    <MobileSubLink>Akbar Medical Complex Mardan</MobileSubLink>
                                    <MobileSubLink>Mardan Medical Complex (MMC)</MobileSubLink>
                                </MobileDropdown>

                                <MobileDropdown
                                    title="PROGRAMS"
                                    isOpen={isProgramsSheetDropdownOpen}
                                    setIsOpen={setProgramsSheetDropdownOpen}
                                >
                                    <MobileSubLink href="/degree">Degree Programs</MobileSubLink>
                                    <MobileSubLink href="/diploma">Post Graduate Diploma</MobileSubLink>
                                    <MobileSubLink href="/certificate">Certificate Programs</MobileSubLink>
                                    <MobileSubLink href="/fsc">F.SC Medical Technologies</MobileSubLink>
                                    <MobileSubLink href="/lhv">LHV/CNA 2 YEARS PROGRAM</MobileSubLink>
                                </MobileDropdown>

                                <MobileDropdown
                                    title="ACADEMICS"
                                    isOpen={academicsDropdown}
                                    setIsOpen={setAcademicsDropdown}
                                >
                                    <MobileSubLink href="/download">Curriculum</MobileSubLink>
                                    <MobileSubLink href="/oric">ORIC</MobileSubLink>
                                    <MobileSubLink href="/qec">QEC</MobileSubLink>
                                </MobileDropdown>



                                <MobileNavLink href="https://ijmmr.org/index.php/ijmmr/issue/view/1">IHCMD JOURNAL</MobileNavLink>
                                <MobileNavLink href="/news">NEWS/UPDATE</MobileNavLink>
                                <MobileNavLink href="/gallery">GALLERY</MobileNavLink>
                                <MobileNavLink href="/contact">CONTACT US</MobileNavLink>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                </div>

            </div>

            {/* Desktop Navigation Bar (Sticky) */}
            <div className={`hidden lg:flex justify-center items-center w-full transition-all duration-300 z-40 sticky top-0 border-b border-[#1a2f5c] ${scrolled ? 'bg-[#0b1b3d]/95 backdrop-blur-md shadow-md py-3' : 'bg-[#0b1b3d] py-4'}`}>
                <div className="flex flex-wrap items-center justify-center gap-x-6 xl:gap-x-8 max-w-7xl mx-auto px-4">
                    <NavLink href="/">HOME</NavLink>
                    <NavLink href="/about">ABOUT</NavLink>

                    <DesktopDropdown title="AFFILIATIONS">
                        <DropdownItem>Health Services Academy Islamabad</DropdownItem>
                        <DropdownItem>Pakistan Nursing and Midwifery Council</DropdownItem>
                        <DropdownItem>Allied Health Professional Council</DropdownItem>
                        <DropdownItem>Shaheed Zulfiqar Ali Bhutto Medical Univ.</DropdownItem>
                        <DropdownItem>Federal Board of Education</DropdownItem>
                        <DropdownItem>Higher Education Regulatory Authority</DropdownItem>
                    </DesktopDropdown>

                    <DesktopDropdown title="PROGRAMS">
                        <DropdownItem href="/degree">Degree Programs</DropdownItem>
                        <DropdownItem href="/diploma">Post Graduate Diploma</DropdownItem>
                        <DropdownItem href="/certificate">Certificate Programs</DropdownItem>
                        <DropdownItem href="/fsc">F.SC Medical Technologies</DropdownItem>
                        <DropdownItem href="/lhv">LHV/CNA 2 YEARS</DropdownItem>
                    </DesktopDropdown>

                    <DesktopDropdown title="HOSPITALS">
                        <DropdownItem>IRM Hospital Islamabad</DropdownItem>
                        <DropdownItem>Asia General Hospital</DropdownItem>
                        <DropdownItem>Fauji Foundation Hospital</DropdownItem>
                        <DropdownItem>Rahim Medical College</DropdownItem>
                        <DropdownItem>Akbar Medical Complex</DropdownItem>
                        <DropdownItem>Mardan Medical Complex</DropdownItem>
                    </DesktopDropdown>

                    <DesktopDropdown title="ACADEMICS">
                        <DropdownItem href="/download">Curriculum</DropdownItem>
                        <DropdownItem href="/oric">ORIC</DropdownItem>
                        <DropdownItem href="/qec">QEC</DropdownItem>
                    </DesktopDropdown>



                    <NavLink href="https://ijmmr.org/index.php/ijmmr/issue/view/1">IHCMD JOURNAL</NavLink>
                    <NavLink href="/news">NEWS</NavLink>
                    <NavLink href="/gallery">GALLERY</NavLink>


                </div>
            </div>
        </header>
    );
};

// --- Helper Components for Clean Structure ---

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className="text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-colors py-2 relative group">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const DesktopDropdown = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="relative group">
        <button className="text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-colors py-2 flex items-center gap-1.5">
            {title}
            <FaChevronDown className="text-xs transition-transform duration-300 group-hover:-rotate-180" />
        </button>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
            <div className="bg-white shadow-xl ring-1 ring-slate-900/5 p-2 flex flex-col relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:ring-1 before:ring-slate-900/5 before:-z-10 bg-clip-padding">
                <div className="relative bg-white z-10 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const DropdownItem = ({ href, children }: { href?: string, children: React.ReactNode }) => {
    const className = "block px-4 py-2.5 text-sm text-slate-600 font-medium hover:text-blue-600 hover:bg-slate-50 transition-colors text-left w-full";
    return href ? (
        <Link href={href} className={className}>{children}</Link>
    ) : (
        <span className={className}>{children}</span>
    );
};

const SocialIcon = ({ href, icon, hoverColor }: { href: string, icon: React.ReactNode, hoverColor: string }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`p-2 text-slate-500 transition-all duration-300 ${hoverColor}`}>
        {icon}
    </Link>
);

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
        {children}
    </Link>
);

const MobileDropdown = ({ title, isOpen, setIsOpen, children }: { title: string, isOpen: boolean, setIsOpen: (val: boolean) => void, children: React.ReactNode }) => (
    <div className="flex flex-col">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors w-full text-left"
        >
            {title}
            <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? '-rotate-180 text-blue-600' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col pl-4 border-l-2 border-slate-100 ml-6 space-y-1 py-1">
                {children}
            </div>
        </div>
    </div>
);

const MobileSubLink = ({ href, children }: { href?: string, children: React.ReactNode }) => {
    const className = "block py-2 px-3 text-sm text-slate-600 font-medium hover:text-blue-600 hover:bg-slate-50 transition-colors text-left w-full";
    return href ? (
        <Link href={href} className={className}>{children}</Link>
    ) : (
        <span className={className}>{children}</span>
    );
};

export default Navbar;

"use client";
import { Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs';
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

    const [isProgramsSheetDropdownOpen, setProgramsSheetDropdownOpen] = useState(false); // State for dropdown in Sheet
    const [isHospitalDropdownOpen, setHospitalDropdownOpen] = useState(false);
    const [registrationDropdown, setRegistrationDropdown] = useState(false); // State for dropdoen registration
    const [campusDropdown, setCampusDropdown] = useState(false); // State for dropdoen registration

    return (
        <>
            {/* Main Navbar */}
            <section className="bg-gradient-to-r from-blue-200 max-w-[100vw] min-h-5 to-blue-300 pt-5 px-3 flex flex-col items-center lg:static sticky top-0 z-50">
                <div className='flex sm:justify-around justify-between w-full'>
                    <div className="z-50 mb-5 -mt-2">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-[125px] sm:w-[140px] md:max-w-[170px] lg:max-w-[190px] xl:w-[230px]"
                        />
                    </div>


                    <div className="md:flex gap-6 mt-3 hidden">
                        {/* Social Links */}
                        <Link href="https://www.facebook.com/Rejuvaaesthetic?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                            <div className="p-3 rounded-full hover:text-white bg-black/10 backdrop-blur-sm hover:bg-gradient-to-tr from-blue-600 to-blue-400 transition-all duration-300">
                                <BsFacebook className="w-[22px] h-[22px]" />
                            </div>
                        </Link>
                        <Link href="https://www.instagram.com/rejuvaaestheticsofficial/" target="_blank" rel="noopener noreferrer">
                            <div className="p-3 rounded-full hover:text-white bg-black/10 backdrop-blur-sm hover:bg-gradient-to-tr from-pink-600 to-purple-400 transition-all duration-300">
                                <BsInstagram className="w-5 h-5 " />
                            </div>
                        </Link>
                        <Link href="https://www.tiktok.com/@rejuva_aesthetics_" target="_blank" rel="noopener noreferrer">
                            <div className="p-3 rounded-full hover:text-white bg-black/10 backdrop-blur-sm hover:bg-gradient-to-tr from-pink-600 to-pink-400 transition-all duration-300">
                                <BsTiktok className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>

                    <div className="z-50 mb-5 -mt-2">
                        <Image 
                        src='logo2.png'
                        alt='logo2'
                        width={100}
                        height={100}
                        className='w-[125px] sm:w-[140px] md:max-w-[170px] lg:max-w-[190px] xl:w-[230px]'
                        />
                    </div>

                    <div className="flex lg:hidden -mt-8">
                        <Sheet>
                            <SheetTrigger>
                                <FaBars className="text-2xl text-gray-800 hover:text-gray-600 transition" />
                            </SheetTrigger>
                            <SheetContent className="max-h-[100vh] overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>IHCMD</SheetTitle>
                                    <div className="flex flex-col items-start space-y-3 py-5 bg-indigo-50 rounded-lg border border-indigo-200 shadow-lg">
                                        <Link href="/" className="text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300">HOME</Link>
                                        <Link href="/about" className="text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300">ABOUT US</Link>
                                        <Link href="/submissions" className="text-gray-700 text-left hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300">ONLINE SUBMISSIONS FORM</Link>
                                        <button
                                            className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300 text-left"
                                            onClick={() => setRegistrationDropdown(!registrationDropdown)}
                                        >
                                            AFFILIATION / REGISTRATION
                                            <FaChevronDown className={`ml-2 transition-transform ${registrationDropdown ? 'rotate-180' : ''}`} />
                                        </button>
                                        {registrationDropdown && (
                                            <div className="flex flex-col items-start pl-3 w-full space-y-2">
                                                <p className="text-gray-700 text-left">Health Services Academy Islamabad </p>
                                                <p className="text-gray-700 text-left">Pakistan nursing and  midwifery council Islamabad (PNMC)</p>
                                                <p className="text-gray-700 text-left">Allied health professional council Islamabad (AHPC)</p>
                                                <p className="text-gray-700 text-left">Shaheed Zulfigar Ali Bhutto medical university Islamabad</p>
                                                <p className="text-gray-700 text-left">Federal board of secondary and intermediate education</p>
                                                <p className="text-gray-700 text-left">Federal board of secondary and intermediate education</p>
                                                <p className="text-gray-700 text-left">Private educational institution regulatory authority Islamabad</p>
                                            </div>
                                        )}

                                        {/* Hospital Attachment Dropdown */}
                                        <button
                                            className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300 text-left"
                                            onClick={() => setHospitalDropdownOpen(!isHospitalDropdownOpen)}
                                        >
                                            HOSPITAL ATTACHMENT
                                            <FaChevronDown className={`ml-2 transition-transform ${isHospitalDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isHospitalDropdownOpen && (
                                            <div className="flex flex-col items-start pl-3 w-full space-y-2">
                                                <p className="text-gray-700 text-left">IRM Hospital Islamabad</p>
                                                <p className="text-gray-700 text-left">Asia Government Hospital Islamabad</p>
                                                <p className="text-gray-700 text-left">Fauji Foundation Hospital Peshawar</p>
                                                <p className="text-gray-700 text-left">Rahim Medical College and General Hospital Peshawar</p>
                                            </div>
                                        )}


                                        {/* Programs Dropdown */}
                                        <button
                                            className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300"
                                            onClick={() => setProgramsSheetDropdownOpen(!isProgramsSheetDropdownOpen)}
                                        >
                                            PROGRAMS
                                            <FaChevronDown className={`ml-2 transition-transform ${isProgramsSheetDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isProgramsSheetDropdownOpen && (
                                            <div className="flex flex-col pl-6 space-y-2">
                                                <Link href="/degree" className="block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                                                    Degree Programs
                                                </Link>
                                                <Link href="/diploma" className="block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                                                    Post Graduate Diploma Programs
                                                </Link>
                                                <Link href="/certificate" className="block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                                                    Certificate Programs
                                                </Link>
                                                <Link href="/fsc" className="block text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                                                    F.SC Medical Technologies
                                                </Link>
                                            </div>
                                        )}

                                        <Link href="/news" className="text-gray-700 hover:text-gray-900 hover:bg-blue-100 pl-3 py-2 rounded transition duration-300">NEWS/UPDATE</Link>
                                        <Link href="/download" className="text-gray-700 hover:text-gray-900 hover:bg-blue-100 pl-3 py-2 rounded transition duration-300">DOWNLOAD CURRICULUMS</Link>
                                        <button
                                            className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300 text-left"
                                            onClick={() => setCampusDropdown(!campusDropdown)}
                                        >
                                            CAMPUS
                                            <FaChevronDown className={`ml-2 transition-transform ${campusDropdown ? 'rotate-180' : ''}`} />
                                        </button>
                                        {campusDropdown && (
                                            <div className="flex flex-col items-start pl-3 w-full space-y-2">
                                                <p className="text-gray-700 text-left">Peshawar</p>
                                                <p className="text-gray-700 text-left">Islamabad</p>
                                            </div>
                                        )}
                                        <Link href="/contact" className="text-gray-700 hover:text-gray-900 hover:bg-blue-100 px-4 py-2 rounded transition duration-300">CONTACT US</Link>
                                    </div>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </section>

            {/* Sticky Bottom Links Section */}
            <section className=" max-w-[100vw] lg:sticky lg:top-0 hidden lg:flex lg:justify-center lg:items-center mx-auto bg-gradient-to-r from-blue-200 to-blue-300 shadow-sm  z-30 border-t-blue-400 border-t-[1px]">
                <div className='w-[80%] py-2  md:flex flex-wrap justify-center space-x-6'>
                    <Link href="/" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        HOME
                    </Link>
                    <Link href="/about" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        ABOUT US
                    </Link>
                    <Link href="/submissions" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        ONLINE SUBMISSIONS FORM
                    </Link>
                    {/* Affiliation / Registration Dropdown */}
                    <div className="relative group z-40">
                        <button className="flex items-center justify-between w-full text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 px-4 py-2 mt-2 border hover:text-blue-100 border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                            AFFILIATION / REGISTRATION
                            <FaChevronDown className="ml-2 transition-transform group-hover:rotate-180" />
                        </button>
                        {/* Dropdown Content */}
                        <div className="absolute top-full left-0 -mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Health Services Academy Islamabad
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Pakistan Nursing and Midwifery Council Islamabad (PNMC)
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Allied Health Professional Council Islamabad (AHPC)
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Shaheed Zulfiqar Ali Bhutto Medical University Islamabad
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Federal Board of Secondary and Intermediate Education
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Private Educational Institution Regulatory Authority Islamabad
                            </p>
                        </div>
                    </div>



                    {/* Programs Dropdown */}
                    <div className="relative group">
                        <button className="text-indigo-700 flex items-center justify-center bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                            PROGRAMS
                            <FaChevronDown className="ml-2 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
                            <Link href="/degree" className="block text-indigo-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white transition-all duration-300">
                                Degree Programs
                            </Link>
                            <Link href="/diploma" className="block text-indigo-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white transition-all duration-300">
                                Post Graduate Diploma Programs
                            </Link>
                            <Link href="/certificate" className="block text-indigo-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white transition-all duration-300">
                                Certificate Programs
                            </Link>
                            <Link href="/fsc" className="block text-indigo-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 p-2 hover:text-white transition-all duration-300">
                                F.SC Medical Technologies
                            </Link>
                        </div>
                    </div>


                    <Link href="/download" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        DOWNLOAD CURRICULUM
                    </Link>


                    <div className='relative group'>
                        <button className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out flex items-center justify-center">
                            HOSPITAL ATTACHMENT
                            <FaChevronDown className="ml-2 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 -mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                IRM Hospital Islamabad
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Asia Government Hospital Islamabad
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Fauji Foundation Hospital Peshawar
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Rahim Medical Center and General Hospital Peshawar
                            </p>
                        </div>
                    </div>

                    <div className='relative group'>
                        <button className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out flex items-center justify-center">
                            CAMPUS
                            <FaChevronDown className="ml-2 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 -mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Islamabad
                            </p>
                            <p className="text-indigo-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white border border-indigo-200 px-4 py-2 transition duration-300 text-left">
                                Peshawar
                            </p>
                        </div>
                    </div>
                    <Link href="/news" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        NEWS/UPDATE
                    </Link>
                    <Link href="/contact" className="text-indigo-700 bg-indigo-50 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 mt-2 hover:text-white border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out">
                        CONTACT US
                    </Link>
                </div>
            </section>

        </>
    );
};

export default Navbar;

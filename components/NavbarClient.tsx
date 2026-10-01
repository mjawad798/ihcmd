"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown } from 'react-icons/fa';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import type { NavNode, TopBarLink } from '@/lib/queries';

const sloganFont = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['500', '600'],
    style: ['italic'],
});

const NavbarClient = ({ navItems, topBarLinks }: { navItems: NavNode[], topBarLinks: TopBarLink[] }) => {
    const [scrolled, setScrolled] = useState(false);
    const [openMobileId, setOpenMobileId] = useState<number | null>(null);

    useEffect(() => {
        // Hysteresis: collapsing the top bar on scroll changes the header's
        // height, and the browser's scroll anchoring can silently nudge
        // scrollY back across a single threshold in response — flipping
        // `scrolled` back and forth in a tight loop. Two thresholds with a
        // gap wider than that height change prevents the flicker.
        const handleScroll = () => {
            setScrolled((prev) => {
                if (!prev && window.scrollY > 100) return true;
                if (prev && window.scrollY < 20) return false;
                return prev;
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 flex flex-col max-w-[100vw] z-50 [overflow-anchor:none]">
            {/* Top Bar - Logo, Campus Name & Socials. On lg+ this hides once scrolled, since the logo moves into the nav row below. */}
            <div className={`bg-white px-4 flex justify-between items-center shadow-sm relative z-50 lg:px-8 xl:px-16 transition-all duration-300 ${scrolled ? 'py-2 lg:hidden' : 'py-3'}`}>
                {/* Left Logo */}
                <div className="flex-shrink-0 z-10">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="IHCMD Logo"
                            width={180}
                            height={60}
                            loader={({ src, width }) => `${src}?w=${width}`}
                            className={`object-contain cursor-pointer transition-all duration-300 ${scrolled ? 'w-[90px] sm:w-[110px] md:w-[130px]' : 'w-[120px] sm:w-[150px] md:w-[180px]'}`}
                        />
                    </Link>
                </div>

                {/* Slogan - centered in the bar, hidden once scrolled */}
                {!scrolled && (
                    <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center">
                        <p className={`${sloganFont.className} italic text-xl tracking-wide leading-snug text-navy-800`}>
                            Building Skills, Enhancing Careers and Transforming Healthcare
                        </p>
                    </div>
                )}

                {/* Right Area: Top Bar Links & Mobile Menu */}
                <div className="flex items-center gap-4 z-10">
                    {/* Right Top Bar Links - hidden once scrolled */}
                    {!scrolled && topBarLinks.length > 0 && (
                        <div className="hidden md:flex items-center gap-2">
                            {topBarLinks.map((item) => (
                                <TopBarLinkItem key={item.id} href={item.link ?? '#'}>
                                    {item.title}
                                </TopBarLinkItem>
                            ))}
                        </div>
                    )}

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
                                    {navItems.map((item) =>
                                        item.children.length > 0 ? (
                                            <MobileDropdown
                                                key={item.id}
                                                title={item.title}
                                                isOpen={openMobileId === item.id}
                                                setIsOpen={(val) => setOpenMobileId(val ? item.id : null)}
                                            >
                                                {item.children.map((child) => (
                                                    <MobileSubLink key={child.id} href={child.link ?? undefined}>
                                                        {child.title}
                                                    </MobileSubLink>
                                                ))}
                                            </MobileDropdown>
                                        ) : (
                                            <MobileNavLink key={item.id} href={item.link ?? '#'}>
                                                {item.title}
                                            </MobileNavLink>
                                        )
                                    )}
                                    {topBarLinks.length > 0 && (
                                        <>
                                            <div className="border-t border-slate-200 my-2" />
                                            {topBarLinks.map((item) => (
                                                <MobileNavLink key={item.id} href={item.link ?? '#'}>
                                                    {item.title}
                                                </MobileNavLink>
                                            ))}
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>

            {/* Desktop Navigation Bar - picks up the logo on the left once the top bar hides on scroll */}
            <div className={`hidden lg:flex items-center w-full transition-all duration-300 border-b px-6 xl:px-12 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-gold-200 py-2 justify-start gap-10' : 'bg-navy-900 border-gold-500/20 py-4 justify-center'}`}>
                {scrolled && (
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo.png"
                            alt="IHCMD Logo"
                            width={110}
                            height={38}
                            loader={({ src, width }) => `${src}?w=${width}`}
                            className="w-[100px] object-contain"
                        />
                    </Link>
                )}
                <div className="flex flex-wrap items-center justify-center gap-x-6 xl:gap-x-8">
                    {navItems.map((item) =>
                        item.children.length > 0 ? (
                            <DesktopDropdown key={item.id} title={item.title} scrolled={scrolled}>
                                {item.children.map((child) => (
                                    <DropdownItem key={child.id} href={child.link ?? undefined}>
                                        {child.title}
                                    </DropdownItem>
                                ))}
                            </DesktopDropdown>
                        ) : (
                            <NavLink key={item.id} href={item.link ?? '#'} scrolled={scrolled}>
                                {item.title}
                            </NavLink>
                        )
                    )}
                </div>
            </div>
        </header>
    );
};

// --- Helper Components for Clean Structure ---

const NavLink = ({ href, children, scrolled }: { href: string, children: React.ReactNode, scrolled?: boolean }) => (
    <Link href={href} className={`text-sm font-semibold tracking-wide transition-colors py-2 relative group ${scrolled ? 'text-navy-900 hover:text-navy-600' : 'text-gold-400 hover:text-gold-200'}`}>
        {children}
        <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-gold-500' : 'bg-gold-400'}`}></span>
    </Link>
);

const DesktopDropdown = ({ title, children, scrolled }: { title: string, children: React.ReactNode, scrolled?: boolean }) => (
    <div className="relative group">
        <button className={`text-sm font-semibold tracking-wide transition-colors py-2 flex items-center gap-1.5 ${scrolled ? 'text-navy-900 hover:text-navy-600' : 'text-gold-400 hover:text-gold-200'}`}>
            {title}
            <FaChevronDown className={`text-xs transition-transform duration-300 group-hover:-rotate-180 ${scrolled ? 'group-hover:text-gold-500' : 'group-hover:text-gold-200'}`} />
        </button>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
            <div className="bg-white shadow-xl ring-1 ring-navy-900/10 p-2 flex flex-col relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:ring-1 before:ring-navy-900/10 before:-z-10 bg-clip-padding">
                <div className="relative bg-white z-10 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const DropdownItem = ({ href, children }: { href?: string, children: React.ReactNode }) => {
    const className = "block px-4 py-2.5 text-sm text-slate-600 font-medium hover:text-navy-900 hover:bg-gold-50 transition-colors text-left w-full";
    return href ? (
        <Link href={href} className={className}>{children}</Link>
    ) : (
        <span className={className}>{children}</span>
    );
};

const TopBarLinkItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const external = /^https?:\/\//.test(href);
    return (
        <Link
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="px-3 py-1.5 text-sm font-semibold tracking-wide text-navy-800 border-l border-slate-200 first:border-l-0 hover:text-gold-600 transition-colors"
        >
            {children}
        </Link>
    );
};

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-gold-50 hover:text-navy-900 transition-colors">
        {children}
    </Link>
);

const MobileDropdown = ({ title, isOpen, setIsOpen, children }: { title: string, isOpen: boolean, setIsOpen: (val: boolean) => void, children: React.ReactNode }) => (
    <div className="flex flex-col">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-gold-50 hover:text-navy-900 transition-colors w-full text-left"
        >
            {title}
            <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? '-rotate-180 text-gold-600' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col pl-4 border-l-2 border-gold-200 ml-6 space-y-1 py-1">
                {children}
            </div>
        </div>
    </div>
);

const MobileSubLink = ({ href, children }: { href?: string, children: React.ReactNode }) => {
    const className = "block py-2 px-3 text-sm text-slate-600 font-medium hover:text-navy-900 hover:bg-gold-50 transition-colors text-left w-full";
    return href ? (
        <Link href={href} className={className}>{children}</Link>
    ) : (
        <span className={className}>{children}</span>
    );
};

export default NavbarClient;

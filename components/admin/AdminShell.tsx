"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    LayoutDashboard,
    Images,
    ListTree,
    GraduationCap,
    Users,
    Building2,
    Newspaper,
    GalleryThumbnails,
    Info,
    Megaphone,
    FileDown,
    ShieldCheck,
    LogOut,
    Trophy,
    Landmark,
    PanelBottom,
    BadgeCheck,
    LayoutTemplate,
    CalendarDays,
    ClipboardList,
    Menu,
    X,
} from "lucide-react";
import type { FormKey } from "@/lib/forms";
import { hasPermission } from "@/lib/permissions.client";

const navItems: { href: string; label: string; icon: typeof LayoutDashboard; formKey: FormKey | null }[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, formKey: null },
    { href: "/admin/slider", label: "Slider", icon: Images, formKey: "slider" },
    { href: "/admin/achievements", label: "Achievements", icon: Trophy, formKey: "achievements" },
    { href: "/admin/navbar", label: "Navbar", icon: ListTree, formKey: "navbar" },
    { href: "/admin/about", label: "About Page", icon: Info, formKey: "about" },
    { href: "/admin/academic-programs", label: "Academic Programs", icon: GraduationCap, formKey: "academic-programs" },
    { href: "/admin/admission-sessions", label: "Admission Sessions", icon: CalendarDays, formKey: "admission-sessions" },
    { href: "/admin/admissions", label: "Admission Applications", icon: ClipboardList, formKey: "admissions" },
    { href: "/admin/teaching-faculty", label: "Teaching Faculty", icon: Users, formKey: "teaching-faculty" },
    { href: "/admin/hospitals", label: "Hospitals on Panel", icon: Building2, formKey: "hospitals" },
    { href: "/admin/affiliations", label: "Affiliations", icon: Landmark, formKey: "affiliations" },
    { href: "/admin/news", label: "News", icon: Newspaper, formKey: "news" },
    { href: "/admin/gallery", label: "Gallery", icon: GalleryThumbnails, formKey: "gallery" },
    { href: "/admin/flash-news", label: "Flash News", icon: Megaphone, formKey: "flash-news" },
    { href: "/admin/downloads", label: "Downloads", icon: FileDown, formKey: "downloads" },
    { href: "/admin/verification-master", label: "Document Verification", icon: BadgeCheck, formKey: "verification-master" },
    { href: "/admin/sections", label: "Page Builder", icon: LayoutTemplate, formKey: "sections" },
    { href: "/admin/footer", label: "Footer", icon: PanelBottom, formKey: "footer" },
    { href: "/admin/users", label: "Users", icon: Users, formKey: "users" },
    { href: "/admin/roles", label: "Roles & Permissions", icon: ShieldCheck, formKey: "roles" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const permissions = session?.user?.permissions;
    const visibleNavItems = navItems.filter(
        (item) => item.formKey === null || hasPermission(permissions, item.formKey, "view")
    );

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/admin/login");
    };

    const sidebarContent = (
        <>
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <span className="text-lg font-bold tracking-wide">IHCMD Admin</span>
                <button
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden p-1 text-white/70 hover:text-white"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <nav className="flex-1 py-4 overflow-y-auto">
                {visibleNavItems.map(({ href, label, icon: Icon }) => {
                    const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                                active
                                    ? "bg-white/10 text-gold-400 border-r-2 border-gold-500"
                                    : "text-white/80 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <div className="px-6 py-4 border-t border-white/10 space-y-3">
                {session?.user && (
                    <div className="text-xs text-white/60">
                        <p className="text-white/90 font-medium truncate">{session.user.name}</p>
                        <p>{session.user.roleName}</p>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs text-white/60 hover:text-gold-400 transition-colors"
                >
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                </button>
                <Link href="/" className="block text-xs text-white/60 hover:text-gold-400 transition-colors">
                    ← Back to website
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-60 flex-shrink-0 bg-navy-900 text-white flex-col">
                {sidebarContent}
            </aside>

            {/* Mobile sidebar drawer */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="relative w-64 max-w-[80vw] bg-navy-900 text-white flex flex-col">
                        {sidebarContent}
                    </aside>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-navy-900 text-white sticky top-0 z-40">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-1.5 -ml-1.5 text-white/80 hover:text-white"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="text-base font-bold tracking-wide">IHCMD Admin</span>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden min-w-0">{children}</main>
            </div>
        </div>
    );
}

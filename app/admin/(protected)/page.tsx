import Link from "next/link";
import { Images, ListTree, GraduationCap, Users, Building2, Newspaper, GalleryThumbnails, Info, Megaphone, FileDown } from "lucide-react";

const cards = [
    { href: "/admin/slider", label: "Slider", description: "Manage homepage slider images", icon: Images },
    { href: "/admin/navbar", label: "Navbar", description: "Manage navigation menu items", icon: ListTree },
    {
        href: "/admin/about",
        label: "About Page",
        description: "Manage the About page's mission, stats, and leadership messages",
        icon: Info,
    },
    {
        href: "/admin/academic-programs",
        label: "Academic Programs",
        description: "Manage degree, diploma & certificate programs",
        icon: GraduationCap,
    },
    {
        href: "/admin/teaching-faculty",
        label: "Teaching Faculty",
        description: "Manage faculty profiles and their detail sections",
        icon: Users,
    },
    {
        href: "/admin/hospitals",
        label: "Hospitals on Panel",
        description: "Manage partner hospital logos shown on the homepage",
        icon: Building2,
    },
    {
        href: "/admin/news",
        label: "News",
        description: "Manage news items shown in the homepage ticker",
        icon: Newspaper,
    },
    {
        href: "/admin/gallery",
        label: "Gallery",
        description: "Manage gallery pictures and captions",
        icon: GalleryThumbnails,
    },
    {
        href: "/admin/flash-news",
        label: "Flash News",
        description: "Manage the homepage popup announcement",
        icon: Megaphone,
    },
    {
        href: "/admin/downloads",
        label: "Downloads",
        description: "Manage downloadable curriculum files and documents",
        icon: FileDown,
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                {cards.map(({ href, label, description, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gold-300 transition-all"
                    >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy-50 text-navy-800">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-navy-900">{label}</h2>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

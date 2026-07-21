import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { ArrowRight } from "lucide-react";
import { CATEGORY_ORDER, CATEGORY_META } from "@/lib/programCategories";
import { getAcademicPrograms } from "@/lib/queries";

const Programs = async () => {
    const programs = await getAcademicPrograms();

    const categories = CATEGORY_ORDER.map((type) => ({
        type,
        ...CATEGORY_META[type],
        items: programs.filter((p) => p.type === type),
    }));

    return (
        <section id="programs" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">
                        Academics
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Our Academic Programs
                    </h3>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div key={category.type} className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                                <ExportedImage
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-navy-900/10 transition-opacity duration-300 group-hover:opacity-0" />
                            </div>

                            {/* Content Container */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gold-100 pb-3">
                                    {category.title}
                                </h4>

                                <ul className="space-y-3 text-gray-600 text-sm mb-6 flex-grow">
                                    {category.items.map((item) => (
                                        <li key={item.id} className="flex items-start">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 mr-2 flex-shrink-0"></span>
                                            <Link
                                                href={`/academic-programs/${item.id}`}
                                                className="leading-tight hover:text-navy-900 hover:underline transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={category.link} className="mt-auto group/link inline-flex items-center text-navy-800 font-semibold text-sm hover:text-gold-600 transition-colors">
                                    Read More
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;

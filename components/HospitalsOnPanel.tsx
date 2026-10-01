import { getActiveHospitals } from "@/lib/queries";
import ScrollableRow from "@/components/ScrollableRow";

const HospitalsOnPanel = async () => {
    const hospitals = await getActiveHospitals();

    if (hospitals.length === 0) return null;

    const isScrollable = hospitals.length > 6;

    return (
        <section className="bg-white py-16 border-t border-gold-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-sm font-bold tracking-widest text-gold-600 uppercase mb-3">
                        Our Partners
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-navy-900">
                        Hospitals on Panel
                    </h3>
                    <div className="w-20 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {isScrollable ? (
                    <ScrollableRow>
                        {hospitals.map((hospital) => (
                            <div key={hospital.id} className="flex flex-col items-center flex-shrink-0 w-36 snap-center">
                                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-navy-50 border border-gold-200 shadow-sm transition-all duration-300 hover:border-gold-400 hover:shadow-md overflow-hidden p-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={hospital.logo}
                                        alt={hospital.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="mt-3 text-xs md:text-sm text-center text-navy-700 font-medium leading-snug">
                                    {hospital.name}
                                </p>
                            </div>
                        ))}
                    </ScrollableRow>
                ) : (
                    <div className="flex items-center gap-10 md:gap-14 flex-wrap justify-center">
                        {hospitals.map((hospital) => (
                            <div key={hospital.id} className="flex flex-col items-center flex-shrink-0 w-36">
                                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-navy-50 border border-gold-200 shadow-sm transition-all duration-300 hover:border-gold-400 hover:shadow-md overflow-hidden p-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={hospital.logo}
                                        alt={hospital.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="mt-3 text-xs md:text-sm text-center text-navy-700 font-medium leading-snug">
                                    {hospital.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HospitalsOnPanel;

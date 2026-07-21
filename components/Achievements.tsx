import { getActiveAchievements } from "@/lib/queries";
import { ACHIEVEMENT_ICON_MAP } from "@/lib/achievementIcons";

const Achievements = async () => {
    const stats = await getActiveAchievements();

    if (stats.length === 0) return null;

    return (
        <section className="relative py-20 bg-navy-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 -left-20 w-72 h-72 bg-navy-500 rounded-full mix-blend-screen filter blur-[80px]"></div>
                <div className="absolute top-0 -right-20 w-72 h-72 bg-gold-500 rounded-full mix-blend-screen filter blur-[80px]"></div>
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-navy-400 rounded-full mix-blend-screen filter blur-[80px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">
                        Our Pride
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        IHCMD Achievements
                    </h3>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <p className="max-w-3xl mx-auto mt-8 text-gold-100/80 text-base md:text-lg font-light leading-relaxed">
                        Since our founding, IHCMD has stayed committed to producing skilled, compassionate healthcare professionals through hands-on hospital training, industry-aligned curricula, and a faculty dedicated to excellence. These numbers reflect that ongoing commitment.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => {
                        const Icon = ACHIEVEMENT_ICON_MAP[stat.icon];
                        return (
                            <div key={stat.id} className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-gold-500/20 hover:bg-white/10 hover:border-gold-400/50 transition-all duration-300 transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-500/30 to-navy-700/40 mb-6 border border-gold-400/30 shadow-inner">
                                    <Icon className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                                    {stat.count}
                                </h4>
                                <p className="text-gold-100 text-lg font-medium text-center tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;

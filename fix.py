import os
import re

# 1. Fix Footer.tsx
with open('components/Footer.tsx', 'r', encoding='utf-8') as f:
    footer = f.read()

# Apply dark blue theme
footer = footer.replace('bg-gradient-to-r from-gray-900/5 to-blue-800/5 dark:from-purple-900/10 dark:to-pink-800/10 backdrop-blur-sm mt-20 border-t border-purple-100 dark:border-purple-900/20', 'bg-[#0b1b3d] mt-20')
footer = footer.replace('text-blue-950', 'text-white')
footer = footer.replace('dark:text-blue-400', 'text-slate-300')
footer = footer.replace('from-blue-900 to-blue-700', 'from-white to-slate-200')

# Apply user changes
mardan_regex = r'<div className="mb-6">\s*<h3 className="text-sm sm:text-\[16px\] mb-2 font-semibold text-white">Peshawar</h3>.*?</div>'
footer = re.sub(mardan_regex, '', footer, flags=re.DOTALL)
footer = footer.replace('hr.ihcmd@gmail.com', 'Info.ihcmns@gmail.com')

with open('components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer)

# 2. Fix Hero.tsx
with open('components/Hero.tsx', 'r', encoding='utf-8') as f:
    hero = f.read()

irm_old = """                {/* IRM Hospital Connection */}
                <section className="relative bg-slate-900 py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Title */}
                        <h3 className="text-center md:text-4xl text-3xl font-bold text-white tracking-wide mb-12">
                            Hands-On Training at IRM Hospital
                        </h3>

                        <div className="mt-12 flex flex-col md:flex-row items-center md:gap-8 gap-12">
                            {/* Hospital Image */}
                            <div className="relative w-full md:w-1/2 flex justify-center">
                                <Image
                                    src="/hospital.jpg"
                                    alt="IRM Hospital"
                                    width={600}
                                    height={600}
                                    className="rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-0 left-0 bg-blue-900/10 w-full h-full rounded-lg shadow-inner"></div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2  md:text-left space-y-6">
                                <p className="text-slate-300 text-left text-lg leading-relaxed z-10">
                                    At the Institute of Regenerative Medicine (IRM) Hospital, students gain invaluable hands-on experience in a real-world healthcare setting. From radiology and anesthesia to nursing and specialized diplomas, our programs prepare students for impactful careers. With expert guidance, they apply knowledge in a supportive, professional environment.
                                </p>

                                <div className="flex justify-center md:justify-start">
                                    <Link href="/about">
                                        <p className="inline-block bg-white text-slate-900 font-semibold rounded-full px-8 py-3.5 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-50 transition-all duration-300">
                                            Learn More
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>"""

irm_new = """                {/* IRM Hospital Connection */}
                <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Title */}
                        <h3 className="text-center md:text-4xl text-3xl font-bold text-blue-900 tracking-wide mb-6">
                            Hands-On Training at IRM Hospital
                        </h3>

                        <div className="mt-12 flex flex-col md:flex-row items-center md:gap-8 gap-12">
                            {/* Hospital Image */}
                            <div className="relative w-full md:w-1/2 bg-transparent flex justify-center">
                            <div>
                                <Image
                                    src="/hospital.jpg"
                                    alt="IRM Hospital"
                                    width={550}
                                    height={550}
                                    className="rounded-lg shadow-lg object-cover transform transition-transform duration-300"
                                />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2  md:text-left space-y-6">
                                <p className="text-gray-800 dark:text-gray-300 text-left text-lg leading-relaxed z-10">
                                    At the Institute of Regenerative Medicine (IRM) Hospital, students gain invaluable hands-on experience in a real-world healthcare setting. From radiology and anesthesia to nursing and specialized diplomas, our programs prepare students for impactful careers. With expert guidance, they apply knowledge in a supportive, professional environment.
                                </p>

                                <div className="flex justify-center md:justify-start">
                                    <Link href="/about">
                                        <p className="inline-block bg-blue-600 text-white text-sm font-medium rounded-lg px-6 py-3 shadow-md hover:shadow-lg hover:bg-gradient-to-tr from-blue-800 to-blue-950 transition duration-300">
                                            Learn More
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>"""

hero = hero.replace(irm_old, irm_new)
with open('components/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(hero)

# 3. Strip rounded classes correctly from all
for filename in os.listdir('components'):
    if filename.endswith('.tsx'):
        filepath = os.path.join('components', filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = re.sub(r'\s*\b(?:[a-z0-9]+:)*rounded(?:-[a-z0-9\[\]\-]+)?\b', '', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Processed {filename}')

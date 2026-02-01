import { motion } from 'motion/react';

export function SponsorsSection() {
    return (
        <section className="relative bg-[#050505] py-20 px-4 overflow-hidden border-t border-[#D500F9]/20">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-5xl md:text-7xl mb-12 text-white relative inline-block"
                        style={{ fontFamily: 'VT323, monospace' }}
                    >
                        <span className="relative">
                            OUR SPONSORS
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D500F9] to-[#00F0FF] opacity-20 blur-xl" />
                        </span>
                    </h2>

                    <div className="flex flex-col gap-16">
                        {/* Associate Sponsors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h3 className="text-3xl text-[#00D1FF]" style={{ fontFamily: 'VT323, monospace' }}>
                                ASSOCIATE SPONSORS
                            </h3>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                <div className="bg-white rounded-xl p-4 border border-white/10 w-fit hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-shadow duration-300">
                                    <img
                                        src="/showcazz_logo.png"
                                        alt="Showcazz"
                                        className="h-28 md:h-36 w-auto object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Voucher Partner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h3 className="text-3xl text-[#00F0FF]" style={{ fontFamily: 'VT323, monospace' }}>
                                VOUCHER PARTNER
                            </h3>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                <div className="bg-white rounded-xl p-4 border border-white/10 w-fit hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300">
                                    <img
                                        src="/gamestry_logo.png"
                                        alt="Gamestry"
                                        className="h-28 md:h-36 w-auto object-contain"
                                    />
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-white/10 w-fit hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300">
                                    <img
                                        src="/green_trends_logo.png"
                                        alt="Green Trends"
                                        className="h-28 md:h-36 w-auto object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Intern Partner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h3 className="text-3xl text-[#D500F9]" style={{ fontFamily: 'VT323, monospace' }}>
                                INTERN PARTNER
                            </h3>
                            <div className="bg-white rounded-xl p-4 border border-white/10 w-fit hover:shadow-[0_0_30px_rgba(213,0,249,0.3)] transition-shadow duration-300">
                                <img
                                    src="/junix_logo.png"
                                    alt="Junix"
                                    className="h-28 md:h-36 w-auto object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* Certificate Sponsor */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h3 className="text-3xl text-[#00F0FF]" style={{ fontFamily: 'VT323, monospace' }}>
                                CERTIFICATE SPONSOR
                            </h3>
                            <div className="bg-white rounded-xl p-4 border border-white/10 w-fit hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300">
                                <img
                                    src="/giri_enterprises_logo.png"
                                    alt="Giri Enterprises"
                                    className="h-28 md:h-36 w-auto object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

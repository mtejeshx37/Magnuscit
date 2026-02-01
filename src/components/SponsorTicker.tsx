import { motion } from 'motion/react';

const sponsors = [
    { type: 'ASSOCIATE SPONSOR', name: 'Showcazz', logo: '/showcazz_logo.png' },
    { type: 'VOUCHER PARTNER', name: 'Gamestry', logo: '/gamestry_logo.png' },
    { type: 'VOUCHER PARTNER', name: 'Green Trends', logo: '/green_trends_logo.png' },
    { type: 'INTERN PARTNER', name: 'Junix', logo: '/junix_logo.png' },
    { type: 'CERTIFICATE SPONSOR', name: 'Giri Enterprises', logo: '/giri_enterprises_logo.png' },
];

export function SponsorTicker() {
    const CYAN = '#00E5FF';
    const PURPLE = '#D500F9';

    return (
        <div className="relative mt-20 mb-10">
            <div className="text-center mb-10">
                <h2
                    className="text-5xl md:text-6xl text-white relative inline-block"
                    style={{ fontFamily: 'VT323, monospace' }}
                >
                    <span className="relative">
                        OUR OTHER SPONSORS
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D500F9] to-[#00F0FF] opacity-20 blur-xl" />
                    </span>
                </h2>
            </div>
            <div
                className="relative w-full z-40 bg-black/95 backdrop-blur-md
                 border-t border-b border-cyan-400/30 py-8 overflow-hidden whitespace-nowrap
                 shadow-[0_-6px_40px_rgba(0,229,255,0.15)]"
                style={{
                    maskImage:
                        'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
            >
                <motion.div
                    className="flex w-max items-center"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 100,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {/* Double the content for a seamless loop */}
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex items-center">
                            {/* Repeat the sponsor list multiple times per copy to ensure it fills the screen */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    {sponsors.map((sponsor, idx) => (
                                        <div
                                            key={`${idx}-${i}`}
                                            className="flex items-center px-16"
                                        >
                                            <div
                                                className="w-2 h-2 rotate-45 shrink-0"
                                                style={{
                                                    backgroundColor: PURPLE,
                                                    boxShadow: `0 0 10px ${PURPLE}, 0 0 20px ${PURPLE}`,
                                                }}
                                            />
                                            <div className="flex flex-col items-center gap-3 px-16">
                                                <span
                                                    className="font-mono text-sm font-black tracking-[0.2em] opacity-90"
                                                    style={{
                                                        color: CYAN,
                                                        textShadow: `0 0 8px ${CYAN}66` // 66 is hex for ~40% opacity
                                                    }}
                                                >
                                                    {sponsor.type}
                                                </span>
                                                <div className="relative group">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-lg blur opacity-10 group-hover:opacity-100 transition duration-500"></div>
                                                    <div className="relative bg-white/90 rounded-xl p-1 px-4 flex items-center justify-center min-w-[180px] h-28 hover:bg-white transition-all duration-300">
                                                        <img
                                                            src={sponsor.logo}
                                                            alt={sponsor.name}
                                                            className="h-16 w-auto object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

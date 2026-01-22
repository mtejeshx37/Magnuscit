import { motion } from 'motion/react';

export function DisclaimerTicker() {
    const text = "On Feb 2 Magnus Symposium all events are free except workshops";

    return (
        <div
            className="fixed top-[80px] left-0 right-0 z-[45] bg-black/95 backdrop-blur-md border-b-2 border-[#FFD700]/40 py-2.5 overflow-hidden flex whitespace-nowrap shadow-[0_4px_30px_rgba(255,215,0,0.1)]"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
        >
            <motion.div
                animate={{ x: [0, "-50%"] }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex"
            >
                <div className="flex shrink-0">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 px-10">
                            <span className="text-[#FFD700] text-sm opacity-60">•</span>
                            <span className="text-[#FFD700] text-lg">⚡</span>
                            <span
                                className="text-[#FFD700] font-mono text-xs md:text-sm tracking-[0.3em] font-black uppercase"
                                style={{
                                    textShadow: '0 0 10px rgba(0, 217, 255, 0.4), 0 0 20px rgba(0, 217, 255, 0.4)',
                                }}
                            >
                                {text}
                            </span>
                            <span className="text-[#FFD700] text-lg">⚡</span>
                            <span className="text-[#FFD700] text-sm opacity-60">•</span>
                        </div>
                    ))}
                </div>
                <div className="flex shrink-0">
                    {[...Array(6)].map((_, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-6 px-10">
                            <span className="text-[#FFD700] text-sm opacity-60">•</span>
                            <span className="text-[#FFD700] text-lg">⚡</span>
                            <span
                                className="text-[#FFD700] font-mono text-xs md:text-sm tracking-[0.3em] font-black uppercase"
                                style={{
                                    textShadow: '0 0 10px rgba(0, 217, 255, 0.4), 0 0 20px rgba(0, 217, 255, 0.4)',
                                }}
                            >
                                {text}
                            </span>
                            <span className="text-[#FFD700] text-lg">⚡</span>
                            <span className="text-[#FFD700] text-sm opacity-60">•</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

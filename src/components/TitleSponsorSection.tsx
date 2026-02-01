import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function TitleSponsorSection() {
    const [contentType, setContentType] = useState<'image' | 'video'>('image');
    const [isMuted, setIsMuted] = useState(false);

    // Auto-rotate content logic
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (contentType === 'image') {
            timeout = setTimeout(() => {
                setContentType('video');
            }, 5000); // Display image for 5 seconds before switching to video
        }

        return () => clearTimeout(timeout);
    }, [contentType]);

    return (
        <section className="py-12 md:py-24 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D500F9]/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto px-4 flex flex-col items-center"
            >
                {/* Title Header */}
                <h3 className="mb-8 text-5xl md:text-7xl tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(213,0,249,0.5)]"
                    style={{ fontFamily: 'VT323, monospace' }}>
                    <span className="text-white">TITLE</span> <span className="text-[#D500F9]">SPONSOR</span>
                </h3>

                {/* Sponsor Card (Pure visual, no text as requested, text is above) */}
                <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#D500F9]/10 to-transparent rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                    <div className="relative glass-strong rounded-[2rem] border border-white/5 overflow-hidden aspect-video md:aspect-[21/9] flex items-center justify-center p-4 md:p-8 bg-black/20 backdrop-blur-sm">

                        {/* Content Container */}
                        <div className="w-full h-full relative flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {contentType === 'image' ? (
                                    <motion.div
                                        key="image"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex items-center justify-center"
                                    >
                                        <img
                                            src="/title_sponsor.png"
                                            alt="Title Sponsor"
                                            className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="video"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex flex-col items-center justify-center relative"
                                    >
                                        <video
                                            autoPlay
                                            muted={isMuted}
                                            loop
                                            playsInline
                                            className="w-full h-full object-contain"
                                        >
                                            <source src="/title_sponsor.mp4" type="video/mp4" />
                                        </video>

                                        {/* Mute Toggle Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsMuted(!isMuted);
                                            }}
                                            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors border border-white/10 backdrop-blur-md z-10"
                                            title={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Radio Buttons Below Card */}
                <div className="mt-8 flex items-center gap-6">
                    <label className="relative flex items-center justify-center cursor-pointer group">
                        <input
                            type="radio"
                            name="sponsor-toggle"
                            checked={contentType === 'image'}
                            onChange={() => setContentType('image')}
                            className="hidden"
                        />
                        <div className="relative flex items-center justify-center">
                            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${contentType === 'image' ? 'border-[#D500F9] scale-110' : 'border-white/20 group-hover:border-white/40'}`} />
                            {contentType === 'image' && (
                                <motion.div
                                    layoutId="radio-dot"
                                    className="absolute w-2 h-2 bg-[#D500F9] rounded-full shadow-[0_0_8px_#D500F9]"
                                />
                            )}
                        </div>
                    </label>

                    <label className="relative flex items-center justify-center cursor-pointer group">
                        <input
                            type="radio"
                            name="sponsor-toggle"
                            checked={contentType === 'video'}
                            onChange={() => setContentType('video')}
                            className="hidden"
                        />
                        <div className="relative flex items-center justify-center">
                            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${contentType === 'video' ? 'border-[#D500F9] scale-110' : 'border-white/20 group-hover:border-white/40'}`} />
                            {contentType === 'video' && (
                                <motion.div
                                    layoutId="radio-dot"
                                    className="absolute w-2 h-2 bg-[#D500F9] rounded-full shadow-[0_0_8px_#D500F9]"
                                />
                            )}
                        </div>
                    </label>
                </div>

                {/* Scroll Indicator (Visual only) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#D500F9] to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}

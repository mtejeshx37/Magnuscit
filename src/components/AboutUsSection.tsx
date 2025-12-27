import { motion } from 'motion/react';

// Unsplash images for the "Scattered Wall"
const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1531297461136-8200b2a0a71e?q=80&w=800",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=800",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800",
    "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
];

const randomRotations = [-3, 2, -2, 3, -1, 1, -2.5, 2.5, -1.5, 1.5];
const randomPositions = [
    { top: '10%', left: '5%' },
    { top: '20%', left: '25%' },
    { top: '15%', left: '50%' },
    { top: '5%', left: '75%' },
    { top: '40%', left: '10%' },
    { top: '35%', left: '80%' },
    { top: '60%', left: '15%' },
    { top: '55%', left: '40%' },
    { top: '70%', left: '70%' },
    { top: '50%', left: '60%' },
];

export function AboutUsSection() {


    return (
        <div id="about-us" className="min-h-screen bg-[#050505] relative py-20 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 h-screen">

                {/* Content Column */}
                <div className="lg:w-1/3 flex flex-col justify-center z-20 pointer-events-none lg:pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl mb-8" style={{ fontFamily: 'VT323, monospace' }}>
                            <span className="text-white">ABOUT</span> <span className="text-[#00D1FF]">US</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 font-mono text-lg backdrop-blur-md bg-black/40 p-6 rounded-xl border border-white/10">
                            <p>
                                Welcome to Magnus 2k26, where organic intelligence interfaces with synthetic evolution. We are more than a technical symposium; we are a testing ground for the future.
                            </p>
                            <p>
                                Join a network of innovators, dreamers, and architects of the digital age as we explore the boundaries of AI, creativity, and logic.
                            </p>
                            <div className="pt-4">
                                <span className="text-[#00D1FF] text-xl">
                                    // DEPLOYING_CREATIVITY<br />
                                    // COMPILING_FUTURE
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Gallery Column (Desktop: Scattered / Mobile: Carousel) */}
                <div className="lg:w-2/3 relative h-[50vh] lg:h-full">
                    {/* Desktop Scatter */}
                    <div className="hidden lg:block absolute inset-0">
                        {GALLERY_IMAGES.map((src, idx) => (
                            <motion.div
                                key={idx}
                                className="absolute w-64 aspect-[3/4] border-2 border-[#333333] bg-black cursor-pointer overflow-hidden shadow-2xl"
                                style={{
                                    top: randomPositions[idx].top,
                                    left: randomPositions[idx].left,
                                    rotate: randomRotations[idx],
                                    zIndex: 10
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 0,
                                    zIndex: 50,
                                    borderColor: '#00D1FF',
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <img
                                    src={src}
                                    alt="Gallery"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Carousel */}
                    <div className="lg:hidden flex overflow-x-auto gap-4 py-8 snap-x snap-mandatory h-full items-center no-scrollbar">
                        {GALLERY_IMAGES.map((src, idx) => (
                            <div key={idx} className="flex-shrink-0 w-[80vw] h-[60vh] snap-center border-2 border-white/20 rounded-xl overflow-hidden relative">
                                <img
                                    src={src}
                                    alt="Gallery"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <span className="text-[#00D1FF] font-mono">IMAGE_{idx + 1} // CAPTURED</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

import { motion } from 'motion/react';
import { useState } from 'react';
// Importing images from the gallery folder
import galleryImg1 from '../assets/gallery/_MG_0004_2_(8).webp';
import galleryImg2 from '../assets/gallery/_MG_0007.webp';
import galleryImg3 from '../assets/gallery/_MG_0052.JPG.webp';
import galleryImg3b from '../assets/gallery/_MG_0009.JPG.webp';
import galleryImg4 from '../assets/gallery/IMG_0885.webp';
import galleryImg5 from '../assets/gallery/IMG_0967.webp';
import galleryImg6 from '../assets/gallery/IMG_0958.webp';
import galleryImg7 from '../assets/gallery/IMG_2017.webp';
import galleryImg8 from '../assets/gallery/IMG_2111.webp';

// 9 Images for the 9-grid layout
const GALLERY_IMAGES = [
    galleryImg1,
    galleryImg2,
    galleryImg3,
    galleryImg3b,
    galleryImg4,
    galleryImg5,
    galleryImg6,
    galleryImg7,
    galleryImg8,
];

// Grid layout configuration mapping to Tailwind classes
const GRID_LAYOUT = [
    // 1. Left Tall Block (row 3-6, col 1) - ENLARGED (Span 3)
    { className: 'col-start-1 col-end-2 row-start-3 row-end-6' },

    // 2. Left Large Block (row 3-5, col 2-4)
    { className: 'col-start-2 col-end-4 row-start-3 row-end-5' },

    // 3a. Bottom-Left SPLIT 1 (row 5-6, col 2-3) - Square
    { className: 'col-start-2 col-end-3 row-start-5 row-end-6' },

    // 3b. Bottom-Left SPLIT 2 (row 5-6, col 3-4) - Square (New Slot)
    { className: 'col-start-3 col-end-4 row-start-5 row-end-6' },

    // 4. Top-Center Small Vertical Block (row 1-3, col 4-5)
    { className: 'col-start-4 col-end-5 row-start-1 row-end-3' },

    // 5. Top-Right Wide Block (row 1-3, col 5-7)
    { className: 'col-start-5 col-end-7 row-start-1 row-end-3' },

    // 6. Central Primary Block (row 3-6, col 4-7)
    { className: 'col-start-4 col-end-7 row-start-3 row-end-6' },

    // 7. Bottom-Center Large Vertical Block (row 6-8, col 4-6)
    { className: 'col-start-4 col-end-6 row-start-6 row-end-8' },

    // 8. Bottom-Right Small Vertical Block (row 6-8, col 6-7) - ENLARGED (Span 2)
    { className: 'col-start-6 col-end-7 row-start-6 row-end-8' },
];

// Image component with loading state
const GalleryImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={`relative w-full h-full bg-[#1A1A1A] overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
            )}
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export function AboutUsSection() {
    return (
        <div id="about-us" className="min-h-screen bg-[#050505] relative py-20 overflow-hidden scroll-mt-[130px]">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 min-h-screen">

                {/* Content Column */}
                <div className="lg:w-[45%] flex flex-col justify-center z-20 pointer-events-none lg:pointer-events-auto py-12 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl mb-8 whitespace-nowrap" style={{ fontFamily: 'VT323, monospace' }}>
                            <span className="text-white">ABOUT</span> <span className="text-[#00D1FF]">US</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 font-mono text-lg backdrop-blur-md bg-black/40 p-6 rounded-xl border border-white/10 w-full">
                            <p>
                                Magnus is the technical symposium of the department of CSE (Artificial Intelligence and Machine Learning) at Chennai Institute of Technology which was founded in 2023. With over a footfall of 500 in its first year, it is an event that celebrates the achievements in the field of AI along with Machine Learning. At Magnus, participants get to immerse themselves in various activities such as workshops on AI and Open-Source platforms along with technical events like paper and project presentations, motivating them to think outside the box and incorporate AI in real life.
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

                {/* Gallery Column (Desktop: CSS Grid / Mobile: Carousel) */}
                <div className="lg:w-[55%] relative h-[50vh] lg:h-full flex items-center justify-center">
                    {/* Desktop Grid Layout */}
                    <div className="hidden lg:grid w-[90%] aspect-[1.8] grid-cols-6 grid-rows-7 gap-3 p-2 mt-32">
                        {GRID_LAYOUT.map((style, idx) => {
                            const imageSrc = GALLERY_IMAGES[idx % GALLERY_IMAGES.length];
                            return (
                                <motion.div
                                    key={idx}
                                    className={`relative border-2 border-[#333333] bg-black cursor-pointer overflow-hidden shadow-2xl rounded-lg ${style.className} cursor-target`}
                                    whileHover={{
                                        scale: 1.05,
                                        zIndex: 50,
                                        borderColor: '#00D1FF',
                                        transition: { duration: 0.2 }
                                    }}
                                    layoutId={`gallery-item-${idx}`}
                                >
                                    <GalleryImage src={imageSrc} alt={`Gallery Image ${idx + 1}`} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile Carousel */}
                    <div className="lg:hidden flex overflow-x-auto gap-4 py-8 snap-x snap-mandatory h-full items-center no-scrollbar">
                        {GALLERY_IMAGES.map((src, idx) => (
                            <div key={idx} className="flex-shrink-0 w-[80vw] h-[60vh] snap-center border-2 border-white/20 rounded-xl overflow-hidden relative">
                                <GalleryImage src={src} alt={`Gallery Image ${idx + 1}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 pointer-events-none">
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

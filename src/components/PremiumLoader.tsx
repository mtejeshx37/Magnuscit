import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import magnusLogo from '../assets/logos/magnus-logo.jpg';

import Shuffle from './Shuffle';

import LiquidEther from './LiquidEther';

interface PremiumLoaderProps {
    onComplete: () => void;
}

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        // Total duration: 4.5s (Entry 4.2s + Exit 0.3s)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 300); // Wait for exit animation
        }, 4200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
                >

                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <LiquidEther
                            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                            mouseForce={20}
                            cursorSize={100}
                            isViscous
                            viscous={30}
                            iterationsViscous={32}
                            iterationsPoisson={32}
                            resolution={0.5}
                            isBounce={false}
                            autoDemo
                            autoSpeed={0.5}
                            autoIntensity={2.2}
                            takeoverDuration={0.25}
                            autoResumeDelay={3000}
                            autoRampDuration={0.6}
                        />
                    </div>
                    <div className="relative flex flex-col items-center justify-center w-full z-10">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 0 }}
                            animate={{
                                y: isMobile ? -40 : -80, // Move UP
                                scale: 1,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1], // Custom easeOut
                                times: [0, 1]
                            }}
                            className="relative z-10"
                        >
                            <img
                                src={magnusLogo}
                                alt="Magnus Logo"
                                className="w-24 h-24 md:w-40 md:h-40 object-contain"
                            />
                        </motion.div>

                        {/* Text Container */}
                        <div className="absolute mt-4 flex justify-center w-full z-20">
                            <Shuffle
                                text="MAGNUS 2026"
                                shuffleDirection="right"
                                duration={0.35}
                                animationMode="evenodd"
                                shuffleTimes={1}
                                ease="power3.out"
                                stagger={0.03}
                                threshold={0.1}
                                triggerOnce={true}
                                triggerOnHover
                                respectReducedMotion={true}
                                loop={false}
                                loopDelay={0}
                                className="text-4xl md:text-8xl text-white tracking-widest font-bold text-center"
                                style={{
                                    fontFamily: 'VT323, monospace',
                                    textShadow: '0 0 20px rgba(213, 0, 249, 0.3)'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

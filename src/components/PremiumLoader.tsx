import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import magnusLogo from '../assets/logos/magnus-logo-v2.png';
import Hyperspeed from './Hyperspeed';
import { hyperspeedPresets } from './HyperspeedPresets';
import ElectricBorder from './ElectricBorder';
import './ElectricBorder.css'; // Ensure CSS is available

interface PremiumLoaderProps {
    onComplete: () => void;
}

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
    const [phase, setPhase] = useState<'logo' | 'interactive'>('logo');
    const [splitActive, setSplitActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Logic refs
    const progressRef = useRef(0);
    const speedRef = useRef(0.05); // Base speed
    const targetSpeedRef = useRef(0.05);
    const rafRef = useRef<number | null>(null);

    // Initial Logo Sequence Phase
    useEffect(() => {
        // Sequence:
        // 0ms: Logo Appears (Joined)
        // 1500ms: Electric Border Fades Out (Optional, or stays)
        // 1500ms: Split Starts
        // 2500ms: Transition to Interactive

        const splitTimer = setTimeout(() => {
            setSplitActive(true);
        }, 1200);

        const phaseTimer = setTimeout(() => {
            setPhase('interactive');
        }, 2200); // Allow time for split animation

        return () => {
            clearTimeout(splitTimer);
            clearTimeout(phaseTimer);
        };
    }, []);

    // Loading Loop
    const updateProgress = useCallback(() => {
        if (progressRef.current >= 100) {
            setIsComplete(true);
            onComplete(); // Immediate transition
            return;
        }

        // Lerp current speed to target speed (smooth acceleration/deceleration)
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.1;

        progressRef.current += speedRef.current;
        // Clamp to 100
        if (progressRef.current > 100) progressRef.current = 100;

        setProgress(progressRef.current);
        rafRef.current = requestAnimationFrame(updateProgress);
    }, [onComplete]);

    // Start Loop when interactive phase begins
    useEffect(() => {
        if (phase === 'interactive') {
            rafRef.current = requestAnimationFrame(updateProgress);
        }
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [phase, updateProgress]);

    // Interaction Handlers
    const handleInteractionStart = () => {
        if (phase !== 'interactive' || isComplete) return;
        targetSpeedRef.current = 0.5; // Turbo speed
        setIsTurbo(true);
    };

    const handleInteractionEnd = () => {
        if (phase !== 'interactive' || isComplete) return;
        targetSpeedRef.current = 0.05; // Base speed
        setIsTurbo(false);
    };

    const [isTurbo, setIsTurbo] = useState(false);

    return (
        <>
            {/* 🔹 Background Layer (Persistent) */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ position: 'fixed', inset: 0, zIndex: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'interactive' ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <Hyperspeed effectOptions={hyperspeedPresets.one} isTurbo={isTurbo} />
            </motion.div>

            {/* 🔹 Foreground Layer (UI Overlay) */}
            {/* We attach handlers here to capture interaction anywhere on screen */}
            <div
                className="fixed inset-0 z-[1] flex flex-col items-center justify-center select-none"
                onMouseDown={handleInteractionStart}
                onMouseUp={handleInteractionEnd}
                onTouchStart={handleInteractionStart}
                onTouchEnd={handleInteractionEnd}
                onMouseLeave={handleInteractionEnd}
                style={{ cursor: phase === 'interactive' ? 'pointer' : 'default' }}
            >
                <AnimatePresence mode="wait">

                    {/* Phase 1: Logo Split Animation */}
                    {phase === 'logo' && !isComplete && (
                        <motion.div
                            key="logo-phase"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            className="flex items-center justify-center relative w-full h-full"
                        >
                            <motion.div
                                animate={{ opacity: splitActive ? 0 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                <ElectricBorder
                                    color="#D500F9"
                                    speed={2}
                                    chaos={0.3}
                                    thickness={4}
                                    style={{ borderRadius: 9999, opacity: splitActive ? 0 : 1 }}
                                    className="scale-125" // Make border slightly larger than the splitting logo
                                >
                                    <div className="w-64 h-64" />
                                </ElectricBorder>
                            </motion.div>

                            {/* Left Half */}
                            <motion.div
                                className="absolute"
                                initial={{ x: 0, opacity: 1 }}
                                animate={splitActive ? { x: -200, opacity: 0 } : { x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "backIn" }}
                                style={{ clipPath: 'inset(0 50% 0 0)' }}
                            >
                                <img
                                    src={magnusLogo}
                                    alt="Magnus Logo Left"
                                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                                />
                            </motion.div>

                            {/* Right Half */}
                            <motion.div
                                className="absolute"
                                initial={{ x: 0, opacity: 1 }}
                                animate={splitActive ? { x: 200, opacity: 0 } : { x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "backIn" }}
                                style={{ clipPath: 'inset(0 0 0 50%)' }}
                            >
                                <img
                                    src={magnusLogo}
                                    alt="Magnus Logo Right"
                                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                                />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Phase 2: Title + CTA + Loading Bar */}
                    {phase === 'interactive' && !isComplete && (
                        <motion.div
                            key="interactive-phase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center w-full max-w-4xl px-4"
                        >
                            {/* Title "MAGNUS 2026" */}
                            <div className="relative mb-8">
                                <h1
                                    className="text-6xl md:text-9xl text-white tracking-widest font-bold text-center"
                                    style={{
                                        fontFamily: 'VT323, monospace',
                                        textShadow: '0 0 30px rgba(213, 0, 249, 0.4)'
                                    }}
                                >
                                    MAGNUS <span className="text-[#D500F9]">2026</span>
                                </h1>
                            </div>

                            {/* CTA */}
                            <motion.p
                                className="text-white/60 text-sm md:text-base mb-6 font-mono tracking-wider"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                [ Click and hold to accelerate ]
                            </motion.p>

                            {/* Subtle Loading Bar */}
                            <div className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 bg-[#D500F9] shadow-[0_0_10px_#D500F9]"
                                    style={{ width: `${progress}%` }}
                                    transition={{ type: 'tween', ease: 'linear', duration: 0 }} // Updated via state, instant render
                                />
                            </div>

                            <div className="mt-2 font-mono text-xs text-white/40">
                                {Math.floor(progress)}%
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

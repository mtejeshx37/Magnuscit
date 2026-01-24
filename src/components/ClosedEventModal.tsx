import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ClosedEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        title: string;
        contact: string;
    };
}

export function ClosedEventModal({ isOpen, onClose, event }: ClosedEventModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#D500F9]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(213,0,249,0.2)]"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D500F9]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7000FF]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-50 cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>

                            {/* Title */}
                            <h2
                                className="text-4xl md:text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70"
                                style={{ fontFamily: 'VT323, monospace' }}
                            >
                                REGISTRATION CLOSED
                            </h2>

                            <h3
                                className="text-2xl md:text-3xl mb-8 text-[#D500F9]"
                                style={{ fontFamily: 'VT323, monospace' }}
                            >
                                {event.title}
                            </h3>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent mb-8" />

                            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                                The registration for this event has been closed. If you have any queries, please contact the event coordinators below.
                            </p>

                            {/* Contact Info */}
                            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h4
                                    className="text-xl mb-4 text-[#D500F9] uppercase tracking-wider"
                                    style={{ fontFamily: 'VT323, monospace' }}
                                >
                                    Contact Coordinators
                                </h4>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="flex items-center gap-3 text-white/90">
                                        <Phone className="w-5 h-5 text-[#D500F9]" />
                                        <div className="flex flex-col gap-1 items-center">
                                            {event.contact.split(',').map((contact, index) => (
                                                <span key={index} className="text-lg md:text-xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                                    {contact.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Close Action */}
                            <button
                                onClick={onClose}
                                className="mt-8 px-8 py-3 bg-gradient-to-r from-[#D500F9] to-[#7000FF] rounded-xl text-white font-bold tracking-wide shadow-lg shadow-[#D500F9]/25 hover:shadow-[#D500F9]/40 hover:scale-105 transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                View Event Details
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

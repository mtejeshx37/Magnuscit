import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MatrixLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Fades out after 2.5s
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="ai-matrix-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="digit">0</div>
                    <div className="digit">1</div>
                    <div className="digit">0</div>
                    <div className="digit">1</div>
                    <div className="digit">1</div>
                    <div className="digit">0</div>
                    <div className="digit">0</div>
                    <div className="digit">1</div>
                    <div className="glow"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

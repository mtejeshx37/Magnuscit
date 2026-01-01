import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElementBounds, setHoveredElementBounds] = useState({
    width: 32,
    height: 32,
    x: 0,
    y: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on mobile/touch devices
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

    if (isMobile()) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-enabled');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        const element = target.closest('button') || target.closest('a') || target;
        const rect = element.getBoundingClientRect();
        setHoveredElementBounds({
          width: rect.width + 8,
          height: rect.height + 8,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  if (!isVisible) return null;

  const width = isHovering ? hoveredElementBounds.width : 32;
  const height = isHovering ? hoveredElementBounds.height : 32;
  const targetX = isHovering ? hoveredElementBounds.x : mousePosition.x;
  const targetY = isHovering ? hoveredElementBounds.y : mousePosition.y;

  const bracketLength = 12;
  const dotSize = isHovering ? 8 : 5;

  // White base colors; mix-blend-mode: difference will invert them
  const cursorColor = '#FFFFFF';
  const accentColor = '#00F0FF';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'difference' }}
      animate={{
        x: targetX - width / 2,
        y: targetY - height / 2,
        width: width,
        height: height,
        rotate: !isHovering ? 360 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        y: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        width: { type: "spring", stiffness: 400, damping: 30 },
        height: { type: "spring", stiffness: 400, damping: 30 },
        rotate: !isHovering ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Top-Left Bracket */}
      <div className="absolute" style={{ top: 0, left: 0 }}>
        <svg width={bracketLength} height={bracketLength} viewBox="0 0 12 12">
          <path d="M 12 3 L 12 0 L 0 0 L 0 12 L 3 12" fill="none" stroke={cursorColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Top-Right Bracket */}
      <div className="absolute" style={{ top: 0, right: 0 }}>
        <svg width={bracketLength} height={bracketLength} viewBox="0 0 12 12">
          <path d="M 0 3 L 0 0 L 12 0 L 12 12 L 9 12" fill="none" stroke={cursorColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Bottom-Left Bracket */}
      <div className="absolute" style={{ bottom: 0, left: 0 }}>
        <svg width={bracketLength} height={bracketLength} viewBox="0 0 12 12">
          <path d="M 12 9 L 12 12 L 0 12 L 0 0 L 3 0" fill="none" stroke={cursorColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Bottom-Right Bracket */}
      <div className="absolute" style={{ bottom: 0, right: 0 }}>
        <svg width={bracketLength} height={bracketLength} viewBox="0 0 12 12">
          <path d="M 0 9 L 0 12 L 12 12 L 12 0 L 9 0" fill="none" stroke={cursorColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Center Dot */}
      <motion.div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? accentColor : cursorColor,
          boxShadow: isHovering
            ? `0 0 12px ${accentColor}, 0 0 24px ${accentColor}cc, 0 0 36px ${accentColor}99`
            : `0 0 4px ${cursorColor}99`,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div style={{ width: dotSize, height: dotSize, borderRadius: '50%' }} />
      </motion.div>
    </motion.div>
  );
}
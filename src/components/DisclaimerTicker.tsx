import { motion } from 'motion/react';

export function DisclaimerTicker() {
  const text =
    'Learn. Build. Compete. Every event is FREE';

  const CYAN = '#00E5FF';

  return (
    <div
      className="relative w-full z-40 bg-black/95 backdrop-blur-md
                 border-b border-cyan-400/30 py-0 overflow-hidden whitespace-nowrap
                 shadow-[0_6px_40px_rgba(0,229,255,0.15)]"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={`${group}-${i}`}
                className="flex items-center gap-6 px-10"
              >
                <span
                  className="text-sm opacity-60"
                  style={{ color: CYAN }}
                >
                  •
                </span>

                <span
                  className="text-lg"
                  style={{
                    color: CYAN,
                    textShadow:
                      '0 0 8px rgba(0,229,255,0.9)',
                  }}
                >
                  ⚡
                </span>

                <span
                  className="font-mono text-xs md:text-sm font-black uppercase tracking-[0.3em]"
                  style={{
                    color: CYAN,
                    textShadow: `
                      0 0 6px rgba(0,229,255,0.5),
                      0 0 14px rgba(0,229,255,0.7),
                      0 0 28px rgba(0,229,255,0.6)
                    `,
                  }}
                >
                  {text}
                </span>

                <span
                  className="text-lg"
                  style={{
                    color: CYAN,
                    textShadow:
                      '0 0 8px rgba(0,229,255,0.9)',
                  }}
                >
                  ⚡
                </span>

                <span
                  className="text-sm opacity-60"
                  style={{ color: CYAN }}
                >
                  •
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

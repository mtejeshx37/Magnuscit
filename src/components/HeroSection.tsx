import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';


export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 30,
    seconds: 15,
  });

  useEffect(() => {
    const targetDate = new Date('2026-02-02T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="home">
      {/* Background Image */}
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/Magnus_Home.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto w-full"
        >
          {/* Event Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-3 px-6 py-3 glass-strong rounded-3xl md:rounded-full border border-[#7000FF]/40 mb-8 md:mb-12 max-w-[90vw]"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D500F9]" />
              <span className="text-sm md:text-base text-white">February 02nd, 2026</span>
            </div>
            <span className="hidden md:inline text-[#D500F9]">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D500F9]" />
              <span className="text-sm md:text-base text-white text-center">Chennai Institute of Technology</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 md:mb-6"
          >
            <h1
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-wider mb-4 relative glitch-text neon-glow-text"
              data-text="MAGNUS 2K26"
              style={{
                fontFamily: 'VT323, monospace',
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              MAGNUS 2K26
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-xl md:text-2xl text-[#94A3B8] mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Department of AI & ML • Where Innovation Meets Intelligence
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12 w-full"
          >
            <div className="relative inline-block max-w-full">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7000FF]/30 via-[#D500F9]/30 to-[#D500F9]/30 blur-2xl rounded-3xl" />

              <div className="relative glass-strong rounded-3xl px-4 py-6 md:px-12 md:py-8 border-2 border-[#D500F9]/40 w-full overflow-x-auto">
                <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-12">
                  {/* Days */}
                  <div className="text-center min-w-[60px]">
                    <div
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(213, 0, 249, 0.8), 0 0 40px rgba(213, 0, 249, 0.6)',
                      }}
                    >
                      {formatNumber(timeLeft.days)}
                    </div>
                    <div className="text-[10px] sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>Days</div>
                  </div>

                  <span className="text-2xl sm:text-4xl pb-4 sm:pb-0" style={{ color: '#FFFFFF' }}>:</span>

                  {/* Hours */}
                  <div className="text-center min-w-[60px]">
                    <div
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(213, 0, 249, 0.8), 0 0 40px rgba(213, 0, 249, 0.6)',
                      }}
                    >
                      {formatNumber(timeLeft.hours)}
                    </div>
                    <div className="text-[10px] sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>Hrs</div>
                  </div>

                  <span className="text-2xl sm:text-4xl pb-4 sm:pb-0" style={{ color: '#FFFFFF' }}>:</span>

                  {/* Minutes */}
                  <div className="text-center min-w-[60px]">
                    <div
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(213, 0, 249, 0.8), 0 0 40px rgba(213, 0, 249, 0.6)',
                      }}
                    >
                      {formatNumber(timeLeft.minutes)}
                    </div>
                    <div className="text-[10px] sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>Mins</div>
                  </div>

                  <span className="text-2xl sm:text-4xl pb-4 sm:pb-0" style={{ color: '#FFFFFF' }}>:</span>

                  {/* Seconds */}
                  <div className="text-center min-w-[60px]">
                    <div
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(213, 0, 249, 0.8), 0 0 40px rgba(213, 0, 249, 0.6)',
                      }}
                    >
                      {formatNumber(timeLeft.seconds)}
                    </div>
                    <div className="text-[10px] sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>Secs</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          {/*<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const scheduleSection = document.getElementById('schedule');
                if (scheduleSection) {
                  scheduleSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-10 py-4 bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] rounded-2xl hover:shadow-2xl hover:shadow-[#00D9FF]/60 transition-all duration-300 relative overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2 text-black text-lg" style={{ fontFamily: 'VT323, monospace' }}>
                View Schedule
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </motion.button>
          </motion.div>*/}
        </motion.div>
      </div>
    </div>
  );
}
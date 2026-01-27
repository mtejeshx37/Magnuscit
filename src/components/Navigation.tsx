import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
const logo = "/logo-v2.png";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerText, setRegisterText] = useState("REGISTER");
  const [isHoveringRegister, setIsHoveringRegister] = useState(false);

  // Binary Decode Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveringRegister) {
      let iteration = 0;
      const originalText = "REGISTER";
      const duration = 700; // 0.7 seconds
      const totalSteps = originalText.length * 2; // derived from iteration += 1/2
      const intervalTime = duration / totalSteps;

      interval = setInterval(() => {
        setRegisterText(
          originalText
            .split("")
            .map((_char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return Math.random() > 0.5 ? "1" : "0";
            })
            .join("")
        );

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, intervalTime);
    } else {
      setRegisterText("REGISTER");
    }

    return () => clearInterval(interval);
  }, [isHoveringRegister]);

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Prime Directives', href: '/#prime-directives' },
    { label: 'About Us', href: '/#about-us' },
    //{ label: 'Schedule', href: '/#schedule' },
    { label: 'Events', href: '/events' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#00D1FF]/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4" style={{ height: '80px' }}>

          {/* LEFT: Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="Magnus Logo"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 209, 255, 0.6))', // Neon Blue Glow
                }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl tracking-wider"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#00D1FF',
                  letterSpacing: '0.05em',
                  textShadow: '0 0 10px rgba(0, 209, 255, 0.4)'
                }}
              >
                MAGNUS
              </span>
              <span
                className="text-lg tracking-wider"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '0.1em'
                }}
              >
                2K26
              </span>
            </div>
          </motion.div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer text-white/80 hover:text-[#00D1FF] transition-colors duration-300 relative group text-sm uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* RIGHT: Register Button (Desktop) */}
          <div className="hidden md:block">
            <motion.a
              href="#prime-directives"
              className="relative px-6 py-2 overflow-hidden group flex items-center justify-center font-bold tracking-widest text-[#BD00FF]"
              style={{ fontFamily: 'JetBrains Mono, monospace', border: '1px solid transparent' }}
              onMouseEnter={() => setIsHoveringRegister(true)}
              onMouseLeave={() => setIsHoveringRegister(false)}
            >
              <div className="absolute inset-0 border border-transparent bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 rounded-sm p-[1px] bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] mask-linear-gradient">
                <div className="h-full w-full bg-black/90"></div>
              </div>
              <div className="absolute inset-0 border border-[#00D1FF] opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(189,0,255,0.5)] transition-all duration-300 transform skew-x-12 scale-95" />

              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {registerText}
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00D1FF] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-6 space-y-4 border-t border-[#00D1FF]/10"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/80 hover:text-[#00D1FF] transition-colors duration-300 py-3 text-center tracking-widest border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#prime-directives"
                className="block text-[#BD00FF] font-bold hover:text-white transition-colors duration-300 py-3 text-center tracking-widest bg-[#BD00FF]/10 mt-4"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                REGISTER
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

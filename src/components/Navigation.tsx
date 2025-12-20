import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import magnusLogo from '../assets/dcd52a646246e269b48a4c5ca73dde025ecb3e39.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Events', href: '#events' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-[#D500F9]/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4" style={{ height: '80px' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 cursor-pointer"
          >
            {/* Magnus Logo Image */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <img
                src={magnusLogo}
                alt="Magnus Logo"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(213, 0, 249, 0.6))',
                }}
              />
            </div>

            {/* MAGNUS 2K26 Text */}
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl tracking-wider neon-glow-text"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#D500F9',
                  letterSpacing: '0.05em'
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-target text-white hover:text-[#D500F9] transition-colors duration-300 relative group"
              >
                <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D500F9] to-[#7000FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-white hover:text-[#D500F9] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{link.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
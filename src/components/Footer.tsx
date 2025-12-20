import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Footer Bottom */}
      <div className="border-t border-[#D500F9]/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* MAGNUS 2K26 Branding */}
            <div className="text-center md:text-left">
              <div className="mb-4">
                <h2 className="text-5xl md:text-6xl" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.05em' }}>
                  <span className="text-[#D500F9] neon-glow-text">MAGNUS</span>
                </h2>
                <h3 className="text-3xl md:text-4xl mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
                  <span className="text-white">2K26</span>
                </h3>
              </div>
            </div>

            {/* Department Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'VT323, monospace' }}>
                Department of AI & ML
              </h3>
              <p className="text-[#94A3B8]">Chennai Institute of Technology</p>

            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass w-12 h-12 rounded-xl flex items-center justify-center border border-[#D500F9]/20 hover:border-[#D500F9]/50 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#94A3B8] group-hover:text-[#D500F9] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tech Stack Info */}
          <div className="mt-8 pt-6 border-t border-[#D500F9]/10 text-center">
            <p className="text-sm text-[#94A3B8] font-bold">
              © 2026 Magnus 2K26. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
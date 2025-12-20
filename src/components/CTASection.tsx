import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

export function CTASection() {
  return (
    <div className="py-20 relative" id="register">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D500F9]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7000FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Rocket className="w-16 h-16 text-[#D500F9] mx-auto mb-4" />
            <h2 className="text-5xl md:text-6xl mb-4 text-white" style={{ fontFamily: 'VT323, monospace' }}>
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]">Deploy</span>?
            </h2>
            <p className="text-xl text-[#94A3B8] mb-8">
              Join the future of AI & Machine Learning. Your journey to innovation starts here.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const eventsSection = document.getElementById('events');
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="cursor-target inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] rounded-2xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative text-black text-xl" style={{ fontFamily: 'VT323, monospace' }}>
              Initialize Registration
            </span>
            <Rocket className="relative w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
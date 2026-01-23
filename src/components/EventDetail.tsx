import { motion } from 'motion/react';
import { ArrowLeft, Phone, ShoppingCart, Check, Trophy, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface EventDetailProps {
  event: {
    id: number;
    title: string;
    type: string;
    price: string;
    description: string;
    registrationRules: string[];
    eventRules?: string[];
    contact: string;
    registrationLink?: string;
    rewards?: {
      winner?: string;
      runner?: string;
      first?: string;
      second?: string;
      third?: string;
      internship?: string;
    };
  };
  onBack: () => void;
}

export function EventDetail({ event, onBack }: EventDetailProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(event.id);

  // Extract numeric value from price string (e.g., "₹150" -> 150)
  const priceValue = parseInt(event.price.replace(/[^\d]/g, ''));

  const handleAddToCart = () => {
    addToCart({
      id: event.id,
      title: event.title,
      type: event.type,
      price: event.price,
      priceValue: priceValue,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#7000FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D500F9]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="cursor-target mb-8 flex items-center gap-2 px-6 py-3 glass-strong rounded-2xl border border-[#D500F9]/30 hover:border-[#D500F9]/60 transition-all text-white group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Back to Content</span>
        </motion.button>

        {/* Event Title & Type */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <h1
              className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] via-[#7000FF] to-[#D500F9]"
              style={{ fontFamily: 'VT323, monospace', fontWeight: 900 }}
            >
              {event.title}
            </h1>
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-[#7000FF] to-[#9000FF] rounded-2xl shadow-lg shadow-[#7000FF]/50 neon-glow">
              <span className="text-white text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {event.type}
              </span>
            </div>
          </div>

          <p className="text-lg text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </motion.div>

        {/* Rewards & Recognition Section */}
        {event.rewards && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="glass-strong rounded-2xl p-8 border border-yellow-400/20 relative overflow-hidden group">
              {/* Animated Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-yellow-400/10 transition-colors duration-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <h2
                      className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase"
                      style={{ fontFamily: 'VT323, monospace' }}
                    >
                      Rewards & Recognition
                    </h2>
                  </div>

                  {event.rewards.internship && (
                    <div className="flex items-center gap-3 text-[#00D9FF] bg-[#00D9FF]/10 px-4 py-2 rounded-xl border border-[#00D9FF]/20 w-fit mb-6">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold tracking-wide uppercase text-sm">
                        {event.rewards.internship}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(event.rewards.winner || event.rewards.first) && (
                      <div className="bg-white/5 border border-yellow-400/30 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold text-xl">1</div>
                        <div>
                          <p className="text-yellow-400/60 text-xs uppercase font-bold tracking-widest">First Prize</p>
                          <p className="text-white text-xl font-bold font-mono">{event.rewards.winner || event.rewards.first}</p>
                        </div>
                      </div>
                    )}
                    {(event.rewards.runner || event.rewards.second) && (
                      <div className="bg-white/5 border border-slate-400/30 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-300 font-bold text-xl">2</div>
                        <div>
                          <p className="text-slate-400/60 text-xs uppercase font-bold tracking-widest">Second Prize</p>
                          <p className="text-white text-xl font-bold font-mono">{event.rewards.runner || event.rewards.second}</p>
                        </div>
                      </div>
                    )}
                    {event.rewards.third && (
                      <div className="bg-white/5 border border-amber-800/30 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-800/20 flex items-center justify-center text-amber-600 font-bold text-xl">3</div>
                        <div>
                          <p className="text-amber-800/60 text-xs uppercase font-bold tracking-widest">Third Prize</p>
                          <p className="text-white text-xl font-bold font-mono">{event.rewards.third}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Registration & Rules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Registration Rules */}
          <div className="glass-strong rounded-2xl p-8 border border-[#D500F9]/30">
            <h2
              className="text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              REGISTRATION
            </h2>
            <div className="space-y-4">
              {event.registrationRules.map((rule, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-[#D500F9] flex-shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {index + 1}.
                  </span>
                  <p className="text-white leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Rules */}
          {event.eventRules && event.eventRules.length > 0 && (
            <div className="glass-strong rounded-2xl p-8 border border-[#7000FF]/30">
              <h2
                className="text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] to-[#D500F9]"
                style={{ fontFamily: 'VT323, monospace' }}
              >
                RULES
              </h2>
              <div className="space-y-4">
                {event.eventRules.map((rule, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-[#7000FF] flex-shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {index + 1}.
                    </span>
                    <p className="text-white leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-8 border border-[#D500F9]/30 mb-8"
        >
          <h2
            className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]"
            style={{ fontFamily: 'VT323, monospace' }}
          >
            CONTACT US!!
          </h2>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#D500F9] mt-1" />
            <div className="flex flex-col gap-1">
              {event.contact.split(',').map((contact, index) => (
                <span key={index} className="text-white text-xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {contact.trim()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          {event.registrationLink ? (
            <motion.a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-target cursor-pointer inline-flex items-center gap-3 px-16 py-5 bg-gradient-to-r from-[#D500F9] to-[#9000FF] rounded-2xl shadow-2xl shadow-[#D500F9]/60 hover:shadow-[#D500F9]/80 transition-all duration-300 text-black text-xl group relative overflow-hidden neon-glow"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">REGISTER NOW {event.price ? `• ${event.price}` : ''}</span>
            </motion.a>
          ) : event.type.toUpperCase() === 'WORKSHOP' ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-16 py-5 bg-gradient-to-r from-[#D500F9] to-[#9000FF] rounded-2xl shadow-2xl shadow-[#D500F9]/60 hover:shadow-[#D500F9]/80 transition-all duration-300 text-black text-xl group relative overflow-hidden neon-glow cursor-default"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">REGISTER NOW</span>
            </motion.div>
          ) : inCart ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-16 py-5 bg-gradient-to-r from-[#00F0FF] to-[#0080FF] rounded-2xl shadow-2xl shadow-[#00F0FF]/60 text-black text-xl"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              <Check className="w-6 h-6" />
              <span>ADDED TO CART</span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="cursor-target inline-flex items-center gap-3 px-16 py-5 bg-gradient-to-r from-[#D500F9] to-[#9000FF] rounded-2xl shadow-2xl shadow-[#D500F9]/60 hover:shadow-[#D500F9]/80 transition-all duration-300 text-black text-xl group relative overflow-hidden neon-glow"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ShoppingCart className="w-6 h-6 relative" />
              <span className="relative">REGISTER NOW • {event.price}</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
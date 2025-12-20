import { motion } from 'motion/react';
import { ArrowLeft, Phone, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface EventDetailProps {
  event: {
    id: number;
    title: string;
    type: string;
    price: string;
    description: string;
    registrationRules: string[];
    eventRules: string[];
    contact: string;
    registrationLink?: string;
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
          className="mb-8 flex items-center gap-2 px-6 py-3 glass-strong rounded-2xl border border-[#D500F9]/30 hover:border-[#D500F9]/60 transition-all text-white group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Back to Events</span>
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

          <p className="text-lg text-[#94A3B8] leading-relaxed">
            {event.description}
          </p>
        </motion.div>

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
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#D500F9]" />
            <span className="text-white text-xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {event.contact}
            </span>
          </div>
        </motion.div>

        {/* Register Button */}
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
              className="cursor-pointer inline-flex items-center gap-3 px-16 py-5 bg-gradient-to-r from-[#D500F9] to-[#9000FF] rounded-2xl shadow-2xl shadow-[#D500F9]/60 hover:shadow-[#D500F9]/80 transition-all duration-300 text-black text-xl group relative overflow-hidden neon-glow"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">REGISTER NOW</span>
            </motion.a>
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
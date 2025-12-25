import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';


interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}



export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, totalPrice, cartCount } = useCart();


  const handleProceedToPayment = () => {
    alert('Online registration is currently unavailable. Please contact the coordinators.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l-2 border-[#D500F9]/30 shadow-2xl shadow-[#D500F9]/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative px-6 py-6 border-b border-[#D500F9]/20">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D500F9]/10 rounded-full blur-3xl -z-10" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D500F9] to-[#7000FF] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h2
                      className="text-3xl text-white"
                      style={{ fontFamily: 'VT323, monospace' }}
                    >
                      YOUR CART
                    </h2>
                    <p
                      className="text-[#D500F9] text-sm"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {cartCount} {cartCount === 1 ? 'event' : 'events'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-target w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-[#D500F9]/50 transition-all duration-300 group"
                >
                  <X className="w-5 h-5 text-white/60 group-hover:text-[#D500F9] transition-colors" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-[#D500F9]/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-[#D500F9]/40" />
                  </div>
                  <h3
                    className="text-2xl text-white/60 mb-2"
                    style={{ fontFamily: 'VT323, monospace' }}
                  >
                    YOUR CART IS EMPTY
                  </h3>
                  <p
                    className="text-white/40 text-sm"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Add some amazing events to get started!
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D500F9] to-[#7000FF] rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />

                    {/* Cart Item Card */}
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl p-4 border border-[#D500F9]/20 group-hover:border-[#D500F9]/40 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3
                            className="text-xl text-white mb-1"
                            style={{ fontFamily: 'VT323, monospace' }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="text-[#D500F9]/70 text-xs mb-2"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            {item.type}
                          </p>
                          <p
                            className="text-white text-lg"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            {item.price}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cursor-target w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group/btn"
                        >
                          <Trash2 className="w-4 h-4 text-red-400 group-hover/btn:text-red-300 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with Total & Checkout */}
            {cartItems.length > 0 && (
              <div className="relative px-6 py-6 border-t border-[#D500F9]/20 bg-black/50 backdrop-blur-sm">
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#D500F9] to-transparent" />

                {/* Total */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-white/60 text-lg"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Total Amount
                  </span>
                  <div className="text-right">
                    <p
                      className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]"
                      style={{ fontFamily: 'VT323, monospace' }}
                    >
                      ₹{totalPrice}
                    </p>
                    <p
                      className="text-[#D500F9]/60 text-xs"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      for {cartCount} {cartCount === 1 ? 'event' : 'events'}
                    </p>
                  </div>
                </div>

                {/* Proceed to Payment Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToPayment}
                  className="cursor-target w-full px-6 py-4 bg-gradient-to-r from-[#D500F9] via-[#9000FF] to-[#7000FF] rounded-xl shadow-lg shadow-[#D500F9]/40 hover:shadow-[#D500F9]/60 transition-all duration-300 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Animated Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                  <div className="relative flex items-center justify-center gap-3">
                    <CreditCard className="w-5 h-5 text-black" />
                    <span
                      className="text-black text-xl"
                      style={{ fontFamily: 'VT323, monospace' }}
                    >
                      PROCEED TO PAYMENT
                    </span>
                  </div>
                </motion.button>


              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: 'Hello! I&apos;m your AI assistant. How can I help you with the symposium?', isBot: true },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our events section.', 
        isBot: true 
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-full shadow-2xl shadow-[#00F0FF]/50 flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="glass-strong rounded-2xl overflow-hidden border border-[#00F0FF]/30 shadow-2xl">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#00F0FF] to-[#7000FF] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      AI Assistant
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-black/80">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#050505]/50">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.isBot
                          ? 'glass border border-[#00F0FF]/20 text-white'
                          : 'bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-black'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-[#00F0FF]/20 bg-black/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-[#00F0FF]/20 rounded-xl px-4 py-2 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="p-2 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-xl hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all"
                  >
                    <Send className="w-5 h-5 text-black" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

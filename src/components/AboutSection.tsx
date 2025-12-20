import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

export function AboutSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 87) return 87;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#020617] to-[#050505]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7000FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D500F9]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl mb-6 text-white" style={{ fontFamily: 'VT323, monospace' }}>
              The Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]">Evolution</span>
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">
              Join us for the most anticipated AI & Machine Learning symposium of 2026. Experience cutting-edge 
              research, hands-on workshops, and competitive challenges that will push the boundaries of what&apos;s 
              possible. Connect with industry leaders, showcase your innovations, and be part of the future of AI.
            </p>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              From neural networks to robotics, from generative AI to real-world applications—this is where 
              tomorrow&apos;s breakthroughs begin. Are you ready to train the future?
            </p>
          </motion.div>

          {/* Right Side - Terminal Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-strong rounded-2xl overflow-hidden border border-[#D500F9]/30">
              {/* Terminal Header */}
              <div className="bg-black/50 px-4 py-3 flex items-center gap-2 border-b border-[#D500F9]/30">
                <Terminal className="w-4 h-4 text-[#D500F9]" />
                <span className="text-sm text-[#94A3B8]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  neural_network_trainer.py
                </span>
                <div className="ml-auto flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#7000FF]">
                    <span className="text-[#D500F9]">{'>>>'}</span> import tensorflow as tf
                  </div>
                  <div className="text-[#7000FF]">
                    <span className="text-[#D500F9]">{'>>>'}</span> import numpy as np
                  </div>
                  <div className="text-[#7000FF]">
                    <span className="text-[#D500F9]">{'>>>'}</span> from keras.models import Sequential
                  </div>
                  <div className="h-4" />
                  <div className="text-[#94A3B8]"># Initializing neural network...</div>
                  <div className="text-white">
                    <span className="text-[#D500F9]">{'>>>'}</span> model = Sequential()
                  </div>
                  <div className="text-white">
                    <span className="text-[#D500F9]">{'>>>'}</span> model.add(Dense(128, activation=&apos;relu&apos;))
                  </div>
                  <div className="text-white">
                    <span className="text-[#D500F9]">{'>>>'}</span> model.compile(optimizer=&apos;adam&apos;)
                  </div>
                  <div className="h-4" />
                  <div className="text-[#94A3B8]"># Training model...</div>
                  <div className="text-white">
                    <span className="text-[#D500F9]">{'>>>'}</span> model.train()
                  </div>
                  <div className="h-4" />
                  
                  {/* Progress Bar */}
                  <div className="bg-black/50 rounded-lg p-4 border border-[#D500F9]/20">
                    <div className="flex justify-between text-xs text-[#94A3B8] mb-2">
                      <span>Training Progress</span>
                      <span className="text-[#D500F9]">{progress}%</span>
                    </div>
                    <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#D500F9] to-[#7000FF] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="mt-3 space-y-1 text-xs">
                      <div className="text-green-400">✓ Epoch 1/10 - loss: 0.234</div>
                      <div className="text-green-400">✓ Epoch 2/10 - loss: 0.189</div>
                      <div className="text-green-400">✓ Epoch 3/10 - loss: 0.156</div>
                      <div className="text-[#D500F9] animate-pulse">▸ Epoch 4/10 - processing...</div>
                    </div>
                  </div>

                  <div className="h-4" />
                  <div className="text-green-400 flex items-center gap-2">
                    <span className="animate-pulse">●</span>
                    <span>System Ready - Awaiting Input</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
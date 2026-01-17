import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function IntroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-center space-y-3 mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          Samuel McFarlane
        </span>
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        Dynamic Project Universe
      </h2>
      
      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
        Orbiting ecosystem for connected solutions
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 text-sm text-cyan-400"
      >
        <Sparkles className="w-4 h-4" />
        <span>Click any planet to explore • Watch them orbit in real-time</span>
      </motion.div>
    </motion.div>
  );
}
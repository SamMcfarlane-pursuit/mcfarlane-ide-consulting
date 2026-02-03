import React from 'react';
import { motion } from 'framer-motion';

// Categories that match actual project data
const techCategories = [
    { id: 'web', label: 'Web & Interactive', icon: '🌐' },
    { id: 'dataviz', label: 'Data Visualization', icon: '📊' },
    { id: 'ai', label: 'AI / Machine Learning', icon: '🤖' },
    { id: 'ui', label: 'UI Design', icon: '🎨' },
    { id: 'webgl', label: 'WebGL / Three.js', icon: '🔮' },
];

// Unified amber/gold theme styling
const chipStyles = `
    hover:bg-amber-500/20 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-500/15
    data-[active=true]:bg-gradient-to-r data-[active=true]:from-amber-500/25 data-[active=true]:to-yellow-500/15 
    data-[active=true]:border-amber-400/60 data-[active=true]:text-amber-100 
    data-[active=true]:shadow-lg data-[active=true]:shadow-amber-500/20
`;


export default function TechStackFilter({ selectedCategory, onCategoryChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 px-4"
        >
            {/* All button */}
            <button
                onClick={() => onCategoryChange(null)}
                data-active={!selectedCategory}
                className={`
          px-4 py-2 rounded-full text-sm font-medium
          border border-white/10 bg-white/5 text-gray-400
          backdrop-blur-sm transition-all duration-300
          hover:bg-white/10 hover:border-white/20 hover:text-white
          data-[active=true]:bg-white/15 data-[active=true]:border-white/30 data-[active=true]:text-white
        `}
            >
                All
            </button>

            {/* Category chips */}
            {techCategories.map((cat, index) => (
                <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    onClick={() => onCategoryChange(cat.id === selectedCategory ? null : cat.id)}
                    data-active={selectedCategory === cat.id}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium
            border border-white/10 bg-white/5 text-gray-400
            backdrop-blur-sm transition-all duration-300
            flex items-center gap-2
            ${chipStyles}
          `}
                >
                    <span className="opacity-70">{cat.icon}</span>
                    {cat.label}
                </motion.button>
            ))}
        </motion.div>
    );
}

export { techCategories };

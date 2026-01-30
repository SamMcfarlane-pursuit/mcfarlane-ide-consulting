import React from 'react';
import { motion } from 'framer-motion';

const techCategories = [
    { id: 'web', label: 'Web & Interactive', color: 'amber' },
    { id: 'scroll', label: 'Scrolling', color: 'yellow' },
    { id: 'dataviz', label: 'Data Visualization', color: 'emerald' },
    { id: 'audio', label: 'Sound & Audio', color: 'pink' },
    { id: 'gesture', label: 'Gestures / Interaction', color: 'orange' },
    { id: 'ixd', label: 'Interaction Design', color: 'blue' },
    { id: 'ui', label: 'UI Design', color: 'violet' },
    { id: 'webgl', label: 'WebGL / Three.js', color: 'teal' },
];

const colorClasses = {
    amber: 'hover:bg-amber-500/30 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-amber-500/30 data-[active=true]:to-yellow-500/20 data-[active=true]:border-amber-400/70 data-[active=true]:text-amber-200 data-[active=true]:shadow-lg data-[active=true]:shadow-amber-500/25',
    yellow: 'hover:bg-yellow-500/30 hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-yellow-500/30 data-[active=true]:to-amber-500/20 data-[active=true]:border-yellow-400/70 data-[active=true]:text-yellow-200 data-[active=true]:shadow-lg data-[active=true]:shadow-yellow-500/25',
    purple: 'hover:bg-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/30 data-[active=true]:to-pink-500/20 data-[active=true]:border-purple-400/70 data-[active=true]:text-purple-200 data-[active=true]:shadow-lg data-[active=true]:shadow-purple-500/25',
    emerald: 'hover:bg-emerald-500/30 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-emerald-500/30 data-[active=true]:to-teal-500/20 data-[active=true]:border-emerald-400/70 data-[active=true]:text-emerald-200 data-[active=true]:shadow-lg data-[active=true]:shadow-emerald-500/25',
    pink: 'hover:bg-pink-500/30 hover:border-pink-400/60 hover:shadow-lg hover:shadow-pink-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-500/30 data-[active=true]:to-rose-500/20 data-[active=true]:border-pink-400/70 data-[active=true]:text-pink-200 data-[active=true]:shadow-lg data-[active=true]:shadow-pink-500/25',
    orange: 'hover:bg-orange-500/30 hover:border-orange-400/60 hover:shadow-lg hover:shadow-orange-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-500/30 data-[active=true]:to-amber-500/20 data-[active=true]:border-orange-400/70 data-[active=true]:text-orange-200 data-[active=true]:shadow-lg data-[active=true]:shadow-orange-500/25',
    blue: 'hover:bg-blue-500/30 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500/30 data-[active=true]:to-cyan-500/20 data-[active=true]:border-blue-400/70 data-[active=true]:text-blue-200 data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/25',
    violet: 'hover:bg-violet-500/30 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-violet-500/30 data-[active=true]:to-purple-500/20 data-[active=true]:border-violet-400/70 data-[active=true]:text-violet-200 data-[active=true]:shadow-lg data-[active=true]:shadow-violet-500/25',
    teal: 'hover:bg-teal-500/30 hover:border-teal-400/60 hover:shadow-lg hover:shadow-teal-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-500/30 data-[active=true]:to-cyan-500/20 data-[active=true]:border-teal-400/70 data-[active=true]:text-teal-200 data-[active=true]:shadow-lg data-[active=true]:shadow-teal-500/25',
};

export default function TechStackFilter({ selectedCategory, onCategoryChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
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
                    transition={{ delay: 1.3 + index * 0.05 }}
                    onClick={() => onCategoryChange(cat.id === selectedCategory ? null : cat.id)}
                    data-active={selectedCategory === cat.id}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium
            border border-white/10 bg-white/5 text-gray-400
            backdrop-blur-sm transition-all duration-300
            ${colorClasses[cat.color]}
          `}
                >
                    {cat.label}
                </motion.button>
            ))}
        </motion.div>
    );
}

export { techCategories };

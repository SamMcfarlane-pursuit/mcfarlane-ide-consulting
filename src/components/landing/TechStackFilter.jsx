import React from 'react';
import { motion } from 'framer-motion';

const techCategories = [
    { id: 'web', label: 'Web & Interactive', color: 'cyan' },
    { id: 'scroll', label: 'Scrolling', color: 'purple' },
    { id: 'dataviz', label: 'Data Visualization', color: 'emerald' },
    { id: 'audio', label: 'Sound & Audio', color: 'pink' },
    { id: 'gesture', label: 'Gestures / Interaction', color: 'amber' },
    { id: 'ixd', label: 'Interaction Design', color: 'blue' },
    { id: 'ui', label: 'UI Design', color: 'violet' },
    { id: 'webgl', label: 'WebGL / Three.js', color: 'teal' },
];

const colorClasses = {
    cyan: 'hover:bg-cyan-500/20 hover:border-cyan-500/50 data-[active=true]:bg-cyan-500/20 data-[active=true]:border-cyan-500/50 data-[active=true]:text-cyan-300',
    purple: 'hover:bg-purple-500/20 hover:border-purple-500/50 data-[active=true]:bg-purple-500/20 data-[active=true]:border-purple-500/50 data-[active=true]:text-purple-300',
    emerald: 'hover:bg-emerald-500/20 hover:border-emerald-500/50 data-[active=true]:bg-emerald-500/20 data-[active=true]:border-emerald-500/50 data-[active=true]:text-emerald-300',
    pink: 'hover:bg-pink-500/20 hover:border-pink-500/50 data-[active=true]:bg-pink-500/20 data-[active=true]:border-pink-500/50 data-[active=true]:text-pink-300',
    amber: 'hover:bg-amber-500/20 hover:border-amber-500/50 data-[active=true]:bg-amber-500/20 data-[active=true]:border-amber-500/50 data-[active=true]:text-amber-300',
    blue: 'hover:bg-blue-500/20 hover:border-blue-500/50 data-[active=true]:bg-blue-500/20 data-[active=true]:border-blue-500/50 data-[active=true]:text-blue-300',
    violet: 'hover:bg-violet-500/20 hover:border-violet-500/50 data-[active=true]:bg-violet-500/20 data-[active=true]:border-violet-500/50 data-[active=true]:text-violet-300',
    teal: 'hover:bg-teal-500/20 hover:border-teal-500/50 data-[active=true]:bg-teal-500/20 data-[active=true]:border-teal-500/50 data-[active=true]:text-teal-300',
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

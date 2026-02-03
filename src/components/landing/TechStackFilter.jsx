import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

// Categories that match actual project data
const techCategories = [
    { id: 'web', label: 'Web & Interactive', icon: '🌐' },
    { id: 'dataviz', label: 'Data Visualization', icon: '📊' },
    { id: 'ai', label: 'AI / Machine Learning', icon: '🤖' },
    { id: 'ui', label: 'UI Design', icon: '🎨' },
    { id: 'webgl', label: 'WebGL / Three.js', icon: '🔮' },
];

// All available technologies for individual filtering
const allTechnologies = [
    'React', 'Next.js', 'Vue', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Rust', 'Go',
    'TailwindCSS', 'CSS', 'Framer Motion',
    'Three.js', 'WebGL', 'R3F',
    'D3.js', 'Chart.js', 'Recharts',
    'AI', 'ML', 'Llama', 'Ollama', 'NLP',
    'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase',
    'Docker', 'AWS', 'Vercel',
    'Figma', 'Design System'
];

// Unified amber/gold theme styling
const chipStyles = `
    hover:bg-amber-500/20 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-500/15
    data-[active=true]:bg-gradient-to-r data-[active=true]:from-amber-500/25 data-[active=true]:to-yellow-500/15 
    data-[active=true]:border-amber-400/60 data-[active=true]:text-amber-100 
    data-[active=true]:shadow-lg data-[active=true]:shadow-amber-500/20
`;


export default function TechStackFilter({
    selectedCategory,
    onCategoryChange,
    selectedTech,
    onTechChange
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 px-4"
        >
            {/* Technology Dropdown Selector */}
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        border backdrop-blur-sm transition-all duration-300
                        flex items-center gap-2
                        ${selectedTech
                            ? 'border-amber-400/50 bg-amber-500/20 text-amber-200'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20'
                        }
                    `}
                >
                    {selectedTech ? (
                        <>
                            <span>{selectedTech}</span>
                            <X
                                className="w-3 h-3 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTechChange?.(null);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <span>Technology</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </>
                    )}
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 left-0 z-50 w-56 max-h-64 overflow-y-auto
                                       bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl
                                       shadow-xl shadow-black/40"
                        >
                            {allTechnologies.map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => {
                                        onTechChange?.(tech === selectedTech ? null : tech);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`
                                        w-full px-4 py-2 text-left text-sm transition-colors
                                        ${tech === selectedTech
                                            ? 'bg-amber-500/20 text-amber-200'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }
                                    `}
                                >
                                    {tech}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10 mx-1" />

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

export { techCategories, allTechnologies };


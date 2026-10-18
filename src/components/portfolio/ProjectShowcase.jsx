import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, Play, Layers } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// CINEMATIC PROJECT CARD - Ultra Smooth & High Performance
// ═══════════════════════════════════════════════════════════════
function CinematicCard({ project, index, onProjectClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const statusColors = {
        completed: { ring: 'ring-emerald-500/50', dot: 'bg-emerald-400', text: 'text-emerald-400' },
        in_progress: { ring: 'ring-amber-500/50', dot: 'bg-amber-400', text: 'text-amber-400' },
        planning: { ring: 'ring-violet-500/50', dot: 'bg-violet-400', text: 'text-violet-400' },
    };
    const status = statusColors[project.status] || statusColors.completed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.45,
                delay: (index % 3) * 0.08,
                ease: [0.25, 0.1, 0.25, 1.0]
            }}
            onClick={() => onProjectClick?.(project)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer transform-gpu"
        >
            {/* Outer glow on hover - pure CSS transition for maximum FPS */}
            <div
                className={`absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 rounded-3xl blur-xl pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-950/95 border border-slate-800/80 group-hover:border-amber-500/40 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-300 group-hover:-translate-y-1.5">

                {/* Image container with cinematic aspect ratio */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-950">
                    {/* Lazy loading placeholder */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Layers className="w-10 h-10 text-gray-700 animate-pulse" />
                        </div>
                    </div>

                    {/* Project image with smooth CSS hover zoom (zero scroll-based lag) */}
                    {project.image && (
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    )}

                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 via-transparent to-gray-950/30 pointer-events-none" />

                    {/* Year label */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
                            <span className="text-xs font-mono text-gray-300 tracking-wider">{project.year}</span>
                        </div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 z-10">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm ring-1 ${status.ring}`}>
                            <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                            <span className={`text-xs font-medium ${status.text}`}>
                                {project.status === 'completed' ? 'Live' : project.status === 'in_progress' ? 'Building' : 'Designing'}
                            </span>
                        </div>
                    </div>

                    {/* Play button overlay on hover */}
                    <AnimatePresence>
                        {isHovered && project.live_url && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/50">
                                    <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content section */}
                <div className="relative p-6">
                    {/* Decorative line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-amber-300 transition-colors duration-200">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies?.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies?.length > 4 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black text-sm font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <span>View Live</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 text-white text-sm font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all ${
                                    !project.live_url ? 'flex-1' : ''
                                }`}
                            >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY SELECTOR - Crisp & Responsive
// ═══════════════════════════════════════════════════════════════
const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'web', label: 'Web Applications' },
    { id: 'dataviz', label: 'Data & Analytics' },
    { id: 'ui', label: 'UI/UX Design' },
];

function CategorySelector({ selected, onChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-14"
        >
            {categories.map((cat) => {
                const isActive = selected === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                            isActive
                                ? 'text-black shadow-lg shadow-amber-500/25'
                                : 'text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20'
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="categoryBg"
                                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                    </button>
                );
            })}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// MAIN SHOWCASE - Smooth, 60fps Experience
// ═══════════════════════════════════════════════════════════════
export default function ProjectShowcase({ projects = [], onProjectClick }) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') return projects;
        return projects.filter(p => p.category === selectedCategory);
    }, [projects, selectedCategory]);

    const featuredProjects = useMemo(() => filteredProjects.filter(p => p.featured), [filteredProjects]);
    const regularProjects = useMemo(() => filteredProjects.filter(p => !p.featured), [filteredProjects]);

    return (
        <section className="relative min-h-screen bg-gray-950 overflow-hidden">
            {/* Cinematic background - lightweight without continuous repaint */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/90 to-gray-950" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.10] rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-orange-500/[0.08] rounded-full blur-[90px]" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 py-20 px-6">
                {/* Header section */}
                <div className="text-center mb-14 max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-amber-300/90 text-xs font-semibold tracking-widest uppercase">Engineering Portfolio</span>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-white">Featured</span>{' '}
                        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore a curated collection of AI platforms, web applications, and data visualization systems
                    </p>
                </div>

                {/* Category filter */}
                <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />

                {/* Projects grid */}
                <div className="max-w-7xl mx-auto">
                    {/* Featured projects - large cards */}
                    {featuredProjects.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {featuredProjects.map((project, idx) => (
                                <CinematicCard
                                    key={project.id || project.title}
                                    project={project}
                                    index={idx}
                                    onProjectClick={onProjectClick}
                                />
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    {featuredProjects.length > 0 && regularProjects.length > 0 && (
                        <div className="flex items-center gap-6 my-14">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                            <span className="text-xs text-amber-500/80 font-semibold tracking-widest uppercase px-4">
                                More Work
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                        </div>
                    )}

                    {/* Regular projects - smaller grid */}
                    {regularProjects.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularProjects.map((project, idx) => (
                                <CinematicCard
                                    key={project.id || project.title}
                                    project={project}
                                    index={idx}
                                    onProjectClick={onProjectClick}
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-900/80 flex items-center justify-center border border-gray-800">
                                <Layers className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 text-sm">No projects found in this category</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

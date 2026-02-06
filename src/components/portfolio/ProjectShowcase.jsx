import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Play, Layers } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// CINEMATIC PROJECT CARD - Premium 4K Gallery Style
// ═══════════════════════════════════════════════════════════════
function CinematicCard({ project, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const cardRef = useRef(null);

    // Scroll-based parallax for the card
    const isInView = useInView(cardRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for image
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    // 3D tilt effect
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useTransform(y, [0, 1], [8, -8]);
    const rotateY = useTransform(x, [0, 1], [-8, 8]);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
        setIsHovered(false);
    };

    const statusColors = {
        completed: { ring: 'ring-emerald-500/50', dot: 'bg-emerald-400', text: 'text-emerald-400' },
        in_progress: { ring: 'ring-amber-500/50', dot: 'bg-amber-400', text: 'text-amber-400' },
        planning: { ring: 'ring-violet-500/50', dot: 'bg-violet-400', text: 'text-violet-400' },
    };
    const status = statusColors[project.status] || statusColors.completed;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80, scale: 0.92, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.9,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.6 },
                scale: { duration: 0.7 },
                rotateX: { duration: 0.8 }
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: 'preserve-3d',
                opacity: cardOpacity,
            }}
            className="group relative cursor-pointer perspective-1000"
        >
            {/* Outer glow on hover */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl blur-2xl pointer-events-none"
            />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 border border-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/50">

                {/* Image container with cinematic aspect ratio */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    {/* Lazy loading placeholder */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Layers className="w-12 h-12 text-gray-700 animate-pulse" />
                        </div>
                    </div>

                    {/* Project image with parallax */}
                    {project.image && (
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                                y: imageY
                            }}
                            onLoad={() => setImageLoaded(true)}
                        />
                    )}

                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60" />

                    {/* Vignette effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

                    {/* Year label - cinematic style */}
                    <div className="absolute top-5 left-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                            <span className="text-xs font-mono text-gray-400 tracking-wider">{project.year}</span>
                        </div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-5 right-5">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md ring-1 ${status.ring}`}>
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
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 transition-shadow"
                                >
                                    <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content section */}
                <div className="relative p-6 pb-7">
                    {/* Decorative line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-300 transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech stack - elegant pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies?.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10 backdrop-blur-sm"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies?.length > 4 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                +{project.technologies.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        {project.live_url && (
                            <motion.a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black text-sm font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
                            >
                                <span>View Live</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.a>
                        )}
                        {project.github_url && (
                            <motion.a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-white text-sm font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all ${!project.live_url ? 'flex-1' : ''}`}
                            >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY SELECTOR - Artistic floating design
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
        >
            {categories.map((cat) => {
                const isActive = selected === cat.id;
                return (
                    <motion.button
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                            ? 'text-black shadow-lg shadow-amber-500/30'
                            : 'text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="categoryBg"
                                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative">{cat.label}</span>
                    </motion.button>
                );
            })}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// MAIN SHOWCASE - Immersive gallery experience
// ═══════════════════════════════════════════════════════════════
export default function ProjectShowcase({ projects }) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') return projects;
        return projects.filter(p => p.category === selectedCategory);
    }, [projects, selectedCategory]);

    // Separate featured and regular projects
    const featuredProjects = filteredProjects.filter(p => p.featured);
    const regularProjects = filteredProjects.filter(p => !p.featured);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden">
            {/* Cinematic background */}
            <div className="absolute inset-0">
                {/* Gradient base */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

                {/* Ambient light orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />

                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

                {/* Grid lines - subtle */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 py-24 px-6">
                {/* Header section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-amber-300/90 text-xs font-medium tracking-widest uppercase">Engineering Portfolio</span>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white">Featured</span>
                        <br />
                        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Explore a curated collection of AI platforms, web applications, and data visualization systems
                    </p>
                </motion.div>

                {/* Category filter */}
                <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />

                {/* Projects grid */}
                <div className="max-w-7xl mx-auto">
                    {/* Featured projects - large cards */}
                    {featuredProjects.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {featuredProjects.map((project, idx) => (
                                <CinematicCard key={project.id || project.title} project={project} index={idx} />
                            ))}
                        </div>
                    )}

                    {/* Divider with scroll animation */}
                    {featuredProjects.length > 0 && regularProjects.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex items-center gap-6 my-16"
                        >
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent origin-left"
                            />
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-xs text-amber-500/80 font-medium tracking-widest uppercase px-4"
                            >
                                More Work
                            </motion.span>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent origin-right"
                            />
                        </motion.div>
                    )}

                    {/* Regular projects - smaller grid */}
                    {regularProjects.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularProjects.map((project, idx) => (
                                <CinematicCard key={project.id || project.title} project={project} index={idx} />
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-900/80 flex items-center justify-center border border-gray-800">
                                <Layers className="w-10 h-10 text-gray-600" />
                            </div>
                            <p className="text-gray-500">No projects found in this category</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

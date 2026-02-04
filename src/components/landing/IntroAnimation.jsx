import React from 'react';
import { motion } from 'framer-motion';

export default function IntroAnimation({ children, introComplete }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative min-h-screen"
        >
            {children}
        </motion.div>
    );
}

// Hero text component with staggered animation - synced with camera
export function HeroText({ title, subtitle, tagline, profileImage, onViewProjects }) {
    return (
        <div className="text-center space-y-8">
            {/* Profile Photo - appears first with glow effect */}
            {profileImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1.2,
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/40 to-yellow-500/30 blur-xl scale-110" />
                        <img
                            src={profileImage}
                            alt={title}
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-amber-400/50 shadow-2xl shadow-amber-500/30"
                        />
                    </div>
                </motion.div>
            )}

            {/* Main title - appears after camera starts pulling back */}
            <motion.h1
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    delay: profileImage ? 1.8 : 1.5,
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight"
                style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FCD34D 50%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 120px rgba(251, 191, 36, 0.4), 0 0 60px rgba(245, 158, 11, 0.3)'
                }}
            >
                {title}
            </motion.h1>

            {/* Subtitle - fades in after title */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: profileImage ? 2.6 : 2.3,
                    duration: 1,
                    ease: 'easeOut'
                }}
                className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
            >
                {subtitle}
            </motion.p>

            {/* Tagline - appears last with amber accent */}
            {tagline && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: profileImage ? 3.4 : 3.2, duration: 0.8 }}
                    className="text-sm text-amber-400/70 tracking-widest uppercase font-medium"
                >
                    {tagline}
                </motion.p>
            )}

            {/* Availability Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: profileImage ? 3.4 : 3.2, duration: 0.5 }}
                className="flex justify-center"
            >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-sm font-medium">Available for Work</span>
                </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: profileImage ? 3.8 : 3.6, duration: 0.6 }}
                className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                {/* Primary CTA - Hire Me */}
                <a
                    href="/Contact"
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 overflow-hidden"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                        Hire Me
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </a>

                {/* Secondary CTA - View Projects */}
                <button
                    onClick={onViewProjects}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 hover:from-amber-500/30 hover:to-yellow-500/25 text-amber-200 border border-amber-400/40 hover:border-amber-400/60 backdrop-blur-sm rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 font-medium"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        View Projects
                        <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </span>
                </button>
            </motion.div>
        </div>
    );
}

// Scroll indicator arrow - appears after full intro
export function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                    delay: 5
                }}
                className="flex flex-col items-center gap-3"
            >
                <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-light">
                    Scroll to explore
                </span>
                <motion.svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
}

// Cinematic fade overlay for extra polish
export function CinematicOverlay() {
    return (
        <>
            {/* Initial black fade that reveals the scene */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="fixed inset-0 bg-black pointer-events-none z-50"
            />

            {/* Vignette effect - warm amber tint at edges */}
            <div
                className="fixed inset-0 pointer-events-none z-40"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,6,0.5) 80%, rgba(8,6,4,0.7) 100%)'
                }}
            />
        </>
    );
}

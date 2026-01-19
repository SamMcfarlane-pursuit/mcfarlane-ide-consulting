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
export function HeroText({ title, subtitle, tagline }) {
    return (
        <div className="text-center space-y-6">
            {/* Main title - appears after camera starts pulling back */}
            <motion.h1
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    delay: 1.5, // Wait for camera to pull back a bit
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight"
                style={{
                    textShadow: '0 0 80px rgba(100, 150, 200, 0.3)'
                }}
            >
                {title}
            </motion.h1>

            {/* Subtitle - fades in after title */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 2.3,
                    duration: 1,
                    ease: 'easeOut'
                }}
                className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
            >
                {subtitle}
            </motion.p>

            {/* Tagline - appears last */}
            {tagline && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                    className="text-sm text-gray-500 tracking-wide"
                >
                    {tagline}
                </motion.p>
            )}
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

            {/* Vignette effect */}
            <div
                className="fixed inset-0 pointer-events-none z-40"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
                }}
            />
        </>
    );
}

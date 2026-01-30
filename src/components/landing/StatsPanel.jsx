import React from 'react';
import { motion } from 'framer-motion';

export default function StatsPanel({ projectCount, techCount = 12, yearsExp = 3 }) {
    const stats = [
        { label: 'Projects', value: projectCount || 0 },
        { label: 'Technologies', value: techCount },
        { label: 'Years Exp', value: yearsExp },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="fixed bottom-8 right-8 z-20 hidden md:block"
        >
            <div className="flex flex-col gap-4 text-right bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/20">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="flex items-baseline gap-3 justify-end"
                    >
                        <span
                            className="text-3xl font-bold tabular-nums"
                            style={{
                                background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {stat.value}
                        </span>
                        <span className="text-xs text-amber-400/60 uppercase tracking-wider font-medium">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

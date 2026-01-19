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
            <div className="flex flex-col gap-3 text-right">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="flex items-baseline gap-2 justify-end"
                    >
                        <span className="text-2xl font-bold text-white tabular-nums">
                            {stat.value}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

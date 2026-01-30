import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Briefcase, Code2, Brain, Gamepad2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function About() {
    const skills = [
        { category: 'Languages', items: ['Rust', 'Python', 'JavaScript', 'TypeScript'] },
        { category: 'Frontend', items: ['React', 'Next.js', 'Three.js', 'Framer Motion'] },
        { category: 'Backend', items: ['Axum', 'Node.js', 'FastAPI', 'PostgreSQL'] },
        { category: 'AI/ML', items: ['LLMs', 'Prompt Engineering', 'ML Systems', 'RAG'] },
        { category: 'Cloud', items: ['Vercel', 'Docker', 'Supabase', 'AWS'] },
    ];

    const interests = [
        { icon: Brain, label: 'Custom LLM Development', desc: 'Building local LLM deployments for offline coding assistance' },
        { icon: Gamepad2, label: 'VR Gaming', desc: 'Exploring immersive experiences and interactive systems' },
        { icon: Building2, label: 'Property Investment', desc: 'Analyzing real estate opportunities and market intelligence' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to={createPageUrl('Portfolio')}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-12"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <span className="text-slate-900 font-bold text-3xl">SM</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Samuel McFarlane</h1>
                    <p className="text-xl text-amber-400 font-medium mb-4">AI/ML Engineer & Full-Stack Developer</p>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>Brooklyn, NY</span>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    <a href="https://github.com/SamMcfarlane-pursuit" target="_blank" rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 transition-all">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/samuelmcfarlane" target="_blank" rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 transition-all">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:samuel@example.com"
                        className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 transition-all">
                        <Mail className="w-5 h-5" />
                    </a>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-amber-400" />
                        Background
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            Samuel grew up in <span className="text-amber-300">Crown Heights, Brooklyn</span>, and spent part of his youth in the South Bronx,
                            developing an early understanding of how diverse communities adapt and thrive. Coming from a bilingual Panamanian household,
                            he learned to navigate cultural diversity while fostering curiosity and discipline.
                        </p>
                        <p>
                            Before joining <span className="text-amber-300">Pursuit's AI Native Program</span>, Samuel worked as a freelance developer
                            and technical consultant, delivering end-to-end solutions for small businesses. His focus on automation, AI integration,
                            and intelligent system design gave him a strong foundation in both backend logic and frontend interaction.
                        </p>
                    </div>
                </motion.div>

                {/* Technical Focus */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Code2 className="w-6 h-6 text-amber-400" />
                        Technical Focus
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                        <p>
                            Samuel's work spans <span className="text-amber-300">Rust backend development</span>, <span className="text-amber-300">machine learning systems</span>,
                            and <span className="text-amber-300">automation workflows</span>. Notable projects include momentum scoring algorithms for cybersecurity
                            startup analysis, property investment intelligence platforms, and AI-powered streaming architectures with real-time subtitle translation.
                        </p>
                        <p>
                            A builder at heart, he prefers constructing systems from first principles—currently exploring custom large language model
                            development and mobile-optimized local LLM deployments for offline coding assistance.
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <h3 className="text-amber-400 text-sm font-semibold mb-2">{skill.category}</h3>
                                <div className="space-y-1">
                                    {skill.items.map(item => (
                                        <div key={item} className="text-gray-400 text-sm">{item}</div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Brain className="w-6 h-6 text-amber-400" />
                        Beyond Code
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {interests.map((interest, index) => (
                            <motion.div
                                key={interest.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="p-4 rounded-xl bg-slate-800/50 border border-amber-500/10"
                            >
                                <interest.icon className="w-8 h-8 text-amber-400 mb-3" />
                                <h3 className="text-white font-semibold mb-1">{interest.label}</h3>
                                <p className="text-gray-400 text-sm">{interest.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center text-gray-500 text-sm mt-12"
                >
                    Continuously learning through Pursuit's AI Native Program • Machine Learning • Prompt Engineering • Cloud-Native Architectures
                </motion.p>
            </div>
        </div>
    );
}

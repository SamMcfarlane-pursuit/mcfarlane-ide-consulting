import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Briefcase, Code2, User, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function About() {
    const skills = [
        { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Rust'] },
        { category: 'AI Platforms', items: ['Claude', 'Cursor', 'Windsurf', 'Base44', 'Copilot'] },
        { category: 'Local LLMs', items: ['Ollama', 'Qwen', 'Self-hosted Models'] },
        { category: 'Frontend & App', items: ['React', 'React Native', 'Framer Motion'] },
        { category: 'Backend & Data', items: ['Node.js', 'Django', 'PostgreSQL', 'Neo4j'] },
        { category: 'Infrastructure', items: ['AWS', 'Vercel', 'CI/CD', 'n8n'] },
    ];

    const experiences = [
        {
            title: 'AI Product Builder & Technical Consultant',
            company: 'Freelance',
            location: 'Brooklyn, NY',
            period: 'June 2025 – Present',
            points: [
                'Shipped 3+ production applications across CRM, real estate, cryptocurrency, and HVAC—architecting full-stack solutions from requirements through deployment.',
                'Spearheaded end-to-end delivery: stakeholder interviews, system architecture, rapid MVP builds, and user-driven iteration for product-market fit.',
                'Accelerated development 3x leveraging cloud AI (Claude, Cursor, Augment) and local LLMs (Ollama, Qwen) for code generation and debugging.'
            ]
        },
        {
            title: 'Building Operations & Security Officer',
            company: 'Private Residential',
            location: 'Midtown Manhattan, NY',
            period: 'April 2022 – March 2024',
            points: [
                'Managed daily operations for 50+ unit residential building: access control, package logistics, vendor coordination, emergency protocols.',
                'Resolved high-pressure situations; streamlined incident tracking and maintenance coordination to improve operational efficiency.'
            ]
        },
        {
            title: 'Construction Specialist',
            company: 'Self-Employed',
            location: 'Brooklyn, NY',
            period: '2017 – 2022',
            points: [
                'Executed demolition, remodeling, and finishing across residential projects—delivered ahead of schedule with strict safety compliance.'
            ]
        },
        {
            title: 'Mobile Hardware Technician',
            company: 'Self-Taught',
            location: 'New York, NY',
            period: '2009 – 2011',
            points: [
                'Diagnosed and repaired mobile hardware (screen, battery, charging port, mic, camera) and software—first tech role, self-directed learning.'
            ]
        }
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
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 shadow-lg shadow-amber-500/40">
                        <img
                            src="/assets/profile-photo.webp"
                            alt="Samuel McFarlane"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Samuel McFarlane</h1>
                    <p className="text-xl text-amber-400 font-medium mb-4">AI Product Builder & Full-Stack Engineer</p>
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
                    <a href="mailto:Mcfarlanes320@gmail.com"
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
                        <User className="w-6 h-6 text-amber-400" />
                        Professional Summary
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            AI Product Builder currently completing <span className="text-amber-300">Pursuit's AI Native Program (Inaugural Cohort)</span>, transforming ideas into production-ready applications using LLMs, automation pipelines, and AI-augmented workflows. Shipped 3+ end-to-end solutions across CRM, real estate, cryptocurrency, and HVAC verticals.
                        </p>
                        <p>
                            A self-taught technician turned developer, Samuel's background spans from executing <span className="text-amber-300">construction projects</span> to managing <span className="text-amber-300">building operations</span> in Midtown Manhattan. His early hands-on roles instilled a deep discipline for resolving high-pressure situations. Today, he leverages cloud AI agents alongside local deployments to architect intelligent systems and drive measurable impact.
                        </p>
                    </div>
                </motion.div>

                {/* Experience Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-amber-400" />
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-amber-500/20 last:border-0 last:pb-0 pb-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400" />
                                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm font-medium text-amber-400/80 mb-3 mt-1">
                                    <span>{exp.company}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{exp.period}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span className="text-gray-400">{exp.location}</span>
                                </div>
                                <ul className="space-y-2 text-gray-300 text-sm mt-3">
                                    {exp.points.map((point, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-amber-500 mt-0.5">✦</span>
                                            <span className="leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Technical Focus & Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Code2 className="w-6 h-6 text-amber-400" />
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <h3 className="text-amber-400 text-sm font-semibold mb-3">{skill.category}</h3>
                                <div className="space-y-1.5">
                                    {skill.items.map(item => (
                                        <div key={item} className="text-gray-300 text-sm">{item}</div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-amber-400" />
                        Education & Languages
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Pursuit — AI Native Program (Inaugural Cohort)</h3>
                            <p className="text-amber-400/80 text-sm mb-2 mt-1">March 2024 – Present • Long Island City, NY</p>
                            <p className="text-gray-300 text-sm">600+ hours: AI/ML Engineering, Prompt Engineering, Full-Stack Development</p>
                        </div>
                        <div className="pt-4 border-t border-amber-500/10">
                            <h3 className="text-lg font-bold text-white">Languages</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                <span className="text-amber-300">English</span> (Native) • <span className="text-amber-300">Spanish</span> (Fluent) — Bilingual professional communication
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-gray-500 text-sm mt-12"
                >
                    Continuously learning and building high-impact AI solutions • AI/ML • Full-Stack • Automation
                </motion.p>
            </div>
        </div>
    );
}

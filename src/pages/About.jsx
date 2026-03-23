import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Code2, GraduationCap, Server, Layers, Wrench, Cpu, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function About() {
    const skills = [
        { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Rust'], icon: <Code2 className="w-5 h-5" /> },
        { category: 'AI Platforms', items: ['Claude', 'Cursor', 'Windsurf', 'Base44', 'Copilot'], icon: <Brain className="w-5 h-5" /> },
        { category: 'Local LLMs', items: ['Ollama', 'Qwen', 'Self-hosted Models'], icon: <Cpu className="w-5 h-5" /> },
        { category: 'Frontend & App', items: ['React', 'React Native', 'Framer Motion'], icon: <Layers className="w-5 h-5" /> },
        { category: 'Backend & Data', items: ['Node.js', 'Django', 'PostgreSQL', 'Neo4j'], icon: <Server className="w-5 h-5" /> },
        { category: 'Infrastructure', items: ['AWS', 'Vercel', 'CI/CD', 'n8n'], icon: <Wrench className="w-5 h-5" /> },
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden pb-12">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-5xl">
                {/* Back button */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                    <Link
                        to={createPageUrl('Portfolio')}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                    </Link>
                </motion.div>

                {/* Main Bento Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 w-full h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/5" />
                            
                            <div className="w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 shadow-lg shadow-amber-500/40 relative z-10">
                                <img
                                    src="/assets/profile-photo.webp"
                                    alt="Samuel McFarlane"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            
                            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Samuel McFarlane</h1>
                            <p className="text-amber-400 font-medium mb-4 relative z-10">AI Product Builder</p>
                            
                            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6 relative z-10">
                                <MapPin className="w-4 h-4" />
                                <span>Brooklyn, NY</span>
                            </div>

                            {/* Contact Grid */}
                            <div className="w-full grid grid-cols-3 gap-3 relative z-10">
                                <a href="https://github.com/SamMcfarlane-pursuit" target="_blank" rel="noopener noreferrer" className="flex justify-center p-3 rounded-xl bg-slate-800/80 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/50 hover:bg-slate-800 transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com/in/samuelmcfarlane" target="_blank" rel="noopener noreferrer" className="flex justify-center p-3 rounded-xl bg-slate-800/80 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/50 hover:bg-slate-800 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:Mcfarlanes320@gmail.com" className="flex justify-center p-3 rounded-xl bg-slate-800/80 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/50 hover:bg-slate-800 transition-all">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-amber-500/20"
                        >
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <GraduationCap className="text-amber-400 w-5 h-5"/>
                                Education
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                                    <h4 className="text-sm font-bold text-amber-300">Pursuit AI Native Program</h4>
                                    <p className="text-xs text-gray-400 mt-1">Inaugural Cohort • 600+ hours</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                                    <h4 className="text-sm font-bold text-white mb-1">Languages</h4>
                                    <p className="text-xs text-gray-400">English (Native) • Spanish (Fluent)</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Tab View */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-amber-500/20 p-6 md:p-8 min-h-[600px] h-full"
                        >
                            <Tabs defaultValue="overview" className="w-full flex flex-col h-full">
                                <TabsList className="w-full grid grid-cols-3 mb-8 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800/50 relative overflow-hidden">
                                    <TabsTrigger value="overview" className="rounded-lg py-2.5 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 transition-all z-10 tracking-wide font-medium">Overview</TabsTrigger>
                                    <TabsTrigger value="experience" className="rounded-lg py-2.5 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 transition-all z-10 tracking-wide font-medium">Experience</TabsTrigger>
                                    <TabsTrigger value="skills" className="rounded-lg py-2.5 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 transition-all z-10 tracking-wide font-medium">Tech Stack</TabsTrigger>
                                </TabsList>

                                <div className="flex-1 relative">
                                    <AnimatePresence mode="popLayout">
                                        <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-8"
                                            >
                                                <div className="space-y-5 text-gray-300 leading-relaxed text-[1.05rem]">
                                                    <p>
                                                        As an AI Product Builder currently completing <span className="text-amber-300 font-medium">Pursuit's AI Native Program</span>, I transform ideas into production-ready applications using powerful LLMs, automated data pipelines, and intelligent workflows.
                                                    </p>
                                                    <p>
                                                        My transition into software engineering is rooted in hands-on foundational roles—from executing construction projects to managing complex building operations in New York. These high-pressure environments instilled a deep discipline for <span className="text-amber-300 font-medium tracking-wide">dynamic problem-solving</span>. Today, I architect full-stack solutions and have successfully shipped end-to-end products across CRM, real estate, cryptocurrency, and HVAC sectors.
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                                                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center flex flex-col items-center justify-center">
                                                        <div className="text-3xl font-bold text-amber-400 mb-2">3+</div>
                                                        <div className="text-[10px] text-amber-200/50 font-bold uppercase tracking-widest text-center">Products<br/>Shipped</div>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-slate-800/30 border border-amber-500/10 hover:border-amber-500/30 transition-all text-center flex flex-col items-center justify-center">
                                                        <div className="text-3xl font-bold text-white mb-2">AI</div>
                                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Agents<br/>& LLMs</div>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-slate-800/30 border border-amber-500/10 hover:border-amber-500/30 transition-all text-center flex flex-col items-center justify-center">
                                                        <div className="text-2xl font-bold text-white mb-2 leading-8">Local</div>
                                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Ollama<br/>Deployments</div>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-slate-800/30 border border-amber-500/10 hover:border-amber-500/30 transition-all text-center flex flex-col items-center justify-center">
                                                        <div className="text-3xl font-bold text-white mb-2">Rust</div>
                                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Backend<br/>Systems</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </TabsContent>

                                        <TabsContent value="experience" className="mt-0 focus-visible:outline-none focus-visible:ring-0 h-full">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-8 pr-2 max-h-[500px] overflow-y-auto custom-scrollbar"
                                            >
                                                {experiences.map((exp, index) => (
                                                    <div key={index} className="relative pl-6 border-l w-full border-amber-500/20 last:border-transparent last:pb-0 pb-10 group">
                                                        <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-amber-400 group-hover:shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all" />
                                                        <h3 className="text-xl font-bold text-white tracking-wide">{exp.title}</h3>
                                                        <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-sm font-medium text-amber-500 mb-4 mt-2">
                                                            <span>{exp.company}</span>
                                                            <span className="hidden md:inline text-slate-600">•</span>
                                                            <span className="text-slate-400">{exp.period}</span>
                                                        </div>
                                                        <ul className="space-y-3 text-slate-300 text-sm">
                                                            {exp.points.map((point, i) => (
                                                                <li key={i} className="flex gap-3 leading-relaxed">
                                                                    <span className="text-amber-500/60 mt-1 shrink-0"><ArrowLeft className="w-3 h-3 rotate-180" /></span>
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </TabsContent>

                                        <TabsContent value="skills" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            >
                                                {skills.map((skill, index) => (
                                                    <div key={skill.category} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors group">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                                                {skill.icon}
                                                            </div>
                                                            <h3 className="text-white font-semibold tracking-wide">{skill.category}</h3>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {skill.items.map(item => (
                                                                <span key={item} className="px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 text-[11px] font-bold tracking-wider uppercase border border-slate-700/50 shadow-sm">
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </TabsContent>
                                    </AnimatePresence>
                                </div>
                            </Tabs>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Custom scrollbar for Experience tab */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(245, 158, 11, 0.2); 
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 158, 11, 0.4); 
                }
            `}} />
        </div>
    );
}

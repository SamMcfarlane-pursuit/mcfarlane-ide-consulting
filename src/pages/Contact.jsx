import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send, Briefcase, Clock, MapPin, Github, Linkedin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link with form data
        const subject = `Project Inquiry: ${formData.projectType || 'New Project'}`;
        const body = `Hi Samuel,

My name is ${formData.name}.

Project Type: ${formData.projectType}
Budget Range: ${formData.budget}

${formData.message}

Best regards,
${formData.name}
${formData.email}`;

        window.location.href = `mailto:samuelmcfarlane.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSubmitted(true);
    };

    const services = [
        { icon: '🤖', title: 'AI/ML Solutions', desc: 'Custom LLMs, ML pipelines, intelligent automation' },
        { icon: '⚡', title: 'Full-Stack Development', desc: 'React, Rust, Node.js, scalable architectures' },
        { icon: '🔧', title: 'System Design', desc: 'Backend infrastructure, APIs, database optimization' },
        { icon: '📊', title: 'Data Engineering', desc: 'Data pipelines, analytics, visualization' },
    ];

    const projectTypes = [
        'AI/ML Project',
        'Web Application',
        'Backend/API Development',
        'Consulting',
        'Other'
    ];

    const budgetRanges = [
        'Under $1,000',
        '$1,000 - $5,000',
        '$5,000 - $15,000',
        '$15,000+',
        "Let's Discuss"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
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
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #FCD34D 50%, #F59E0B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Let's Work Together
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ready to bring your vision to life? I'm available for freelance projects and collaboration.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Services */}
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-amber-400" />
                                Services I Offer
                            </h2>
                            <div className="grid gap-4">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-amber-500/10 hover:border-amber-500/30 transition-colors"
                                    >
                                        <span className="text-2xl">{service.icon}</span>
                                        <div>
                                            <h3 className="text-white font-semibold">{service.title}</h3>
                                            <p className="text-gray-400 text-sm">{service.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Availability & Contact Info */}
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Clock className="w-5 h-5 text-amber-400" />
                                    <span>Available for new projects</span>
                                    <span className="ml-auto px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">Open</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin className="w-5 h-5 text-amber-400" />
                                    <span>Brooklyn, NY (Remote Friendly)</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail className="w-5 h-5 text-amber-400" />
                                    <a href="mailto:samuelmcfarlane.dev@gmail.com" className="hover:text-amber-300 transition-colors">
                                        samuelmcfarlane.dev@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 mt-6 pt-6 border-t border-amber-500/10">
                                <a href="https://github.com/SamMcfarlane-pursuit" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com/in/samuelmcfarlane" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Send className="w-6 h-6 text-amber-400" />
                                Send a Message
                            </h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-2">Message Ready!</h3>
                                    <p className="text-gray-400 mb-6">Your email client should open with your message. If not, click below:</p>
                                    <a
                                        href="mailto:samuelmcfarlane.dev@gmail.com"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-all"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Open Email
                                    </a>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="block mx-auto mt-4 text-amber-400 hover:text-amber-300 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Project Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-xl text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                                        >
                                            <option value="" className="bg-slate-800">Select a project type</option>
                                            {projectTypes.map(type => (
                                                <option key={type} value={type} className="bg-slate-800">{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-xl text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                                        >
                                            <option value="" className="bg-slate-800">Select budget range</option>
                                            {budgetRanges.map(range => (
                                                <option key={range} value={range} className="bg-slate-800">{range}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Tell me about your project *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                                            placeholder="Describe your project, goals, timeline, and any other relevant details..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </button>

                                    <p className="text-center text-gray-500 text-xs mt-4">
                                        This will open your email client to send the message directly.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

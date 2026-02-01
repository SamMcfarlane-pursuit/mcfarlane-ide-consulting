import React from 'react';
import { Github, Linkedin, Mail, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/SamMcfarlane-pursuit',
            label: 'GitHub'
        },
        {
            icon: Linkedin,
            href: 'https://linkedin.com/in/samuelmcfarlane',
            label: 'LinkedIn'
        },
        {
            icon: Mail,
            href: 'mailto:samuel@example.com',
            label: 'Email'
        }
    ];

    const navLinks = [
        { label: 'Portfolio', path: 'Portfolio' },
        { label: 'About', path: 'About' },
        { label: 'Contact', path: 'Contact' },
        { label: 'Add Project', path: 'AddProject' }
    ];

    return (
        <footer className="relative z-10 bg-slate-950/80 backdrop-blur-xl border-t border-amber-500/10">
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand & Location */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                                <span className="text-slate-900 font-bold text-sm">SM</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Samuel McFarlane</h3>
                                <p className="text-amber-400/60 text-xs">AI/ML Engineer & Full-Stack Dev</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 text-amber-400/60" />
                            <span>Brooklyn, NY</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h4 className="text-white font-medium text-sm uppercase tracking-wider">Navigation</h4>
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={createPageUrl(link.path)}
                                    className="text-gray-400 hover:text-amber-300 transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-medium text-sm uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg bg-slate-800/50 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs">
                            Pursuit AI Native Program Fellow
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-amber-500/10 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            © {currentYear} Samuel McFarlane. Built with React & Three.js
                        </p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                            Made with <Heart className="w-3 h-3 text-amber-400/60" /> in Brooklyn
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

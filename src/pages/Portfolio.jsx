
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Project data seeding
import { seedProjects } from '@/data/seedProjects';

// Landing components
import GlobeScene from '../components/landing/GlobeScene';
import IntroAnimation, { HeroText, CinematicOverlay } from '../components/landing/IntroAnimation';

// Portfolio components
import ProjectShowcase from '../components/portfolio/ProjectShowcase';
import ProjectDetail from '../components/portfolio/ProjectDetail';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const projectsRef = useRef(null);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      await seedProjects();
      const data = await Project.list('-year', 1000);
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
    setLoading(false);
  };

  // Scroll to projects section
  const handleViewProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-amber-400/50 animate-spin" />
          <p className="text-gray-500 text-sm">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <IntroAnimation introComplete={introComplete}>
      <CinematicOverlay />

      {/* Hero Section with Globe Animation */}
      <div className="relative h-screen bg-black overflow-hidden">
        {/* Base Globe Scene */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <GlobeScene onIntroComplete={() => setIntroComplete(true)} />
          </Suspense>
        </div>

        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <HeroText
            title="McFarlane IDE Consulting"
            subtitle="Software consulting & development — AI/ML engineering, full-stack systems, and intelligent solutions built from first principles"
            tagline="Brooklyn-based • Samuel McFarlane, Founder"
            profileImage="/assets/profile-photo.webp"
            onViewProjects={handleViewProjects}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <button
            onClick={handleViewProjects}
            className="flex flex-col items-center gap-2 text-amber-400/60 hover:text-amber-400 transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest">Explore Projects</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1"
            >
              <div className="w-1 h-2 bg-current rounded-full" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef}>
        <ProjectShowcase
          projects={projects}
          onProjectClick={setSelectedProject}
        />
      </div>

      {/* Hire Me Section - Clean & Concise */}
      <section className="relative bg-black py-20 px-6">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto text-center"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Let's Build Something Great
          </h2>
          <p className="text-gray-400 mb-8 text-base">
            Available for full-time roles, contract work, and collaborations.
          </p>

          {/* Service Tags - Inline */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Full-Stack Development', 'AI/ML Engineering', 'System Architecture'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a
              href="mailto:samuelmcfarlane.dev@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-semibold hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
            <a
              href="https://github.com/SamMcfarlane"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-300 text-sm font-medium hover:text-white hover:bg-white/5 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/samuelmcfarlane"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-300 text-sm font-medium hover:text-white hover:bg-white/5 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Location */}
          <p className="text-gray-500 text-xs">
            Brooklyn, NY · Remote Available
          </p>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </IntroAnimation>
  );
}

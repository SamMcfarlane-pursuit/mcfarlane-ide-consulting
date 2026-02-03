
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

// Project data seeding
import { seedProjects } from '@/data/seedProjects';

// Landing components
import GlobeScene from '../components/landing/GlobeScene';
import IntroAnimation, { HeroText, ScrollIndicator, CinematicOverlay } from '../components/landing/IntroAnimation';
import TechStackFilter, { techCategories } from '../components/landing/TechStackFilter';
import StatsPanel from '../components/landing/StatsPanel';

// Portfolio components
import SphereCanvas from '../components/portfolio/SphereCanvas';
import ProjectDetail from '../components/portfolio/ProjectDetail';
import ProjectList from '../components/portfolio/ProjectList';

// Admin detection - only show admin controls on localhost or with admin query param
const isAdminMode = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  const searchParams = new URLSearchParams(window.location.search);
  // Admin on localhost OR with secret admin param
  return hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    searchParams.get('admin') === 'true';
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTechCategory, setSelectedTechCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('sphere');
  const [introComplete, setIntroComplete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const projectsRef = useRef(null);

  // Check admin status on mount
  useEffect(() => {
    setIsAdmin(isAdminMode());
  }, []);

  // Scroll to projects section
  const handleViewProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const handleFocus = () => loadProjects();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category (uses project.category field AND technology keywords)
    if (selectedTechCategory) {
      const techKeywords = {
        web: ['React', 'Next.js', 'Vue', 'JavaScript', 'TypeScript', 'Node.js', 'Vite', 'TailwindCSS'],
        dataviz: ['D3.js', 'Chart.js', 'Recharts', 'Data Visualization', 'Data Analytics'],
        ai: ['AI', 'ML', 'Machine Learning', 'Llama', 'Ollama', 'AI/ML', 'NLP', 'Python'],
        ui: ['UI', 'Figma', 'Design System', 'CSS', 'Design'],
        webgl: ['Three.js', 'WebGL', 'GLSL', 'Shaders', 'R3F', 'Framer Motion'],
      };
      const keywords = techKeywords[selectedTechCategory] || [];

      filtered = filtered.filter(p => {
        // Match by category field directly
        const categoryMatch = p.category === selectedTechCategory;
        // Also match by technology keywords
        const techMatch = p.technologies?.some(tech =>
          keywords.some(kw => tech.toLowerCase().includes(kw.toLowerCase()))
        );
        return categoryMatch || techMatch;
      });
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [selectedTechCategory, selectedStatus, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // Auto-seed projects on first visit
      await seedProjects();

      const data = await Project.list('-year', 1000);
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
    setLoading(false);
  };

  const handleEdit = (project) => {
    navigate(createPageUrl('EditProject') + `?id=${project.id}`);
  };

  const handleDelete = async (projectId) => {
    setDeleting(true);
    try {
      await Project.delete(projectId);
      setSelectedProject(null);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    setDeleting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <IntroAnimation introComplete={introComplete}>
      <CinematicOverlay />
      <div className="relative h-screen bg-black overflow-hidden">

        {/* ===================== UNIFIED FULL-SCREEN EXPERIENCE ===================== */}

        {/* Base Globe Scene - Plays the cinematic entry animation */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: introComplete ? 0 : 1,
              scale: introComplete ? 1.05 : 1
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ pointerEvents: introComplete ? 'none' : 'auto' }}
          >
            <Suspense fallback={null}>
              <GlobeScene onIntroComplete={() => setIntroComplete(true)} />
            </Suspense>
          </motion.div>
        </div>

        {/* Hero Section - Visible during and after intro, fades when scrolling to projects */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 0 : 1 }}
          transition={{ duration: 1.2, delay: introComplete ? 0 : 0 }}
        >
          <HeroText
            title="Samuel McFarlane"
            subtitle="AI/ML Engineer & Full-Stack Developer building intelligent systems from first principles — from Rust backends to custom LLMs"
            tagline="Brooklyn-based • Pursuit AI Native Program"
            profileImage="/assets/profile-photo.jpg"
            onViewProjects={handleViewProjects}
          />
        </motion.div>

        {/* ===================== PROJECT UNIVERSE - EMERGES AFTER INTRO ===================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-20"
          style={{ pointerEvents: introComplete ? 'auto' : 'none' }}
        >
          {/* Full-Screen Project Globe with Integrated Info */}
          <div className="w-full h-full" style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(16,13,8,0.95) 0%, rgba(8,6,4,0.98) 50%, #000 100%)'
          }}>
            <SphereCanvas
              projects={filteredProjects}
              onProjectClick={setSelectedProject}
              selectedProject={selectedProject}
              filterCategory={selectedTechCategory}
              fullScreen={true}
            />
          </div>

          {/* Top Bar - Stats & Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Stats Panel Inline */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{projects.length}</span>
                  <span className="text-xs text-amber-400/70 uppercase tracking-wider">Projects</span>
                </div>
                <div className="w-px h-6 bg-amber-500/20" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">15</span>
                  <span className="text-xs text-amber-400/70 uppercase tracking-wider">Technologies</span>
                </div>
                <div className="w-px h-6 bg-amber-500/20" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">1</span>
                  <span className="text-xs text-amber-400/70 uppercase tracking-wider">Years Exp</span>
                </div>
              </motion.div>

              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                {/* View Mode Toggle */}
                <div className="flex gap-1 bg-black/50 backdrop-blur-xl rounded-lg p-1 border border-amber-500/20">
                  {['sphere', 'grid'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-300 ${viewMode === mode
                        ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/20 text-amber-200 shadow-lg shadow-amber-500/20 border border-amber-400/40'
                        : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent'
                        }`}
                    >
                      {mode === 'sphere' ? '3D' : 'Grid'}
                    </button>
                  ))}
                </div>

                {isAdmin && (
                  <Link to={createPageUrl('AddProject')}>
                    <button className="h-8 px-3 text-xs bg-gradient-to-r from-amber-500/20 to-yellow-500/15 hover:from-amber-500/30 hover:to-yellow-500/25 text-amber-200 border border-amber-400/40 hover:border-amber-400/60 backdrop-blur-xl shadow-lg shadow-amber-500/10 rounded-md font-medium transition-all duration-300 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Tech Stack Filter - Compact */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="px-6 pb-4"
            >
              <TechStackFilter
                selectedCategory={selectedTechCategory}
                onCategoryChange={setSelectedTechCategory}
              />
            </motion.div>
          </div>

          {/* Status Legend - Bottom Left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 left-6 z-30 flex items-center gap-6 text-xs bg-black/40 backdrop-blur-xl rounded-full px-5 py-2.5 border border-amber-500/15"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
              <span className="text-indigo-300/80 font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
              <span className="text-yellow-300/80 font-medium">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-stone-400 shadow-lg shadow-stone-400/50" />
              <span className="text-stone-300/80 font-medium">Planning</span>
            </div>
          </motion.div>

          {/* Source Code Link - Bottom Right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-6 right-6 z-30"
          >
            <a
              href="https://github.com/SamMcfarlane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-amber-400 transition-colors"
            >
              <span>◇ Source</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Grid View Overlay - When grid mode is selected */}
        {viewMode === 'grid' && introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/95 overflow-auto pt-32 pb-8 px-8"
          >
            <ProjectList
              projects={filteredProjects}
              onProjectClick={setSelectedProject}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleting={deleting}
        />
      )}
    </IntroAnimation>
  );
}

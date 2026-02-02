
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

// Landing components
import GlobeScene from '../components/landing/GlobeScene';
import IntroAnimation, { HeroText, ScrollIndicator, CinematicOverlay } from '../components/landing/IntroAnimation';
import TechStackFilter, { techCategories } from '../components/landing/TechStackFilter';
import StatsPanel from '../components/landing/StatsPanel';

// Portfolio components
import SphereCanvas from '../components/portfolio/SphereCanvas';
import ProjectDetail from '../components/portfolio/ProjectDetail';
import ProjectList from '../components/portfolio/ProjectList';

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

  const navigate = useNavigate();
  const projectsRef = useRef(null);

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

    // Filter by tech category (map to technology array)
    if (selectedTechCategory) {
      const categoryMapping = {
        web: ['React', 'Next.js', 'Vue', 'JavaScript', 'TypeScript', 'Node.js'],
        scroll: ['GSAP', 'Framer Motion', 'Lenis', 'Locomotive'],
        dataviz: ['D3.js', 'Chart.js', 'Recharts', 'Plotly'],
        audio: ['Web Audio API', 'Tone.js', 'Howler.js'],
        gesture: ['Touch', 'Drag', 'Swipe', 'Mouse'],
        ixd: ['UX', 'Interaction', 'Animation', 'Prototype'],
        ui: ['UI', 'Figma', 'Design System', 'CSS'],
        webgl: ['Three.js', 'WebGL', 'GLSL', 'Shaders', 'R3F'],
      };
      const keywords = categoryMapping[selectedTechCategory] || [];
      filtered = filtered.filter(p =>
        p.technologies?.some(tech =>
          keywords.some(kw => tech.toLowerCase().includes(kw.toLowerCase()))
        )
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [selectedTechCategory, selectedStatus, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
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
      <div className="relative min-h-screen bg-black overflow-hidden">

        {/* Three.js Globe Background */}
        <Suspense fallback={null}>
          <GlobeScene onIntroComplete={() => setIntroComplete(true)} />
        </Suspense>

        {/* Stats Panel */}
        <StatsPanel projectCount={projects.length} techCount={15} yearsExp={1} />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">

          {/* Hero Section */}
          <div className="pt-20 pb-12">
            <HeroText
              title="Samuel McFarlane"
              subtitle="AI/ML Engineer & Full-Stack Developer building intelligent systems from first principles — from Rust backends to custom LLMs"
              tagline="Brooklyn-based • Pursuit AI Native Program"
              profileImage="/assets/profile-photo.jpg"
              onViewProjects={handleViewProjects}
            />
          </div>

          {/* Tech Stack Filter */}
          <div className="w-full max-w-5xl mb-12">
            <TechStackFilter
              selectedCategory={selectedTechCategory}
              onCategoryChange={setSelectedTechCategory}
            />
          </div>

          {/* Projects Section */}
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="w-full max-w-7xl scroll-mt-20"
          >
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-amber-400/60 font-medium">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </span>

                {/* View Mode Toggle */}
                <div className="flex gap-1 bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-amber-500/20">
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
              </div>

              <Link to={createPageUrl('AddProject')}>
                <Button className="bg-gradient-to-r from-amber-500/20 to-yellow-500/15 hover:from-amber-500/30 hover:to-yellow-500/25 text-amber-200 border border-amber-400/40 hover:border-amber-400/60 backdrop-blur-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </Link>
            </div>

            {/* Projects Display */}
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-12 border border-amber-500/20 shadow-lg shadow-amber-500/5 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center border border-amber-500/30">
                    <Plus className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="text-gray-400 mb-6 text-lg">
                    {selectedTechCategory
                      ? 'No projects match this category yet.'
                      : 'Your portfolio awaits its first masterpiece.'}
                  </p>
                  <Link to={createPageUrl('AddProject')}>
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold shadow-lg shadow-amber-500/25 px-8 py-3">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Project
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : viewMode === 'sphere' ? (
              <div
                className="w-full rounded-2xl overflow-hidden border border-white/10"
                style={{
                  height: 'calc(100vh - 500px)',
                  minHeight: '400px',
                  maxHeight: '600px',
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <SphereCanvas
                  projects={filteredProjects}
                  onProjectClick={setSelectedProject}
                  selectedProject={selectedProject}
                  filterCategory={selectedTechCategory}
                />
              </div>
            ) : (
              <ProjectList
                projects={filteredProjects}
                onProjectClick={setSelectedProject}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </motion.div>

          {/* Status Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="py-12 flex items-center gap-8 text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              <span className="text-emerald-300/80 font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
              <span className="text-amber-300/80 font-medium">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-lg shadow-slate-400/50" />
              <span className="text-slate-300/80 font-medium">Planning</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {projects.length === 0 && <ScrollIndicator />}
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

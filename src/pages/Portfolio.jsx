
import React, { useState, useEffect } from 'react';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

import SphereCanvas from '../components/portfolio/SphereCanvas';
import ProjectDetail from '../components/portfolio/ProjectDetail';
import FilterControls from '../components/portfolio/FilterControls';
import IntroSection from '../components/portfolio/IntroSection';
import ProjectList from '../components/portfolio/ProjectList';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('sphere');

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadProjects();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadProjects();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All Projects') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, selectedStatus, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await Project.list('-year', 1000);
      console.log('Loaded projects:', data.length);
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
      alert('Failed to delete project. Please try again.');
    }
    setDeleting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          <p className="text-gray-300 text-sm">Initializing portfolio sphere...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Futuristic light effects - no dark shadows */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '1s' }} />
      
      {/* Scanline effect for futuristic feel */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
           }} />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <IntroSection />

        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          <FilterControls
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
            projectCount={filteredProjects.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <Link to={createPageUrl('AddProject')}>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/30">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </Link>
        </div>

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-300 text-lg mb-4">
              {selectedCategory !== 'All Projects' || selectedStatus !== 'all' 
                ? 'No projects match your filters.' 
                : 'No projects found.'}
            </p>
            <Link to={createPageUrl('AddProject')}>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </Link>
          </motion.div>
        ) : viewMode === 'sphere' ? (
          <motion.div
            key={filteredProjects.length}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
            style={{
              height: 'calc(100vh - 400px)',
              minHeight: '650px',
              maxHeight: '850px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <SphereCanvas
              projects={filteredProjects}
              onProjectClick={setSelectedProject}
              selectedProject={selectedProject}
              filterCategory={selectedCategory}
            />
          </motion.div>
        ) : (
          <ProjectList
            projects={filteredProjects}
            onProjectClick={setSelectedProject}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-8 text-sm text-gray-400 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
              <span>Planning</span>
            </div>
          </div>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
}

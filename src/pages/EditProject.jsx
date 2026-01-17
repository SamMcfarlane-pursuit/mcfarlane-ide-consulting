
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';

import ProjectForm from '../components/upload/ProjectForm';

export default function EditProject() {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
      navigate(createPageUrl('Portfolio'));
      return;
    }

    try {
      // Fetch with high limit to ensure we get all projects
      const projects = await Project.list('-year', 1000);
      const foundProject = projects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate(createPageUrl('Portfolio'));
      }
    } catch (error) {
      console.error('Error loading project:', error);
      navigate(createPageUrl('Portfolio'));
    }
    
    setLoading(false);
  };

  const handleSaveProject = async (projectData) => {
    await Project.update(project.id, projectData);
    // Navigate back to portfolio - it will auto-refresh
    navigate(createPageUrl('Portfolio'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          <p className="text-gray-400 text-sm">Loading project...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl('Portfolio'))}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Project</h1>
            <p className="text-gray-400 mt-1">Update your project details</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProjectForm
            initialData={project}
            onSave={handleSaveProject}
            onCancel={() => navigate(createPageUrl('Portfolio'))}
          />
        </motion.div>
      </div>
    </div>
  );
}

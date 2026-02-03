import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  Lightbulb,
  Sparkles,
  Edit,
  Trash2,
  Eye,
  Play
} from 'lucide-react';

// Staggered animation variants for grid entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ProjectList({ projects, onProjectClick, onEdit, onDelete, isAdmin = false }) {
  const [hoveredProject, setHoveredProject] = useState(null);

  const statusIcons = {
    completed: <CheckCircle className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    planning: <Lightbulb className="w-4 h-4" />
  };

  const statusColors = {
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    planning: 'bg-slate-500/10 text-slate-400 border-slate-500/30'
  };

  const statusLabels = {
    completed: 'Completed',
    in_progress: 'In Progress',
    planning: 'Planning'
  };

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => {
        const isBase44App = project.demo_url?.includes('base44.app') || project.demo_url?.includes('base44.com');
        const isHovered = hoveredProject === project.id;
        const hasVideo = project.preview_video;

        return (
          <motion.div
            key={project.id}
            variants={cardVariants}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group"
          >
            {/* Glassmorphism Card */}
            <Card className="
              relative overflow-hidden h-full
              bg-slate-900/40 backdrop-blur-xl
              border border-white/10
              hover:border-amber-500/40
              hover:bg-slate-800/50
              shadow-xl shadow-black/20
              hover:shadow-2xl hover:shadow-amber-500/10
              transition-all duration-500 ease-out
              group-hover:-translate-y-1
            ">
              {/* Glass highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

              {/* Video/Image Preview Area */}
              {(project.thumbnail || hasVideo) && (
                <div className="relative w-full h-40 overflow-hidden">
                  {/* Lazy-loaded thumbnail image */}
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className={`
                        w-full h-full object-cover
                        transition-all duration-500
                        ${isHovered && hasVideo ? 'opacity-0' : 'opacity-100'}
                        group-hover:scale-105
                      `}
                    />
                  )}

                  {/* Video preview on hover */}
                  {hasVideo && isHovered && (
                    <video
                      src={project.preview_video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Video indicator badge */}
                  {hasVideo && !isHovered && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white/80">
                      <Play className="w-3 h-3" />
                      <span>Preview</span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                </div>
              )}

              <CardContent className="p-5 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <Badge className={`${statusColors[project.status]} border flex items-center gap-1 text-xs backdrop-blur-sm`}>
                        {statusIcons[project.status]}
                        {statusLabels[project.status]}
                      </Badge>
                      {isBase44App && (
                        <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 flex items-center gap-1 text-xs backdrop-blur-sm">
                          <Sparkles className="w-3 h-3" />
                          base44
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {project.category}
                  </div>
                  {project.year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.year}
                    </div>
                  )}
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 transition-colors backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-slate-800/50 text-gray-400 border-slate-600 backdrop-blur-sm">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onProjectClick(project)}
                    className="flex-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 backdrop-blur-sm transition-all"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(project)}
                        className="text-gray-400 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(project.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/15 backdrop-blur-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
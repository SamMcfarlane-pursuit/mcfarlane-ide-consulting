import React from 'react';
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
  Eye
} from 'lucide-react';

export default function ProjectList({ projects, onProjectClick, onEdit, onDelete, isAdmin = false }) {
  // isAdmin is passed from parent - controls visibility of edit/delete buttons

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const isBase44App = project.demo_url?.includes('base44.app') || project.demo_url?.includes('base44.com');

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-slate-900/50 border-slate-700/50 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 h-full group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <Badge className={`${statusColors[project.status]} border flex items-center gap-1 text-xs`}>
                        {statusIcons[project.status]}
                        {statusLabels[project.status]}
                      </Badge>
                      {isBase44App && (
                        <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 flex items-center gap-1 text-xs">
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
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-slate-800 text-gray-400 border-slate-600">
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
                    className="flex-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30"
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
                        className="text-gray-400 hover:text-white hover:bg-slate-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(project.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
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
    </div>
  );
}
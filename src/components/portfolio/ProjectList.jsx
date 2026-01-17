import React, { useState, useEffect } from 'react';
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
import { base44 } from '@/api/base44Client';

export default function ProjectList({ projects, onProjectClick, onEdit, onDelete }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const user = await base44.auth.me();
      setIsAdmin(user.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const statusIcons = {
    completed: <CheckCircle className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    planning: <Lightbulb className="w-4 h-4" />
  };

  const statusColors = {
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    in_progress: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    planning: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
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
            <Card className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full">
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
                      <Badge key={idx} variant="outline" className="text-xs bg-cyan-500/5 text-cyan-300 border-cyan-500/30">
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
                    className="flex-1 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
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
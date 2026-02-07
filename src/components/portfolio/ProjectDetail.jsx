
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag, CheckCircle, Clock, Lightbulb, Download, Monitor, Star, GitFork, Sparkles, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactMarkdown from 'react-markdown';

export default function ProjectDetail({ project, onClose, onEdit, onDelete, deleting }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // Always admin in standalone mode
  const isAdmin = true;

  if (!project) return null;

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



  const handleDeleteConfirm = async () => {
    await onDelete(project.id);
    setShowDeleteDialog(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8"
        >
          <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-amber-500/20 backdrop-blur-xl shadow-2xl shadow-amber-500/5">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h2>
                    <Badge className={`${statusColors[project.status]} border flex items-center gap-1`}>
                      {statusIcons[project.status]}
                      {statusLabels[project.status]}
                    </Badge>

                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {project.category}
                    </div>
                    {project.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </div>
                    )}
                    {project.github_stats?.stars && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {project.github_stats.stars}
                      </div>
                    )}
                    {project.github_stats?.forks && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {project.github_stats.forks}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(project)}
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={deleting}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        title="Delete Project"
                      >
                        {deleting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-slate-800/80 border-slate-700">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
                    Overview
                  </TabsTrigger>
                  {project.readme_content && (
                    <TabsTrigger value="docs" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
                      Documentation
                    </TabsTrigger>
                  )}
                  {project.project_files && project.project_files.length > 0 && (
                    <TabsTrigger value="files" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
                      Files ({project.project_files.length})
                    </TabsTrigger>
                  )}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <TabsTrigger value="gallery" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
                      Gallery
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={
                              "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 transition-colors"}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Key Highlights
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                {project.readme_content && (
                  <TabsContent value="docs" className="mt-6">
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-slate-800/50 rounded-lg p-6 text-gray-300 text-sm leading-relaxed overflow-x-auto">
                        <ReactMarkdown>{project.readme_content}</ReactMarkdown>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {project.project_files && project.project_files.length > 0 && (
                  <TabsContent value="files" className="mt-6">
                    <div className="space-y-2">
                      {project.project_files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-amber-400" />
                            <div>
                              <p className="text-white font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.type}</p>
                            </div>
                          </div>
                          {file.url && (
                            <a href={file.url} download target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {project.screenshots && project.screenshots.length > 0 && (
                  <TabsContent value="gallery" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {project.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="rounded-lg border border-slate-700 hover:border-amber-500 transition-colors"
                        />
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px]"
                  >
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold shadow-lg shadow-amber-500/25">
                      <>
                        <Monitor className="w-4 h-4 mr-2" />
                        Live Demo
                      </>
                    </Button>
                  </a>
                )}
                {project.link && !project.demo_url && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px]"
                  >
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold shadow-lg shadow-amber-500/25">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px]"
                  >
                    <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-800">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              Delete Project?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete <strong className="text-white">"{project.title}"</strong>?
              <br />
              <span className="text-red-400 font-semibold">This action cannot be undone.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              disabled={deleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Project
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AnimatePresence>
  );
}

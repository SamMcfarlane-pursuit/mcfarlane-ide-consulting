
import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const categories = ["AI/ML", "Web Development", "Mobile App", "Data Science", "Cloud/DevOps", "Blockchain", "IoT", "Other"];
const statuses = ["completed", "in_progress", "planning"];

export default function ProjectForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    category: 'Web Development',
    status: 'completed',
    year: new Date().getFullYear(),
    technologies: [],
    highlights: [],
    link: '',
    github: '',
    demo_url: '',
    project_files: [] // Added project_files to initial state
  });

  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...(prev.highlights || []), highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="My Awesome Project"
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-gray-300">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your project..."
              className="bg-slate-800 border-slate-600 text-white min-h-24"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {statuses.map(status => (
                    <SelectItem key={status} value={status} className="text-white">
                      {status.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Technologies</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="Add technology..."
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button type="button" onClick={addTechnology} variant="outline" className="border-slate-600">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies?.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Key Highlights</Label>
            <div className="flex gap-2">
              <Input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                placeholder="Add highlight..."
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button type="button" onClick={addHighlight} variant="outline" className="border-slate-600">
                Add
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.highlights?.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-cyan-400">•</span>
                  <span className="flex-1">{highlight}</span>
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-gray-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo_url" className="text-gray-300">Demo URL</Label>
              <Input
                id="demo_url"
                type="url"
                value={formData.demo_url}
                onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
                placeholder="https://demo.example.com"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="text-gray-300">GitHub URL</Label>
              <Input
                id="github"
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
                placeholder="https://github.com/..."
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          {formData.project_files && formData.project_files.length > 0 && (
            <div className="space-y-2">
              <Label className="text-gray-300">Uploaded Files</Label>
              <div className="space-y-2">
                {formData.project_files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {file.type?.includes('zip') ? 'ZIP' : 
                         file.type?.includes('pdf') ? 'PDF' : 
                         file.type?.includes('text') ? 'TXT' : 'FILE'}
                      </Badge>
                    </div>
                    {file.url && (
                      <a href={file.url} download target="_blank" rel="noopener noreferrer">
                        <Button type="button" size="sm" variant="ghost" className="text-cyan-400">
                          Download
                        </Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-cyan-500 hover:bg-cyan-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

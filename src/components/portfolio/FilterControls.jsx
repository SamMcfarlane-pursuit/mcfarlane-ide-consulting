import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, CheckCircle, Clock, Lightbulb, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = [
  'All Projects',
  'AI/ML',
  'Web Development',
  'Mobile App',
  'Data Science',
  'Cloud/DevOps',
  'Blockchain',
  'IoT',
  'Other'
];

const statuses = [
  { value: 'all', label: 'All Status', icon: Grid },
  { value: 'completed', label: 'Completed', icon: CheckCircle },
  { value: 'in_progress', label: 'In Progress', icon: Clock },
  { value: 'planning', label: 'Planning', icon: Lightbulb }
];

export default function FilterControls({ selectedCategory, selectedStatus, onCategoryChange, onStatusChange, projectCount, viewMode, onViewModeChange }) {
  const currentStatus = statuses.find(s => s.value === selectedStatus) || statuses[0];
  const StatusIcon = currentStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 flex-wrap"
    >
      <div className="flex items-center gap-2 text-gray-400">
        <Grid className="w-4 h-4" />
        <span className="text-sm font-medium">
          {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
        </span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-900 border-slate-700">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
              className="text-gray-300 hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-white"
          >
            <StatusIcon className="w-4 h-4 mr-2" />
            {currentStatus.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-900 border-slate-700">
          {statuses.map((status) => {
            const Icon = status.icon;
            return (
              <DropdownMenuItem
                key={status.value}
                onClick={() => onStatusChange(status.value)}
                className="text-gray-300 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <Icon className="w-4 h-4 mr-2" />
                {status.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 bg-slate-800/50 border border-slate-700 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange('sphere')}
          className={`${viewMode === 'sphere' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400'}`}
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange('list')}
          className={`${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400'}`}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
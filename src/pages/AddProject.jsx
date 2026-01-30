
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Upload, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createPageUrl } from '@/utils';
import { Project } from '@/entities/Project';
import { motion } from 'framer-motion';

import FileUploader from '../components/upload/FileUploader';
import ProjectAnalyzer from '../components/upload/ProjectAnalyzer';
import GitHubImporter from '../components/upload/GitHubImporter';
import ProjectForm from '../components/upload/ProjectForm';

export default function AddProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analyzedData, setAnalyzedData] = useState(null);
  const [importMethod, setImportMethod] = useState('github');

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    setStep(2);
  };

  const handleAnalysisComplete = (data) => {
    setAnalyzedData(data);
    setStep(3);
  };

  const handleGitHubImport = (data) => {
    setAnalyzedData(data);
    setStep(3);
  };

  const handleSkipAnalysis = (data) => {
    setAnalyzedData(data || {
      project_files: uploadedFiles.map(f => ({
        name: f.name,
        url: '',
        type: f.type
      })),
      title: '',
      description: '',
      category: 'Web Development',
      status: 'completed',
      year: new Date().getFullYear()
    });
    setStep(3);
  };

  const handleSaveProject = async (projectData) => {
    await Project.create(projectData);
    navigate(createPageUrl('Portfolio'));
  };

  const getMethodDescription = () => {
    switch (importMethod) {
      case 'github':
        return 'Automatically fetch project details from any public repository';
      case 'files':
        return 'Upload any files • Fill in project details manually';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

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
            <h1 className="text-3xl font-bold text-white">Add New Project</h1>
            <p className="text-gray-400 mt-1">Import from GitHub or upload files</p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= num
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-lg shadow-amber-500/30'
                    : 'bg-slate-800 text-gray-500'
                    }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-1 transition-all ${step > num ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-slate-800'
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {step === 1 && (
            <Tabs defaultValue="github" className="w-full" onValueChange={setImportMethod}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-800 mb-6">
                <TabsTrigger
                  value="github"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">GitHub</span>
                  <span className="sm:hidden">Git</span>
                </TabsTrigger>
                <TabsTrigger
                  value="files"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Files</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="github">
                <GitHubImporter onImportComplete={handleGitHubImport} />
              </TabsContent>

              <TabsContent value="files">
                <FileUploader onFilesUploaded={handleFilesUploaded} />
              </TabsContent>
            </Tabs>
          )}

          {step === 2 && (
            <ProjectAnalyzer
              uploadedFiles={uploadedFiles}
              onAnalysisComplete={handleAnalysisComplete}
              onSkip={handleSkipAnalysis}
            />
          )}

          {step === 3 && (
            <ProjectForm
              initialData={analyzedData}
              onSave={handleSaveProject}
              onCancel={() => navigate(createPageUrl('Portfolio'))}
            />
          )}
        </motion.div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>{getMethodDescription()}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

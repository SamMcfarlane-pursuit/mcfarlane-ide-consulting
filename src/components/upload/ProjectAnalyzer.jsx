import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { InvokeLLM, UploadFile } from '@/integrations/Core';

export default function ProjectAnalyzer({ uploadedFiles, onAnalysisComplete, onSkip }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);
  const [hasUnsupportedFiles, setHasUnsupportedFiles] = useState(false);
  const [hasSupportedFiles, setHasSupportedFiles] = useState(false);

  useEffect(() => {
    const unsupported = uploadedFiles.some(file => 
      file.name.endsWith('.zip') || 
      file.name.endsWith('.rar') || 
      file.name.endsWith('.7z')
    );
    
    const supported = uploadedFiles.some(file => 
      !file.name.endsWith('.zip') && 
      !file.name.endsWith('.rar') && 
      !file.name.endsWith('.7z')
    );
    
    setHasUnsupportedFiles(unsupported);
    setHasSupportedFiles(supported);
    
    if (!supported && unsupported) {
      setError('Only ZIP/RAR files detected. These will be saved for download, but cannot be analyzed by AI.');
    }
  }, [uploadedFiles]);

  const analyzeProject = async () => {
    setAnalyzing(true);
    setError(null);
    setProgress('Uploading files...');

    try {
      // Upload ALL files first and get their URLs
      const fileUrls = [];
      for (const fileData of uploadedFiles) {
        setProgress(`Uploading ${fileData.name}...`);
        const { file_url } = await UploadFile({ file: fileData.file });
        fileUrls.push({ 
          name: fileData.name, 
          url: file_url, 
          type: fileData.type || 'application/octet-stream'
        });
      }

      // Filter supported files for AI analysis
      const supportedFiles = uploadedFiles.filter(file => 
        !file.name.endsWith('.zip') && 
        !file.name.endsWith('.rar') && 
        !file.name.endsWith('.7z')
      );

      if (supportedFiles.length === 0) {
        // No files to analyze, but we have uploads - create basic project data
        const projectData = {
          title: '',
          description: '',
          category: 'Web Development',
          technologies: [],
          highlights: [],
          readme_content: null,
          year: new Date().getFullYear(),
          status: 'completed',
          project_files: fileUrls,
          color: getRandomColor()
        };
        
        onAnalysisComplete(projectData);
        setAnalyzing(false);
        return;
      }

      const supportedFileUrls = fileUrls.filter(f => 
        !f.name.endsWith('.zip') && 
        !f.name.endsWith('.rar') && 
        !f.name.endsWith('.7z')
      );

      setProgress('Analyzing project with AI...');

      const analysis = await InvokeLLM({
        prompt: `You are analyzing a software project based on uploaded files. 
        
Extract comprehensive information about this project and return it in the following JSON format:

{
  "title": "Project name",
  "description": "Detailed description (2-3 sentences)",
  "category": "One of: AI/ML, Web Development, Mobile App, Data Science, Cloud/DevOps, Blockchain, IoT, Other",
  "technologies": ["array", "of", "technologies", "used"],
  "highlights": ["key", "achievements", "or", "features"],
  "readme_content": "Full content if README found, otherwise null",
  "year": ${new Date().getFullYear()},
  "status": "completed or in_progress or planning"
}

Be thorough and extract as much useful information as possible. If you find a README, extract its full content.
If files are code files, identify the programming languages and frameworks used.
Be specific about what makes this project unique or interesting.`,
        file_urls: supportedFileUrls.map(f => f.url),
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            technologies: { type: "array", items: { type: "string" } },
            highlights: { type: "array", items: { type: "string" } },
            readme_content: { type: "string" },
            year: { type: "number" },
            status: { type: "string" }
          }
        }
      });

      setProgress('Analysis complete!');

      const projectData = {
        ...analysis,
        project_files: fileUrls,
        color: getRandomColor()
      };

      onAnalysisComplete(projectData);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze project. Please try again or fill in details manually.');
    }

    setAnalyzing(false);
  };

  const handleSkip = async () => {
    // Upload files even when skipping analysis
    setAnalyzing(true);
    setProgress('Uploading files...');
    
    try {
      const fileUrls = [];
      for (const fileData of uploadedFiles) {
        setProgress(`Uploading ${fileData.name}...`);
        const { file_url } = await UploadFile({ file: fileData.file });
        fileUrls.push({ 
          name: fileData.name, 
          url: file_url, 
          type: fileData.type || 'application/octet-stream'
        });
      }
      
      const projectData = {
        title: '',
        description: '',
        category: 'Web Development',
        technologies: [],
        highlights: [],
        year: new Date().getFullYear(),
        status: 'completed',
        project_files: fileUrls,
        color: getRandomColor()
      };
      
      onSkip(projectData);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload files. Please try again.');
    }
    
    setAnalyzing(false);
  };

  const getRandomColor = () => {
    const colors = ['#00D9FF', '#A445FF', '#00FFB3', '#FFD400', '#FF6B9D'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Project Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">
          Our AI will analyze your project files to automatically extract information,
          technologies used, and generate a comprehensive description.
        </p>

        {hasUnsupportedFiles && (
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300 text-sm">
              <strong>Note:</strong> ZIP/RAR files will be uploaded and available for download, 
              but cannot be analyzed by AI. For best results, upload README.md, PDF documentation, 
              or text files alongside your ZIP.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 text-cyan-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">{progress}</span>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={analyzeProject}
            disabled={analyzing}
            className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {hasSupportedFiles ? 'Analyzing...' : 'Uploading...'}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {hasSupportedFiles ? 'Analyze with AI' : 'Upload Files'}
              </>
            )}
          </Button>

          <Button
            onClick={handleSkip}
            variant="outline"
            disabled={analyzing}
            className="flex-1 border-slate-600"
          >
            Skip & Fill Manually
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          All files will be uploaded and available for download
        </p>
      </CardContent>
    </Card>
  );
}

import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { InvokeLLM } from '@/integrations/Core';

export default function Base44Importer({ onImportComplete }) {
  const [appUrl, setAppUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);

  const isValidBase44Url = (url) => {
    const cleanUrl = url.trim().toLowerCase();
    // Accept both formats:
    // 1. https://base44.app/apps/your-app-id
    // 2. https://your-app-id.base44.app
    return (cleanUrl.includes('base44.app') || cleanUrl.includes('base44.com')) && 
           (cleanUrl.includes('/apps/') || cleanUrl.match(/https?:\/\/[\w-]+\.base44\.(app|com)/));
  };

  const importFromBase44 = async () => {
    if (!appUrl.trim()) {
      setError('Please enter a base44 app URL');
      return;
    }

    if (!isValidBase44Url(appUrl)) {
      setError('Please enter a valid base44 app URL (e.g., https://your-app.base44.app or https://base44.app/apps/your-app-id)');
      return;
    }

    setImporting(true);
    setError(null);
    setProgress('Analyzing your base44 app...');

    try {
      const cleanUrl = appUrl.trim().replace(/\/$/, '');

      setProgress('Extracting app information with AI...');

      // Use InvokeLLM with internet context to fetch and analyze the app
      const analysis = await InvokeLLM({
        prompt: `Analyze the base44 application at ${cleanUrl}

This is a web application built on the base44 platform. Please visit the URL and extract comprehensive information about this application.

Return the information in the following JSON format:

{
  "title": "Application name (extract from page title or main heading)",
  "description": "Detailed description of what the app does (2-3 sentences based on the app's content and functionality)",
  "category": "Best matching category from: AI/ML, Web Development, Mobile App, Data Science, Cloud/DevOps, Blockchain, IoT, Other",
  "technologies": ["base44", "React", "and any other technologies you can identify from the app"],
  "highlights": ["key features", "unique capabilities", "notable aspects of the application"],
  "year": ${new Date().getFullYear()},
  "status": "completed"
}

Analyze the app's interface, features, and purpose to provide accurate information.
Focus on what makes this application useful and interesting.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            technologies: { type: "array", items: { type: "string" } },
            highlights: { type: "array", items: { type: "string" } },
            year: { type: "number" },
            status: { type: "string" }
          }
        }
      });

      setProgress('Import complete!');

      // Combine analysis with app data
      const projectData = {
        ...analysis,
        demo_url: cleanUrl,
        link: cleanUrl,
        color: '#00D9FF',
        technologies: [
          'base44',
          'React',
          'JavaScript',
          ...(analysis.technologies || []).filter(t => 
            !['base44', 'react', 'javascript'].includes(t.toLowerCase())
          )
        ],
        highlights: [
          ...(analysis.highlights || []),
          '🚀 Built on base44 platform',
          '⚡ Live web application'
        ]
      };

      onImportComplete(projectData);
      
    } catch (err) {
      console.error('base44 import error:', err);
      setError('Failed to import app. Please check the URL and try again, or add the project manually.');
    }

    setImporting(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      importFromBase44();
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Import base44 App
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">
          Enter the URL of your base44 application and we'll automatically fetch the app details
          and add it to your portfolio with a live demo link.
        </p>

        <Alert className="bg-cyan-500/10 border-cyan-500/30">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <AlertDescription className="text-cyan-300 text-sm">
            <strong>Showcase your base44 projects!</strong> Add any app you've built on base44 
            to display in your interactive portfolio sphere.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="base44-url" className="text-gray-300">
            base44 App URL
          </Label>
          <Input
            id="base44-url"
            value={appUrl}
            onChange={(e) => setAppUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://your-app.base44.app or https://base44.app/apps/your-app-id"
            className="bg-slate-800 border-slate-600 text-white"
            disabled={importing}
          />
          <p className="text-xs text-gray-500">
            Supports both formats: subdomain (your-app.base44.app) or path (/apps/your-app-id)
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {importing && (
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

        <Button
          onClick={importFromBase44}
          disabled={importing || !appUrl.trim()}
          className="w-full bg-cyan-500 hover:bg-cyan-600"
        >
          {importing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Import base44 App
            </>
          )}
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3" />
            <span>Automatically extracts app name and features</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ExternalLink className="w-3 h-3" />
            <span>Adds live demo link to your portfolio</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

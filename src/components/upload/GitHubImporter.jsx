import React, { useState } from 'react';
import { Github, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { InvokeLLM } from '@/integrations/Core';

export default function GitHubImporter({ onImportComplete }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);

  const isValidGitHubUrl = (url) => {
    // More flexible validation
    const cleanUrl = url.trim().toLowerCase();
    return cleanUrl.includes('github.com/') && 
           cleanUrl.split('/').length >= 5; // Must have owner and repo
  };

  const importFromGitHub = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
      return;
    }

    setImporting(true);
    setError(null);
    setProgress('Fetching repository information...');

    try {
      const cleanUrl = repoUrl.trim().replace(/\/$/, '');

      setProgress('Analyzing repository with AI...');

      // Use InvokeLLM with internet context to fetch and analyze the repo
      const analysis = await InvokeLLM({
        prompt: `Analyze the GitHub repository at ${cleanUrl}

Please extract comprehensive information about this project and return it in the following JSON format:

{
  "title": "Repository name (clean, without owner prefix)",
  "description": "Repository description (2-3 sentences, based on repo description and README)",
  "category": "Best matching category from: AI/ML, Web Development, Mobile App, Data Science, Cloud/DevOps, Blockchain, IoT, Other",
  "technologies": ["array", "of", "programming languages", "and", "frameworks", "used"],
  "highlights": ["key", "features", "achievements", "or", "interesting", "aspects", "from", "README"],
  "readme_content": "Full README.md content if available",
  "year": current_year_or_last_updated_year,
  "status": "completed (if mature/stable), in_progress (if active development), or planning (if new/early)",
  "github_stats": {
    "stars": number_of_stars,
    "forks": number_of_forks,
    "language": "primary_language"
  }
}

Extract as much detail as possible from the repository's README, description, and metadata.
Focus on what makes this project unique and valuable.
If there are demo links or live deployments mentioned in the README, note them.`,
        add_context_from_internet: true,
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
            status: { type: "string" },
            github_stats: {
              type: "object",
              properties: {
                stars: { type: "number" },
                forks: { type: "number" },
                language: { type: "string" }
              }
            }
          }
        }
      });

      setProgress('Import complete!');

      // Combine analysis with repo data
      const projectData = {
        ...analysis,
        github: cleanUrl,
        color: getRandomColor(),
        highlights: [
          ...(analysis.highlights || []),
          analysis.github_stats?.stars ? `⭐ ${analysis.github_stats.stars} GitHub stars` : null,
          analysis.github_stats?.language ? `Built with ${analysis.github_stats.language}` : null
        ].filter(Boolean)
      };

      onImportComplete(projectData);
      
    } catch (err) {
      console.error('GitHub import error:', err);
      setError('Failed to import repository. Please check the URL and try again, or add the project manually.');
    }

    setImporting(false);
  };

  const getRandomColor = () => {
    const colors = ['#00D9FF', '#A445FF', '#00FFB3', '#FFD400', '#FF6B9D'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      importFromGitHub();
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Github className="w-5 h-5 text-purple-400" />
          Import from GitHub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">
          Enter a GitHub repository URL and we'll automatically fetch all the project details,
          including README, technologies, and statistics.
        </p>

        <div className="space-y-2">
          <Label htmlFor="github-url" className="text-gray-300">
            GitHub Repository URL
          </Label>
          <Input
            id="github-url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://github.com/username/repository"
            className="bg-slate-800 border-slate-600 text-white"
            disabled={importing}
          />
          <p className="text-xs text-gray-500">
            Paste the full URL from your browser (e.g., https://github.com/facebook/react)
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
            <div className="flex items-center gap-3 text-purple-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">{progress}</span>
            </div>
          </motion.div>
        )}

        <Button
          onClick={importFromGitHub}
          disabled={importing || !repoUrl.trim()}
          className="w-full bg-purple-500 hover:bg-purple-600"
        >
          {importing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Github className="w-4 h-4 mr-2" />
              Import Repository
            </>
          )}
        </Button>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle className="w-3 h-3" />
          <span>Fetches README, technologies, stats automatically</span>
        </div>
      </CardContent>
    </Card>
  );
}
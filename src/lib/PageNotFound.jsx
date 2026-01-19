import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-4">
                    <AlertTriangle className="w-10 h-10 text-amber-400" />
                </div>

                <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
                <p className="text-gray-400 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link to={createPageUrl('Portfolio')}>
                    <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
                        <Home className="w-4 h-4 mr-2" />
                        Back to Portfolio
                    </Button>
                </Link>
            </div>
        </div>
    );
}
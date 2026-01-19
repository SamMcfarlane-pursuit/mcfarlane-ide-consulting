import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import NavigationTracker from '@/lib/NavigationTracker';
import { createPageUrl } from '@/utils';

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-slate-950">
      <NavigationTracker />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to={createPageUrl('Portfolio')}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-semibold text-white">Samuel McFarlane</span>
              <span className="text-gray-500 text-sm hidden sm:inline">Project Sphere</span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                to={createPageUrl('Portfolio')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${currentPath === '/' || currentPath === '/Portfolio'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Portfolio</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page content with top padding for fixed header */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
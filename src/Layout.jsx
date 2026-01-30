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

      {/* Vibrant header with glow effects */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border-b border-amber-500/20">
        {/* Subtle top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to={createPageUrl('Portfolio')}
              className="flex items-center gap-3 group"
            >
              {/* Glowing logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-amber-400/40 blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-slate-900 font-bold text-sm">SM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">Samuel McFarlane</span>
                <span className="text-amber-400/60 text-xs hidden sm:inline tracking-wide">AI/ML Engineer & Full-Stack Dev</span>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                to={createPageUrl('Portfolio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentPath === '/' || currentPath === '/Portfolio'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-300 shadow-lg shadow-amber-500/10 border border-amber-400/30'
                  : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Portfolio</span>
              </Link>
              <Link
                to={createPageUrl('About')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentPath === '/About'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-300 shadow-lg shadow-amber-500/10 border border-amber-400/30'
                  : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20'
                  }`}
              >
                <span className="hidden sm:inline font-medium">About</span>
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
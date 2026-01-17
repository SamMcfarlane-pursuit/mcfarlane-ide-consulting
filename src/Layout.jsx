import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, Upload, Home } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const user = await base44.auth.me();
      setIsAdmin(user.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const navItems = [
    { name: "Portfolio", path: createPageUrl("Portfolio"), icon: Home, showToAll: true },
    { name: "Add Project", path: createPageUrl("AddProject"), icon: Upload, showToAll: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Futuristic Navigation */}
      <nav className="border-b border-cyan-500/20 backdrop-blur-xl bg-slate-900/60 sticky top-0 z-40 shadow-lg shadow-cyan-500/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Portfolio")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Samuel McFarlane</span>
                <span className="text-xs bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent font-bold">
                  Project Sphere
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                // Show "Add Project" only to admin users
                if (!item.showToAll && !isAdmin) return null;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 shadow-lg shadow-cyan-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
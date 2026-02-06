import React, { useState, useEffect } from 'react';
import { Settings, Check, ChevronDown, Monitor, Smartphone, Zap, Crown } from 'lucide-react';
import { QUALITY_PRESETS, getQualityPreset, setQualityPreset } from '@/lib/LODManager';

/**
 * Quality Settings Toggle - Allows users to manually override the auto-detected quality preset
 * Appears as a subtle settings icon that expands to show quality options
 */
export default function QualitySettings({ onQualityChange, className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPreset, setCurrentPreset] = useState('high');
    const [isLoading, setIsLoading] = useState(true);

    // Load current preset on mount
    useEffect(() => {
        const loadPreset = async () => {
            const preset = await getQualityPreset();
            setCurrentPreset(preset);
            setIsLoading(false);
        };
        loadPreset();
    }, []);

    // Handle preset selection
    const handleSelect = (presetKey) => {
        setQualityPreset(presetKey);
        setCurrentPreset(presetKey);
        setIsOpen(false);

        // Notify parent component if callback provided
        if (onQualityChange) {
            onQualityChange(presetKey);
        }

        // Reload page to apply new settings (Three.js scene needs re-initialization)
        window.location.reload();
    };

    const presetIcons = {
        ultra: <Crown size={16} className="text-amber-400" />,
        high: <Monitor size={16} className="text-blue-400" />,
        medium: <Zap size={16} className="text-green-400" />,
        low: <Smartphone size={16} className="text-gray-400" />
    };

    if (isLoading) return null;

    return (
        <div className={`relative ${className}`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-black/60 
                   border border-white/10 hover:border-white/20 rounded-lg 
                   text-white/70 hover:text-white transition-all duration-200"
                title="Graphics Quality"
            >
                <Settings size={16} className={isOpen ? 'animate-spin' : ''} />
                <span className="text-xs font-medium uppercase tracking-wider">
                    {QUALITY_PRESETS[currentPreset]?.name || 'Auto'}
                </span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/10 
                        rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-2 border-b border-white/10">
                        <p className="text-xs text-white/50 uppercase tracking-wider px-2">
                            Graphics Quality
                        </p>
                    </div>

                    <div className="p-1">
                        {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => handleSelect(key)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                           transition-all duration-150 text-left
                           ${currentPreset === key
                                        ? 'bg-white/10 text-white'
                                        : 'hover:bg-white/5 text-white/70 hover:text-white'}`}
                            >
                                {presetIcons[key]}
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{preset.name}</p>
                                    <p className="text-xs text-white/40">{preset.description}</p>
                                </div>
                                {currentPreset === key && (
                                    <Check size={16} className="text-emerald-400" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-2 border-t border-white/10">
                        <p className="text-[10px] text-white/30 text-center">
                            Changes will reload the page
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

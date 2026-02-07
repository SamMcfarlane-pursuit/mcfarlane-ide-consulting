/**
 * LOD Manager - Level of Detail System for Three.js Performance
 * 
 * Automatically detects device capabilities and provides appropriate
 * quality presets for particle counts and rendering settings.
 */

// Quality Presets - Particle counts and rendering options
export const QUALITY_PRESETS = {
    ultra: {
        name: 'Ultra',
        globeParticles: 4000,
        stars: 2500,
        floating: 200,
        planetDots: 8,
        pixelRatio: 4,
        wireframeSegments: 48,
        sphereSegments: 64,
        ringSegments: 128,
        description: '4K displays, high-end GPUs'
    },
    high: {
        name: 'High',
        globeParticles: 2500,
        stars: 1500,
        floating: 150,
        planetDots: 6,
        pixelRatio: 2,
        wireframeSegments: 32,
        sphereSegments: 48,
        ringSegments: 96,
        description: 'Standard desktop displays'
    },
    medium: {
        name: 'Medium',
        globeParticles: 1500,
        stars: 800,
        floating: 100,
        planetDots: 4,
        pixelRatio: 1.5,
        wireframeSegments: 24,
        sphereSegments: 32,
        ringSegments: 64,
        description: 'Laptops and tablets'
    },
    low: {
        name: 'Low',
        globeParticles: 800,
        stars: 400,
        floating: 50,
        planetDots: 3,
        pixelRatio: 1,
        wireframeSegments: 16,
        sphereSegments: 24,
        ringSegments: 48,
        description: 'Mobile devices and low-power mode'
    }
};

// Storage key for user preference
const LOD_STORAGE_KEY = 'mcfarlane_quality_preset';

/**
 * Detect GPU tier based on WebGL capabilities
 * @returns {'high' | 'medium' | 'low'}
 */
function detectGPUTier() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) return 'low';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();

            // High-end GPUs
            if (renderer.includes('rtx') ||
                renderer.includes('radeon rx') ||
                renderer.includes('geforce gtx 10') ||
                renderer.includes('geforce gtx 16') ||
                renderer.includes('apple m1') ||
                renderer.includes('apple m2') ||
                renderer.includes('apple m3')) {
                return 'high';
            }

            // Integrated graphics - medium
            if (renderer.includes('intel') ||
                renderer.includes('integrated') ||
                renderer.includes('mesa')) {
                return 'medium';
            }
        }

        // Check max texture size as fallback
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        if (maxTextureSize >= 16384) return 'high';
        if (maxTextureSize >= 8192) return 'medium';

        return 'low';
    } catch {
        return 'medium';
    }
}

/**
 * Detect device memory if available
 * @returns {number} Memory in GB, defaults to 4
 */
function detectDeviceMemory() {
    if ('deviceMemory' in navigator) {
        return navigator.deviceMemory;
    }
    return 4; // Assume 4GB if not available
}

/**
 * Check if device is touch-based (likely mobile/tablet)
 * @returns {boolean}
 */
function isTouchDevice() {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Check battery status if available
 * @returns {Promise<{charging: boolean, level: number} | null>}
 */
async function getBatteryStatus() {
    try {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            return {
                charging: battery.charging,
                level: battery.level
            };
        }
    } catch {
        // Battery API not available
    }
    return null;
}

/**
 * Auto-detect the optimal quality preset based on device capabilities
 * @returns {Promise<'ultra' | 'high' | 'medium' | 'low'>}
 */
export async function detectOptimalQuality() {
    const gpuTier = detectGPUTier();
    const memory = detectDeviceMemory();
    const isTouch = isTouchDevice();
    const battery = await getBatteryStatus();
    const dpr = window.devicePixelRatio || 1;

    // Log detection results for debugging
    console.log('[LOD] Device detection:', { gpuTier, memory, isTouch, battery, dpr });

    // Low battery and not charging = reduce quality
    if (battery && !battery.charging && battery.level < 0.2) {
        console.log('[LOD] Low battery detected, using low quality');
        return 'low';
    }

    // Touch device with low memory = low quality
    if (isTouch && memory <= 2) {
        console.log('[LOD] Mobile device with low memory, using low quality');
        return 'low';
    }

    // Touch device = medium by default
    if (isTouch) {
        console.log('[LOD] Touch device detected, using medium quality');
        return 'medium';
    }

    // Desktop with high-end GPU and 4K display
    if (gpuTier === 'high' && dpr >= 2 && memory >= 8) {
        console.log('[LOD] High-end desktop detected, using ultra quality');
        return 'ultra';
    }

    // High GPU tier
    if (gpuTier === 'high') {
        console.log('[LOD] High GPU tier detected, using high quality');
        return 'high';
    }

    // Medium GPU tier or adequate memory
    if (gpuTier === 'medium' || memory >= 4) {
        console.log('[LOD] Medium tier detected, using medium quality');
        return 'medium';
    }

    // Fallback to low
    console.log('[LOD] Falling back to low quality');
    return 'low';
}

/**
 * Get the saved quality preference or auto-detect
 * @returns {Promise<keyof typeof QUALITY_PRESETS>}
 */
export async function getQualityPreset() {
    // Check for saved preference
    const saved = localStorage.getItem(LOD_STORAGE_KEY);
    if (saved && saved in QUALITY_PRESETS) {
        console.log('[LOD] Using saved quality preset:', saved);
        return saved;
    }

    // Auto-detect
    return await detectOptimalQuality();
}

/**
 * Save quality preference
 * @param {keyof typeof QUALITY_PRESETS} preset 
 */
export function setQualityPreset(preset) {
    if (preset in QUALITY_PRESETS) {
        localStorage.setItem(LOD_STORAGE_KEY, preset);
        console.log('[LOD] Quality preset saved:', preset);
    }
}

/**
 * Clear saved preference (will auto-detect on next load)
 */
export function clearQualityPreference() {
    localStorage.removeItem(LOD_STORAGE_KEY);
    console.log('[LOD] Quality preference cleared, will auto-detect');
}

/**
 * Get LOD settings for current quality level
 * @param {keyof typeof QUALITY_PRESETS} presetKey 
 * @returns {typeof QUALITY_PRESETS['ultra']}
 */
export function getLODSettings(presetKey) {
    return QUALITY_PRESETS[presetKey] || QUALITY_PRESETS.high;
}

export default {
    QUALITY_PRESETS,
    detectOptimalQuality,
    getQualityPreset,
    setQualityPreset,
    clearQualityPreference,
    getLODSettings
};

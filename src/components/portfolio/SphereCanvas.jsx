import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

// Unified Color Palette - Matching Cinematic Intro System
const COLORS = {
  // Core nucleus - brilliant white to bright gold
  core: '#ffffff',
  coreGlow: '#ffdd44',
  midGlow: '#ffc933',
  outerGlow: '#ffb700',

  // Particles - bright white/gold spectrum
  particle: '#ffffff',
  particleGold: '#fff2b3',
  particleDeep: '#ffd54f',

  // Orbit paths - vibrant goldenrod
  orbit: '#daa520',
  orbitGlow: '#ffd700',

  // Atmosphere
  atmosphere: '#0a0908',
  atmosphereGlow: '#14120f',

  // Status palettes - Distinct color scheme
  completed: { main: '#6366f1', light: '#818cf8', glow: '#a5b4fc', dark: '#4f46e5', accent: '#eef2ff' },    // Indigo
  in_progress: { main: '#ffd700', light: '#ffe066', glow: '#fff2b3', dark: '#b8860b', accent: '#fffbeb' },  // Gold
  planning: { main: '#a8a29e', light: '#d6d3d1', glow: '#e7e5e4', dark: '#78716c', accent: '#f5f5f4' }       // Silver
};

// Easing functions from cinematic system
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export default function SphereCanvas({ projects, onProjectClick, selectedProject, filterCategory, fullScreen = false }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const pointsRef = useRef(null);
  const wireframeRef = useRef(null);
  const glowRef = useRef(null);
  const innerGlowRef = useRef(null);
  const ringRef = useRef(null);
  const outerRingRef = useRef(null);
  const animationFrameRef = useRef(null);
  const starsRef = useRef([]);
  const floatingParticlesRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentProject = projects[currentIndex] || projects[0];

  // Navigation functions
  const nextProject = useCallback(() => {
    if (isTransitioning || projects.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 300);
  }, [isTransitioning, projects.length]);

  const prevProject = useCallback(() => {
    if (isTransitioning || projects.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 300);
  }, [isTransitioning, projects.length]);

  const goToProject = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 300);
  }, [isTransitioning, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Get status palette
  const getStatusPalette = useCallback((status) => {
    if (status === 'completed') return COLORS.completed;
    if (status === 'in_progress') return COLORS.in_progress;
    return COLORS.planning;
  }, []);

  // Generate Fibonacci sphere particle positions (matching GlobeScene)
  const generateFibonacciSphere = useCallback((count, radius) => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Height gradient coloring (matching cinematic system)
      const heightFactor = (y + radius) / (radius * 2);
      const intensity = 0.85 + Math.random() * 0.15;

      // Bright white-gold gradient
      colors[i * 3] = intensity * (0.98 + heightFactor * 0.02);
      colors[i * 3 + 1] = intensity * (0.90 + heightFactor * 0.08);
      colors[i * 3 + 2] = intensity * (0.55 + heightFactor * 0.25);
    }

    return { positions, colors };
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || projects.length === 0) return;

    // Scene setup with high quality settings
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      precision: 'highp',
      stencil: false,
      depth: true
    });

    // 4K ULTRA rendering - maximum quality for crisp visuals
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4)); // Support up to 4K displays
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2; // Maximum brightness for stunning visual impact
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    currentMount.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    camera.position.z = 5.5; // Same as cinematic pullback end position

    const project = projects[currentIndex] || projects[0];
    const palette = getStatusPalette(project.status);

    // ===== Cinematic Lighting (enhanced brightness) =====
    const ambientLight = new THREE.AmbientLight(0xfff8e0, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffd700, 0.5, 100);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xc9a227, 0.3, 100);
    fillLight.position.set(-10, -10, -10);
    scene.add(fillLight);

    // Status-colored rim light
    const rimLight = new THREE.PointLight(new THREE.Color(palette.main), 0.4, 30);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    // ===== Dense Star Field (matching FloatingParticles) =====
    const createStarField = () => {
      const starCount = 2500;
      const starGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = 30 + Math.random() * 70;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // White/gold star colors
        const rand = Math.random();
        if (rand < 0.6) {
          colors[i3] = colors[i3 + 1] = colors[i3 + 2] = 1;
        } else if (rand < 0.85) {
          colors[i3] = 1; colors[i3 + 1] = 0.92; colors[i3 + 2] = 0.7;
        } else {
          colors[i3] = 1; colors[i3 + 1] = 0.8; colors[i3 + 2] = 0.4;
        }
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const starMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        depthWrite: false
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starsRef.current.push(stars);
    };
    createStarField();

    // ===== Fibonacci Particle Globe (matching ParticleGlobe from GlobeScene) =====
    const particleCount = 4000;
    const globeRadius = 2;
    const { positions, colors } = generateFibonacciSphere(particleCount, globeRadius);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false
    });

    const particleGlobe = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleGlobe);
    pointsRef.current = particleGlobe;

    // ===== Wireframe Sphere (structural weight) =====
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius, 48, 48);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.orbit,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);
    wireframeRef.current = wireframe;

    // ===== Inner Atmosphere Glow =====
    const innerGlowGeometry = new THREE.SphereGeometry(globeRadius * 0.98, 64, 64);
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: palette.glow,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    scene.add(innerGlow);
    innerGlowRef.current = innerGlow;

    // ===== Outer Atmosphere Glow (matching GlobeScene glow layer) =====
    const glowGeometry = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: palette.light,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    glowRef.current = glow;

    // ===== Status Ring (Saturn-like orbit ring) =====
    const ringGeometry = new THREE.RingGeometry(globeRadius * 1.25, globeRadius * 1.4, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: palette.main,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.1;
    scene.add(ring);
    ringRef.current = ring;

    // ===== Outer Glow Ring =====
    const outerRingGeometry = new THREE.RingGeometry(globeRadius * 1.4, globeRadius * 1.55, 128);
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: palette.glow,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    outerRing.rotation.x = Math.PI / 2.1;
    scene.add(outerRing);
    outerRingRef.current = outerRing;

    // ===== Floating Ambient Particles (matching GlobeScene) =====
    const floatingCount = 200;
    const floatingGeometry = new THREE.BufferGeometry();
    const floatingPositions = new Float32Array(floatingCount * 3);

    for (let i = 0; i < floatingCount; i++) {
      floatingPositions[i * 3] = (Math.random() - 0.5) * 15;
      floatingPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      floatingPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    floatingGeometry.setAttribute('position', new THREE.BufferAttribute(floatingPositions, 3));
    const floatingMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: palette.glow,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    });
    const floatingParticles = new THREE.Points(floatingGeometry, floatingMaterial);
    scene.add(floatingParticles);
    floatingParticlesRef.current = floatingParticles;

    // ===== PREMIUM ORBITING PROJECT PLANETS =====
    const orbitingPlanets = [];
    const textureLoader = new THREE.TextureLoader();

    // Create an orbiting planet for each project (max 8 for performance)
    const projectsToShow = projects.slice(0, 8);

    projectsToShow.forEach((project, i) => {
      // Calculate orbit parameters - artistic flowing motion
      const baseRadius = 2.5 + (i * 0.32); // Wider spread for visual clarity
      const speed = 0.06 + (i % 4) * 0.025; // Slower, more majestic speeds
      const direction = i % 2 === 0 ? 1 : -1; // Alternate directions
      const size = 0.22 - (i * 0.008); // Balanced proportional planets
      const tiltX = (Math.PI / 5) * Math.sin(i * 0.8); // Flowing sinusoidal tilts
      const tiltZ = (Math.PI / 9) * ((i % 3) - 1);

      // Get status color palette
      const statusPalette = project.status === 'completed' ? COLORS.completed :
        project.status === 'in_progress' ? COLORS.in_progress :
          COLORS.planning;

      // Create orbiting planet group
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.x = tiltX;
      orbitGroup.rotation.z = tiltZ;

      // Planet container (for local rotation)
      const planetContainer = new THREE.Group();
      planetContainer.position.x = baseRadius;

      // ===== LAYER 1: Metallic Core (innermost) =====
      const coreGeometry = new THREE.SphereGeometry(size * 0.6, 32, 32); // Optimized segments
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.dark,
        transparent: true,
        opacity: 1.0
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);

      // ===== LAYER 2: Main Planet Surface =====
      const planetGeometry = new THREE.SphereGeometry(size, 64, 64);
      const planetMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.main,
        transparent: true,
        opacity: 0.9
      });
      const planetSurface = new THREE.Mesh(planetGeometry, planetMaterial);

      // Try to load thumbnail texture
      if (project.image) {
        textureLoader.load(
          project.image,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            planetSurface.material = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: false,
              side: THREE.FrontSide
            });
            planetSurface.material.needsUpdate = true;
          },
          undefined,
          () => console.log(`Texture fallback for ${project.title}`)
        );
      }

      // ===== LAYER 3: Inner Light Glow =====
      const innerGlowGeometry = new THREE.SphereGeometry(size * 1.15, 32, 32);
      const innerGlowMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.light,
        transparent: true,
        opacity: 0.35
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);

      // ===== LAYER 4: Chromatic Ring (Saturn-style) =====
      const ringGeometry = new THREE.TorusGeometry(size * 1.4, 0.025, 8, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.accent,
        transparent: true,
        opacity: 0.85
      });
      const chromaticRing = new THREE.Mesh(ringGeometry, ringMaterial);
      chromaticRing.rotation.x = Math.PI / 2;

      // ===== LAYER 5: Secondary Ring (offset angle) =====
      const ring2Geometry = new THREE.TorusGeometry(size * 1.6, 0.015, 8, 48);
      const ring2Material = new THREE.MeshBasicMaterial({
        color: statusPalette.glow,
        transparent: true,
        opacity: 0.5
      });
      const secondaryRing = new THREE.Mesh(ring2Geometry, ring2Material);
      secondaryRing.rotation.x = Math.PI / 2.5;
      secondaryRing.rotation.y = Math.PI / 6;

      // ===== LAYER 6: Energy Aura =====
      const auraGeometry = new THREE.SphereGeometry(size * 1.9, 16, 16); // Optimized for glow
      const auraMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.glow,
        transparent: true,
        opacity: 0.18
      });
      const energyAura = new THREE.Mesh(auraGeometry, auraMaterial);

      // ===== LAYER 7: Outer Halo (atmosphere) =====
      const haloGeometry = new THREE.SphereGeometry(size * 2.5, 12, 12); // Optimized for ambient glow
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: statusPalette.light,
        transparent: true,
        opacity: 0.08
      });
      const outerHalo = new THREE.Mesh(haloGeometry, haloMaterial);

      // ===== LAYER 8: Orbiting Particle Dots =====
      const particleDots = new THREE.Group();
      for (let p = 0; p < 6; p++) {
        const dotGeometry = new THREE.SphereGeometry(size * 0.08, 8, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({
          color: statusPalette.accent,
          transparent: true,
          opacity: 0.7
        });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        const dotAngle = (p / 6) * Math.PI * 2;
        const dotRadius = size * 1.8;
        dot.position.set(
          Math.cos(dotAngle) * dotRadius,
          (Math.random() - 0.5) * size * 0.5,
          Math.sin(dotAngle) * dotRadius
        );
        particleDots.add(dot);
      }

      // Add all layers to container
      planetContainer.add(core);
      planetContainer.add(planetSurface);
      planetContainer.add(innerGlow);
      planetContainer.add(chromaticRing);
      planetContainer.add(secondaryRing);
      planetContainer.add(energyAura);
      planetContainer.add(outerHalo);
      planetContainer.add(particleDots);
      orbitGroup.add(planetContainer);

      // ===== ORBIT PATH (glowing trail) =====
      const orbitPath = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius, 0.006, 8, 128),
        new THREE.MeshBasicMaterial({
          color: statusPalette.light,
          transparent: true,
          opacity: 0.12
        })
      );
      orbitPath.rotation.x = Math.PI / 2;

      scene.add(orbitGroup);
      scene.add(orbitPath);

      // Store for animation with all animatable parts
      orbitingPlanets.push({
        group: orbitGroup,
        planetContainer,
        planetSurface,
        core,
        innerGlow,
        chromaticRing,
        secondaryRing,
        energyAura,
        outerHalo,
        particleDots,
        path: orbitPath,
        speed: speed * direction,
        offset: (i / projectsToShow.length) * Math.PI * 2,
        projectIndex: i
      });
    });


    // Store orbiting planets reference for animation
    const orbitingPlanetsRef = { current: orbitingPlanets };

    // Note: 3D text overlay removed - project info now in side panel

    // ===== Animation Loop with Delta Time for Smooth Performance =====
    let time = 0;
    let transitionProgress = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Delta time for frame-rate independent animation
      const now = performance.now();
      const deltaTime = Math.min((now - lastTime) / 1000, 0.1); // Cap at 100ms to prevent jumps
      lastTime = now;
      time += deltaTime * 0.6; // Smooth, consistent time progression

      // Slow, majestic rotation (matching GlobeScene)
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.003;
        pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
      }
      if (wireframeRef.current) {
        wireframeRef.current.rotation.y = pointsRef.current?.rotation.y || 0;
        wireframeRef.current.rotation.x = pointsRef.current?.rotation.x || 0;
      }

      // Atmosphere pulse
      if (glowRef.current) {
        const pulse = 1 + Math.sin(time * 0.5) * 0.05;
        glowRef.current.scale.setScalar(pulse);
      }

      // Ring rotation and pulse
      if (ringRef.current) {
        ringRef.current.rotation.z = time * 0.05;
        const ringPulse = 1 + Math.sin(time * 1.5) * 0.015;
        ringRef.current.scale.setScalar(ringPulse);
      }
      if (outerRingRef.current) {
        outerRingRef.current.rotation.z = -time * 0.03;
        const outerPulse = 1 + Math.sin(time * 1.2 + 0.5) * 0.02;
        outerRingRef.current.scale.setScalar(outerPulse);
      }

      // Floating particles drift
      if (floatingParticlesRef.current) {
        floatingParticlesRef.current.rotation.y = time * 0.02;
        floatingParticlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
      }

      // Star field slow rotation
      starsRef.current.forEach((stars) => {
        stars.rotation.y += 0.0002;
      });

      // PREMIUM ORBITING PLANETS ANIMATION - Enhanced Artistic Flowing Motion
      if (orbitingPlanetsRef.current) {
        orbitingPlanetsRef.current.forEach((planet, idx) => {
          // ===== ELLIPTICAL ORBIT - Vertical oscillation for 3D depth =====
          const baseRotation = time * planet.speed + planet.offset;
          const ellipticalPhase = baseRotation * 1.5;
          const verticalOscillation = Math.sin(ellipticalPhase) * 0.15;
          planet.planetContainer.position.y = verticalOscillation;

          // ===== STAGGERED COSMIC WAVE - Phase-shifted flow across planets =====
          const wavePhase = time * 0.4 + (idx * Math.PI / 4); // Staggered phases
          const waveAmplitude = 0.08 + Math.sin(time * 0.1) * 0.03;
          const cosmicWave = Math.sin(wavePhase) * waveAmplitude;

          // Smooth, flowing orbital rotation with wave influence
          const flowVariation = Math.sin(time * 0.3 + idx * 0.7) * 0.15;
          planet.group.rotation.y = baseRotation + flowVariation + cosmicWave;

          // Gentle orbital plane wobble for organic feel
          planet.group.rotation.x += Math.sin(time * 0.2 + idx) * 0.0004;
          planet.group.rotation.z += Math.cos(time * 0.15 + idx * 0.5) * 0.0003;

          // ===== BREATHING CONTAINER - Subtle scale pulsing entire planet =====
          if (planet.planetContainer) {
            const breathingScale = 1 + Math.sin(time * 0.7 + planet.offset * 1.5) * 0.04;
            planet.planetContainer.scale.setScalar(breathingScale);
          }

          // Self-rotation with flowing speed variation
          if (planet.planetSurface) {
            const rotationSpeed = 0.006 + Math.sin(time * 0.5 + idx) * 0.003;
            planet.planetSurface.rotation.y += rotationSpeed;
            // Slight axial tilt oscillation
            planet.planetSurface.rotation.x = Math.sin(time * 0.2 + idx * 0.8) * 0.08;
          }

          // Core gentle pulse with enhanced glow
          if (planet.core) {
            const corePulse = 1 + Math.sin(time * 3 + planet.offset) * 0.06;
            planet.core.scale.setScalar(corePulse);
          }

          // Inner glow breathing with deeper amplitude
          if (planet.innerGlow) {
            const glowPulse = 0.35 + Math.sin(time * 2 + planet.offset) * 0.15;
            planet.innerGlow.material.opacity = glowPulse;
          }

          // Chromatic ring rotation with subtle wobble
          if (planet.chromaticRing) {
            planet.chromaticRing.rotation.z = time * 0.35;
            planet.chromaticRing.rotation.x = Math.PI / 2 + Math.sin(time * 0.4 + idx) * 0.05;
            const ringPulse = 0.75 + Math.sin(time * 2.5 + planet.offset) * 0.18;
            planet.chromaticRing.material.opacity = ringPulse;
          }

          // Secondary ring counter-rotation with flowing tilt
          if (planet.secondaryRing) {
            planet.secondaryRing.rotation.z = -time * 0.25;
            planet.secondaryRing.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.5 + idx * 0.3) * 0.12;
            planet.secondaryRing.rotation.y = Math.cos(time * 0.3) * 0.1;
          }

          // Energy aura pulse with wave sync
          if (planet.energyAura) {
            const auraPulse = 1 + Math.sin(time * 1.5 + planet.offset * 2) * 0.1 + cosmicWave * 0.5;
            planet.energyAura.scale.setScalar(auraPulse);
            planet.energyAura.material.opacity = 0.15 + Math.sin(time * 2 + planet.offset) * 0.1;
          }

          // Outer halo shimmer with enhanced glow
          if (planet.outerHalo) {
            const haloPulse = 1 + Math.sin(time * 0.8 + planet.offset) * 0.08;
            planet.outerHalo.scale.setScalar(haloPulse);
            planet.outerHalo.material.opacity = 0.06 + Math.sin(time * 1.5 + idx) * 0.05;
          }

          // Particle dots orbit with varied speeds
          if (planet.particleDots) {
            planet.particleDots.rotation.y = time * 0.9 + idx * 0.2;
            planet.particleDots.rotation.x = Math.sin(time * 0.35) * 0.25;
            planet.particleDots.rotation.z = Math.cos(time * 0.25 + idx) * 0.1;
          }

          // ===== ORBIT PATH SHIMMER - Animated gradient effect =====
          if (planet.path) {
            const shimmerBase = 0.1 + Math.sin(time * 2 + planet.offset) * 0.08;
            const shimmerHighlight = Math.sin(time * 4 + baseRotation * 2) * 0.04;
            planet.path.material.opacity = shimmerBase + shimmerHighlight;
          }
        });
      }

      // Transition effect (scale + opacity)
      if (isTransitioning) {
        transitionProgress = Math.min(transitionProgress + 0.08, 1);
        const scaleEase = 1 - Math.sin(transitionProgress * Math.PI) * 0.15;
        const opacityEase = 1 - Math.sin(transitionProgress * Math.PI) * 0.3;

        if (pointsRef.current) {
          pointsRef.current.scale.setScalar(scaleEase);
          pointsRef.current.material.opacity = 0.9 * opacityEase;
        }
        if (wireframeRef.current) {
          wireframeRef.current.scale.setScalar(scaleEase);
        }
      } else {
        transitionProgress = 0;
        if (pointsRef.current) {
          const currentScale = pointsRef.current.scale.x;
          pointsRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, 1, 0.1));
          pointsRef.current.material.opacity = THREE.MathUtils.lerp(pointsRef.current.material.opacity, 0.9, 0.1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Click handler
    const handleClick = () => {
      if (currentProject) onProjectClick(currentProject);
    };
    currentMount.addEventListener('click', handleClick);
    currentMount.style.cursor = 'pointer';

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeEventListener('click', handleClick);
        if (renderer.domElement && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      starsRef.current = [];
      renderer?.dispose();
    };
  }, [projects, currentIndex, generateFibonacciSphere, getStatusPalette, onProjectClick, currentProject, isTransitioning]);

  // Update colors when project changes
  useEffect(() => {
    if (!projects[currentIndex]) return;
    const project = projects[currentIndex];
    const palette = getStatusPalette(project.status);

    // Update all color-dependent materials
    if (ringRef.current) ringRef.current.material.color = new THREE.Color(palette.main);
    if (outerRingRef.current) outerRingRef.current.material.color = new THREE.Color(palette.glow);
    if (glowRef.current) glowRef.current.material.color = new THREE.Color(palette.light);
    if (innerGlowRef.current) innerGlowRef.current.material.color = new THREE.Color(palette.glow);
    if (floatingParticlesRef.current) floatingParticlesRef.current.material.color = new THREE.Color(palette.glow);

  }, [currentIndex, projects, getStatusPalette]);

  if (projects.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{
      background: fullScreen
        ? 'transparent'
        : 'radial-gradient(ellipse at 30% 40%, #100d08 0%, #0a0806 50%, #040302 100%)'
    }}>
      {fullScreen ? (
        /* ======= FULLSCREEN MODE: Globe centered with compact overlays ======= */
        <>
          {/* Three.js Canvas - Full Screen */}
          <div ref={mountRef} className="absolute inset-0" style={{ touchAction: 'none' }} />

          {/* Enhanced Info Bar - Bottom with Clear Hierarchy */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-transparent pt-16 pb-8 px-8">
            <div className="max-w-6xl mx-auto">
              {/* Main Content Row with Thumbnail */}
              <div className="flex items-start gap-8">
                {/* Project Thumbnail - Larger */}
                {currentProject?.image && (
                  <div
                    className="w-40 h-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20 bg-slate-900/90"
                    style={{
                      opacity: isTransitioning ? 0.5 : 1,
                      transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
                      transition: 'all 0.4s ease-out'
                    }}
                  >
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.style.background = 'linear-gradient(135deg, #ffd70020, #ffb70010)';
                        }
                      }}
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  {/* Project Title & Status - Enhanced Visibility */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full shadow-lg ring-2 ring-offset-2 ring-offset-black ${currentProject?.status === 'completed' ? 'bg-indigo-400 ring-indigo-400/50 shadow-indigo-400/80' :
                        currentProject?.status === 'in_progress' ? 'bg-yellow-400 ring-yellow-400/50 shadow-yellow-400/80' :
                          'bg-stone-400 ring-stone-400/50 shadow-stone-400/80'
                        }`} />
                      <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                        {currentProject?.title}
                      </h2>
                      {currentProject?.year && (
                        <span className="px-4 py-1.5 text-sm font-semibold text-amber-200 bg-amber-500/25 border border-amber-400/40 rounded-full shadow-lg">
                          {currentProject.year}
                        </span>
                      )}
                    </div>
                    <span className="text-base text-amber-300 font-bold bg-black/50 px-4 py-2 rounded-full border border-amber-500/30">
                      {currentIndex + 1} / {projects.length}
                    </span>
                  </div>

                  {/* Description - Larger text */}
                  <p className="text-gray-100 text-base leading-relaxed mb-4 max-w-3xl">
                    {currentProject?.description}
                  </p>

                  {/* Tech Stack + Actions Row */}
                  <div className="flex items-center justify-between gap-6">
                    {/* Tech Stack - High Contrast Badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {currentProject?.technologies?.slice(0, 6).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm font-medium bg-amber-500/30 text-white border border-amber-400/50 rounded-lg shadow-md backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {currentProject?.technologies?.length > 6 && (
                        <span className="px-3 py-1.5 text-sm text-amber-300 font-medium bg-black/40 rounded-lg border border-amber-500/30">
                          +{currentProject.technologies.length - 6} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-shrink-0">
                      {currentProject?.live_url && (
                        <a
                          href={currentProject.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-200 border border-amber-500/40 rounded-xl text-sm font-medium hover:from-amber-500/35 hover:to-yellow-500/30 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Live
                        </a>
                      )}
                      {currentProject?.github_url && (
                        <a
                          href={currentProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 text-gray-300 border border-slate-600/50 rounded-xl text-sm font-medium hover:text-white hover:border-amber-500/40 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Sides */}
          <div className="absolute inset-y-0 left-6 flex items-center">
            <button
              onClick={prevProject}
              disabled={isTransitioning || projects.length <= 1}
              className="p-4 rounded-full bg-black/60 backdrop-blur-xl border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/60 hover:text-amber-100 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-6 flex items-center">
            <button
              onClick={nextProject}
              disabled={isTransitioning || projects.length <= 1}
              className="p-4 rounded-full bg-black/60 backdrop-blur-xl border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/60 hover:text-amber-100 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Orbital Project Labels - Around the Globe Perimeter */}
          <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
            {projects.slice(0, 8).map((project, index) => {
              // Calculate position around the globe (elliptical orbit)
              const angle = (index / Math.min(projects.length, 8)) * Math.PI * 2 - Math.PI / 2;
              const radiusX = 38; // % from center horizontally
              const radiusY = 32; // % from center vertically  
              const x = 50 + Math.cos(angle) * radiusX;
              const y = 50 + Math.sin(angle) * radiusY;
              const isActive = index === currentIndex;

              // Get status color
              const statusColor = project.status === 'completed' ? 'indigo' :
                project.status === 'in_progress' ? 'yellow' : 'stone';

              return (
                <button
                  key={project.id || index}
                  onClick={() => goToProject(index)}
                  className={`pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${isActive
                    ? 'scale-110 z-20'
                    : 'scale-100 z-10 opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 ${isActive
                    ? project.status === 'completed'
                      ? 'bg-indigo-500/30 border-indigo-400/60 shadow-lg shadow-indigo-500/30'
                      : project.status === 'in_progress'
                        ? 'bg-yellow-500/30 border-yellow-400/60 shadow-lg shadow-yellow-500/30'
                        : 'bg-stone-500/30 border-stone-400/60 shadow-lg shadow-stone-500/30'
                    : 'bg-black/60 border-white/20 hover:border-amber-400/40'
                    }`}>
                    {/* Status Dot */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${project.status === 'completed' ? 'bg-indigo-500' :
                      project.status === 'in_progress' ? 'bg-yellow-400' : 'bg-stone-400'
                      }`} />

                    {/* Project Name */}
                    <span className={`text-xs font-medium whitespace-nowrap max-w-[100px] truncate ${isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                      {project.title?.split(' ').slice(0, 2).join(' ')}
                    </span>

                    {/* Thumbnail Preview (if active and has image) */}
                    {isActive && project.image && (
                      <div className="w-6 h-6 rounded-md overflow-hidden border border-white/30 flex-shrink-0">
                        <img
                          src={project.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Show count if more than 8 projects */}
            {projects.length > 8 && (
              <div className="pointer-events-auto absolute left-1/2 bottom-[15%] -translate-x-1/2">
                <span className="px-3 py-1 text-xs text-gray-400 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
                  +{projects.length - 8} more
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ======= SPLIT LAYOUT MODE: Globe left, Info panel right ======= */
        <div className="flex w-full h-full">
          {/* Left Side: 3D Globe Canvas */}
          <div className="relative flex-1 min-w-0">
            {/* Three.js Canvas */}
            <div ref={mountRef} className="w-full h-full" style={{ touchAction: 'none' }} />

            {/* Navigation Arrows - Centered on Globe */}
            <div className="absolute inset-y-0 left-4 right-4 flex justify-between items-center pointer-events-none">
              <button
                onClick={prevProject}
                disabled={isTransitioning || projects.length <= 1}
                className="pointer-events-auto p-3 rounded-full bg-black/60 backdrop-blur-xl border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/60 hover:text-amber-100 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                disabled={isTransitioning || projects.length <= 1}
                className="pointer-events-auto p-3 rounded-full bg-black/60 backdrop-blur-xl border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/60 hover:text-amber-100 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Navigation - Bottom of Globe */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`transition-all duration-300 ease-out ${index === currentIndex
                    ? 'w-7 h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-lg shadow-amber-400/50'
                    : 'w-2 h-2 bg-gray-600/70 hover:bg-amber-400/50 rounded-full'
                    }`}
                />
              ))}
            </div>

            {/* Ambient Golden Glow on Globe */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 45%, rgba(255, 215, 0, 0.08) 0%, transparent 45%)' }}
            />
          </div>

          {/* Right Side: Project Info Panel */}
          <div className="w-[380px] flex-shrink-0 flex flex-col bg-black/50 backdrop-blur-xl border-l border-amber-500/15">
            {/* Status Badge & Counter */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/10">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${currentProject?.status === 'completed' ? 'bg-indigo-500 shadow-indigo-500/60' :
                  currentProject?.status === 'in_progress' ? 'bg-yellow-400 shadow-yellow-400/60' :
                    'bg-stone-400 shadow-stone-400/60'
                  } shadow-md`} />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {currentProject?.status?.replace('_', ' ') || 'Unknown'}
                </span>
              </div>
              <span className="text-sm text-amber-400/80 font-medium">
                {currentIndex + 1} / {projects.length}
              </span>
            </div>

            {/* Project Details */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Project Title */}
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mb-3">
                {currentProject?.title}
              </h2>

              {/* Year Badge */}
              {currentProject?.year && (
                <div className="inline-flex items-center px-3 py-1 mb-4 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  <span className="text-xs font-medium text-amber-300">{currentProject.year}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-300/90 leading-relaxed mb-6">
                {currentProject?.description}
              </p>

              {/* Tech Stack */}
              {currentProject?.technologies && currentProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-200/90 border border-amber-500/25 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights (if available) */}
              {currentProject?.highlights && currentProject.highlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {currentProject.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-5 border-t border-amber-500/10 bg-black/30">
              <div className="flex gap-3">
                {currentProject?.live_url && (
                  <a
                    href={currentProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-200 border border-amber-500/40 rounded-xl font-medium text-sm hover:from-amber-500/35 hover:to-yellow-500/30 hover:text-amber-100 hover:border-amber-400/60 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live
                  </a>
                )}
                {currentProject?.github_url && (
                  <a
                    href={currentProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 text-gray-300 border border-slate-600/50 rounded-xl font-medium text-sm hover:text-white hover:border-amber-500/40 hover:bg-slate-700/90 transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>

              {/* Click to View Details Hint */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Click globe to view full details
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Letterbox Bars (both modes) */}
      <div
        className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
      />
    </div>
  );
}
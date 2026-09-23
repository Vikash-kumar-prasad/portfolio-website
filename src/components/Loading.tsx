import { useEffect, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import { initialFX } from "./utils/initialFX";
import "./styles/Loading.css";
import { personalInfo } from "../data/portfolio";
import { getLenisInstance } from "./utils/lenis";

interface LoadingProps {
  onComplete?: () => void;
}

interface DataPulse {
  connIdx: number;
  progress: number;
  speed: number;
  active: boolean;
  wait: number;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [isEntering, setIsEntering] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const sphereMountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, currentX: 0, currentY: 0, distToRight: 1 });
  const isHoveringNetworkRef = useRef(false);

  // Smooth mouse tracking for 3D sphere tilt, subtle parallax, and reactive light field
  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.x = (e.clientX - halfW) / halfW;
      mouseRef.current.y = (e.clientY - halfH) / halfH;

      // Distance to right-side visualization center (approx 75% width, 50% height)
      const targetX = window.innerWidth * 0.72;
      const targetY = window.innerHeight * 0.5;
      const dx = (e.clientX - targetX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - targetY) / (window.innerHeight * 0.5);
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      mouseRef.current.distToRight = dist;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateParallax = () => {
      const m = mouseRef.current;
      m.currentX += (m.x - m.currentX) * 0.05;
      m.currentY += (m.y - m.currentY) * 0.05;

      // Dynamic light intensity behind network (intensifies as cursor approaches right side)
      const lightFactor = Math.max(0, 1 - m.distToRight);
      const glowScale = 1 + lightFactor * 0.25;
      const glowOpacity = 0.8 + lightFactor * 0.45;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mx", m.currentX.toFixed(4));
        containerRef.current.style.setProperty("--my", m.currentY.toFixed(4));
        containerRef.current.style.setProperty("--glow-scale", glowScale.toFixed(3));
        containerRef.current.style.setProperty("--glow-opacity", glowOpacity.toFixed(3));
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 1. Background Canvas: Depth Fog, Technical Grid Lines, Bottom Faint Grid & Subtle Twinkling Particles
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvas();

    // Subtle, sparse ambient particles (Requirement 11: fewer particles, slow drift, occasional twinkle)
    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      isBlurred?: boolean;
    }[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const isBlurred = i % 4 === 0;
      const baseAlpha = isBlurred ? Math.random() * 0.12 + 0.05 : Math.random() * 0.18 + 0.06;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isBlurred ? Math.random() * 1.4 + 1.1 : Math.random() * 0.75 + 0.45,
        vx: (Math.random() - 0.5) * (isBlurred ? 0.06 : 0.09),
        vy: -Math.random() * (isBlurred ? 0.09 : 0.13) - 0.03,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        isBlurred,
      });
    }

    const handleResize = () => setupCanvas();
    window.addEventListener("resize", handleResize, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Sparse ambient particles with depth blur and gentle harmonic twinkle (Requirement 9: minimal background)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Subtle harmonic twinkling
        p.alpha = p.baseAlpha + Math.sin(t * p.twinkleSpeed * 100 + i) * (p.baseAlpha * 0.5);

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isBlurred) {
          ctx.fillStyle = `rgba(14, 165, 233, ${(Math.max(0, p.alpha) * 0.65).toFixed(3)})`;
          ctx.shadowColor = "#00d4ff";
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(0, 212, 255, ${Math.max(0, p.alpha).toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. Intelligent Digital System & Spherical Architecture Visualization (Three.js)
  useEffect(() => {
    const mount = sphereMountRef.current;
    if (!mount) return;

    let animId: number;
    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 500;
    const isMobile = window.innerWidth < 900;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Glowing circular point texture
    const createPointTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const g = c.getContext("2d");
      if (!g) return null;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(0, 212, 255, 0.95)");
      grad.addColorStop(0.55, "rgba(14, 165, 233, 0.35)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(32, 32, 32, 0, Math.PI * 2);
      g.fill();
      return new THREE.CanvasTexture(c);
    };

    const pointTexture = createPointTexture();

    // --- A. Connected Spherical Network Nodes (Full, Rich Constellation) ---
    const outerCount = isMobile ? 32 : 54;
    const midCount = isMobile ? 14 : 22;
    const innerCount = isMobile ? 8 : 14;
    const totalNodes = outerCount + midCount + innerCount;

    const nodesPos: THREE.Vector3[] = [];
    const basePositions = new Float32Array(totalNodes * 3);
    const colors = new Float32Array(totalNodes * 3);
    const nodeFlares = new Float32Array(totalNodes);

    const baseColor = new THREE.Color("#00d4ff");
    const whiteColor = new THREE.Color("#ffffff");
    const accentColor = new THREE.Color("#38bdf8");

    // Helper to distribute points on a spherical shell using Fibonacci spiral
    const generateLayerNodes = (count: number, minRad: number, maxRad: number, startIndex: number) => {
      for (let i = 0; i < count; i++) {
        const idx = startIndex + i;
        const y = 1 - (i / Math.max(1, count - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const phi = i * 2.3999632;
        const x = Math.cos(phi) * r;
        const z = Math.sin(phi) * r;

        const rad = minRad + Math.sin(i * 1.7) * (maxRad - minRad);
        const v = new THREE.Vector3(x * rad, y * rad, z * rad);
        nodesPos.push(v);

        basePositions[idx * 3] = v.x;
        basePositions[idx * 3 + 1] = v.y;
        basePositions[idx * 3 + 2] = v.z;

        const c = idx % 6 === 0 ? whiteColor : (idx % 3 === 0 ? accentColor : baseColor);
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;
        nodeFlares[idx] = 0;
      }
    };

    generateLayerNodes(outerCount, 2.30, 2.58, 0);
    generateLayerNodes(midCount, 1.65, 1.95, outerCount);
    generateLayerNodes(innerCount, 1.15, 1.45, outerCount + midCount);

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));
    const colorAttribute = new THREE.BufferAttribute(colors, 3);
    nodeGeometry.setAttribute("color", colorAttribute);

    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.26,
      map: pointTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    sphereGroup.add(nodesMesh);

    // Primary Focal Hub Nodes (8 brighter prominent nodes creating visual depth)
    const primaryHubIndices = [0, 8, 16, 24, 34, 46, outerCount + 4, outerCount + 12];
    const hubPositions = new Float32Array(primaryHubIndices.length * 3);
    primaryHubIndices.forEach((nodeIdx, i) => {
      const p = nodesPos[nodeIdx];
      hubPositions[i * 3] = p.x;
      hubPositions[i * 3 + 1] = p.y;
      hubPositions[i * 3 + 2] = p.z;
    });

    const hubGeometry = new THREE.BufferGeometry();
    hubGeometry.setAttribute("position", new THREE.BufferAttribute(hubPositions, 3));
    const hubMat = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.38,
      map: pointTexture || undefined,
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const hubMesh = new THREE.Points(hubGeometry, hubMat);
    sphereGroup.add(hubMesh);

    // --- B. Rich Connecting Network Lines (85–90% intact; trimmed lines crossing directly through center) ---
    const linePairs: [number, number][] = [];
    const linePoints: number[] = [];
    const maxDistance = 1.14; // Clean, robust distance keeping the dense spherical lattice

    for (let i = 0; i < nodesPos.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodesPos.length; j++) {
        if (connections >= 2) break;
        const p1 = nodesPos[i];
        const p2 = nodesPos[j];
        const d = p1.distanceTo(p2);

        if (d < maxDistance) {
          // Avoid lines cutting directly through the central core (~10-15% reduction)
          const midX = (p1.x + p2.x) * 0.5;
          const midY = (p1.y + p2.y) * 0.5;
          const midZ = (p1.z + p2.z) * 0.5;
          const distFromCenter = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
          if (distFromCenter < 0.42) {
            continue; // Keep the glowing core clear of crossing cords
          }

          linePairs.push([i, j]);
          linePoints.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          connections++;
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    sphereGroup.add(linesMesh);

    // --- C. Abstract System Architecture Datum Lines (Subtle outer technical accents) ---
    const archGroup = new THREE.Group();
    sphereGroup.add(archGroup);

    const archSegments: number[] = [
      3.2, 1.8, 0.4, 2.4, 1.3, 0.3,
      2.4, 1.3, 0.3, 2.0, 0.9, 0.2,
      3.3, -0.2, 0.2, 2.5, -0.2, 0.2,
      2.8, -1.9, -0.3, 2.1, -1.35, -0.2,
    ];

    const archGeom = new THREE.BufferGeometry();
    archGeom.setAttribute("position", new THREE.Float32BufferAttribute(archSegments, 3));
    const archMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const archLines = new THREE.LineSegments(archGeom, archMat);
    archGroup.add(archLines);

    // Terminal node dots on outer architecture datum lines
    const archTerminalPoints = [
      new THREE.Vector3(3.2, 1.8, 0.4),
      new THREE.Vector3(3.3, -0.2, 0.2),
      new THREE.Vector3(2.8, -1.9, -0.3),
    ];
    const archTerminalPos = new Float32Array(archTerminalPoints.length * 3);
    archTerminalPoints.forEach((pt, i) => {
      archTerminalPos[i * 3] = pt.x;
      archTerminalPos[i * 3 + 1] = pt.y;
      archTerminalPos[i * 3 + 2] = pt.z;
    });
    const archDotsGeom = new THREE.BufferGeometry();
    archDotsGeom.setAttribute("position", new THREE.BufferAttribute(archTerminalPos, 3));
    const archDotsMat = new THREE.PointsMaterial({
      size: 0.17,
      map: pointTexture || undefined,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const archDots = new THREE.Points(archDotsGeom, archDotsMat);
    archGroup.add(archDots);

    // --- D. Data Transmission Pulses (Gliding light points along network lines) ---
    const maxPulses = isMobile ? 3 : 6;
    const pulses: DataPulse[] = [];
    for (let i = 0; i < maxPulses; i++) {
      pulses.push({
        connIdx: Math.floor(Math.random() * Math.max(1, linePairs.length)),
        progress: Math.random(),
        speed: Math.random() * 0.013 + 0.007,
        active: true,
        wait: 0,
      });
    }

    const pulsePositions = new Float32Array(maxPulses * 3);
    const pulseColors = new Float32Array(maxPulses * 3);
    for (let i = 0; i < maxPulses; i++) {
      pulseColors[i * 3] = 1;
      pulseColors[i * 3 + 1] = 1;
      pulseColors[i * 3 + 2] = 1;
    }

    const pulseGeom = new THREE.BufferGeometry();
    const pulsePosAttr = new THREE.BufferAttribute(pulsePositions, 3);
    pulseGeom.setAttribute("position", pulsePosAttr);
    pulseGeom.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));

    const pulseMat = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.38,
      map: pointTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsesMesh = new THREE.Points(pulseGeom, pulseMat);
    sphereGroup.add(pulsesMesh);

    // --- E. Distinct Luminous Technical Core ---
    const coreGroup = new THREE.Group();
    sphereGroup.add(coreGroup);

    // Central anchor focal beacon
    const coreCenterPos = new Float32Array([0, 0, 0]);
    const coreCenterGeom = new THREE.BufferGeometry();
    coreCenterGeom.setAttribute("position", new THREE.BufferAttribute(coreCenterPos, 3));
    const coreCenterMat = new THREE.PointsMaterial({
      size: isMobile ? 0.34 : 0.40,
      map: pointTexture || undefined,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreCenterPoint = new THREE.Points(coreCenterGeom, coreCenterMat);
    coreGroup.add(coreCenterPoint);

    // Dense glowing core particle nucleus
    const coreParticleCount = isMobile ? 22 : 34;
    const corePositions = new Float32Array(coreParticleCount * 3);
    for (let i = 0; i < coreParticleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = Math.random() * 0.55 + 0.15;
      corePositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      corePositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      corePositions[i * 3 + 2] = rad * Math.cos(phi);
    }
    const coreGeom = new THREE.BufferGeometry();
    coreGeom.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));
    const coreMat = new THREE.PointsMaterial({
      size: 0.15,
      map: pointTexture || undefined,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreMesh = new THREE.Points(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // 3 technical concentric micro-rings rotating around the core
    const createTechnicalCoreRing = (radius: number, tiltX: number, tiltY: number, op = 0.30) => {
      const segs = 64;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segs; s++) {
        const th = (s / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(th) * radius, 0, Math.sin(th) * radius));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: op,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Line(g, m);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const coreRing1 = createTechnicalCoreRing(0.50, 0.60, 0.20, 0.30);
    const coreRing2 = createTechnicalCoreRing(0.78, -0.45, 0.70, 0.24);
    const coreRing3 = createTechnicalCoreRing(1.02, 0.20, -0.50, 0.18);
    coreGroup.add(coreRing1);
    coreGroup.add(coreRing2);
    coreGroup.add(coreRing3);

    // --- F. 4 Smooth Elliptical Orbital Paths with Traveling Packets ---
    const orbitalGroup = new THREE.Group();
    sphereGroup.add(orbitalGroup);

    interface OrbitalRingData {
      ring: THREE.Line;
      radius: number;
      tiltX: number;
      tiltZ: number;
      rotSpeed: number;
    }

    const orbitalRingsData: OrbitalRingData[] = [];
    const ringConfigs = [
      { r: 2.65, tx: 0.42, tz: 0.20, op: 0.20, speed: -0.0007 },
      { r: 2.95, tx: -0.38, tz: -0.28, op: 0.17, speed: 0.0006 },
      { r: 3.25, tx: 0.16, tz: 0.52, op: 0.14, speed: -0.0005 },
      { r: 3.52, tx: -0.22, tz: 0.36, op: 0.11, speed: 0.0004 },
    ];

    const activeRingConfigs = isMobile ? ringConfigs.slice(0, 3) : ringConfigs;

    activeRingConfigs.forEach((cfg) => {
      const segs = 96; // Smooth circular curvature
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segs; s++) {
        const th = (s / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(th) * cfg.r, 0, Math.sin(th) * cfg.r));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: cfg.op,
        blending: THREE.AdditiveBlending,
      });
      const ringLine = new THREE.Line(g, m);
      ringLine.rotation.x = cfg.tx;
      ringLine.rotation.z = cfg.tz;
      orbitalGroup.add(ringLine);

      orbitalRingsData.push({
        ring: ringLine,
        radius: cfg.r,
        tiltX: cfg.tx,
        tiltZ: cfg.tz,
        rotSpeed: cfg.speed,
      });
    });

    // Orbital traveling packets (2 per active ring)
    const orbitalPacketCount = activeRingConfigs.length * 2;
    const packetPositions = new Float32Array(orbitalPacketCount * 3);
    const packetThetas = new Float32Array(orbitalPacketCount);
    const packetSpeeds = new Float32Array(orbitalPacketCount);
    const packetRingIndices = new Uint8Array(orbitalPacketCount);

    for (let p = 0; p < orbitalPacketCount; p++) {
      packetThetas[p] = Math.random() * Math.PI * 2;
      packetSpeeds[p] = (Math.random() * 0.008 + 0.005) * (p % 2 === 0 ? 1 : -1);
      packetRingIndices[p] = Math.floor(p / 2);
    }

    const orbitPacketGeom = new THREE.BufferGeometry();
    const orbitPacketPosAttr = new THREE.BufferAttribute(packetPositions, 3);
    orbitPacketGeom.setAttribute("position", orbitPacketPosAttr);
    const orbitPacketMat = new THREE.PointsMaterial({
      size: 0.28,
      map: pointTexture || undefined,
      color: 0x00d4ff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const orbitPacketMesh = new THREE.Points(orbitPacketGeom, orbitPacketMat);
    sphereGroup.add(orbitPacketMesh);

    const tempPosA = new THREE.Vector3();
    const tempPosB = new THREE.Vector3();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 500;
      const h = mount.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let clock = 0;
    let hoverFactor = 0;

    const animate = () => {
      clock += 0.01;

      // Smooth hover reaction factor
      hoverFactor += ((isHoveringNetworkRef.current ? 1 : 0) - hoverFactor) * 0.08;

      // 1. Slow organic continuous multi-axis rotation (controlled, dignified speed)
      sphereGroup.rotation.y += 0.0012 + hoverFactor * 0.0008;
      sphereGroup.rotation.x += 0.00035;

      // Dynamic connection lines opacity: subtle breathing + hover reaction
      lineMaterial.opacity = 0.16 + Math.sin(clock * 0.6) * 0.02 + hoverFactor * 0.08;
      nodeMaterial.size = (isMobile ? 0.20 : 0.23) + hoverFactor * 0.02;

      // Gentle floating motion
      sphereGroup.position.y = Math.sin(clock * 0.6) * 0.06;

      // 2. Central technical core breathing & counter-rotation
      const coreScale = (1 + Math.sin(clock * 1.8) * 0.05) * (1 + hoverFactor * 0.12);
      coreGroup.scale.set(coreScale, coreScale, coreScale);
      coreRing1.rotation.y += 0.0035 + hoverFactor * 0.003;
      coreRing2.rotation.y -= 0.0030 + hoverFactor * 0.003;
      coreRing3.rotation.z += 0.0022 + hoverFactor * 0.002;

      // 3. Orbital rings individual drift
      orbitalRingsData.forEach((ord) => {
        ord.ring.rotation.y += ord.rotSpeed;
      });

      // 4. Update orbital traveling packets
      for (let p = 0; p < orbitalPacketCount; p++) {
        packetThetas[p] += packetSpeeds[p];
        const rIdx = packetRingIndices[p];
        const ord = orbitalRingsData[rIdx];
        if (!ord) continue;

        const th = packetThetas[p];
        const rawPt = new THREE.Vector3(
          Math.cos(th) * ord.radius,
          0,
          Math.sin(th) * ord.radius
        );
        rawPt.applyEuler(ord.ring.rotation);

        packetPositions[p * 3] = rawPt.x;
        packetPositions[p * 3 + 1] = rawPt.y;
        packetPositions[p * 3 + 2] = rawPt.z;
      }
      orbitPacketPosAttr.needsUpdate = true;

      // 5. Update data transmission pulses along connections
      for (let i = 0; i < maxPulses; i++) {
        const pulse = pulses[i];
        if (pulse.active && linePairs.length > 0) {
          pulse.progress += pulse.speed;
          const pair = linePairs[pulse.connIdx];
          if (pair) {
            tempPosA.copy(nodesPos[pair[0]]);
            tempPosB.copy(nodesPos[pair[1]]);
            tempPosA.lerp(tempPosB, pulse.progress);

            pulsePositions[i * 3] = tempPosA.x;
            pulsePositions[i * 3 + 1] = tempPosA.y;
            pulsePositions[i * 3 + 2] = tempPosA.z;

            if (pulse.progress >= 1) {
              pulse.active = false;
              pulse.wait = Math.floor(Math.random() * 45) + 25;
              nodeFlares[pair[1]] = 1.0;
            }
          }
        } else {
          pulse.wait--;
          if (pulse.wait <= 0 && linePairs.length > 0) {
            pulse.connIdx = Math.floor(Math.random() * linePairs.length);
            pulse.progress = 0;
            pulse.speed = Math.random() * 0.013 + 0.007;
            pulse.active = true;
          }
          pulsePositions[i * 3] = 0;
          pulsePositions[i * 3 + 1] = 999;
          pulsePositions[i * 3 + 2] = 0;
        }
      }
      pulsePosAttr.needsUpdate = true;

      // 6. Decay destination node flare effects and update vertex colors
      let colorNeedsUpdate = false;
      for (let n = 0; n < totalNodes; n++) {
        if (nodeFlares[n] > 0) {
          nodeFlares[n] = Math.max(0, nodeFlares[n] - 0.032);
          const flare = nodeFlares[n];
          const c = (n % 6 === 0 ? whiteColor : (n % 3 === 0 ? accentColor : baseColor)).clone().lerp(whiteColor, flare);
          colors[n * 3] = c.r;
          colors[n * 3 + 1] = c.g;
          colors[n * 3 + 2] = c.b;
          colorNeedsUpdate = true;
        }
      }
      if (colorNeedsUpdate) {
        colorAttribute.needsUpdate = true;
      }

      // 7. Layered Depth & Mouse Parallax Interaction
      const mX = mouseRef.current.currentX;
      const mY = mouseRef.current.currentY;

      sphereGroup.rotation.x += (mY * 0.18 - (sphereGroup.rotation.x % (Math.PI * 2))) * 0.025;
      sphereGroup.rotation.z += (-mX * 0.08 - sphereGroup.rotation.z) * 0.025;

      coreGroup.position.x = mX * 0.08;
      coreGroup.position.y = -mY * 0.08;

      archGroup.position.x = -mX * 0.05;
      archGroup.position.y = mY * 0.05;

      renderer.render(scene, camera);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      hubGeometry.dispose();
      hubMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      archGeom.dispose();
      archMat.dispose();
      archDotsGeom.dispose();
      archDotsMat.dispose();
      pulseGeom.dispose();
      pulseMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      coreCenterGeom.dispose();
      coreCenterMat.dispose();
      coreRing1.geometry.dispose();
      (coreRing1.material as THREE.Material).dispose();
      coreRing2.geometry.dispose();
      (coreRing2.material as THREE.Material).dispose();
      coreRing3.geometry.dispose();
      (coreRing3.material as THREE.Material).dispose();
      orbitPacketGeom.dispose();
      orbitPacketMat.dispose();
      orbitalRingsData.forEach((ord) => {
        ord.ring.geometry.dispose();
        (ord.ring.material as THREE.Material).dispose();
      });
      if (pointTexture) pointTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleEnterPortfolio = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);

    setTimeout(() => {
      window.scrollTo(0, 0);
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      initialFX();
      if (onComplete) {
        onComplete();
      }
    }, 380);
  }, [isEntering, onComplete]);

  return (
    <aside
      ref={containerRef}
      className={`intro-screen ${isEntering ? "intro-exiting" : ""}`}
      aria-label="Welcome screen"
    >
      {/* 1. Ambient Background Canvas */}
      <canvas ref={bgCanvasRef} className="intro-bg-canvas" />

      {/* 2. Soft Atmospheric Glows with Dynamic Mouse-Reactive Light Field */}
      <div className="intro-ambient-orb" aria-hidden="true" />
      <div className="intro-core-glow" aria-hidden="true" />

      {/* 3. Balanced Two-Column Hero Composition (Left ~42%, Gap ~10%, Right ~42% on Desktop) */}
      <div className="intro-hero-layout">
        {/* Left Side: Primary Content */}
        <div className="intro-content-side">
          {/* Small Elegant Eyebrow */}
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>TURNING IDEAS INTO WORKING SOFTWARE</span>
          </div>

          {/* Name — Dominant Focal Element with Dimensional Tone */}
          <h1 className="intro-title">
            <span className="intro-title-line">
              <span className="title-white">VIKASH KUMAR</span>
            </span>
            <span className="intro-title-line">
              <span className="title-accent">PRASAD</span>
            </span>
          </h1>

          {/* Title */}
          <p className="intro-subtitle">{personalInfo.title}</p>

          {/* Professional Developer Status Element */}
          <div className="hero-status-tag" title="Professional Status">
            <span className="status-dot" />
            <span className="status-text">{personalInfo.status || "OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES"}</span>
          </div>

          {/* Description */}
          <p className="intro-tagline">
            Building full-stack applications, AI-powered solutions, and scalable backend systems.
          </p>

          {/* Hero Action CTA: ENTER PORTFOLIO → */}
          <div className="hero-action-buttons">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={handleEnterPortfolio}
              data-cursor="disable"
              aria-label="Enter Portfolio"
            >
              <span>ENTER PORTFOLIO</span>
              <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div
          className="intro-visual-side"
          aria-hidden="true"
          onMouseEnter={() => {
            isHoveringNetworkRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveringNetworkRef.current = false;
          }}
        >
          <div ref={sphereMountRef} className="sphere-mount-container" />
        </div>
      </div>
    </aside>
  );
};

export default Loading;

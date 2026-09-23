import { useRef, useMemo, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  isMobile: boolean;
  reducedMotion: boolean;
}

// Single unified scene component running exactly ONE useFrame loop
const SceneContent = memo(({ isMobile, reducedMotion }: SceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const particleCount = isMobile ? 14 : 36;

  // Pre-allocate typed arrays once
  const { positions, colors, meta } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const data = [];

    const palette = [
      new THREE.Color("#00d4ff"),
      new THREE.Color("#0ea5e9"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      data.push({
        baseX: pos[i3],
        baseY: pos[i3 + 1],
        speed: 0.2 + (i % 5) * 0.08,
        phase: (i / particleCount) * Math.PI * 2,
        amplitude: 0.25 + (i % 4) * 0.1,
      });
    }

    return { positions: pos, colors: col, meta: data };
  }, [particleCount]);

  // Passive mouse tracking with refs only - zero React state updates
  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isMobile]);

  // Exactly one useFrame loop for the entire 3D system
  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Subtle particle drift
    if (pointsRef.current) {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = positionAttr.array as Float32Array;
      const mx = mouseRef.current.x * 0.6;
      const my = mouseRef.current.y * 0.6;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p = meta[i];
        const offset = Math.sin(time * p.speed + p.phase) * p.amplitude;
        array[i3] = p.baseX + offset * 0.3 + mx * 0.2;
        array[i3 + 1] = p.baseY + offset + my * 0.2;
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      {/* Lightweight Points particle system */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.1 : 0.14}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </>
  );
});

SceneContent.displayName = "SceneContent";

const ParticleField = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onMotionChange);

    // Stop rendering completely when introductory section is scrolled out of viewport
    const heroEl = document.getElementById("landingDiv") || document.getElementById("about");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (heroEl) {
      observer.observe(heroEl);
    }

    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      if (heroEl) observer.unobserve(heroEl);
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      className="particle-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: isVisible ? "block" : "none",
      }}
    >
      <Canvas
        frameloop={isVisible && !reducedMotion ? "always" : "demand"}
        dpr={isMobile ? 1 : [1, 1.25]}
        gl={{
          powerPreference: "low-power",
          antialias: false,
          alpha: true,
          depth: false,
          stencil: false,
        }}
        camera={{ position: [0, 0, 15], fov: 55 }}
      >
        <SceneContent isMobile={isMobile} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default ParticleField;

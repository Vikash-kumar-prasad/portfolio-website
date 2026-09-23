import { useEffect, useRef, useState, useMemo, type ReactNode } from "react";
import {
  SiJavascript,
  SiC,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
  SiPostman,
} from "react-icons/si";
import { TbSql, TbApi } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import "./styles/TechStack.css";

interface TechItem {
  id: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "DevOps" | "Tools";
  icon: ReactNode;
}

const techItems: TechItem[] = [
  { id: "js", name: "JavaScript", category: "Languages", icon: <SiJavascript /> },
  { id: "c", name: "C", category: "Languages", icon: <SiC /> },
  { id: "cpp", name: "C++", category: "Languages", icon: <SiCplusplus /> },
  { id: "sql", name: "SQL", category: "Databases", icon: <TbSql /> },
  { id: "html", name: "HTML5", category: "Frontend", icon: <SiHtml5 /> },
  { id: "css", name: "CSS3", category: "Frontend", icon: <SiCss /> },
  { id: "react", name: "React.js", category: "Frontend", icon: <SiReact /> },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", icon: <SiTailwindcss /> },
  { id: "node", name: "Node.js", category: "Backend", icon: <SiNodedotjs /> },
  { id: "express", name: "Express.js", category: "Backend", icon: <SiExpress /> },
  { id: "apis", name: "REST APIs", category: "Backend", icon: <TbApi /> },
  { id: "jwt", name: "JWT", category: "Backend", icon: <SiJsonwebtokens /> },
  { id: "mongo", name: "MongoDB", category: "Databases", icon: <SiMongodb /> },
  { id: "mysql", name: "MySQL", category: "Databases", icon: <SiMysql /> },
  { id: "git", name: "Git", category: "DevOps", icon: <SiGit /> },
  { id: "github", name: "GitHub", category: "DevOps", icon: <SiGithub /> },
  { id: "linux", name: "Linux", category: "DevOps", icon: <SiLinux /> },
  { id: "docker", name: "Docker", category: "DevOps", icon: <SiDocker /> },
  { id: "aws", name: "AWS", category: "DevOps", icon: <FaAws /> },
  { id: "postman", name: "Postman", category: "Tools", icon: <SiPostman /> },
];

const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "DevOps", "Tools"] as const;

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isHoveredRef = useRef(false);

  // Precompute spherical 3D points with well-spaced distribution
  const points = useMemo(() => {
    const total = techItems.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return techItems.map((_, i) => {
      const y = 1 - (i / (total - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      return {
        x: x * 360,
        y: y * 165,
        z: z * 280,
      };
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = false;
    let animId: number;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const angle = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };

    // Intersection observer to completely pause rendering when not in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      angle.targetY = x * 0.5;
      angle.targetX = -y * 0.35;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop for 3D stage and background constellation
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    let baseRotY = 0;

    function render() {
      if (!isVisible) return;

      if (!isHoveredRef.current && !prefersReducedMotion) {
        baseRotY += 0.0022;
      }

      angle.currentX += (angle.targetX - angle.currentX) * 0.04;
      angle.currentY += (angle.targetY - angle.currentY) * 0.04;

      const totalRotY = baseRotY + angle.currentY;
      const totalRotX = angle.currentX;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);

      // Track 2D projected coordinates for background constellation lines
      const projected2D: { x: number; y: number; z: number }[] = [];

      const centerX = canvas ? canvas.width / 2 : 0;
      const centerY = canvas ? canvas.height / 2 : 0;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const el = badgeRefs.current[i];

        // 3D rotation
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = Math.max(0.7, Math.min(1.08, (z2 + 420) / 440));
        const opacity = Math.max(0.35, Math.min(1, (z2 + 280) / 500));
        const zIndex = Math.round(z2 + 400);

        if (el) {
          el.style.transform = `translate3d(${x1.toFixed(1)}px, ${y2.toFixed(1)}px, ${z2.toFixed(1)}px) scale(${scale.toFixed(2)})`;
          el.style.zIndex = String(zIndex);
          el.style.opacity = String(opacity);
        }

        projected2D.push({ x: centerX + x1, y: centerY + y2, z: z2 });
      }

      // Draw subtle constellation connections on background canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;

        for (let i = 0; i < projected2D.length; i++) {
          for (let j = i + 1; j < projected2D.length; j++) {
            const dx = projected2D[i].x - projected2D[j].x;
            const dy = projected2D[i].y - projected2D[j].y;
            const dist = Math.hypot(dx, dy);

            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.18;
              ctx.strokeStyle = `rgba(0, 212, 255, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(projected2D[i].x, projected2D[i].y);
              ctx.lineTo(projected2D[j].x, projected2D[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    }

    // Resize canvas to match container
    const handleResize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = 520;
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [points]);

  return (
    <section className="techstack-section" id="techstack" ref={containerRef}>
      <div className="techstack-container section-container">
        <div className="techstack-header">
          <span className="section-eyebrow">TECH STACK</span>
          <h2>
            Technologies & <span>Tools</span>
          </h2>
          <p className="techstack-subtitle">
            Core technologies, frameworks, and modern tools I leverage to engineer robust, scalable full-stack applications.
          </p>

          <div className="tech-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tech-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop 3D Interactive Scene */}
        <div className="tech-3d-wrapper">
          <canvas ref={canvasRef} className="tech-canvas-bg" />
          <div className="tech-3d-stage" ref={stageRef}>
            {techItems.map((tech, i) => {
              const isDimmed = activeCategory !== "All" && tech.category !== activeCategory;
              const isHighlighted = hoveredId === tech.id || (!isDimmed && activeCategory !== "All");

              return (
                <div
                  key={tech.id}
                  ref={(el) => {
                    badgeRefs.current[i] = el;
                  }}
                  className={`tech-badge-3d ${isDimmed ? "dimmed" : ""} ${
                    isHighlighted ? "highlighted" : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredId(tech.id);
                    isHoveredRef.current = true;
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    isHoveredRef.current = false;
                  }}
                >
                  <span className="tech-badge-icon">{tech.icon}</span>
                  <div className="tech-badge-info">
                    <span className="tech-badge-name">{tech.name}</span>
                    <span className="tech-badge-cat">{tech.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile 2D Clean Grid */}
        <div className="tech-mobile-view">
          <div className="tech-mobile-grid">
            {techItems.map((tech) => {
              const isDimmed = activeCategory !== "All" && tech.category !== activeCategory;
              return (
                <div
                  key={tech.id}
                  className={`tech-mobile-card ${isDimmed ? "dimmed" : ""} ${
                    activeCategory === tech.category ? "active" : ""
                  }`}
                  onClick={() => setHoveredId(tech.id === hoveredId ? null : tech.id)}
                >
                  <span className="tech-badge-icon">{tech.icon}</span>
                  <div className="tech-badge-info">
                    <span className="tech-badge-name">{tech.name}</span>
                    <span className="tech-badge-cat">{tech.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

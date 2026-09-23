import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/portfolio";
import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useGSAP(() => {
    // Subtle reveal animation for project cards on scroll
    gsap.from(".work-box", {
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 85%",
        once: true,
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
      clearProps: "all",
    });
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <span className="section-eyebrow">FEATURED WORK</span>
          <h2>
            Featured <span>Projects</span>
          </h2>
          <p className="work-subtitle">
            Selected full-stack projects combining modern web technologies, AI integration, and practical backend systems.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <article className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-card-header">
                  <span className="project-index-badge">PROJECT 0{index + 1}</span>
                  <h3 className="project-card-title">{project.title}</h3>
                </div>

                <p className="work-description">{project.description}</p>

                <div className="work-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="work-features">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="work-card-bottom">
                <div className="work-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-link-btn"
                      data-cursor="disable"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-link-btn primary-work-link"
                      data-cursor="disable"
                    >
                      Live Demo <MdArrowOutward />
                    </a>
                  )}
                  {!project.github && !project.liveDemo && (
                    <span className="work-status-badge">
                      Full-Stack Architecture
                    </span>
                  )}
                </div>

                <div className="work-image-slot">
                  <WorkImage
                    image={`/images/project${project.id}.svg`}
                    alt={project.title}
                    link={project.liveDemo || project.github}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

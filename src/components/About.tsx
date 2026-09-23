import { PropsWithChildren } from "react";
import { aboutContent } from "../data/portfolio";
import "./styles/About.css";

const About = ({ children }: PropsWithChildren) => {
  return (
    <section className="about-section" id="about">
      <div
        id="landingDiv"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {children}
      <div className="section-container about-container">
        <div className="about-grid">
          <div className="about-main-col">
            <span className="section-eyebrow">{aboutContent.label}</span>
            <h2 className="about-heading">{aboutContent.heading}</h2>
            <div className="about-text-wrap">
              {aboutContent.paragraphs.map((para, index) => (
                <p key={index} className="about-para">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="about-card-col">
            <div className="about-engineering-card">
              <div className="about-card-header">
                <div className="about-card-status">
                  <span className="status-indicator"></span>
                  <span className="status-label">
                    {aboutContent.profileCard.title}
                  </span>
                </div>
                <span className="about-card-code">SMIT // 2027</span>
              </div>

              <div className="about-card-body">
                <div className="about-info-item">
                  <span className="info-label">Degree</span>
                  <span className="info-value">
                    {aboutContent.profileCard.degree}
                  </span>
                </div>

                <div className="about-info-item">
                  <span className="info-label">Institution</span>
                  <span className="info-value">
                    {aboutContent.profileCard.institution}
                  </span>
                </div>

                <div className="about-info-item">
                  <span className="info-label">Timeline</span>
                  <span className="info-value">
                    {aboutContent.profileCard.timeline}
                  </span>
                </div>

                <div className="about-info-item">
                  <span className="info-label">Primary Stack</span>
                  <span className="info-value">
                    {aboutContent.profileCard.primaryStack}
                  </span>
                </div>

                <div className="about-info-item">
                  <span className="info-label">AI &amp; Cloud</span>
                  <span className="info-value ai-cloud-value">
                    <span>Groq API</span>
                    <span className="tech-separator" aria-hidden="true">&middot;</span>
                    <span>Docker</span>
                    <span className="tech-separator" aria-hidden="true">&middot;</span>
                    <span>AWS</span>
                  </span>
                </div>
              </div>

              <div className="about-card-footer">
                <span className="about-badge">Clean Code</span>
                <span className="about-badge">RESTful APIs</span>
                <span className="about-badge">JWT Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


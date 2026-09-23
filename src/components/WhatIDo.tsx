import { ReactNode } from "react";
import { skills } from "../data/portfolio";
import {
  SiJavascript,
  SiC,
  SiCplusplus,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostman,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { FaAws, FaCode } from "react-icons/fa6";
import "./styles/WhatIDo.css";

const iconMap: Record<string, ReactNode> = {
  SiJavascript: <SiJavascript />,
  SiC: <SiC />,
  SiCplusplus: <SiCplusplus />,
  SiReact: <SiReact />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss />,
  SiTailwindcss: <SiTailwindcss />,
  SiNodedotjs: <SiNodedotjs />,
  SiExpress: <SiExpress />,
  SiPostman: <SiPostman />,
  SiJsonwebtokens: <SiJsonwebtokens />,
  SiMongodb: <SiMongodb />,
  SiMysql: <SiMysql />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiLinux: <SiLinux />,
  SiDocker: <SiDocker />,
  SiAmazonwebservices: <FaAws />,
  SiVisualstudiocode: <FaCode />,
  SiVercel: <SiVercel />,
  SiRender: <SiRender />,
};

const WhatIDo = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <div className="skills-header">
          <span className="section-eyebrow">SKILLS &amp; TECHNOLOGIES</span>
          <h2>
            Technical <span>Expertise</span>
          </h2>
          <p className="skills-subtitle">
            A comprehensive overview of my programming languages, frameworks, developer tools, and computer science foundations.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((category, index) => (
            <div
              className={`skill-card ${
                category.category === "Core CS" ? "skill-card-wide" : ""
              }`}
              key={index}
            >
              <h3 className="skill-category-title">{category.category}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <div className="skill-tag" key={skillIndex}>
                    {skill.icon && iconMap[skill.icon] ? (
                      <span className="skill-icon">{iconMap[skill.icon]}</span>
                    ) : null}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

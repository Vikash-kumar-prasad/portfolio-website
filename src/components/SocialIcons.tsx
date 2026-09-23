import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personalInfo } from "../data/portfolio";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <nav className="floating-social" aria-label="Social links">
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link"
        aria-label="GitHub"
        data-cursor="disable"
      >
        <FaGithub />
      </a>
      <a
        href={personalInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link"
        aria-label="LinkedIn"
        data-cursor="disable"
      >
        <FaLinkedinIn />
      </a>
    </nav>
  );
};

export default SocialIcons;

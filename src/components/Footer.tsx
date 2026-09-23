import React, { useCallback } from "react";
import { personalInfo } from "../data/portfolio";
import { getLenisInstance } from "./utils/lenis";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail, MdArrowForward, MdArrowUpward } from "react-icons/md";
import "./styles/Footer.css";

const Footer: React.FC = () => {
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const lenis = getLenisInstance();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -10,
          duration: prefersReducedMotion ? 0.01 : 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
    []
  );

  const handleScrollToContact = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const lenis = getLenisInstance();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (lenis) {
        lenis.scrollTo("#contact", {
          offset: -10,
          duration: prefersReducedMotion ? 0.01 : 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const el = document.querySelector("#contact");
        el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
    []
  );

  const handleScrollToTop = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const lenis = getLenisInstance();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (lenis) {
        lenis.scrollTo(0, {
          offset: 0,
          duration: prefersReducedMotion ? 0.01 : 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
    []
  );

  return (
    <footer className="footer-site" aria-label="Portfolio footer">
      {/* Background Subtle Grid Pattern */}
      <div className="footer-grid-pattern" aria-hidden="true" />

      <div className="footer-container">
        {/* 1. TOP AREA: Centered Statement & CTA */}
        <div className="footer-cta-section">
          <h2 className="footer-headline">
            LET&apos;S BUILD SOMETHING<br />
            <span className="headline-accent">GREAT TOGETHER.</span>
          </h2>

          <p className="footer-subheadline">
            Have an idea, opportunity, or project in mind?<br />
            Let&apos;s turn it into something real.
          </p>

          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="footer-primary-cta"
            data-cursor="disable"
            aria-label="Scroll to Contact section"
          >
            <span>LET&apos;S CONNECT</span>
            <MdArrowForward className="cta-arrow" />
          </a>
        </div>

        {/* 2. Sleek Horizontal Divider with Glowing Center Dot */}
        <div className="footer-divider-line" aria-hidden="true">
          <span className="divider-glow-dot" />
        </div>

        {/* 3. Branding, Navigation & Socials */}
        <div className="footer-brand-section">
          <h3 className="footer-brand-title">VIKASH KUMAR PRASAD</h3>

          <nav className="footer-nav" aria-label="Footer Navigation">
            <ul className="footer-nav-links">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="footer-nav-item"
                  data-cursor="disable"
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => handleNavClick(e, "#skills")}
                  className="footer-nav-item"
                  data-cursor="disable"
                >
                  SKILLS
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, "#work")}
                  className="footer-nav-item"
                  data-cursor="disable"
                >
                  PROJECTS
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="footer-nav-item"
                  data-cursor="disable"
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer-social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon-btn"
              aria-label="GitHub Profile"
              data-cursor="disable"
            >
              <FaGithub />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon-btn"
              aria-label="LinkedIn Profile"
              data-cursor="disable"
            >
              <FaLinkedinIn />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-social-icon-btn"
              aria-label="Send Email"
              data-cursor="disable"
            >
              <MdEmail />
            </a>
          </div>
        </div>

        {/* 4. Horizontal Divider before Bottom Footer Bar */}
        <div className="footer-bottom-divider" aria-hidden="true" />

        {/* 5. Bottom Footer Bar (Three-Part Layout) */}
        <div className="footer-bottom-bar">
          <div className="bottom-col bottom-left">
            <span className="bottom-copy">&copy; 2026 Vikash Kumar Prasad</span>
            <span className="bottom-sub">All rights reserved.</span>
          </div>

          <div className="bottom-col bottom-center">
            <span className="motto-text">KEEP BUILDING</span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="footer-scroll-top-btn"
              aria-label="Scroll back to top"
              data-cursor="disable"
            >
              <MdArrowUpward className="scroll-arrow-icon" aria-hidden="true" />
              <span>Back to top</span>
            </button>
          </div>

          <div className="bottom-col bottom-right">
            <span className="bottom-copy">Designed &amp; Built with Passion</span>
            <span className="bottom-sub">For a Better Tomorrow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

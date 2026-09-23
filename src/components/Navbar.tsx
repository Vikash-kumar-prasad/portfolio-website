import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "../data/portfolio";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import "./styles/Navbar.css";

import { setLenisInstance, getLenisInstance } from "./utils/lenis";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenis.stop();

    const sections = ["#about", "#skills", "#work", "#contact"];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Determine active section
      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);

      if (href.startsWith("#")) {
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
      }
    },
    []
  );

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Right: Desktop Navigation Links + CTA Button */}
        <div className="navbar-right-group desktop-nav">
          <nav className="navbar-nav" aria-label="Main Navigation">
            <ul className="navbar-links">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`navbar-link ${isActive ? "active" : ""}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      data-cursor="disable"
                    >
                      {link.label.toUpperCase()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#contact"
            className="navbar-cta-btn"
            onClick={(e) => handleNavClick(e, "#contact")}
            data-cursor="disable"
            aria-label="Let's connect"
          >
            <span>LET&apos;S CONNECT</span>
            <span className="navbar-cta-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          data-cursor="disable"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`navbar-mobile-drawer ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-inner">
          <ul className="mobile-links-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-cursor="disable"
                  >
                    {link.label.toUpperCase()}
                  </a>
                </li>
              );
            })}
            <li className="mobile-cta-item">
              <a
                href="#contact"
                className="mobile-cta-btn"
                onClick={(e) => handleNavClick(e, "#contact")}
                data-cursor="disable"
              >
                <span>LET&apos;S CONNECT</span>
                <span className="navbar-cta-arrow">&rarr;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

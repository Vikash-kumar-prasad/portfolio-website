import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setScrollAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. About Section reveal
    const aboutMain = document.querySelector(".about-main-col");
    const aboutCard = document.querySelector(".about-card-col");
    if (aboutMain && aboutCard) {
      gsap.from([aboutMain, aboutCard], {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 82%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    // 2. Skills Section reveal
    const skillsHeader = document.querySelector(".skills-header");
    const skillsGrid = document.querySelector(".skills-grid");
    if (skillsHeader && skillsGrid) {
      gsap.from([skillsHeader, skillsGrid], {
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    // 3. Work Section Header reveal (cards are animated via useGSAP in Work.tsx)
    const workHeader = document.querySelector(".work-header");
    if (workHeader) {
      gsap.from(workHeader, {
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    // 4. Education & Leadership Section reveal
    const eduHeader = document.querySelector(".education-header");
    const eduGrid = document.querySelector(".education-grid");
    if (eduHeader && eduGrid) {
      gsap.from([eduHeader, eduGrid], {
        scrollTrigger: {
          trigger: ".education-section",
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    // 5. Contact Section reveal
    const contactLayout = document.querySelector(".contact-layout");
    if (contactLayout) {
      gsap.from(contactLayout, {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    // 6. Footer Section reveal
    const footerContainer = document.querySelector(".footer-container");
    if (footerContainer) {
      gsap.from(footerContainer, {
        scrollTrigger: {
          trigger: ".footer-site",
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  });

  return () => ctx.revert();
}

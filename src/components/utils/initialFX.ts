import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenisInstance } from "./lenis";

gsap.registerPlugin(ScrollTrigger);



export const initialFX = () => {
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.start();
    lenis.resize();
  }
  ScrollTrigger.refresh();

  const main = document.querySelector("main");
  if (main) {
    main.classList.add("main-active");
  }

  const tl = gsap.timeline();

  tl.to(document.body, {
    backgroundColor: "#0a0a0f",
    duration: 0.8,
    ease: "power2.inOut",
  });

  // Animate About section entry smoothly
  const aboutElements = document.querySelectorAll(".about-main-col, .about-card-col");
  if (aboutElements.length > 0) {
    tl.fromTo(
      aboutElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.14,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all",
      },
      "-=0.3"
    );
  }

  tl.to(
    [".navbar-header", ".floating-social", ".nav-fade"],
    {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.4"
  );

  tl.add(() => {
    ScrollTrigger.refresh();
    const lenisInstance = getLenisInstance();
    if (lenisInstance) {
      lenisInstance.resize();
    }
  });
};

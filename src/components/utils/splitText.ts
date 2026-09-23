import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let splitTriggers: ScrollTrigger[] = [];

function splitIntoChars(element: HTMLElement): HTMLElement[] {
  if (element.querySelector("span")) {
    return Array.from(element.querySelectorAll("span"));
  }
  const text = element.textContent || "";
  element.textContent = "";
  const chars: HTMLElement[] = [];
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    element.appendChild(span);
    chars.push(span);
  });
  return chars;
}

export const setSplitText = () => {
  // Clear any previous triggers before re-initializing
  splitTriggers.forEach((st) => st.kill());
  splitTriggers = [];

  if (window.innerWidth < 900) return;

  // Animate paragraph elements smoothly without splitting into dozens of micro-word batches
  const paras = document.querySelectorAll(".para");
  if (paras.length > 0) {
    paras.forEach((para) => {
      const st = ScrollTrigger.create({
        trigger: para,
        start: "top 85%",
        once: true,
        animation: gsap.fromTo(
          para,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
        ),
      });
      splitTriggers.push(st);
    });
  }

  // Animate title headings with clean character reveal
  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => {
    const chars = splitIntoChars(title as HTMLElement);
    if (chars.length > 0) {
      const st = ScrollTrigger.create({
        trigger: title,
        start: "top 85%",
        once: true,
        animation: gsap.fromTo(
          chars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.6,
            ease: "power2.out",
          }
        ),
      });
      splitTriggers.push(st);
    }
  });
};

export const clearSplitText = () => {
  splitTriggers.forEach((st) => st.kill());
  splitTriggers = [];
};

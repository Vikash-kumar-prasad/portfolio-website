import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import { setSplitText, clearSplitText } from "./utils/splitText";
import { setScrollAnimations } from "./utils/GsapScroll";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    setSplitText();
    const cleanupScroll = setScrollAnimations();

    let resizeTimer: number;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 150);
    };

    window.addEventListener("resize", resizeHandler, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      clearSplitText();
      cleanupScroll();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <About>{!isDesktopView && children}</About>
            <WhatIDo />
            <Suspense fallback={<div style={{ minHeight: "200px" }} />}>
              <TechStack />
            </Suspense>
            <Work />
            <Education />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

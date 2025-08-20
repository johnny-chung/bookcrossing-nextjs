"use client";

import bgimg from "@/public/home-bg.png";
import { useEffect, useRef } from "react";

export default function FadingBGImg() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const opacity = Math.min(1, 0.4 + (scrollY / maxScroll) * 0.6); 

      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[120vh] z-[-1] pointer-events-none">
      {/* background image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgimg.src})`,
        }}
      />

      {/* fading blue overlay */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-[#180b03]"
        style={{ opacity: 0.4, transition: "opacity 0.1s linear" }}
      />
    </div>
  );
}

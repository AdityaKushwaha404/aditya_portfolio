import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { FollowingPointer } from "./components/ui/aceternity/FollowingPointer";

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Set scroll restoration to manual immediately on mount to prevent browser jumping
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Force scroll to top on loading completion
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    // Array of critical visual assets to cache before rendering
    const criticalImages = [
      '/portrait.png',
      '/signature_logo.png',
      '/hacker_logo_icon_1782759505996.png'
    ];

    let loadedCount = 0;
    const totalCount = criticalImages.length;

    const handleImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalCount) * 100);
      setLoadingProgress(progress);
      if (loadedCount === totalCount) {
        setTimeout(() => {
          setIsLoading(false);
          if (typeof window !== 'undefined') {
            (window as any).__loaderFinished = true;
            window.dispatchEvent(new Event('loader-finished'));
          }
        }, 600); // 600ms smooth delay for premium transition
      }
    };

    if (totalCount === 0) {
      setIsLoading(false);
      return;
    }

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // proceed anyway on load error
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ 
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B1020]"
          >
            {/* Signature Logo Inverted (5.5x Scale, smooth blur reveal) */}
            <motion.div
              initial={{ opacity: 0, scale: 4.8, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 5.5, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-12 flex items-center overflow-visible select-none pointer-events-none mb-10"
            >
              <img 
                src="/signature_logo.png" 
                alt="Aditya" 
                className="h-full w-auto object-contain" 
                style={{ filter: 'invert(1) brightness(100)' }}
              />
            </motion.div>

            {/* Premium Loader Line */}
            <div className="w-[160px] h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-6 relative">
              <motion.div 
                className="h-full bg-[#6FA882]"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] tracking-[0.3em] text-white uppercase font-bold mt-4 select-none"
            >
              Loading {loadingProgress}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full bg-[#F8F7F4] text-[#0B1020] font-sans grain-bg">
        {/* ═══ FOLLOWING POINTER ═══ */}
        <FollowingPointer />

        {/* ═══ HERO SECTION (Includes Navbar) ═══ */}
        <HeroSection />

        {/* ═══ ALL SECTIONS ═══ */}
        <AboutSection />
        <ExperienceSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}

export default App;

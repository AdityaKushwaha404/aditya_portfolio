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
        }, 500); // 500ms smooth delay for premium transition
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
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B1020]"
          >
            {/* Signature Logo Inverted */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-16 flex items-center overflow-visible select-none pointer-events-none mb-2"
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
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold mt-4 select-none">
              Loading {loadingProgress}%
            </span>
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

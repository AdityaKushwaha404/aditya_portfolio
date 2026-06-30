import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { FollowingPointer } from "./components/ui/aceternity/FollowingPointer";

function App() {
  return (
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
  )
}

export default App;

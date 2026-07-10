import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface SkillItem {
  name: string
  url: string
}

interface SkillGroup {
  category: string
  items: SkillItem[]
}

const skills: SkillGroup[] = [
  {
    category: 'Frontend & Web',
    items: [
      { name: 'React.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Framer Motion', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg' },
      { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { name: 'FastAPI', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'JWT', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jsonwebtokens.svg' },
      { name: 'Clerk', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/clerk.svg' },
    ],
  },
  {
    category: 'Databases & Tools',
    items: [
      { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
      { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Git & GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
      { name: 'Postman', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    ],
  },
]

function SkillPill({ 
  skill, 
  onHover, 
  onLeave,
  isMobile
}: { 
  skill: SkillItem; 
  onHover: (url: string) => void; 
  onLeave: () => void; 
  isMobile: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      onMouseEnter={() => {
        if (isMobile) return
        setIsHovered(true)
        onHover(skill.url)
      }}
      onMouseLeave={() => {
        if (isMobile) return
        setIsHovered(false)
        onLeave()
      }}
      animate={isMobile ? {
        scale: 1,
        borderColor: "rgba(11, 16, 32, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.45)"
      } : {
        scale: isHovered ? 1.08 : 1,
        borderColor: isHovered ? "rgba(44, 74, 53, 0.35)" : "rgba(44, 74, 53, 0.08)",
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.55)",
        boxShadow: isHovered 
          ? "0 8px 20px -4px rgba(44, 74, 53, 0.08), 0 0 12px 2px rgba(79, 122, 92, 0.1)" 
          : "0 2px 8px -2px rgba(11, 16, 32, 0.02)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`flex items-center rounded-full border font-medium text-[#0B1020]/70 backdrop-blur-md cursor-default select-none transition-colors duration-300 hover:text-[#2C4A35] ${
        isMobile ? 'px-4 py-2 text-[12.5px]' : 'px-5 py-2.5 text-[13.5px]'
      }`}
    >
      {!isMobile && (
        <motion.div
          style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}
          animate={{
            width: isHovered ? 20 : 0,
            marginRight: isHovered ? 8 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.img
            src={skill.url}
            alt={skill.name}
            className="w-4.5 h-4.5 object-contain"
            animate={{
              rotateY: isHovered ? 360 : 0
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
      <span className="tracking-wide">{skill.name}</span>
    </motion.span>
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Target-relative scroll tracking for perfect viewport consistency
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  })

  // Smooth viewport-based vertical parallax
  const waveY1 = useTransform(scrollYProgress, [0, 0.8], [0, 25])
  const waveY2 = useTransform(scrollYProgress, [0, 0.8], [0, 10])

  // Smooth viewport-based horizontal counter-drift
  const waveX1 = useTransform(scrollYProgress, [0, 0.8], [-20, 20])
  const waveX2 = useTransform(scrollYProgress, [0, 0.8], [15, -15])

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full bg-[#F8F7F4] pt-20 pb-16 md:pt-48 md:pb-32 scroll-mt-20 z-20"
    >
      {/* ── PREMIUM DUAL-LAYERED FLAT PARALLAX WAVE TRANSITION (EDGE-SAFE) ── */}
      <div
        className="absolute top-10 left-0 w-full overflow-hidden leading-none pointer-events-none z-10 select-none"
        style={{ transform: 'translateY(-100%)', height: '110px' }}
      >
        {/* Layer 1: Backdrop wave */}
        <motion.svg
          style={{ y: isMobile ? 0 : waveY1, x: isMobile ? 0 : waveX1 }}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[120%] left-[-10%] h-[80px] opacity-[0.5]"
        >
          <path
            d="M0,45 C240,65 480,65 720,45 C960,25 1200,25 1440,45 L1440,80 L0,80 Z"
            fill="#EBF0EC"
            stroke="rgba(79, 122, 92, 0.14)"
            strokeWidth="1.2"
          >
          </path>
        </motion.svg>

        {/* Layer 2: Main foreground wave */}
        <motion.svg
          style={{
            y: isMobile ? 0 : waveY2,
            x: isMobile ? 0 : waveX2,
            filter: 'drop-shadow(0px -8px 16px rgba(11, 16, 32, 0.055))'
          }}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[120%] left-[-10%] h-[80px]"
        >
          <path
            d="M0,50 C240,70 480,70 720,50 C960,30 1200,30 1440,50 L1440,80 L0,80 Z"
            fill="#F8F7F4"
            stroke="rgba(79, 122, 92, 0.08)"
            strokeWidth="0.8"
          />
        </motion.svg>
      </div>

      {/* Background decoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '-20%', left: '-10%',
            width: '50vw', height: '50vw',
            maxWidth: 600,
            background: 'radial-gradient(circle, rgba(220,235,220,0.4) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />

        <div
          className="absolute"
          style={{
            top: '15%', right: '-5%',
            width: '40vw', height: '40vw',
            maxWidth: 600, maxHeight: 600,
            background: 'radial-gradient(ellipse at 70% 30%, rgba(175,210,185,0.18) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute dotted-pattern"
          style={{ top: '12%', right: '6%', width: 120, height: 120, opacity: 0.25 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT: Editorial quote + bio */}
          <div className="flex flex-col items-start text-left w-full">
            <h2
              className={`font-serif ${isMobile ? 'font-bold' : 'font-semibold'} text-[#0B1020] leading-[1.1] tracking-[-0.02em] text-center md:text-left w-full px-2 ${isMobile ? 'mb-4' : 'mb-8'}`}
              style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
            >
              {isMobile ? (
                <span>
                  Engineering robust <em className="text-[#4b7056] not-italic">digital solutions.</em>
                </span>
              ) : (
                ["Engineering robust", "digital solutions."].map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-1">
                    <motion.span
                      initial={isMobile ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                      transition={isMobile ? { duration: 0 } : { duration: 0.85, delay: 0.1 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {idx === 1 ? <em className="text-[#4b7056] font-serif font-medium">{line}</em> : line}
                    </motion.span>
                  </span>
                ))
              )}
            </h2>

            <motion.p
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
              className="text-[#626879] text-[15px] leading-[1.85] max-w-[480px] mb-12 font-medium text-left"
            >
              <span className="font-serif italic font-bold text-[#2C4A35] text-[24px] mr-1">I</span>
              am Aditya Kushwaha, a Full Stack Developer and IT student at Harcourt Butler Technical University (HBTU), Kanpur. My background ranges from engineering educational systems at IIT Kanpur (SIIC) to delivering end-to-end web platforms for freelance clients. I design robust database data models, construct clean APIs, and integrate secure payment processing frameworks with an emphasis on stable, scalable architectures.
            </motion.p>

            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.6 }}
              className="hidden md:block"
            >
              <motion.a
                href="https://drive.google.com/file/d/1zqAq4XDV3MKZ8yOXpUzmVO7sXCva7AHh/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(44,74,53,0.20)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 h-[52px] px-8 rounded-full bg-[#2C4A35] text-white text-[14px] font-semibold group cursor-pointer transition-colors duration-300 hover:bg-[#365A40] shadow-md border border-[#2C4A35] w-fit"
              >
                View Résumé
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Skills list */}
          <div className="pt-2">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.3 + gi * 0.12 }}
                className="mb-10 last:mb-0"
              >
                <div className="flex items-center gap-4 mb-5 justify-start">
                  <span className="text-[11px] tracking-[0.22em] font-bold text-[#4F7A5C] uppercase text-left">
                    {group.category}
                  </span>
                  <div className="flex-1 h-[1px] bg-[#0B1020]/6" />
                </div>
                <div className="flex flex-wrap gap-2.5 justify-start">
                  {group.items.map((skill) => (
                    <SkillPill 
                      key={skill.name} 
                      skill={skill} 
                      onHover={(url) => setHoveredLogo(url)}
                      onLeave={() => setHoveredLogo(null)}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Large Logo at Bottom Right Section (Shifted down, reduced size by 10%) */}
      <AnimatePresence>
        {hoveredLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 30, rotate: -15, filter: 'blur(8px)' }}
            animate={{ opacity: 0.15, scale: 1, y: 0, rotate: 6, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.4, y: 30, rotate: -15, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="absolute bottom-10 right-12 lg:bottom-14 lg:right-28 w-28 h-28 lg:w-44 lg:h-44 pointer-events-none select-none z-0"
          >
            <img
              src={hoveredLogo}
              alt=""
              className="w-full h-full object-contain filter grayscale contrast-125"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

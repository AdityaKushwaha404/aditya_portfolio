import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Trophy, Award, Medal } from 'lucide-react'
import { GlareCard } from './ui/aceternity/GlareCard'
import confetti from 'canvas-confetti'

const achievements = [
  {
    title: 'HackWithUttarPradesh',
    role: 'Winner (1st Prize)',
    prize: 'Awarded ₹50,000',
    description: 'Secured 1st place among top teams for technical innovation, architecture, and prototype execution.',
    icon: Trophy,
    color: 'from-[#EBF0EC] to-[#E2EAE4]',
    accent: '#4F7A5C',
    tag: 'National Level',
    date: 'Nov 2025',
    image: '/achievement1_a.jpg',
    image2: '/achievement1_b.jpg'
  },
  {
    title: 'CODEBLOCK 2026',
    role: '3rd Place',
    prize: 'Awarded ₹25,000',
    description: 'University of Allahabad Hackathon. Recognized for competitive speed-development and problem solving.',
    icon: Medal,
    color: 'from-[#EFF1ED] to-[#E3E7E1]',
    accent: '#6F9578',
    tag: 'State Level',
    date: 'Apr 2026',
    image: '/achievement2_a.png',
    image2: '/achievement2_b.jpg'
  },
  {
    title: 'SIH Internal Hackathon',
    role: '1st Prize Winner',
    prize: 'Smart India Hackathon Qualifier',
    description: 'Developed a blockchain-based agricultural transparency supply chain solution to trace crop authenticity.',
    icon: Award,
    color: 'from-[#F3F2EE] to-[#EAE8E2]',
    accent: '#2C4A35',
    tag: 'University Level',
    date: 'Oct 2025',
    image: '/achievement3_a.png',
    image2: '/achievement3_b.jpg'
  }
]

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'down' | 'up'>('down')

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = 'down'
      } else if (currentScrollY < lastScrollY.current) {
        scrollDirection.current = 'up'
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isInView && scrollDirection.current === 'down') {
      const colors = ['#2C4A35', '#4F7A5C', '#6F9578', '#D4AF37', '#F3F2EE']
      
      // Burst 1: Left bottom corner shooting up-right
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        ticks: 200,
        gravity: 1.1,
        scalar: 1.1
      })
      
      // Burst 2: Right bottom corner shooting up-left
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        ticks: 200,
        gravity: 1.1,
        scalar: 1.1
      })
    }
  }, [isInView])

  return (
    <section
      id="achievements"
      ref={containerRef}
      className={`relative w-full bg-[#F8F7F4] scroll-mt-20 z-20 ${isMobile ? 'py-16' : 'py-32'}`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div
          className="absolute"
          style={{
            bottom: '-20%', right: '-10%',
            width: '50vw', height: '50vw',
            maxWidth: 600, maxHeight: 600,
            background: 'radial-gradient(ellipse at 70% 30%, rgba(175,210,185,0.15) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section Header */}
        <div className={`flex flex-col xl:flex-row justify-center xl:justify-between items-center xl:items-end gap-8 text-center xl:text-left mx-auto ${isMobile ? 'mb-6' : 'mb-20'}`}>
          <div className="max-w-[700px] flex flex-col items-center xl:items-start">
            <motion.h2
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={isMobile ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
              transition={isMobile ? { duration: 0 } : { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif ${isMobile ? 'font-bold' : 'font-semibold'} text-[#0B1020] leading-[1.1] tracking-[-0.02em] text-center xl:text-left`}
              style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
            >
              {isMobile ? (
                <span>
                  Milestones & <em className="text-[#4b7056] not-italic">Key Achievements</em>
                </span>
              ) : (
                <>
                  Milestones & <br />
                  <em className="text-[#4b7056]">Key Achievements</em>
                </>
              )}
            </motion.h2>
          </div>

          {/* Editorial Side-by-Side Floating Media Frames (Desktop only, doubled size) */}
          <div className="hidden lg:flex items-center gap-5 relative h-[220px] w-[680px] flex-shrink-0 mr-8 select-none pointer-events-none">
            <AnimatePresence>
              {hoveredIndex !== null && (
                <>
                  {/* Photo 1: Left Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -6, x: -35, y: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: -6, x: -35, y: 10 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 16 }}
                    className="w-[330px] h-[220px] rounded-[1.8rem] p-1.5 bg-[#F3F2EE] shadow-[0_20px_45px_rgba(44,74,53,0.05)] border border-[#2C4A35]/8 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-[#EBF0EC]">
                      <motion.img
                        src={achievements[hoveredIndex].image}
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 filter grayscale(10%) sepia(8%)"
                      />
                      <div className="absolute inset-0 bg-[#4F7A5C]/5 pointer-events-none mix-blend-color" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A35]/15 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Photo 2: Right Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 6, x: 35, y: 15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 6, x: 35, y: 15 }}
                    transition={{ type: 'spring', stiffness: 55, damping: 15, delay: 0.06 }}
                    className="w-[330px] h-[220px] rounded-[1.8rem] p-1.5 bg-[#EAE8E2] shadow-[0_20px_45px_rgba(44,74,53,0.05)] border border-[#2C4A35]/6 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-[#EBF0EC]">
                      <motion.img
                        src={achievements[hoveredIndex].image2}
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-85 filter grayscale(15%) sepia(10%)"
                      />
                      <div className="absolute inset-0 bg-[#4F7A5C]/5 pointer-events-none mix-blend-color" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A35]/15 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid of Classy Achievements Cards with Glare effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((ach, idx) => {
            const IconComponent = ach.icon
            return (
              <motion.div
                key={ach.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                animate={isMobile ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
                transition={isMobile ? { duration: 0 } : {
                  duration: 0.85,
                  delay: 0.2 + idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                className="h-full"
              >
                <GlareCard className={isMobile ? "h-auto min-h-0 border border-[#0B1020]/6 bg-white/40" : "h-full border border-[#0B1020]/6 bg-white/40 hover:bg-white/80 hover:border-[#4F7A5C]/25 hover:shadow-[0_20px_50px_rgba(44,74,53,0.06)] transition-all duration-300"}>
                  <div className={isMobile ? "flex flex-col p-6 h-auto min-h-0 text-left items-stretch" : "flex flex-col justify-between h-full p-8 md:p-10 min-h-[360px]"}>
                    <div>
                      {/* Top Badge & Icon Row */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#4F7A5C] bg-[#4F7A5C]/6 rounded-full uppercase border border-[#4F7A5C]/10">
                          {ach.tag}
                        </span>
                        <motion.div
                          whileHover={isMobile ? {} : { rotate: 15, scale: 1.1 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-[#0B1020]/6 shadow-sm text-[#2C4A35] transition-all duration-300"
                        >
                          <IconComponent className="w-5 h-5 stroke-[1.5]" />
                        </motion.div>
                      </div>

                      {/* Title & Rank Info */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[12px] font-bold tracking-widest text-[#4F7A5C]/80 uppercase block">
                          {ach.role}
                        </span>
                        <span className="text-[11px] font-bold tracking-wider text-[#626879]/70 uppercase">
                          {ach.date}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-[#0B1020] text-[24px] md:text-[26px] leading-tight mb-4 tracking-[-0.01em] hover:text-[#2C4A35] transition-colors duration-300">
                        {ach.title}
                      </h3>

                      <p className="text-[#626879] text-[14px] leading-relaxed mb-6 font-medium">
                        {ach.prize}
                      </p>
                    </div>

                    {/* Body Text */}
                    <p className="text-[#626879]/80 text-[13px] leading-relaxed border-t border-[#0B1020]/6 pt-6 mt-auto">
                      {ach.description}
                    </p>
                  </div>
                </GlareCard>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

import { motion, useScroll, useMotionValueEvent, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const experiences = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Sarvshixiit Pvt. Ltd. (SIIC, IIT Kanpur)',
    period: 'Jan 2026 – March 2026',
    type: 'Internship',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    description: (
      <>
        Engineered production-grade full-stack features for education systems at IIT Kanpur's Startup Incubator. Developed backend business logic, REST APIs, and responsive frontend structures.
      </>
    ),
    highlights: [
      <>Engineered web application features through robust RESTful API development and secure business logic pathways</>,
      <>Collaborated with IIT Kanpur research divisions to create logic-driven learning systems and database-driven schemas</>,
      <>Integrated third-party APIs and delivered production-ready, fully-tested features for active learning workflows</>
    ],
  },
  {
    role: 'Full Stack Developer (Freelance)',
    company: 'Remote & Independent',
    period: 'Nov 2025 – Present',
    type: 'Freelance',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: (
      <>
        Deliver end-to-end full-stack web applications for global clients. Manage requirements, structure application data layers, and deploy optimized frontend and backend architectures.
      </>
    ),
    highlights: [
      <>Manage full product life cycle from initial client requirements to database design, API integrations, and hosting setup</>,
      <>Architect secure database architectures and robust API endpoints optimized for stable transaction workflows</>,
      <>Deploy responsive interfaces utilizing React.js, Tailwind CSS, and Framer Motion for high-integrity user experiences</>
    ],
  },
  {
    role: 'B.Tech - Information Technology',
    company: 'Harcourt Butler Technical University, Kanpur',
    period: '2023 – 2027',
    type: 'Education',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    description: (
      <>
        Pursuing a Bachelor of Technology in Information Technology, maintaining a strong academic foundation with a 7.93 CGPA. Coursework includes Data Structures & Algorithms, OOPs, DBMS, and Database Design.
      </>
    ),
    highlights: [
      <>Winner (1st Place) - HackWithUttarPradesh Hackathon (Nov 2025) | Awarded ₹50,000 for innovation and technical execution</>,
      <>Winner (1st Prize) - SIH Internal Hackathon (Oct 2025) | Developed a blockchain-based agricultural transparency system</>,
      <>3rd Place - CODEBLOCK 2026 Hackathon, University of Allahabad (Apr 2026) | Awarded ₹25,000 for competitive speed-development</>
    ],
  },
]

interface ExperienceCardProps {
  exp: typeof experiences[0]
  index: number
  progress: MotionValue<number>
  setHoveredIndex: (idx: number | null) => void
}

interface ExperienceCardProps {
  exp: typeof experiences[0]
  index: number
  progress: MotionValue<number>
  setHoveredIndex: (idx: number | null) => void
  isMobile: boolean
}

function ExperienceCard({ exp, index, progress, setHoveredIndex, isMobile }: ExperienceCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(260)

  useEffect(() => {
    if (contentRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContentHeight(entry.target.scrollHeight)
        }
      })
      observer.observe(contentRef.current)
      return () => observer.disconnect()
    }
  }, [])

  // Map progress (0 -> 1) to styles smoothly
  const height = useTransform(progress, [0, 0.45], [0, contentHeight])
  const opacity = useTransform(progress, [0.05, 0.4], [0, 1])
  const marginTop = useTransform(progress, [0, 0.3], [0, 20])

  // Outer container styling mapped to progress for smooth gradients & colors
  const backgroundColor = useTransform(
    progress,
    [0, 0.45],
    ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)']
  )
  const borderColor = useTransform(
    progress,
    [0, 0.45],
    ['rgba(11, 16, 32, 0.05)', 'rgba(79, 122, 92, 0.25)']
  )
  const boxShadow = useTransform(
    progress,
    [0, 0.45],
    [
      '0px 0px 0px rgba(44,74,53,0)',
      '0px 20px 50px rgba(44,74,53,0.04)'
    ]
  )

  // Staggered child elements
  const descOpacity = useTransform(progress, [0.15, 0.45], [0, 1])
  const descY = useTransform(progress, [0.15, 0.45], [12, 0])

  const highlightTransforms = exp.highlights.map((_, hi) => {
    const start = 0.3 + hi * 0.15
    const end = Math.min(start + 0.25, 1.0)
    return {
      opacity: useTransform(progress, [start, end], [0, 1]),
      y: useTransform(progress, [start, end], [12, 0])
    }
  })

  // To toggle visual classes that can't be transformed (like text size & weight)
  const [isActive, setIsActive] = useState(index === 0)
  useMotionValueEvent(progress, 'change', (val) => {
    setIsActive(val > 0.4)
  })

  const mobileActive = isMobile ? true : isActive

  return (
    <motion.div
      style={isMobile ? {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(79, 122, 92, 0.25)',
        boxShadow: '0px 20px 50px rgba(44,74,53,0.04)'
      } : { backgroundColor, borderColor, boxShadow }}
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
      className="p-6 md:p-8 rounded-2xl border cursor-pointer overflow-hidden transition-colors duration-500"
    >
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 block transition-colors duration-500 ${mobileActive ? 'text-[#4F7A5C]' : 'text-[#626879]/40'}`}>
            {exp.company}
          </span>
          <h3 className={`font-serif font-semibold transition-all duration-500 ${mobileActive ? 'text-[#2C4A35] text-[22px] md:text-[24px]' : 'text-[#0B1020]/70 text-[16px] md:text-[18px]'}`}>
            {exp.role}
          </h3>
        </div>
        
        <div className="text-left sm:text-right flex-shrink-0">
          <span className={`text-[11px] font-bold uppercase tracking-wider block transition-colors duration-500 ${mobileActive ? 'text-[#4F7A5C]' : 'text-[#626879]/40'}`}>
            {exp.period}
          </span>
          {mobileActive && (
            <motion.span 
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.3 }}
              className="inline-block text-[9px] tracking-wider uppercase font-bold text-[#626879] bg-[#0B1020]/5 px-2 py-0.5 rounded-full mt-1"
            >
              {exp.type}
            </motion.span>
          )}
        </div>
      </div>

      {/* Expandable Details Container */}
      {isMobile ? (
        <div className="border-t border-[#0B1020]/5 pt-5 mt-5">
          {/* Staggered animated description */}
          <p className="text-[#626879] text-[13.5px] leading-[1.75] mb-5 font-medium">
            {exp.description}
          </p>
          
          {/* Staggered animated bullet points */}
          <ul className="flex flex-col gap-2.5">
            {exp.highlights.map((h, hi) => (
              <li 
                key={hi} 
                className="flex items-start gap-2.5 text-[12.5px] text-[#626879] font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F7A5C] mt-1.5 flex-shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <motion.div
          style={{ height, opacity, marginTop }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="border-t border-[#0B1020]/5 pt-5">
            {/* Staggered animated description */}
            <motion.p 
              style={{ opacity: descOpacity, y: descY }}
              className="text-[#626879] text-[13.5px] leading-[1.75] mb-5 font-medium"
            >
              {exp.description}
            </motion.p>
            
            {/* Staggered animated bullet points */}
            <ul className="flex flex-col gap-2.5">
              {exp.highlights.map((h, hi) => (
                <motion.li 
                  key={hi} 
                  style={{ 
                    opacity: highlightTransforms[hi].opacity, 
                    y: highlightTransforms[hi].y 
                  }}
                  className="flex items-start gap-2.5 text-[12.5px] text-[#626879] font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F7A5C] mt-1.5 flex-shrink-0" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll position of the entire section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Target Motion Values
  const card0Target = useMotionValue(1)
  const card1Target = useMotionValue(0)
  const card2Target = useMotionValue(0)

  // Smooth Spring values to behave like flowing water
  const springConfig = { stiffness: 45, damping: 18, mass: 1 }
  const card0Progress = useSpring(card0Target, springConfig)
  const card1Progress = useSpring(card1Target, springConfig)
  const card2Progress = useSpring(card2Target, springConfig)

  const updateTargets = (latestScroll: number, hoverIdx: number | null) => {
    let t0 = 0, t1 = 0, t2 = 0;
    if (hoverIdx !== null) {
      t0 = hoverIdx === 0 ? 1 : 0;
      t1 = hoverIdx === 1 ? 1 : 0;
      t2 = hoverIdx === 2 ? 1 : 0;
    } else {
      // Card 0 active in first third
      if (latestScroll < 0.35) {
        t0 = 1;
      } else {
        t0 = 0;
      }
      // Card 1 active in middle third
      if (latestScroll >= 0.35 && latestScroll < 0.68) {
        t1 = 1;
      } else {
        t1 = 0;
      }
      // Card 2 active in final third (with hysteresis for exit)
      if (latestScroll < 0.68) {
        t2 = 0;
      } else if (latestScroll < 0.92) {
        t2 = (latestScroll - 0.68) / 0.24;
      } else {
        t2 = 1;
      }
    }

    card0Target.set(t0)
    card1Target.set(t1)
    card2Target.set(t2)
  }

  // Monitor scroll progress changes
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    updateTargets(latest, hoveredIndex)

    // Update active index for indicator dots
    if (latest < 0.35) {
      setActiveIndex(0)
    } else if (latest < 0.68) {
      setActiveIndex(1)
    } else {
      setActiveIndex(2)
    }
  })

  // Monitor hover status changes
  useEffect(() => {
    updateTargets(scrollYProgress.get(), hoveredIndex)
  }, [hoveredIndex])

  // Sync dot indicators with hover state if active, otherwise use scroll-driven index
  const activeDotIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Smooth progress mapped to timeline heights
  const progressLineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={containerRef}
      className={`relative w-full bg-[#F8F7F4] z-20 ${isMobile ? 'h-auto py-12' : 'h-[260vh]'}`}
    >
      {/* Sticky viewport wrapper */}
      <div className={isMobile ? 'relative w-full py-2 flex items-center justify-center' : 'sticky top-0 h-screen w-full flex items-center overflow-hidden'}>
        
        {/* Editorial Background Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div
            className="absolute"
            style={{
              top: '25%', right: '-5%',
              width: '40vw', height: '40vw',
              maxWidth: 550,
              background: 'radial-gradient(ellipse, rgba(175,210,185,0.15) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '15%', left: '-5%',
              width: '35vw', height: '35vw',
              maxWidth: 450,
              background: 'radial-gradient(ellipse, rgba(79,122,92,0.1) 0%, transparent 70%)',
              filter: 'blur(75px)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-12 lg:gap-20">
          
          {/* LEFT: Section Title + Timeline Stepper */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h2
              className={`font-serif ${isMobile ? 'font-bold' : 'font-semibold'} text-[#0B1020] leading-[1.1] tracking-[-0.02em] text-center lg:text-left w-full ${isMobile ? 'mb-0' : 'mb-12'}`}
              style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
            >
              <span className="hidden lg:inline">
                Where I've been<br />
                <em className="text-[#4b7056]">and what I've built.</em>
              </span>
              <span className="inline lg:hidden block text-center">
                My professional career <em className="text-[#4F7A5C] not-italic">journey</em>
              </span>
            </h2>

            {/* Premium Vertical Stepper */}
            <div className="hidden lg:flex items-center gap-8 pl-2">
              <div className="relative w-1 h-[180px] bg-[#0B1020]/10 rounded-full">
                {/* Glowing progress line */}
                <motion.div
                  style={{ height: progressLineHeight }}
                  className="absolute top-0 left-0 w-full bg-[#2C4A35] rounded-full shadow-[0_0_12px_rgba(44,74,53,0.6)]"
                />

                {/* Dot 1 */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => window.scrollTo({ top: containerRef.current!.offsetTop + window.innerHeight * 0.2, behavior: 'smooth' })}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${activeDotIndex >= 0 ? 'bg-[#2C4A35] border-[#2C4A35]' : 'bg-[#F8F7F4] border-[#0B1020]/25'}`}>
                    {activeDotIndex === 0 && (
                      <span className="absolute inset-0 rounded-full bg-[#2C4A35]/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Dot 2 */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => window.scrollTo({ top: containerRef.current!.offsetTop + window.innerHeight * 1.1, behavior: 'smooth' })}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${activeDotIndex >= 1 ? 'bg-[#2C4A35] border-[#2C4A35]' : 'bg-[#F8F7F4] border-[#0B1020]/25'}`}>
                    {activeDotIndex === 1 && (
                      <span className="absolute inset-0 rounded-full bg-[#2C4A35]/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Dot 3 */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => window.scrollTo({ top: containerRef.current!.offsetTop + window.innerHeight * 1.9, behavior: 'smooth' })}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${activeDotIndex >= 2 ? 'bg-[#2C4A35] border-[#2C4A35]' : 'bg-[#F8F7F4] border-[#0B1020]/25'}`}>
                    {activeDotIndex === 2 && (
                      <span className="absolute inset-0 rounded-full bg-[#2C4A35]/30 animate-ping" />
                    )}
                  </div>
                </div>
              </div>

              {/* Step Labels */}
              <div className="flex flex-col justify-between h-[180px] py-1 text-xs font-bold text-[#626879] uppercase tracking-wider">
                <span className={`transition-colors duration-300 ${activeDotIndex === 0 ? 'text-[#2C4A35]' : 'text-[#626879]/50'}`}>Internship IIT Kanpur</span>
                <span className={`transition-colors duration-300 ${activeDotIndex === 1 ? 'text-[#2C4A35]' : 'text-[#626879]/50'}`}>Freelance</span>
                <span className={`transition-colors duration-300 ${activeDotIndex === 2 ? 'text-[#2C4A35]' : 'text-[#626879]/50'}`}>Education</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Stacked Experiences with Dynamic Expand/Collapse */}
          <div className="w-full lg:w-[58%] flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
                progress={i === 0 ? card0Progress : i === 1 ? card1Progress : card2Progress}
                setHoveredIndex={setHoveredIndex}
                isMobile={isMobile}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { PortfolioNavbar } from './ui/aceternity/ResizableNavbar'

export function HeroSection() {
  const navItems = ['Home', 'About', 'Experience', 'Achievements', 'Projects', 'Contact']
  const heroRef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll progress of the hero section container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Start scaling and blurring ONLY after 5% scroll (0.05 threshold)
  // Scale down from 1 to 0.70
  const scale = useTransform(scrollYProgress, [0, 0.05, 1], [1, 1, 0.7])

  // Progressively blur from 0px (start at 5% scroll) to 36px (heavy cinematic blur)
  const blurRaw = useTransform(scrollYProgress, [0, 0.05, 0.95], [0, 0, 36])
  const blur = useMotionTemplate`blur(${blurRaw}px)`

  // Fade out opacity after 5% scroll threshold
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95], [1, 1, 0])

  // Parallax translation variables (starts immediately)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Custom indicators motion (slides upward, fades, doesn't blur or scale)
  const indicatorY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const headlineLines = [
    { text: "Building digital", isItalicGreen: false, hasSquiggle: false },
    { text: "experiences", isItalicGreen: true, hasSquiggle: true },
    { text: "that matter.", isItalicGreen: false, hasSquiggle: false },
  ]

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#F8F7F4]"
    >
      {/* ─── SVG FILTERS FOR EDITORIAL TEXT EFFECT ─── */}
      <svg className="hidden">
        <defs>
          <filter id="squiggle-filter-1">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="squiggle-filter-2">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="squiggle-filter-3">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ═══ RESIZABLE ACETERNITY NAVBAR (Stays un-blurred and fixed at top) ═══ */}
      <PortfolioNavbar navItems={navItems} />

      {/* ═══ SCROLL-BLURRED HERO CONTENT CONTAINER ═══ */}
      <motion.div
        style={{ scale, filter: blur, opacity, transform: 'translateZ(0)', willChange: 'transform, filter' }}
        className="relative flex-1 flex flex-col justify-between w-full h-full min-h-screen origin-center"
      >
        {/* ═══ ACETERNITY SPOTLIGHT & ATMOSPHERIC LAYERS ═══ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Subtle geometric circles */}
          <svg
            className="absolute"
            style={{ top: '-10%', right: '-5%', width: '50%', height: '70%', opacity: 0.04 }}
            viewBox="0 0 600 600"
            fill="none"
            stroke="#2C4A35"
            strokeWidth="1"
          >
            <circle cx="600" cy="0" r="420" />
            <circle cx="600" cy="0" r="370" />
            <circle cx="600" cy="0" r="320" />
          </svg>

          {/* Curved flowing lines merged from HeroBackground */}
          <svg
            className="absolute -bottom-8 right-0 h-[350px] w-[50%]"
            style={{ opacity: 0.06 }}
            viewBox="0 0 800 350"
            fill="none"
            stroke="#4F7A5C"
            strokeWidth="0.8"
          >
            <path d="M0 280 C 200 245, 360 310, 540 240 S 800 175, 820 140" />
            <path d="M0 310 C 220 275, 380 340, 560 270 S 820 210, 840 175" opacity="0.6" />
            <path d="M0 340 C 240 305, 400 360, 580 300 S 820 240, 860 205" opacity="0.35" />
          </svg>
        </div>

        {/* ═══ HERO MAIN CONTENT ═══ */}
        <main id="hero" className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex-1 flex items-center min-h-[600px] pt-10 md:pt-24">
          {isMobile && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              <div
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(175, 210, 185, 0.28) 0%, transparent 65%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>
          )}

          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            style={{ y: isMobile ? 0 : textY }}
            className="w-full md:w-[62%] max-w-[900px] flex flex-col justify-center items-center md:items-start z-25 text-center md:text-left px-4 md:px-0"
          >

            {isMobile && (
              <div className="w-52 h-52 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] mb-6 mt-0 mx-auto relative z-10 overflow-hidden bg-transparent">
                <img src="/avatar_icon.png" alt="Developer Avatar" className="w-full h-full object-cover scale-[1.18] translate-y-1" />
              </div>
            )}

            <h1 className={`font-serif ${isMobile ? 'font-extrabold' : 'font-bold'} text-[clamp(48px,12vw,120px)] leading-[1.05] md:leading-[0.92] text-[#0B1020] tracking-[-0.02em] mb-6 text-center md:text-left w-full`}>
              {isMobile ? (
                <span className="block px-2">
                  Building digital <span className="premium-gradient-text text-[1.08em] italic font-serif font-medium inline-block">experiences</span> that matter.
                </span>
              ) : (
                headlineLines.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-[4px]">
                    <motion.span
                      initial={isMobile ? { y: 0, rotate: 0 } : { y: "115%", rotate: 2 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={isMobile ? { duration: 0 } : {
                        duration: 0.95,
                        delay: 0.25 + idx * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block origin-left ${line.isItalicGreen ? 'premium-gradient-text' : ''} ${line.hasSquiggle ? 'animate-squiggle' : ''}`}
                    >
                      {line.text === "that matter." ? (
                        <>
                          <span className="animate-squiggle inline-block">that</span>
                          <span>&nbsp;matter.</span>
                        </>
                      ) : (
                        line.text
                      )}
                    </motion.span>
                  </span>
                ))
              )}
            </h1>

            {/* Description — desktop only */}
            {!isMobile && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-[14.5px] text-[#626879] leading-[1.8] max-w-[440px] mb-8 font-medium text-left"
              >
                Full Stack Developer focused on building fast, scalable, and intuitive web applications with clean architecture and exceptional user experiences.
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.95 }}
              className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 w-full sm:w-auto justify-center md:justify-start"
            >
              <motion.a
                href="https://drive.google.com/file/d/1_ROiFHX1CsFsgc0KhIaS2sCbh0mKfoQN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                className={`group bg-[#2C4A35] hover:bg-[#223929] text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-colors duration-300 shadow-[0_4px_20px_rgba(44,74,53,0.15)] cursor-pointer text-center border border-[#2C4A35]/20 ${isMobile ? 'px-6 py-3 text-[13.5px] max-w-[220px] mx-auto' : 'px-8 py-4 text-[15px] w-full md:w-auto max-w-[280px] md:max-w-none mx-auto md:mx-0'}`}
              >
                View Résumé
                <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-white" />
              </motion.a>

              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative group text-[#0B1020] text-[14px] font-semibold py-1.5 hidden md:flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto text-center"
              >
                View My Work
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0B1020] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#4F7A5C] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN: Portrait (Hidden on mobile) ─── */}
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[55%] items-end justify-center pointer-events-none z-10">

            {/* Portrait Image Motion Wrapper */}
            <motion.div
              style={{ y: portraitY, x: 75 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: -20 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-end justify-center pb-8"
            >
              {/* 1. Large ambient background glow (provides soft overall green field) */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '-5%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '800px',
                  height: '800px',
                  background: 'radial-gradient(circle, rgba(79, 122, 92, 0.58) 0%, rgba(175, 210, 185, 0.28) 55%, transparent 75%)',
                  filter: 'blur(65px)',
                  zIndex: 2,
                }}
              />

              {/* 2. Soft rim-light accent glow directly behind head */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '8%',
                  left: '54%',
                  transform: 'translateX(-50%)',
                  width: '460px',
                  height: '460px',
                  background: 'radial-gradient(circle, rgba(79, 122, 92, 0.78) 0%, rgba(175, 210, 185, 0.35) 50%, transparent 72%)',
                  filter: 'blur(50px)',
                  zIndex: 2,
                }}
              />

              {/* 3. Soft glow patch on the left side (behind shoulder/arm) */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '35%',
                  left: '25%',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(175, 210, 185, 0.65) 0%, rgba(79, 122, 92, 0.22) 50%, transparent 72%)',
                  filter: 'blur(50px)',
                  zIndex: 2,
                }}
              />

              {/* 4. Lower body ambient base glow patch */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '55%',
                  left: '60%',
                  width: '500px',
                  height: '500px',
                  background: 'radial-gradient(circle, rgba(79, 122, 92, 0.45) 0%, rgba(175, 210, 185, 0.18) 50%, transparent 72%)',
                  filter: 'blur(60px)',
                  zIndex: 2,
                }}
              />

              <img
                src="/portrait.png"
                alt="Aditya Kushwaha"
                className="relative animate-sharpness-boost"
                style={{
                  height: '102%',
                  width: 'auto',
                  maxWidth: 'none',
                  objectFit: 'contain',
                  objectPosition: 'center bottom',
                  zIndex: 10,
                  maskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.65) 88%, rgba(0,0,0,0.2) 94%, transparent 100%), linear-gradient(to left, black 0%, black 65%, transparent 90%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.65) 88%, rgba(0,0,0,0.2) 94%, transparent 100%), linear-gradient(to left, black 0%, black 65%, transparent 90%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                  filter: 'contrast(1.15) saturate(1.06) brightness(1.01) drop-shadow(0 15px 35px rgba(11,16,32,0.18)) drop-shadow(0 30px 70px rgba(11,16,32,0.15))'
                }}
              />
            </motion.div>
          </div>

          {/* Dotted grid accent */}
          <div
            className="absolute dotted-pattern pointer-events-none z-0"
            style={{
              width: 140,
              height: 140,
              left: '46%',
              top: '18%',
              opacity: 0.25,
            }}
          />
        </main>
      </motion.div>

      {/* ═══ SCROLL INDICATORS (Placed outside blurred wrapper - slides upward, no scale or blur) ═══ */}
      <motion.div
        className="hidden md:flex absolute z-30 flex-row items-center gap-3.5 pointer-events-none"
        style={{ left: 64, bottom: 24, y: indicatorY, opacity: indicatorOpacity }}
      >
        <div className="flex flex-col items-center">
          <div className="h-[45px] w-[1px] bg-[#4F7A5C]/30" />
          <div className="w-[7px] h-[7px] rounded-full border border-[#4F7A5C]/50 mt-1.5" />
        </div>
        <span className="text-[10px] tracking-[0.25em] font-semibold text-[#4F7A5C] uppercase">
          SCROLL TO EXPLORE
        </span>
      </motion.div>

      <motion.div
        style={{ right: 64, bottom: 48, y: indicatorY, opacity: indicatorOpacity }}
        className="hidden md:flex absolute z-30 flex-col items-center gap-3.5 pointer-events-none"
      >
        <span
          className="text-[9px] tracking-[0.25em] font-semibold text-[#4F7A5C] uppercase"
          style={{ writingMode: 'vertical-rl', letterSpacing: '0.25em' }}
        >
          AVAILABLE FOR PROJECTS
        </span>
        <div className="flex flex-col items-center">
          <div className="h-[60px] w-[1px] bg-[#4F7A5C]/30" />
          <div className="w-[7px] h-[7px] rounded-full border border-[#4F7A5C]/50 mt-1.5" />
        </div>
      </motion.div>

    </div>
  )
}

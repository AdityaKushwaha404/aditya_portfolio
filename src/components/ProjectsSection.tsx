import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Globe, CreditCard, Cloud, Key, Zap, Layout, Shield, Database } from 'lucide-react'
import { ContainerScroll } from './ui/aceternity/ContainerScroll'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

// Brand Icons mapping for Tech Stack pills
const ReactIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
  </svg>
)

const NodeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
    <path d="M12 22V12" />
    <path d="M12 12L2 7" />
    <path d="M12 12l10-5" />
  </svg>
)

const MongoIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 2c0 0-5 4.5-5 8.5S9.24 19 12 22c2.76-3 5-8 5-11.5S12 2 12 2z" />
  </svg>
)

const getTagIcon = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'react.js':
      return <ReactIcon className="w-3.5 h-3.5 text-[#61DAFB]" />
    case 'node.js':
      return <NodeIcon className="w-3.5 h-3.5 text-[#339933]" />
    case 'express.js':
      return <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight">ex</span>
    case 'mongodb':
      return <MongoIcon className="w-3.5 h-3.5 text-[#47A248]" />
    case 'redux toolkit':
      return <span className="text-[10px] font-bold text-purple-600 font-mono tracking-tight">rt</span>
    case 'paypal':
      return <CreditCard className="w-3.5 h-3.5 text-[#003087]" />
    case 'cloudinary':
      return <Cloud className="w-3.5 h-3.5 text-[#3448C5]" />
    case 'fastapi':
      return <Zap className="w-3.5 h-3.5 text-[#009688]" />
    case 'tailwind css':
      return <Layout className="w-3.5 h-3.5 text-[#06B6D4]" />
    case 'web3.js':
      return <Shield className="w-3.5 h-3.5 text-[#F16822]" />
    case 'clerk':
      return <Key className="w-3.5 h-3.5 text-[#2563EB]" />
    case 'razorpay':
      return <CreditCard className="w-3.5 h-3.5 text-[#008ECF]" />
    case 'next.js':
      return <span className="text-[10px] font-bold text-black font-mono tracking-tight">N</span>
    case 'typescript':
      return <span className="text-[10px] font-bold text-[#3178C6] font-mono tracking-tight">TS</span>
    case 'postgresql (neon)':
      return <Database className="w-3.5 h-3.5 text-[#336791]" />
    case 'prisma':
      return <span className="text-[10px] font-bold text-[#2D3748] font-mono tracking-tight">▲</span>
    case 'react query':
      return <span className="text-[10px] font-bold text-[#FF4154] font-mono tracking-tight">RQ</span>
    case 'resend':
      return <span className="text-[10px] font-bold text-black font-mono tracking-tight">✉</span>
    default:
      return <Database className="w-3.5 h-3.5 text-slate-400" />
  }
}

const projects = [
  {
    number: '01',
    name: 'Sentinel',
    tagline: 'AI-Powered Infrastructure Monitoring SaaS',
    description:
      'A production-ready SaaS platform to monitor websites, APIs, and SSL certificates with automated health checks and real-time dashboards. Features secure serverless REST APIs, an AI-powered assistant to analyze logs, and Clerk/Resend integration.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL (Neon)', 'Prisma', 'Tailwind CSS', 'React Query', 'Clerk', 'Resend'],
    link: 'https://github.com/AdityaKushwaha404/sentinal',
    images: [
      '/sentinel1.png',
      '/sentinel2.png'
    ],
    url: 'https://sentinel.adityakushwaha.online/'
  },
  {
    number: '02',
    name: 'Rabbit',
    tagline: 'Digital Marketplace Web App',
    description:
      'A full-stack e-commerce platform with secure JWT authentication, product management, custom carts, order processing, and PayPal payments. Built with MongoDB data models for efficient user, product, and admin workflow management.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'PayPal', 'Cloudinary'],
    link: 'https://github.com/AdityaKushwaha404/E-Commerce_K_Ji/blob/main/README.md',
    images: [
      '/rabbit1.png',
      '/rabbit2.png'
    ],
    url: 'https://e-commerce-k-ji-q8g6.vercel.app/'
  },
  {
    number: '03',
    name: 'AgriChain',
    tagline: 'Blockchain-based Agricultural Platform',
    description:
      'An agricultural supply chain platform enabling farmer onboarding, product listing, and real-time transaction workflows. Integrated secure Clerk authentication and Razorpay payment gateways, while contributing to product traceability features powered by Web3 blockchain technology.',
    tags: ['React.js', 'FastAPI', 'MongoDB', 'Tailwind CSS', 'Web3.js', 'Clerk', 'Razorpay'],
    link: 'https://github.com/AdityaKushwaha404/AgriChain/tree/main',
    images: [
      '/agrichain1.png',
      '/agrichain2.png'
    ],
    url: 'https://agrichain-smoky.vercel.app/'
  },
]

import { CardItem } from './ui/aceternity/ThreeDCard'

function ProjectCard({ project, isMobile }: { project: typeof projects[0], isMobile: boolean }) {
  const [isHoveredTop, setIsHoveredTop] = useState(false)
  const [isHoveredBottom, setIsHoveredBottom] = useState(false)



  if (isMobile) {
    return (
      <div className="flex flex-col items-start text-left w-full py-4 px-4 bg-transparent border-0">
        <h3 className="text-3xl font-serif font-semibold text-[#0B1020] mb-2 leading-tight tracking-tight text-left">
          {project.name}
        </h3>
        <p className="text-base text-[#626879] font-medium mb-6 text-left">
          {project.tagline}
        </p>
        <div className="h-px bg-[#0B1020]/8 w-full mb-6" />
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#2C4A35]/10 mb-6 bg-[#F6F5F2] relative">
          <img src={project.images[0]} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <p className="text-[#626879] text-[14px] leading-[1.8] mb-8 font-medium text-left">
          {project.description}
        </p>
        <h4 className="text-[11px] font-bold text-[#0B1020]/50 uppercase tracking-wider mb-4 font-mono text-left">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2.5 mb-8 justify-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl border border-[#0B1020]/8 text-[11.5px] font-semibold text-[#626879] bg-white cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-start items-stretch sm:items-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C4A35] text-white text-[13.5px] font-bold hover:bg-[#365A40] transition-colors duration-300 shadow-sm"
          >
            <Globe className="w-4 h-4 text-white/90" />
            Live Demo
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#2C4A35]/15 text-[#2C4A35] bg-[#F5F4F0]/60 transition-colors duration-300 shadow-sm font-bold text-[13.5px]"
          >
            <GithubIcon className="w-4 h-4 text-[#2C4A35]" />
            View on GitHub
            <ArrowUpRight className="w-4 h-4 text-[#2C4A35]/60" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full w-full bg-white p-8 lg:p-12 select-none overflow-hidden items-stretch">
      {/* Left Details */}
      <div className="flex-1 flex flex-col justify-between h-full py-1">
        <div>
          {/* Featured Project Label */}
          <CardItem translateZ={30} className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2C4A35]" />
            <span className="text-[12px] font-bold text-[#2c4a35] uppercase tracking-wider">
              Featured Project
            </span>
          </CardItem>

          {/* Title */}
          <CardItem translateZ={50} className="block">
            <h3 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0B1020] mb-2 leading-tight tracking-tight">
              {project.name}
            </h3>
          </CardItem>

          {/* Tagline */}
          <CardItem translateZ={40} className="block">
            <p className="text-lg text-[#626879] font-medium mb-6">
              {project.tagline}
            </p>
          </CardItem>

          <CardItem translateZ={25} className="block w-full">
            <div className="h-px bg-[#0B1020]/8 w-full mb-6" />
          </CardItem>

          {/* Description */}
          <CardItem translateZ={35} className="block">
            <p className="text-[#626879] text-[14px] md:text-[15px] leading-[1.8] mb-8 font-medium">
              {project.description}
            </p>
          </CardItem>
        </div>

        <div>
          {/* Tech Stack Heading */}
          <CardItem translateZ={30} className="block">
            <h4 className="text-[11px] font-bold text-[#0B1020]/50 uppercase tracking-wider mb-4 font-mono">
              Tech Stack
            </h4>
          </CardItem>

          {/* Tech pills */}
          <CardItem translateZ={45} className="flex flex-wrap gap-2.5 mb-8">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.03, borderColor: 'rgba(44, 74, 53, 0.25)' }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-[12.5px] font-semibold text-[#626879] bg-white transition-colors duration-200 cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
              >
                {getTagIcon(tag)}
                {tag}
              </motion.span>
            ))}
          </CardItem>

          {/* Button Row */}
          <CardItem translateZ={60} className="flex items-center gap-4">
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C4A35] text-white text-[13.5px] font-bold hover:bg-[#365A40] transition-all duration-300 shadow-[0_4px_12px_rgba(44,74,53,0.15)] group/btn"
            >
              <Globe className="w-4 h-4 text-white/90" />
              Live Demo
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </motion.a>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, backgroundColor: '#EDEBE6', borderColor: '#2C4A35' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#2C4A35]/15 text-[#2C4A35] bg-[#F5F4F0]/60 backdrop-blur-sm transition-all duration-300 shadow-sm font-bold text-[13.5px] group/git"
              aria-label="View Source Code"
            >
              <GithubIcon className="w-4 h-4 text-[#2C4A35] transition-transform duration-300 group-hover/git:scale-110" />
              View on GitHub
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/git:translate-x-0.5 group-hover/git:-translate-y-0.5 text-[#2C4A35]/60 group-hover/git:text-[#2C4A35]" />
            </motion.a>
          </CardItem>
        </div>
      </div>

      {/* Right Column - Two Stacked Mockups */}
      <div className="w-full lg:w-[48%] flex-shrink-0 flex flex-col gap-6 justify-between h-full">
        {/* Top Mockup */}
        <motion.div
          onMouseEnter={() => setIsHoveredTop(true)}
          onMouseLeave={() => setIsHoveredTop(false)}
          animate={{ scale: isHoveredTop ? 1.025 : 1, y: isHoveredTop ? -4 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[47%] rounded-2xl border border-[#2C4A35]/15 bg-[#F6F5F2] overflow-hidden shadow-[0_8px_24px_rgba(44,74,53,0.015)] relative"
        >
          <div className="w-full h-full relative overflow-hidden">
            <motion.img 
              animate={{ scale: isHoveredTop ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={project.images[0]} 
              alt={`${project.name} preview 1`}
              className="absolute inset-0 w-full h-full object-cover border border-[#2C4A35]/10 rounded-2xl"
            />
            <motion.div 
              animate={{ opacity: isHoveredTop ? 0 : 0.08 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black pointer-events-none z-10"
            />
          </div>
        </motion.div>

        {/* Bottom Mockup */}
        <motion.div
          onMouseEnter={() => setIsHoveredBottom(true)}
          onMouseLeave={() => setIsHoveredBottom(false)}
          animate={{ scale: isHoveredBottom ? 1.025 : 1, y: isHoveredBottom ? 4 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[47%] rounded-2xl border border-[#2C4A35]/15 bg-[#F6F5F2] overflow-hidden shadow-[0_8px_24px_rgba(44,74,53,0.015)] relative"
        >
          <div className="w-full h-full relative overflow-hidden">
            <motion.img 
              animate={{ scale: isHoveredBottom ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={project.images[1]} 
              alt={`${project.name} preview 2`}
              className="absolute inset-0 w-full h-full object-cover border border-[#2C4A35]/10 rounded-2xl"
            />
            <motion.div 
              animate={{ opacity: isHoveredBottom ? 0 : 0.08 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black pointer-events-none z-10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="projects" className={`relative w-full bg-[#F3F2EF] scroll-mt-20 overflow-hidden ${isMobile ? 'pt-12 pb-16' : 'pt-16 pb-36 lg:pb-46'}`}>
      {/* Section Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(11,16,32,0.08) 30%, rgba(11,16,32,0.08) 70%, transparent)' }}
        />
      </div>

      {projects.map((project, i) => {
        const CardContent = <ProjectCard project={project} isMobile={isMobile} />
        if (isMobile) {
          return (
            <div key={project.name} className={`w-full px-6 ${isMobile ? 'mb-10' : 'mb-16'}`}>
              {i === 0 && (
                <div className={`flex flex-col items-center justify-center max-w-4xl mx-auto px-4 ${isMobile ? 'mb-6' : 'mb-16'}`}>
                  <h2
                    className={`font-serif ${isMobile ? 'font-bold' : 'font-semibold'} text-[#0B1020] leading-[1.1] tracking-[-0.02em] text-center w-full px-2`}
                    style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
                  >
                    Projects that <em className="text-[#4b7056] not-italic">speak for themselves.</em>
                  </h2>
                </div>
              )}
              {CardContent}
            </div>
          )
        }
        return (
          <ContainerScroll
            key={project.name}
            titleComponent={
              i === 0 ? (
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 mb-6">
                  <h2
                    className="font-serif font-semibold text-[#0B1020] leading-[1.1] tracking-[-0.02em] text-center"
                    style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
                  >
                    Projects that<br />
                    <em className="text-[#4b7056] not-italic">speak for themselves.</em>
                  </h2>
                </div>
              ) : null
            }
          >
            {CardContent}
          </ContainerScroll>
        )
      })}
    </section>
  )
}

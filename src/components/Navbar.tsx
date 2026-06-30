import { motion } from 'framer-motion'
import { ArrowUpRight, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavbarProps {
  navItems: string[]
}

export function Navbar({ navItems }: NavbarProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-[#F8F7F4]/80 backdrop-blur-md border-b border-[#0B1020]/4 py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-20 cursor-pointer select-none flex items-center overflow-visible"
        >
          <img src="/signature_logo.png" alt="Aditya" className="h-full w-auto object-contain mix-blend-multiply scale-[2.2] origin-left translate-y-[4px]" />
        </div>

        {/* Nav with animated hover pill */}
        <nav className="hidden md:flex items-center gap-2 relative bg-white/40 border border-[#0B1020]/5 px-2.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          {navItems.map((item, idx) => (
            <a
              key={item}
              href={item === 'Home' ? '#hero' : `#${item.toLowerCase()}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item === 'Home' ? 'hero' : item.toLowerCase());
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative px-4 py-1.5 rounded-full text-[13px] font-medium no-underline transition-colors duration-250 text-[#626879] hover:text-[#0B1020]"
            >
              {hoveredIdx === idx && (
                <motion.div
                  layoutId="nav-pill-active"
                  className="absolute inset-0 bg-[#2C4A35]/6 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item}
            </a>
          ))}
        </nav>

        {/* Right: CTA + Sun toggle */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://wa.me/917905915437', '_blank')}
            className="h-[44px] px-5 rounded-full bg-[#2C4A35] text-white text-[13px] font-semibold flex items-center gap-2 group cursor-pointer hover:bg-[#365A40] transition-all duration-300 shadow-sm"
          >
            Let's Connect
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          <button className="w-[44px] h-[44px] rounded-full border border-[#E2E4E0] flex items-center justify-center text-[#626879] hover:text-[#2C4A35] hover:border-[#2C4A35]/30 hover:bg-[#EFF1ED] hover:shadow-sm active:scale-95 transition-all duration-300 cursor-pointer bg-white/75 backdrop-blur-md">
            <Sun className="w-[18px] h-[18px] stroke-[1.75] transition-transform duration-500 hover:rotate-45" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

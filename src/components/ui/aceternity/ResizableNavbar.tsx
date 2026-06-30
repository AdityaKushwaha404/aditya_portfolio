import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '../../../lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  name: string
  link: string
}

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible: boolean
}

interface NavItemsProps {
  items: NavItem[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}

interface MobileNavToggleProps {
  isOpen: boolean
  onClick: () => void
}

interface NavbarButtonProps {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
  onClick?: () => void
  [key: string]: unknown
}

// ─── Navbar (outer wrapper) ───────────────────────────────────────────────────
export function Navbar({ children, className }: NavbarProps) {
  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50 w-full', className)}>
      {children}
    </div>
  )
}

// ─── NavBody (the pill that resizes) ─────────────────────────────────────────
export function NavBody({ children, className, visible }: NavBodyProps) {
  return (
    <motion.div
      animate={{
        width: visible ? '60%' : '100%',
        y: visible ? 12 : 0,
        borderRadius: visible ? '9999px' : '0px',
        boxShadow: visible
          ? '0 8px 32px rgba(11,16,32,0.08), 0 2px 8px rgba(11,16,32,0.04)'
          : 'none',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'mx-auto flex items-center justify-between overflow-hidden',
        visible
          ? 'bg-[#F8F7F4]/60 backdrop-blur-md border border-[#0B1020]/8 px-6 py-3'
          : 'bg-transparent px-6 md:px-10 lg:px-16 py-4',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ─── NavItems ────────────────────────────────────────────────────────────────
export function NavItems({ items, className, onItemClick }: NavItemsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const scrollToSection = (item: NavItem) => {
    const id = item.name === 'Home' ? 'hero' : item.name.toLowerCase()
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
    onItemClick?.()
  }

  return (
    <nav
      className={cn(
        'hidden md:flex items-center gap-1 relative bg-white/30 border border-[#0B1020]/5 px-2.5 py-1.5 rounded-full backdrop-blur-sm',
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          key={item.name}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => scrollToSection(item)}
          className="relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 text-[#626879] hover:text-[#0B1020] cursor-pointer bg-transparent border-none"
        >
          {hoveredIdx === idx && (
            <motion.div
              layoutId="nav-pill-active"
              className="absolute inset-0 bg-[#2C4A35]/8 rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          {item.name}
        </button>
      ))}
    </nav>
  )
}

// ─── MobileNav ───────────────────────────────────────────────────────────────
export function MobileNav({ children, className, visible }: MobileNavProps) {
  return (
    <motion.div
      animate={{
        y: visible ? 12 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'md:hidden flex items-center justify-between px-5',
        visible
          ? 'bg-[#F8F7F4]/60 backdrop-blur-md border border-[#0B1020]/8 rounded-full mx-4 py-3 shadow-lg'
          : 'bg-transparent py-4',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ─── MobileNavHeader ─────────────────────────────────────────────────────────
export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      {children}
    </div>
  )
}

// ─── MobileNavToggle ─────────────────────────────────────────────────────────
export function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E2E4E0] bg-white/70 text-[#626879] hover:text-[#2C4A35] hover:border-[#2C4A35]/30 transition-all duration-200 cursor-pointer"
      aria-label="Toggle menu"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <X className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Menu className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// ─── MobileNavMenu ────────────────────────────────────────────────────────────
export function MobileNavMenu({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'absolute top-full left-4 right-4 mt-2 bg-[#F8F7F4]/75 backdrop-blur-xl border border-[#0B1020]/8 rounded-2xl shadow-xl overflow-hidden p-4',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── NavbarButton ─────────────────────────────────────────────────────────────
export function NavbarButton({
  href,
  as: Tag = 'button',
  children,
  className,
  variant = 'primary',
  onClick,
  ...rest
}: NavbarButtonProps) {
  const variantStyles = {
    primary:
      'bg-[#2C4A35] text-white hover:bg-[#365A40] shadow-sm border border-[#2C4A35]',
    secondary:
      'bg-white/70 text-[#0B1020] hover:bg-white border border-[#0B1020]/10',
    dark: 'bg-[#0B1020] text-white hover:bg-[#1a2540]',
    gradient:
      'bg-gradient-to-r from-[#2C4A35] to-[#4F7A5C] text-white hover:opacity-90',
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
      <Tag
        href={href}
        onClick={onClick}
        className={cn(
          'h-[44px] px-5 rounded-full text-[13px] font-semibold flex items-center gap-2 cursor-pointer transition-all duration-300',
          variantStyles[variant],
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

// ─── MAIN PORTFOLIO NAVBAR (assembled) ───────────────────────────────────────
interface PortfolioNavbarProps {
  navItems: string[]
}

export function PortfolioNavbar({ navItems }: PortfolioNavbarProps) {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hideNavbar, setHideNavbar] = useState(false)

  const items: NavItem[] = navItems.map((name) => ({
    name,
    link: name === 'Home' ? '#hero' : `#${name.toLowerCase()}`,
  }))

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 60)
      
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        // Hysteresis buffer to prevent glitching/flicker at the scroll boundary
        setHideNavbar((prev) => {
          if (rect.top < 30) return true   // Hide when entering contact section
          if (rect.top > 120) return false // Show when scrolled well away from contact section
          return prev
        })
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on outside click
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  const Logo = () => (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="h-20 cursor-pointer select-none bg-transparent border-none p-0 flex items-center"
    >
      <img src="/signature_logo.png" alt="Aditya" className="h-full w-auto object-contain mix-blend-multiply" />
    </button>
  )

  return (
    <>
      {/* ── DESKTOP NAVBAR (Intact, hidden on mobile) ── */}
      <motion.div
        ref={navRef}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: hideNavbar ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative hidden md:block"
        style={{ pointerEvents: hideNavbar ? 'none' : 'auto' }}
      >
        <Navbar>
          <NavBody visible={visible}>
            <Logo />
            <NavItems items={items} />
            <NavbarButton
              variant="primary"
              onClick={() =>
                window.open('https://wa.me/917905915437', '_blank')
              }
              className="hidden md:flex"
            >
              Let's Connect
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavbarButton>
          </NavBody>
        </Navbar>
      </motion.div>

      {/* ── MOBILE HAMBURGER BUTTON (Fixed top-right, visible below md only) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-6 right-6 z-[9997] md:hidden w-12 h-12 rounded-full border border-[#0B1020]/10 flex items-center justify-center text-[#0B1020] bg-[#F8F7F4]/90 backdrop-blur-md shadow-md transition-all cursor-pointer hover:bg-white"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── MOBILE FULL-SCREEN MENU OVERLAY (AnimatePresence) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#F8F7F4]/98 backdrop-blur-2xl z-[9998] flex flex-col justify-center items-center md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[#0B1020]/10 flex items-center justify-center text-[#0B1020] hover:text-[#2C4A35] transition-all cursor-pointer bg-white/40 shadow-sm"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Menu Links with stagger animations */}
            <nav className="flex flex-col items-center gap-8">
              {items.map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    const id = item.name === 'Home' ? 'hero' : item.name.toLowerCase()
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    setMobileOpen(false)
                  }}
                  className="font-serif font-semibold text-[32px] text-[#0B1020] hover:text-[#2C4A35] transition-all duration-300 transform hover:scale-105 cursor-pointer bg-transparent border-none relative group pb-1"
                >
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#2C4A35] transition-all duration-300 group-hover:w-1/2" />
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

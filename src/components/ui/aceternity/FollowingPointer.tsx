import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../../lib/utils'

export function FollowingPointer({
  className,
}: {
  className?: string
}) {
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Motion values for tracking cursor position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth fluid spring coordinates tracking
  const dotSpringConfig = { damping: 30, stiffness: 450, mass: 0.2 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    if (!isMobile) {
      document.body.classList.add('md:cursor-none')
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.style.cursor === 'pointer')
      ) {
        setIsHoveringClickable(true)
      } else {
        setIsHoveringClickable(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('md:cursor-none')
    }
  }, [mouseX, mouseY, isMobile, isVisible])

  if (isMobile || !isVisible) return null

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-[9999] hidden md:block', className)}>
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHoveringClickable ? 2.8 : 1.2,
          opacity: isHoveringClickable ? 0.1 : 0.6,
          backgroundColor: '#2C4A35',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        className="absolute w-2.5 h-2.5 rounded-full shadow-sm"
      />
    </div>
  )
}

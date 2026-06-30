import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from './ui/aceternity/MovingBorder'

// Custom SVGs for missing brand icons in this version of lucide-react
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)



const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 2.697 1.477 4.62 1.478 5.535 0 10.041-4.503 10.044-10.042.002-2.684-1.04-5.207-2.93-7.099-1.89-1.89-4.411-2.93-7.096-2.931-5.539 0-10.048 4.502-10.05 10.043-.001 1.936.505 3.003 1.473 4.6l-.997 3.642 3.84-.992zm12.518-6.143c-.302-.15-1.786-.882-2.052-.979-.266-.097-.46-.145-.653.146-.193.291-.747.935-.916 1.129-.168.193-.338.217-.64.067-.302-.15-1.275-.47-2.43-1.499-.896-.8-1.5-1.788-1.676-2.088-.177-.3-.019-.462.132-.612.136-.135.302-.35.453-.525.15-.175.2-.291.3-.486.1-.195.05-.365-.025-.515-.075-.15-.653-1.573-.895-2.155-.235-.568-.475-.49-.653-.499-.17-.008-.363-.01-.557-.01-.193 0-.507.073-.772.365-.266.291-1.014.992-1.014 2.42 0 1.427 1.039 2.805 1.183 2.998.145.195 2.046 3.125 4.957 4.382.692.299 1.233.477 1.656.611.696.222 1.33.19 1.83.115.558-.083 1.786-.73 2.039-1.436.252-.705.252-1.309.177-1.436-.075-.128-.274-.202-.576-.352z"/>
  </svg>
)



export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [hoveredFooterIdx, setHoveredFooterIdx] = useState<number | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Paste your Web3Forms access key here (Get one free at https://web3forms.com)
    const accessKey = "YOUR_ACCESS_KEY_HERE"

    if (accessKey === "YOUR_ACCESS_KEY_HERE" || !accessKey) {
      setError("Please paste your Web3Forms Access Key in src/components/ContactSection.tsx to enable email delivery. Get one free at web3forms.com.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSent(true)
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const socials = [
    { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/AdityaKushwaha404' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/adityakushwaha1503/' },
    { icon: WhatsappIcon, label: 'WhatsApp', href: 'https://wa.me/917905915437' },
  ]

  return (
    <section id="contact" className={`relative w-full bg-[#0B1020] overflow-hidden scroll-mt-20 ${isMobile ? 'py-16' : 'py-32 lg:py-40'}`}>
      
      {/* ── ATMOSPHERIC DARK BACKGROUND DECORATIVES ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Sleek green ambient spotlight */}
        <div
          className="absolute"
          style={{
            top: 0, left: '20%',
            width: '65vw', height: '40vw',
            background: 'conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(111,149,120,0.8) 50%, transparent 60%)',
            filter: 'blur(30px)'
          }}
        />

        {/* Decorative arcs */}
        <svg className="absolute top-0 right-0 h-full w-[35%] opacity-[0.04]" viewBox="0 0 400 800" fill="none" stroke="white" strokeWidth="0.8" preserveAspectRatio="none">
          <path d="M400 0 C 250 200, 280 500, 400 720" />
          <path d="M400 60 C 270 240, 300 520, 400 760" />
        </svg>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT: Heading + contact info */}
          <div className="flex flex-col justify-between items-start text-left w-full">
            <div>
              <h2
                className={`font-serif ${isMobile ? 'font-extrabold' : 'font-semibold'} text-white leading-[1.05] tracking-[-0.02em] text-left w-full ${isMobile ? 'mb-6' : 'mb-10'}`}
                style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
              >
                {isMobile ? (
                  <span>
                    Let's build something <em className="text-[#6FA882] not-italic">remarkable.</em>
                  </span>
                ) : (
                  ["Let's build", "something", "remarkable."].map((line, idx) => (
                    <span key={idx} className="block overflow-hidden py-1">
                      <motion.span
                        initial={isMobile ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                        transition={isMobile ? { duration: 0 } : { duration: 0.85, delay: 0.1 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        {idx === 2 ? <em className="text-[#6FA882] font-serif font-medium">{line}</em> : line}
                      </motion.span>
                    </span>
                  ))
                )}
              </h2>

              <motion.p
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.25 }}
                className="text-white/50 text-[14.5px] leading-[1.85] max-w-[420px] mb-10 font-medium text-left"
              >
                Have a project in mind, an opportunity to discuss, or just want to say hello?
                My inbox is always open. I'll get back to you within 24 hours.
              </motion.p>

              {/* Standalone Email & Location Items (No Card Box Wrapper) */}
              <div className="flex flex-col gap-6 max-w-[460px] mb-12 items-start w-full">
                {/* Email */}
                <motion.a
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.35 }}
                  href="mailto:kushwahaaditya431@gmail.com"
                  className="group flex items-center gap-3.5 w-fit"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6FA882]/40 group-hover:bg-white/10 transition-all duration-300">
                    <Mail className="w-4 h-4 text-[#6FA882] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Address</span>
                    <span className="text-white font-semibold text-[15px] border-b border-transparent group-hover:border-[#6FA882]/40 transition-colors duration-300">
                      kushwahaaditya431@gmail.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#6FA882] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-4" />
                </motion.a>

                {/* Phone */}
                <motion.a
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.38 }}
                  href="tel:+917905915437"
                  className="group flex items-center gap-3.5 w-fit"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6FA882]/40 group-hover:bg-white/10 transition-all duration-300">
                    <Phone className="w-4 h-4 text-[#6FA882] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Phone Number</span>
                    <span className="text-white font-semibold text-[15px] border-b border-transparent group-hover:border-[#6FA882]/40 transition-colors duration-300">
                      +91 7905915437
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#6FA882] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-4" />
                </motion.a>

                {/* Location */}
                <motion.div
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.4 }}
                  className="flex items-center gap-3.5 mb-6"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-4 h-4 text-[#6FA882]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Current Location</span>
                    <span className="text-white/80 text-[14px] font-semibold">India - Open to remote worldwide</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social links */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.7, delay: 0.48 }}
              className="flex flex-wrap items-center gap-4 mt-4 justify-start w-full"
            >
              {socials.map(({ icon: Icon, label, href }) => {
                if (label === 'WhatsApp') {
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={isMobile ? {} : { scale: 1.02, y: -1 }}
                      whileTap={isMobile ? {} : { scale: 0.98 }}
                      className="h-[44px] px-5 rounded-full bg-[#2C4A35] text-white text-[13px] font-semibold flex items-center gap-2 group cursor-pointer hover:bg-[#365A40] transition-all duration-300 shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110" />
                      Chat on WhatsApp
                    </motion.a>
                  )
                }
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={isMobile ? {} : { scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={isMobile ? {} : { scale: 0.95 }}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                    title={label}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* RIGHT: Contact form */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <div className="h-full min-h-[400px] flex flex-col items-start justify-center gap-4 py-12">
                <div className="w-14 h-14 rounded-full bg-[#2C4A35] flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(44,74,53,0.3)]">
                  <Send className="w-5 h-5 text-[#AFC3B0]" />
                </div>
                <h3 className="font-serif text-white text-[28px] font-semibold">Message sent!</h3>
                <p className="text-white/50 text-[14.5px] leading-relaxed max-w-[340px] font-medium">
                  Thanks for reaching out. I'll review your inquiry and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-2 text-[13px] text-[#6FA882] underline underline-offset-2 hover:text-[#88C69D] transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">

                {/* Name */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[#6FA882]/40 focus:bg-white/[0.04] transition-all duration-300"
                    />
                    {focusedInput === 'name' && (
                      <motion.div 
                        layoutId="input-glowing-ring" 
                        className="absolute inset-0 border border-[#6FA882]/20 rounded-xl pointer-events-none"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[#6FA882]/40 focus:bg-white/[0.04] transition-all duration-300"
                    />
                    {focusedInput === 'email' && (
                      <motion.div 
                        layoutId="input-glowing-ring" 
                        className="absolute inset-0 border border-[#6FA882]/20 rounded-xl pointer-events-none"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onFocus={() => setFocusedInput('message')}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or questions..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[#6FA882]/40 focus:bg-white/[0.04] transition-all duration-300 resize-none"
                    />
                    {focusedInput === 'message' && (
                      <motion.div 
                        layoutId="input-glowing-ring" 
                        className="absolute inset-0 border border-[#6FA882]/20 rounded-xl pointer-events-none"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl leading-relaxed"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                <div className="mt-2">
                  <Button
                    borderRadius="9999px"
                    containerClassName="h-[52px] w-full max-w-[200px]"
                    borderClassName="bg-[radial-gradient(circle_at_center,var(--color-primary-green)_0%,transparent_60%)]"
                    className="bg-[#2C4A35] hover:bg-[#365A40] text-white font-semibold text-[14px] flex items-center justify-center gap-2 group transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 text-white" />}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer rule + copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="text-[32px] font-serif font-bold text-white/25 tracking-tight hover:text-white transition-colors duration-300 cursor-pointer">
            AK<span className="text-[#6FA882]">.</span>
          </div>
          <p className="text-[12px] text-white/25 font-medium">
            © {new Date().getFullYear()} Aditya Kushwaha. Crafted with care.
          </p>
          
          {/* Footer links with premium layoutId sliding underline hover */}
          <div className="flex items-center gap-6">
            {['Home', 'About', 'Experience', 'Achievements', 'Projects', 'Contact'].map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setHoveredFooterIdx(idx)}
                onMouseLeave={() => setHoveredFooterIdx(null)}
                className="relative text-[12px] text-white/30 hover:text-white/80 transition-colors duration-300 font-medium py-1"
              >
                {item}
                {hoveredFooterIdx === idx && (
                  <motion.div 
                    layoutId="footer-link-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#6FA882]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

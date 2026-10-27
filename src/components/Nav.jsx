import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import { useIntroDone } from '../lib/intro.jsx'
import useActiveSection from '../lib/useActiveSection.js'
import { profile, sections } from '../data/content.js'

const SECTION_IDS = sections.map((section) => section.id)

const menuList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const menuItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export default function Nav() {
  const ready = useIntroDone()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile menu, and close it on Escape.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: ready ? 0 : -80 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: ready ? 0.15 : 0 }}
        className={`fixed inset-x-0 top-0 z-60 transition-colors duration-500 ${
          scrolled && !open ? 'border-b border-line bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
          <a href="#top" className="font-display text-xl tracking-tight md:text-2xl">
            {profile.name}
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === section.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-ink/[0.06]"
                  />
                )}
                <span className="relative">{section.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="h-px w-6 bg-ink"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="h-px w-6 bg-ink"
            />
          </button>
        </div>

        {/* Reading progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-ink/50"
        />
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-paper px-6 pt-24 pb-10 md:hidden"
          >
            <motion.nav variants={menuList} initial="hidden" animate="visible" className="flex flex-col">
              {sections.map((section, i) => (
                <motion.a
                  key={section.id}
                  variants={menuItem}
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl"
                >
                  <span className="text-xs tracking-[0.2em] text-muted">0{i + 1}</span>
                  {section.label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              variants={menuList}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 text-sm text-muted"
            >
              <motion.a variants={menuItem} href={`mailto:${profile.email}`}>
                {profile.email}
              </motion.a>
              <motion.div variants={menuItem} className="flex gap-5">
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const SmoothScrollContext = createContext({ scrollTo: () => {} })

/**
 * Wraps the app in Lenis inertial scrolling and intercepts every in-page
 * hash link so navigation glides instead of jumping. Falls back to native
 * scrolling when the visitor prefers reduced motion.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current

    if (target === 'top') {
      if (lenis) lenis.scrollTo(0, { duration: 1.5, ...options })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!el) return

    // Both paths honour `scroll-margin-top` on the section, which is what
    // clears the fixed header — no extra offset needed here.
    if (lenis) lenis.scrollTo(el, { duration: 1.5, ...options })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // One listener handles every `href="#..."` on the page.
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return

      const anchor = event.target.closest?.('a[href^="#"]')
      const hash = anchor?.getAttribute('href')
      if (!hash || hash === '#') return

      event.preventDefault()
      scrollTo(hash === '#top' ? 'top' : hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [scrollTo])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)

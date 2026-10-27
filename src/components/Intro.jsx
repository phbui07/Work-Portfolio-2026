import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EASE_MASK, EASE_OUT } from '../lib/motion.js'
import { profile } from '../data/content.js'

/**
 * Loading curtain. Holds for a beat on the name, then lifts away and hands
 * control to the hero. Skipped entirely for reduced-motion visitors.
 *
 * To remove it: drop `<Intro />` from App.jsx and start `ready` at true.
 */
export default function Intro({ onDone }) {
  const reduced = useReducedMotion()
  const [lifting, setLifting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduced) {
      setGone(true)
      onDone()
      return
    }

    const timer = setTimeout(() => {
      setLifting(true)
      onDone() // hero starts animating as the curtain slides off it
    }, 900)

    return () => clearTimeout(timer)
  }, [reduced, onDone])

  // Hold the page still until the curtain is out of the way.
  useEffect(() => {
    if (gone) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [gone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ink text-paper"
          initial={{ y: 0 }}
          animate={{ y: lifting ? '-100%' : 0 }}
          transition={{ duration: 1.1, ease: EASE_MASK }}
          onAnimationComplete={() => lifting && setGone(true)}
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="font-display text-3xl tracking-tight md:text-4xl"
          >
            {profile.name}
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="mt-6 h-px w-24 origin-left bg-paper/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

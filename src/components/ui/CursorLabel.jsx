import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

/** True only for real pointers — keeps cursor effects off touch devices. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    setFine(query.matches)
    const onChange = (event) => setFine(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return fine
}

/**
 * A small pill that trails the cursor while hovering a project card — the
 * "View site ↗" affordance these editorial templates use instead of a button.
 */
export default function CursorLabel({ active, label, x, y }) {
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 })

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed top-0 left-0 z-40 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs tracking-wide text-paper">
            {label}
            <span aria-hidden>↗</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Motion values wired to the pointer, for use with `CursorLabel`. */
export function useCursorPosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const onMouseMove = (event) => {
    x.set(event.clientX)
    y.set(event.clientY)
  }

  return { x, y, onMouseMove }
}

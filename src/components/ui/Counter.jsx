import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { EASE_OUT } from '../../lib/motion.js'

/** Counts up from zero to `value` the first time it scrolls into view. */
export default function Counter({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      count.set(value)
      return
    }

    const controls = animate(count, value, { duration, ease: EASE_OUT })
    return () => controls.stop()
  }, [inView, reduced, value, duration, count])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

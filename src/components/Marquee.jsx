import { motion, useReducedMotion } from 'motion/react'
import { marquee } from '../data/content.js'

/**
 * Seamless ticker. The track holds two identical copies and slides exactly
 * one copy's width, so the loop never visibly restarts.
 */
export default function Marquee() {
  const reduced = useReducedMotion()
  const items = [...marquee, ...marquee]

  return (
    <div className="overflow-hidden border-y border-line py-6 md:py-8">
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i >= marquee.length}>
            <span className="font-display text-2xl whitespace-nowrap text-muted italic md:text-3xl">
              {item}
            </span>
            <span className="mx-8 h-1 w-1 shrink-0 rounded-full bg-ink/25 md:mx-12" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

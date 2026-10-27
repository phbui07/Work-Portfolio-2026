import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE_MASK } from '../../lib/motion.js'
import { profile } from '../../data/content.js'

/**
 * Hero photo: wipes up into view on load, drifts slightly as you scroll past,
 * and falls back to an initials panel so the layout never looks broken before
 * the image file is dropped into /public.
 */
export default function Portrait({ className = '', play = true }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-3%', '3%'])

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-sm bg-paper-deep ${className}`}>
      <motion.div
        className="relative h-full w-full"
        initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={play ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: 1.3, ease: EASE_MASK }}
      >
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-line">
            <span className="font-display text-6xl text-muted/60">{initials}</span>
            <span className="px-6 text-center text-[0.65rem] uppercase tracking-[0.18em] text-muted/70">
              Add your photo to /public
            </span>
          </div>
        ) : (
          /* Geometry: the image is 108% tall and offset -4%, so the ±3% parallax
             drift can never expose an edge of the frame. */
          <motion.img
            src={profile.portrait}
            alt={profile.name}
            onError={() => setFailed(true)}
            style={{ y }}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-x-0 -top-[4%] h-[108%] w-full object-cover object-center"
          />
        )}
      </motion.div>
    </div>
  )
}

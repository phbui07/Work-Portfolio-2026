import { useMemo } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT, viewport } from '../../lib/motion.js'

/**
 * Fade + lift on scroll. `delay` (seconds) staggers siblings; pass a boolean
 * `play` to drive the animation manually instead of on scroll.
 */
export default function FadeIn({
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.9,
  className = '',
  play,
  children,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT, delay } },
    }),
    [delay, duration, y],
  )

  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'visible', viewport }
      : { initial: 'hidden', animate: play ? 'visible' : 'hidden' }

  return (
    <Tag className={className} variants={variants} {...trigger} {...rest}>
      {children}
    </Tag>
  )
}

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { maskedWord, stagger, viewport } from '../../lib/motion.js'

/**
 * The signature editorial reveal: each word sits in its own clipping box and
 * slides up from below, staggered left to right.
 *
 * `lines` takes strings or `{ text, className }` objects, one per visual line.
 * Leave `play` undefined to trigger on scroll; pass a boolean to drive it
 * manually (the hero waits for the intro curtain this way).
 */
export default function TextReveal({
  as = 'div',
  lines,
  text,
  className = '',
  delay = 0,
  step = 0.035,
  play,
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  const items = (lines ?? [text]).map((line) => (typeof line === 'string' ? { text: line } : line))

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className}>
        {items.map((line, i) => (
          <span key={i} className={`block ${line.className ?? ''}`}>
            {line.text}
          </span>
        ))}
      </Plain>
    )
  }

  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'visible', viewport }
      : { initial: 'hidden', animate: play ? 'visible' : 'hidden' }

  return (
    <Tag className={className} variants={stagger(step, delay)} {...trigger}>
      {items.map((line, i) => (
        <span key={i} className={`block ${line.className ?? ''}`}>
          {line.text.split(' ').map((word, j, words) => (
            <Fragment key={j}>
              {/* padding + negative margin keeps descenders from being clipped */}
              <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span variants={maskedWord} className="inline-block">
                  {word}
                </motion.span>
              </span>
              {j < words.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}

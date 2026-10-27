// Shared easing curves and variants so every animation on the site moves
// with the same personality: slow-out, long tail, no bounce.

export const EASE_OUT = [0.22, 1, 0.36, 1]
export const EASE_MASK = [0.33, 1, 0.68, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

/** Parent of masked words / staggered children. */
export const stagger = (staggerChildren = 0.035, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** A single masked word sliding up out of its clipping box. */
export const maskedWord = {
  hidden: { y: '125%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: EASE_MASK },
  },
}

/** Generic fade + lift, used for body copy and blocks. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
}

/** Viewport config shared by every scroll-triggered element. */
export const viewport = { once: true, margin: '-12% 0px -12% 0px' }

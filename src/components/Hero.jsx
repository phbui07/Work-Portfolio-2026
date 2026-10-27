import { motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import { useIntroDone } from '../lib/intro.jsx'
import { profile } from '../data/content.js'
import FadeIn from './ui/FadeIn.jsx'
import Portrait from './ui/Portrait.jsx'
import TextReveal from './ui/TextReveal.jsx'

export default function Hero() {
  const ready = useIntroDone()

  return (
    <section id="top" className="px-6 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn play={ready} delay={0.1} y={12} className="flex items-center gap-3">
          <motion.span
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-ink/70"
          />
          <p className="eyebrow">Available for internships & freelance</p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <TextReveal
              as="h1"
              play={ready}
              delay={0.2}
              lines={[
                { text: profile.name },
                { text: 'builds for the web.', className: 'text-muted italic' },
              ]}
              className="font-display text-[3.25rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-8xl"
            />

            <FadeIn play={ready} delay={0.55} className="mt-8 md:mt-10">
              <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {profile.tagline}
              </p>
            </FadeIn>

            <FadeIn
              play={ready}
              delay={0.7}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper"
              >
                Selected works
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
              </motion.a>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline text-sm text-muted transition-colors hover:text-ink"
              >
                {profile.email}
              </a>
            </FadeIn>
          </div>

          <FadeIn play={ready} delay={0.35} className="md:col-span-5">
            <Portrait className="aspect-4/5 w-full" play={ready} />
            <p className="mt-4 text-sm leading-relaxed text-muted">{profile.title}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

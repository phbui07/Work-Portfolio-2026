import { motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import { profile } from '../data/content.js'
import FadeIn from './ui/FadeIn.jsx'
import TextReveal from './ui/TextReveal.jsx'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: '/in/phucbui7482', href: profile.linkedin },
  { label: 'GitHub', value: '@phbui07', href: profile.github },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="border-t border-line pt-6" y={12} duration={0.6}>
          <p className="eyebrow">Contact</p>
        </FadeIn>

        <TextReveal
          as="h2"
          delay={0.08}
          lines={[
            { text: 'Got something to build?' },
            { text: 'Let’s talk about it.', className: 'text-muted italic' },
          ]}
          className="mt-10 max-w-4xl font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl md:mt-14 md:text-7xl"
        />

        <FadeIn delay={0.16} className="mt-10">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper"
          >
            {profile.email}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </motion.a>
        </FadeIn>

        <div className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {links.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-4 border-b border-line py-6 sm:block sm:border-b-0 sm:py-8"
              >
                <span className="eyebrow">{link.label}</span>
                <span className="flex items-center gap-2 sm:mt-3">
                  <span className="link-underline">{link.value}</span>
                  <span className="text-sm text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </a>
            </FadeIn>
          ))}
        </div>

        <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="hidden sm:block">{profile.title}</p>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-ink">
            Back to top
            <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
          </a>
        </footer>
      </div>
    </section>
  )
}

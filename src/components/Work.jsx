import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { archive, projects } from '../data/content.js'
import CursorLabel, { useCursorPosition, useFinePointer } from './ui/CursorLabel.jsx'
import FadeIn from './ui/FadeIn.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import TextReveal from './ui/TextReveal.jsx'

const pad = (n) => String(n).padStart(2, '0')

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
    )
  }

  // Typographic stand-in until a screenshot is added to the project data.
  return (
    <div className="flex h-full w-full items-center justify-center bg-paper-deep p-8 transition-colors duration-700 group-hover:bg-line/60">
      <span className="text-center font-display text-3xl leading-tight text-muted/70 sm:text-4xl">
        {project.title}
      </span>
    </div>
  )
}

function FeaturedCard({ project, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const [hovered, setHovered] = useState(false)
  const { x: cursorX, y: cursorY, onMouseMove } = useCursorPosition()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-3%', '3%'])

  const Wrapper = project.href ? 'a' : 'div'
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <FadeIn delay={index * 0.12}>
      <Wrapper
        {...linkProps}
        className="group block"
        onMouseEnter={() => project.href && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
      >
        <div
          ref={ref}
          className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-line"
        >
          {/* 110% tall at -5% so the ±3% drift never exposes an edge of the card */}
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[5%] h-[110%]">
            <ProjectVisual project={project} />
          </motion.div>

          {/* bottom-left keeps the index clear of a site's own logo in screenshots */}
          <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-muted backdrop-blur-sm">
            {pad(index + 1)}
          </span>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <TextReveal
            as="h3"
            text={project.title}
            className="font-display text-2xl leading-snug tracking-[-0.01em] md:text-3xl"
          />
          {project.href && (
            <span className="mt-1 shrink-0 text-sm text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          )}
        </div>

        <FadeIn delay={0.05} y={16}>
          <p className="mt-3 max-w-lg leading-relaxed text-muted">{project.summary}</p>

          <p className="mt-5 flex items-center gap-2 text-sm">
            <span className="h-px w-6 bg-ink/40" />
            {project.impact}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-[0.7rem] tracking-[0.14em] text-muted uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Wrapper>

      {fine && <CursorLabel active={hovered} label="View site" x={cursorX} y={cursorY} />}
    </FadeIn>
  )
}

function ArchiveRow({ item, index }) {
  return (
    <FadeIn as="li" delay={index * 0.06} y={18}>
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative block overflow-hidden border-b border-line"
      >
        <span className="absolute inset-0 origin-left scale-x-0 bg-ink/[0.04] transition-transform duration-600 ease-out group-hover:scale-x-100" />

        {/* pr-3 leaves room for the hover slide so the arrow never clips */}
        <div className="relative flex flex-col gap-2 py-6 pr-3 transition-transform duration-600 ease-out group-hover:translate-x-3 md:flex-row md:items-center md:gap-8 md:py-7">
          <span className="eyebrow shrink-0 md:w-10">{pad(projects.length + index + 1)}</span>

          <h3 className="flex-1 font-display text-2xl leading-snug md:text-3xl">{item.name}</h3>

          <p className="text-sm text-muted md:w-64">{item.note}</p>

          <p className="text-[0.7rem] tracking-[0.14em] text-muted uppercase md:w-44">
            {item.stack}
          </p>

          <span className="hidden text-sm text-muted md:block md:w-12">{item.year}</span>

          <span className="hidden text-sm text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block">
            ↗
          </span>
        </div>
      </a>
    </FadeIn>
  )
}

export default function Work() {
  const total = projects.length + archive.length

  return (
    <section id="work" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Works"
          index={`01 — ${pad(total)}`}
          lines={['Products built to', { text: 'earn their keep.', className: 'text-muted italic' }]}
        />

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-2 md:gap-12">
          {projects.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <FadeIn className="mt-24 flex items-baseline justify-between gap-6 border-t border-line pt-6 md:mt-32">
          <p className="eyebrow">Also built</p>
          <p className="eyebrow">{`${pad(projects.length + 1)} — ${pad(total)}`}</p>
        </FadeIn>

        <ul className="mt-8">
          {archive.map((item, i) => (
            <ArchiveRow key={item.name} item={item} index={i} />
          ))}
        </ul>

        <FadeIn delay={0.1} className="mt-10">
          <a
            href="https://github.com/phbui07"
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-sm text-muted transition-colors hover:text-ink"
          >
            Everything else lives on GitHub ↗
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

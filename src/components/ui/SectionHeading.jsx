import FadeIn from './FadeIn.jsx'
import TextReveal from './TextReveal.jsx'

export default function SectionHeading({ eyebrow, title, lines, index }) {
  return (
    <div className="border-t border-line pt-6">
      <FadeIn className="flex items-baseline justify-between gap-6" y={12} duration={0.6}>
        <p className="eyebrow">{eyebrow}</p>
        {index && <p className="eyebrow">{index}</p>}
      </FadeIn>

      <TextReveal
        as="h2"
        text={title}
        lines={lines}
        delay={0.08}
        className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.015em] sm:text-5xl md:mt-10 md:text-6xl"
      />
    </div>
  )
}

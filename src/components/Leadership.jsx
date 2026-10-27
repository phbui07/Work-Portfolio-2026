import { leadership } from '../data/content.js'
import FadeIn from './ui/FadeIn.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import TextReveal from './ui/TextReveal.jsx'

export default function Leadership() {
  return (
    <section id="leadership" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leadership"
          index="03"
          lines={['Running a team,', { text: 'not just a repo.', className: 'text-muted italic' }]}
        />

        <div className="mt-14 md:mt-20">
          {leadership.map((role, i) => (
            <FadeIn
              key={role.org}
              delay={i * 0.1}
              className="grid grid-cols-1 gap-8 border-t border-line py-10 last:border-b md:grid-cols-12 md:gap-12 md:py-14"
            >
              <div className="md:col-span-4">
                <p className="eyebrow">{role.role}</p>
                <TextReveal
                  as="h3"
                  text={role.org}
                  className="mt-4 font-display text-2xl leading-snug tracking-[-0.01em] md:text-3xl"
                />
              </div>

              <div className="md:col-span-8">
                <p className="max-w-2xl text-lg leading-relaxed text-muted">{role.summary}</p>

                <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {role.metrics.map((metric, j) => (
                    <FadeIn key={metric.label} delay={0.15 + j * 0.1} y={16}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd className="font-display text-4xl leading-none tracking-[-0.02em]">
                        {metric.value}
                      </dd>
                      <p className="mt-3 text-xs leading-snug tracking-[0.14em] text-muted uppercase">
                        {metric.label}
                      </p>
                    </FadeIn>
                  ))}
                </dl>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

import { about, award, certifications, stats } from '../data/content.js'
import Counter from './ui/Counter.jsx'
import FadeIn from './ui/FadeIn.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

export default function About() {
  return (
    <section id="about" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          index="02"
          lines={['Code on one side,', { text: 'business on the other.', className: 'text-muted italic' }]}
        />

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="space-y-6">
              {about.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            {/* Stat counters */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-10">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.12}>
                  <p className="font-display text-5xl leading-none tracking-[-0.02em] md:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-xs leading-snug tracking-[0.14em] text-muted uppercase">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:pl-6">
            <FadeIn y={12} duration={0.6}>
              <p className="eyebrow">Certifications</p>
            </FadeIn>

            <ul className="mt-6">
              {certifications.map((cert, i) => {
                const Row = cert.href ? 'a' : 'div'
                const linkProps = cert.href
                  ? { href: cert.href, target: '_blank', rel: 'noreferrer noopener' }
                  : {}

                return (
                  <FadeIn as="li" key={cert.name} delay={i * 0.07} y={18}>
                    <Row
                      {...linkProps}
                      className="group relative flex items-start justify-between gap-6 overflow-hidden border-b border-line py-5 first:border-t"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-ink/[0.03] transition-transform duration-600 ease-out group-hover:scale-x-100" />

                      <span className="relative transition-transform duration-500 ease-out group-hover:translate-x-2">
                        <span className="block leading-snug">{cert.name}</span>
                        {cert.issuer && (
                          <span className="mt-1 block text-sm text-muted">{cert.issuer}</span>
                        )}
                      </span>

                      {cert.href && (
                        <span className="relative mt-0.5 shrink-0 text-sm text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      )}
                    </Row>
                  </FadeIn>
                )
              })}
            </ul>

            <FadeIn delay={0.12} className="mt-12">
              <p className="eyebrow">Award</p>
              <div className="mt-6 rounded-sm border border-line bg-paper-deep/60 p-6">
                <p className="font-display text-2xl leading-snug md:text-3xl">{award.name}</p>
                <p className="mt-2 leading-relaxed text-muted">
                  {award.detail} · {award.year}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

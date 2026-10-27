import { useCallback, useState } from 'react'
import { IntroProvider } from './lib/intro.jsx'
import { SmoothScrollProvider } from './lib/smooth-scroll.jsx'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Leadership from './components/Leadership.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  const onIntroDone = useCallback(() => setReady(true), [])

  return (
    <SmoothScrollProvider>
      <Intro onDone={onIntroDone} />

      <IntroProvider value={ready}>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Work />
          <About />
          <Leadership />
          <Contact />
        </main>
      </IntroProvider>
    </SmoothScrollProvider>
  )
}

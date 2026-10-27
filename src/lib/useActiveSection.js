import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently under the top of the viewport so the nav
 * can highlight it. Returns the active section id, or 'top' in the hero.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => {
      // The line we consider "current" sits a third of the way down the screen.
      const line = window.scrollY + window.innerHeight * 0.33
      let current = 'top'

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) current = id
      }

      // Snap to the last section once the page bottoms out.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        current = ids[ids.length - 1]
      }

      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

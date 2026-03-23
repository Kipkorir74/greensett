import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    // Observe el and all children with .reveal class
    const targets = el.querySelectorAll ? [el, ...el.querySelectorAll('.reveal')] : [el]
    targets.forEach(t => observer.observe(t))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

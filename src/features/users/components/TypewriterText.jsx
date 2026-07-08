import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function TypewriterText({ text, className, speed = 35, onComplete }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [visibleText, setVisibleText] = useState('')
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    setVisibleText('')
    hasCompletedRef.current = false

    if (!isInView) {
      return undefined
    }

    let currentIndex = 0
    const intervalId = window.setInterval(() => {
      currentIndex += 1
      setVisibleText(text.slice(0, currentIndex))

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId)
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true
          onComplete?.()
        }
      }
    }, speed)

    return () => window.clearInterval(intervalId)
  }, [isInView, onComplete, speed, text])

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
      {visibleText.length < text.length && (
        <span aria-hidden="true" className="animate-pulse">
          |
        </span>
      )}
    </p>
  )
}

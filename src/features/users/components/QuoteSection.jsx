import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionImg, MotionSpan } from '@/features/users/motion'
import { TypewriterText } from './TypewriterText'

export function QuoteSection({ t }) {
  const [isQuoteDone, setIsQuoteDone] = useState(false)
  const hasCompleted = useRef(false)

  useEffect(() => {
    hasCompleted.current = false
    setIsQuoteDone(false)
  }, [t.quote])

  const handleComplete = useCallback(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true
      setIsQuoteDone(true)
    }
  }, [])

  return (
    <section className="overflow-hidden">
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-4 text-center">
        <TypewriterText
          key={t.quote}
          className="text-xl italic text-accent"
          text={t.quote}
          speed={50}
          onComplete={handleComplete}
        />
        <MotionSpan
          className="uppercase font-semibold text-primary"
          initial={{ opacity: 0, y: 12 }}
          animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          QS. Ar-rum : 21
        </MotionSpan>
        <MotionImg
          src="/assets/images/melati5.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="decorative-media mt-6 w-[200px]"
          initial={{ opacity: 0, y: 80 }}
          animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </section>
  )
}

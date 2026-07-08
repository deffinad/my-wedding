import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import {
  MotionDiv,
  MotionP,
  MotionPath,
  MotionSpan,
} from '@/features/users/motion'
import { calendarDays } from '@/features/users/constants'

export function SaveTheDateSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const [isLoveDone, setIsLoveDone] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView) return
    hasAnimated.current = false
    setIsLoveDone(false)
  }, [isInView])

  const handleAnimationComplete = useCallback(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      setIsLoveDone(true)
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      className="flex items-center justify-center text-center px-4 py-14 flex-col gap-4"
    >
      <MotionSpan
        className="text-3xl font-semibold capitalize text-primary"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {t.saveDateTitle}
      </MotionSpan>
      <MotionP
        className="max-w-[34rem] leading-6 text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }}
      >
        {t.saveDateIntro}{' '}
        <span className="font-semibold">{t.saveDateTime}</span>
        {t.saveDateOutro}
      </MotionP>

      <MotionDiv
        className="flex items-start justify-center mt-8 w-full"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
      >
        {calendarDays.map((item) => (
          <div
            key={item.day}
            className="flex w-12 shrink-0 flex-col items-center gap-4"
          >
            <span className="text-lg font-semibold text-primary">
              {t.calendarDays[item.day]}
            </span>
            {item.active ? (
              <div className="relative flex min-h-32 w-12 justify-center">
                <span className="relative z-10 text-lg text-primary">
                  {item.date}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 58 100"
                  width="58"
                  height="100"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 overflow-visible text-accent"
                  aria-hidden="true"
                >
                  {/* Path hati yang benar - simetris & smooth */}
                  <MotionPath
                    d="M29 48 C20 40 8 30 8 18 C8 10 14 5 21 5 C25 5 27 7 29 10 C31 7 33 5 37 5 C44 5 50 10 50 18 C50 30 38 40 29 48 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      delay: 0.85,
                      duration: 1.25,
                      ease: 'easeInOut',
                    }}
                    onAnimationComplete={handleAnimationComplete}
                  />
                  {/* Stroke fill dalam hati (opsional, untuk efek fill) */}
                  <MotionPath
                    d="M29 48 C20 40 8 30 8 18 C8 10 14 5 21 5 C25 5 27 7 29 10 C31 7 33 5 37 5 C44 5 50 10 50 18 C50 30 38 40 29 48 Z"
                    fill="currentColor"
                    fillOpacity={0}
                    stroke="none"
                    initial={{ fillOpacity: 0 }}
                    animate={
                      isLoveDone ? { fillOpacity: 0.15 } : { fillOpacity: 0 }
                    }
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  {/* Stem / tangkai */}
                  <MotionPath
                    d="M29 48 L29 72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      delay: 1.55,
                      duration: 0.65,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
                <MotionSpan
                  className="absolute left-1/2 top-[70px] -translate-x-1/2 leading-5 text-accent font-semibold text-lg"
                  initial={{ opacity: 0, y: 8 }}
                  animate={
                    isLoveDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  {t.dontForget}
                </MotionSpan>
              </div>
            ) : (
              <span className="text-xl">{item.date}</span>
            )}
          </div>
        ))}
      </MotionDiv>
    </section>
  )
}

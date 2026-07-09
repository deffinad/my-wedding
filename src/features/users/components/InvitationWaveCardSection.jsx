import { useRef } from 'react'
import { useInView, useScroll, useTransform } from 'framer-motion'
import { MotionDiv, MotionPath, MotionSpan } from '@/features/users/motion'

export function InvitationWaveCardSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'center center'],
  })
  const straightCardPath =
    'M20 24 C44 24 91 24 115 24 C143 24 170 24 198 24 C222 24 276 24 300 24 C300 50 300 85 300 118 C300 148 300 170 300 200 C300 233 300 260 300 292 C300 322 300 344 300 374 C300 407 300 434 300 466 C300 489 300 522 300 548 C275 548 249 548 224 548 C195 548 166 548 137 548 C112 548 45 548 20 548 C20 522 20 489 20 466 C20 434 20 407 20 374 C20 344 20 322 20 292 C20 260 20 233 20 200 C20 170 20 148 20 118 C20 85 20 50 20 24 Z'
  const waveCardPath =
    'M44 36 C68 18 91 37 115 28 C143 18 170 18 198 28 C222 37 245 18 276 36 C304 53 312 85 300 118 C289 148 289 170 303 200 C318 233 318 260 303 292 C289 322 289 344 303 374 C318 407 318 434 300 466 C287 489 288 511 300 540 C275 557 249 534 224 545 C195 558 166 558 137 545 C112 534 86 557 20 540 C32 511 33 489 20 466 C2 434 2 407 17 374 C31 344 31 322 17 292 C2 260 2 233 17 200 C31 170 31 148 20 118 C8 85 16 53 44 36 Z'
  const cardPath = useTransform(
    scrollYProgress,
    [0, 1],
    [straightCardPath, waveCardPath]
  )

  return (
    <section
      ref={ref}
      className="flex items-center justify-center overflow-hidden bg-secondary px-4 py-14"
    >
      <MotionDiv
        className="relative aspect-[320/560] w-full"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 48, scale: 0.96 }
        }
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 320 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <MotionPath d={cardPath} fill="#fff4e6" />
          <MotionPath
            d={cardPath}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2"
          />
        </svg>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-primary">
          <MotionDiv
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.25, duration: 0.75, ease: 'easeOut' }}
          >
            <span className="font-alex-brush text-5xl leading-none text-secondary">
              {t.brideName}
            </span>
            <span className="max-w-[15rem] text-sm leading-6 text-primary/75">
              {t.brideDescription}
            </span>
          </MotionDiv>

          <MotionSpan
            className="my-8 font-alex-brush text-5xl leading-none text-accent"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }
            }
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
          >
            &
          </MotionSpan>

          <MotionDiv
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.6, duration: 0.75, ease: 'easeOut' }}
          >
            <span className="font-alex-brush text-5xl leading-none text-secondary">
              {t.groomName}
            </span>
            <span className="max-w-[15rem] text-sm leading-6 text-primary/75">
              {t.groomDescription}
            </span>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  )
}

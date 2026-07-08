import { useRef } from 'react'
import { useInView, useScroll, useTransform } from 'framer-motion'
import {
  MotionDiv,
  MotionP,
  MotionPath,
  MotionSpan,
} from '@/features/users/motion'

export function OurStorySection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  })
  const topDividerPath = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [
      'M0 40 L0 22 C25 -6 75 -6 100 22 L100 40 Z', // melengkung ke atas
      'M0 40 L0 40 C25 40 75 40 100 40 L100 40 Z', // flat
      'M0 40 L0 40 C25 40 75 40 100 40 L100 40 Z', // tahan flat
    ]
  )

  const bottomDividerPath = useTransform(
    scrollYProgress,
    [0, 0.62, 1],
    [
      'M0 0 L0 0 C25 0 75 0 100 0 L100 0 Z', // flat
      'M0 0 L0 0 C25 0 75 0 100 0 L100 0 Z', // tahan flat
      'M0 0 L0 18 C25 44 75 44 100 18 L100 0 Z', // melengkung ke bawah
    ]
  )

  return (
    <section ref={ref} className="relative py-10">
      <svg
        className="absolute -top-px left-0 z-10 block h-[calc(2.5rem+2px)] w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <MotionPath d={topDividerPath} className="fill-secondary" />
      </svg>

      <div className="relative bg-secondary px-4 py-16">
        <MotionDiv
          className="flex min-h-[30vh] flex-col items-center justify-center gap-6 text-center"
          initial={{ opacity: 0, y: 52 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 52 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <MotionP
            className="max-w-[42rem] text-lg text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.3, duration: 0.75, ease: 'easeOut' }}
          >
            {t.story}
          </MotionP>

          <MotionSpan
            className="text-3xl capitalize text-white"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
          >
            <span className="font-alex-brush">- Sarah & Deffin -</span>
          </MotionSpan>
        </MotionDiv>
      </div>

      <svg
        className="absolute -bottom-px left-0 z-10 block h-[calc(2.5rem+2px)] w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <MotionPath d={bottomDividerPath} className="fill-secondary" />
      </svg>
    </section>
  )
}

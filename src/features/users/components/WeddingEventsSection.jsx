import { useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { MotionPath } from '@/features/users/motion'
import { LocationSection } from './LocationSection'

function WeddingEventsItem({
  time,
  title,
  description,
  reminder,
  align = 'left',
}) {
  return (
    <>
      {align === 'right' && <div className="col-span-4"></div>}

      <div
        className={`relative z-10 col-span-8 flex flex-col gap-1 ${align === 'right' ? 'text-right' : ''}`}
      >
        <span className="text-lg font-light text-primary">{time}</span>
        <span className="text-xl font-semibold text-primary">{title}</span>
        <p className="text-primary">{description}</p>
        {reminder && <span className="text-xs text-primary">{reminder}</span>}
      </div>

      {align === 'left' && <div className="col-span-4"></div>}
    </>
  )
}

export function WeddingEventsSection({ t }) {
  const ref = useRef(null)
  const pathRef = useRef(null)
  const [markerPoint, setMarkerPoint] = useState({ x: 18, y: 8 })
  const timelinePath =
    'M 18 8 C 86 10 86 28 50 35 C 14 42 14 58 50 65 C 86 72 86 88 18 99'
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 65%'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!pathRef.current) {
      return
    }

    const pathLength = pathRef.current.getTotalLength()
    const point = pathRef.current.getPointAtLength(pathLength * latest)
    setMarkerPoint({ x: point.x, y: point.y })
  })

  return (
    <div ref={ref} className="relative overflow-hidden">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full text-accent"
        viewBox="0 0 100 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={timelinePath}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="0.7"
          opacity="0.18"
        />
        <MotionPath
          d={timelinePath}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="0.95"
          style={{ pathLength: scrollYProgress }}
        />
        <image
          href="/assets/images/melati3.webp"
          x={markerPoint.x - 6}
          y={markerPoint.y - 6}
          width="12"
          height="12"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>

      <section className="relative z-10 grid grid-cols-12 gap-8 px-4 py-12">
        <WeddingEventsItem
          time="09.00"
          title={t.akadTitle}
          description={t.akadDescription}
          align="left"
          reminder={t.familyOnly}
        />
        <WeddingEventsItem
          time="10.10"
          title={t.receptionTitle}
          description={t.receptionDescription}
          align="right"
        />
        <WeddingEventsItem
          time="11.30"
          title={t.photoTitle}
          description={t.photoDescription}
          align="left"
        />
      </section>

      <LocationSection t={t} />
    </div>
  )
}

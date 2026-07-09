import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MotionDiv } from '@/features/users/motion'
import { Utensils, CameraOff } from 'lucide-react'

const MosqueIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v3M12 6a5 5 0 0 0-5 5v3h10v-3a5 5 0 0 0-5-5Z" />
    <path d="M5 14h14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Z" />
    <path d="M12 21v-4" />
  </svg>
)

const HangerIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 .75-.4 1.45-1.1 1.85L20 12.5a2 2 0 0 1-1.5 3.5H5.5a2 2 0 0 1-1.5-3.5l6.6-6.15c-.7-.4-1.1-1.1-1.1-1.85A2.5 2.5 0 0 1 12 2Z" />
  </svg>
)

const PrayHandsIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M10 18h4" />
    <path d="M12 4v10" />
    <path d="M9 7l3-3 3 3" />
    <path d="M6 14c0-3.5 2.5-6 6-6s6 2.5 6 6v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4Z" />
  </svg>
)

export function AdabSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  const items = [
    { icon: Utensils, text: t.adabItem1 },
    { icon: MosqueIcon, text: t.adabItem2 },
    { icon: PrayHandsIcon, text: t.adabItem3 },
    { icon: HangerIcon, text: t.adabItem4 },
    { icon: CameraOff, text: t.adabItem5 },
  ]

  return (
    <section ref={ref} className="px-4 py-8">
      <MotionDiv
        className="rounded-2xl border border-secondary p-6 flex flex-col gap-6 relative overflow-hidden bg-white/45 backdrop-blur-md"
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        {/* Title */}
        <div className="relative z-10 flex flex-col items-center text-center gap-2">
          <span className="text-3xl font-semibold text-primary uppercase tracking-[0.05em]">
            {t.adabTitle}
          </span>
          <div className="h-[2px] w-12 bg-accent/40 mt-1" />
        </div>

        {/* List */}
        <div className="relative z-10 flex flex-col gap-4">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <MotionDiv
                key={index}
                className="flex items-center gap-4 text-left"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-primary/80 leading-relaxed">
                  {item.text}
                </span>
              </MotionDiv>
            )
          })}
        </div>


      </MotionDiv>
    </section>
  )
}

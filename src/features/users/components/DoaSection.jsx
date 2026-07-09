import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MotionDiv } from '@/features/users/motion'

export function DoaSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section ref={ref} className="px-4 py-8">
      <MotionDiv
        className="rounded-2xl border border-secondary p-6 flex flex-col gap-6 relative overflow-hidden bg-white/45 backdrop-blur-md text-center"
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        {/* Title */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="text-3xl font-semibold text-primary uppercase tracking-[0.05em]">
            {t.doaTitle}
          </span>
          <div className="h-[2px] w-12 bg-accent/40 mt-1" />
        </div>

        {/* Arabic Prayer */}
        <MotionDiv
          className="relative z-10 text-2xl font-serif text-primary leading-loose tracking-wide select-all"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          dir="rtl"
        >
          بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </MotionDiv>

        {/* Translation */}
        <div className="relative z-10 flex flex-col gap-4">
          <p className="text-sm font-medium italic text-primary/85 leading-relaxed rounded-xl">
            {t.doaTranslation}
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent/80">
            {t.doaSource}
          </span>
        </div>
      </MotionDiv>
    </section>
  )
}

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MotionDiv } from '@/features/users/motion'

export function DresscodeSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const colors = ['bg-secondary', 'bg-accent', 'bg-orange-100', 'bg-stone-50']

  return (
    <section ref={ref}>
      <MotionDiv
        className="flex items-center justify-center text-center min-h-[30vh] p-4 flex-col gap-8"
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="text-3xl font-semibold text-primary">
          {t.dresscode}
        </span>
        <div className="flex items-center gap-4">
          {colors.map((color, index) => (
            <MotionDiv
              key={color}
              className={`rounded-full w-20 h-20 border border-secondary/20 ${color}`}
              initial={{ opacity: 0, scale: 0.45, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.45, y: 20 }
              }
              transition={{
                delay: 0.18 * index,
                duration: 0.55,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </MotionDiv>
    </section>
  )
}

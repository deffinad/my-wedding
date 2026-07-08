import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MotionDiv, MotionImg } from '@/features/users/motion'

export function FooterSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })

  return (
    <footer ref={ref} className="px-4 py-8">
      <MotionDiv
        className="p-4 min-h-[200px] flex bg-secondary rounded-2xl relative"
        initial={{ opacity: 0, y: 54 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 54 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-1 flex-1 rounded-2xl items-center justify-center border border-white text-white">
          <span className="font-bold text-4xl capitalize font-alex-brush">
            Sarah & Deffin
          </span>
          <span className="font-light capitalize">{t.footer}</span>
        </div>

        <div className="absolute -bottom-20 w-full left-1/2 -translate-x-1/2 flex items-center justify-center">
          <MotionImg
            src="/assets/images/melati3.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="decorative-media w-[150px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? { opacity: 1, scale: [0, 1.12, 1] }
                : { opacity: 0, scale: 0 }
            }
            transition={{ delay: 0.65, duration: 0.75, ease: 'easeOut' }}
          />
        </div>
      </MotionDiv>
    </footer>
  )
}

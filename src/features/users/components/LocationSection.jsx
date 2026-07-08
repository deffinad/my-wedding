import { useRef } from 'react'
import { useInView, useScroll, useTransform } from 'framer-motion'
import { MotionAnchor, MotionDiv } from '@/features/users/motion'
import { StaticDecorImage } from './StaticDecorImage'

export function LocationSection({ t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center center'],
  })
  const locationButtonX = useTransform(scrollYProgress, [0, 1], [-130, 0])
  const locationButtonOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <section ref={ref} className="relative z-10 flex flex-col gap-4 px-4 py-8">
      <MotionDiv
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 56 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex-1 rounded-2xl bg-gray-200 h-[250px] w-full overflow-hidden">
          <StaticDecorImage
            src={'/assets/images/location2.webp'}
            className={'w-full h-full object-cover rounded-2xl'}
          />
        </div>

        <div className="flex-1 rounded-2xl bg-gray-200 h-[250px] w-full relative overflow-visible">
          <StaticDecorImage
            src={'/assets/images/location1.webp'}
            className={'w-full h-full object-cover rounded-2xl'}
          />
          <MotionAnchor
            href="https://maps.app.goo.gl/djXKyz25nxJE5LEr9"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full w-18 h-18 bg-accent flex items-center justify-center text-center text-white absolute -bottom-8 right-0"
            style={{
              x: locationButtonX,
              opacity: locationButtonOpacity,
            }}
            aria-label={t.mapsAria}
          >
            <span className="text-sm font-semibold capitalize leading-4">
              {t.seeLocation}
            </span>
          </MotionAnchor>
        </div>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ delay: 0.2, duration: 0.75, ease: 'easeOut' }}
      >
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-primary">NUU JII</span>
          <span className="text-xl font-semibold text-primary">
            {t.venueSubtitle}
          </span>
        </div>

        <p className="text-primary">
          Jl. Rancasawo Blk. H No.100, Margasari, Kec. Buahbatu, Kota Bandung,
          Jawa Barat 40286
        </p>
      </MotionDiv>
    </section>
  )
}

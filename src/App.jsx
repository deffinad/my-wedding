import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'

const MotionImg = motion.img
const MotionDiv = motion.div
const MotionSpan = motion.span
const MotionP = motion.p
const MotionPath = motion.path
const HERO_INTRO_DURATION = 1.2
const INVITATION_REVEAL_DELAY = 2.2
const INVITATION_REVEAL_DURATION = 1.2
const HERO_SCALE_DURATION = INVITATION_REVEAL_DELAY + INVITATION_REVEAL_DURATION
const defaultSway = {
  style: { transformOrigin: '50% 100%' },
  rotate: [-2.5, 2.5, -2.5],
  duration: 3,
  delay: 0,
}

const enterAnimations = {
  none: {
    initial: false,
    animate: {},
    transition: {},
  },
  scale: {
    initial: { scale: 1.35 },
    animate: { scale: 1 },
    transition: { duration: 0.9, ease: 'easeOut' },
  },
  bounceUp: {
    initial: { y: 72, opacity: 0 },
    animate: { y: [72, -10, 0], opacity: 1 },
    transition: { duration: 0.85, ease: 'easeOut' },
  },
}

function SwayImage({
  src,
  className,
  rotate,
  duration,
  delay,
  enter,
  enterDelay,
}) {
  const sway = {
    ...defaultSway,
    rotate: rotate ?? defaultSway.rotate,
    duration: duration ?? defaultSway.duration,
    delay: delay ?? defaultSway.delay,
  }
  const enterAnimation = enterAnimations[enter ?? 'none']

  return (
    <div className={`decorative-media ${className}`}>
      <MotionDiv
        className="w-full"
        style={{ transformOrigin: '50% 100%' }}
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={{
          ...enterAnimation.transition,
          delay: enterDelay ?? 0,
        }}
      >
        <MotionImg
          src={src}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="w-full"
          style={sway.style}
          animate={{ rotate: sway.rotate }}
          transition={{
            duration: sway.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: sway.delay,
          }}
        />
      </MotionDiv>
    </div>
  )
}

function StaticDecorImage({ src, className }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`decorative-media ${className}`}
    />
  )
}

function TypewriterText({ text, className, speed = 35, onComplete }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [visibleText, setVisibleText] = useState('')
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    let currentIndex = 0
    const intervalId = window.setInterval(() => {
      currentIndex += 1
      setVisibleText(text.slice(0, currentIndex))

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId)
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true
          onComplete?.()
        }
      }
    }, speed)

    return () => window.clearInterval(intervalId)
  }, [isInView, onComplete, speed, text])

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
      {visibleText.length < text.length && (
        <span aria-hidden="true" className="animate-pulse">
          |
        </span>
      )}
    </p>
  )
}

function OpeningSection({ onOpen, inviteName, maxPerson }) {
  return (
    <section className="relative min-h-svh w-full overflow-hidden touch-pan-y">
      <StaticDecorImage
        src="/assets/images/hero.webp"
        className="absolute inset-0 h-full w-full scale-150 object-cover"
      />

      <div className="absolute bottom-0 left-1/2 z-10 flex h-[85vh] w-[90vw] -translate-x-1/2 flex-col gap-4 items-center justify-center rounded-[100%_100%_0_0/70%_70%_0_0] bg-white/70 p-6 pb-14 text-center">
        <div className="flex flex-col">
          <span className="uppercase text-[#565f44]">dear</span>
          <span className="uppercase text-[#565f44] font-semibold">
            {inviteName}
          </span>
        </div>

        <img
          src="/assets/images/logo.webp"
          alt="Deffin and Sarah"
          className="mb-8 w-28"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-[0.2em] text-[#565f44]">
              You're invited to
            </span>
            <span className="uppercase text-[#565f44]">the wedding of</span>
          </div>
          <span className="capitalize text-[#565f44] text-5xl font-bold font-alex-brush">
            Deffin & Sarah
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-10 rounded-full bg-[#565f44] px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#565f44]/20 transition duration-300 active:scale-95"
        >
          Open Invitation
        </button>

        <span className="absolute bottom-6 left-1/2 w-[min(100%-32px,420px)] -translate-x-1/2 text-xs leading-5 text-gray-500">
          * Please do not share this invitation until the day of the wedding.
          This invitation is valid for {maxPerson} person
        </span>
      </div>

      <StaticDecorImage
        src="/assets/images/pohon.webp"
        className="absolute bottom-48 -left-64 w-11/12 transform -scale-x-100"
      />
      <StaticDecorImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-32 -left-20 w-1/2 rotate-[10deg]"
      />
      <StaticDecorImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-22 -left-16 w-1/2 rotate-[38deg]"
      />
      <StaticDecorImage
        src="/assets/images/melati.webp"
        className="absolute -bottom-8 -left-16 w-1/2 rotate-[30deg]"
      />
      <StaticDecorImage
        src="/assets/images/melati2.webp"
        className="absolute -bottom-30 -left-8 w-1/2 rotate-[45deg]"
      />

      <StaticDecorImage
        src="/assets/images/pohon.webp"
        className="absolute bottom-48 -right-64 w-11/12"
      />
      <StaticDecorImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-32 -right-20 w-1/2 rotate-[350deg] transform -scale-x-100"
      />
      <StaticDecorImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-22 -right-16 w-1/2 rotate-[322deg] transform -scale-x-100"
      />
      <StaticDecorImage
        src="/assets/images/melati.webp"
        className="absolute -bottom-8 -right-16 w-1/2 rotate-[330deg] transform -scale-x-100"
      />
      <StaticDecorImage
        src="/assets/images/melati2.webp"
        className="absolute -bottom-30 -right-8 w-1/2 rotate-[315deg] transform -scale-x-100"
      />
    </section>
  )
}

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
        <span className="text-lg font-light">{time}</span>
        <span className="text-xl font-semibold">{title}</span>
        <p>{description}</p>
        {reminder && <span className="text-xs">{reminder}</span>}
      </div>

      {align === 'left' && <div className="col-span-4"></div>}
    </>
  )
}

function WeddingEventsSection() {
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
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 100 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={timelinePath}
          fill="none"
          stroke="#f49b5f"
          strokeLinecap="round"
          strokeWidth="0.7"
          opacity="0.18"
        />
        <MotionPath
          d={timelinePath}
          fill="none"
          stroke="#f49b5f"
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
          title="Akad Nikah"
          description="The sacred union of two souls under God's blessing"
          align="left"
          reminder={'*Only for family and close friends'}
        />
        <WeddingEventsItem
          time="10.10"
          title="Wedding Reception"
          description="Celebrate our joy and new life together"
          align="right"
        />
        <WeddingEventsItem
          time="11.30"
          title="Photo Session"
          description="Let's freeze these beautiful moments forever"
          align="left"
        />
      </section>

      <LocationSection />
    </div>
  )
}

function LocationSection() {
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
          <MotionDiv
            className="rounded-full w-18 h-18 bg-[#f49b5f] flex items-center justify-center text-center text-white absolute -bottom-8 right-0"
            style={{
              x: locationButtonX,
              opacity: locationButtonOpacity,
            }}
          >
            <span className="text-sm font-semibold capitalize leading-4">
              See the location
            </span>
          </MotionDiv>
        </div>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ delay: 0.2, duration: 0.75, ease: 'easeOut' }}
      >
        <div className="flex flex-col">
          <span className="text-xl font-semibold">NUU JII</span>
          <span className="text-xl font-semibold">
            Resto, Coffee, and Events
          </span>
        </div>

        <p>
          Jl. Rancasawo Blk. H No.100, Margasari, Kec. Buahbatu, Kota Bandung,
          Jawa Barat 40286
        </p>
      </MotionDiv>
    </section>
  )
}

function DresscodeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const colors = ['#565f44', '#f49b5f', '#f7d7bd', '#f8f4ea']

  return (
    <section ref={ref}>
      <MotionDiv
        className="flex items-center justify-center text-center min-h-[30vh] p-4 flex-col gap-8"
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="text-3xl font-semibold">Dresscode</span>
        <div className="flex items-center gap-4">
          {colors.map((color, index) => (
            <MotionDiv
              key={color}
              className="rounded-full w-20 h-20 border border-[#565f44]/20"
              style={{ backgroundColor: color }}
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

function RsvpSection({ maxPerson }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section ref={ref} className="px-4 py-8">
      <MotionDiv
        className="rounded-2xl border border-[#565f44] p-4 flex flex-col gap-5 min-h-[400px] relative overflow-hidden bg-[#fffaf4]"
        initial={{ opacity: 0, y: 64 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 64 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="relative z-10 flex flex-col items-center text-center gap-2">
          <span className="text-3xl font-semibold">RSVP</span>
          <p>Please let us know if you can celebrate with us</p>
        </div>

        <form className="relative z-10 grid gap-4">
          <label className="grid gap-2 text-left text-sm font-semibold text-[#565f44]">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="rounded-xl border border-[#565f44]/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-[#f49b5f]"
            />
          </label>

          <label className="grid gap-2 text-left text-sm font-semibold text-[#565f44]">
            Attendance
            <select className="rounded-xl border border-[#565f44]/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-[#f49b5f]">
              <option>Will attend</option>
              <option>Unable to attend</option>
            </select>
          </label>

          <label className="grid gap-2 text-left text-sm font-semibold text-[#565f44]">
            Wishes
            <textarea
              rows="4"
              placeholder="Write your wishes"
              className="resize-none rounded-xl border border-[#565f44]/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-[#f49b5f]"
            />
          </label>

          <span className="text-sm text-gray-500 font-semibold">
            * Please do not share this invitation until the day of the wedding.
            This invitation is valid for {maxPerson} person
          </span>

          <button
            type="submit"
            className="rounded-full bg-[#565f44] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition active:scale-95"
          >
            Send RSVP
          </button>
        </form>

        <div className="decorative-media absolute -bottom-16 -left-18 w-1/2">
          <MotionImg
            src="/assets/images/melati4.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="w-full"
            initial={{ opacity: 0, y: 28, scale: 0.85 }}
            animate={
              isInView
                ? { opacity: 1, y: [28, -10, 0], scale: [0.85, 1.08, 1] }
                : { opacity: 0, y: 28, scale: 0.85 }
            }
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="decorative-media absolute -top-16 -right-16 w-1/2 rotate-[280deg] transform -scale-x-100">
          <MotionImg
            src="/assets/images/melati4.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="w-full"
            initial={{ opacity: 0, y: -28, scale: 0.85 }}
            animate={
              isInView
                ? { opacity: 1, y: [-28, 10, 0], scale: [0.85, 1.08, 1] }
                : { opacity: 0, y: -28, scale: 0.85 }
            }
            transition={{ delay: 1.05, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </MotionDiv>
    </section>
  )
}

function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })

  return (
    <footer ref={ref} className="px-4 py-8">
      <MotionDiv
        className="p-4 min-h-[200px] flex bg-[#565f44] rounded-2xl relative"
        initial={{ opacity: 0, y: 54 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 54 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-1 flex-1 rounded-2xl items-center justify-center border border-white text-white">
          <span className="font-bold text-4xl capitalize font-alex-brush">
            Deffin & Sarah
          </span>
          <span className="font-light capitalize">from us with love</span>
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

function QuoteSection() {
  const [isQuoteDone, setIsQuoteDone] = useState(false)
  const hasCompleted = useRef(false)

  const handleComplete = useCallback(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true
      setIsQuoteDone(true)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="flex items-center justify-center text-center min-h-[60vh] p-4 flex-col gap-4 relative z-10">
        <TypewriterText
          className="text-xl italic text-[#f49b5f]"
          text='"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."'
          speed={50}
          onComplete={handleComplete}
        />
        <MotionSpan
          className="uppercase font-semibold text-[#565f44]"
          initial={{ opacity: 0, y: 12 }}
          animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          QS. Ar-rum : 21
        </MotionSpan>
      </div>
      <MotionImg
        src="/assets/images/melati5.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="decorative-media absolute bottom-0 left-1/2 w-[200px] -translate-x-1/2"
        initial={{ opacity: 0, y: 120 }}
        animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </section>
  )
}

const calendarDays = [
  { day: 'Mon', date: '13' },
  { day: 'Tue', date: '14' },
  { day: 'Wed', date: '15' },
  { day: 'Thu', date: '16' },
  { day: 'Fri', date: '17' },
  { day: 'Sat', date: '18', active: true },
  { day: 'Sun', date: '19' },
]

function SaveTheDateSection() {
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
      className="flex items-center justify-center text-center p-4 flex-col gap-4"
    >
      <MotionSpan
        className="text-3xl font-semibold capitalize"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        Save the date
      </MotionSpan>
      <MotionP
        className="max-w-[34rem] leading-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }}
      >
        Join us as we begin our forever. Save the date for{' '}
        <span className="font-semibold">
          July 18th, 2026, from 9:00 AM to 12:00 PM
        </span>
        , and celebrate this joyful occasion with our families
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
            <span className="text-lg font-semibold">{item.day}</span>
            {item.active ? (
              <div className="relative flex min-h-32 w-12 justify-center">
                <span className="relative z-10 text-lg">{item.date}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 58 100"
                  width="58"
                  height="100"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 overflow-visible"
                  aria-hidden="true"
                >
                  {/* Path hati yang benar - simetris & smooth */}
                  <MotionPath
                    d="M29 48 C20 40 8 30 8 18 C8 10 14 5 21 5 C25 5 27 7 29 10 C31 7 33 5 37 5 C44 5 50 10 50 18 C50 30 38 40 29 48 Z"
                    fill="none"
                    stroke="#f49b5f"
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
                    fill="#f49b5f"
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
                    stroke="#f49b5f"
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
                  className="absolute left-1/2 top-[70px] -translate-x-1/2 leading-5 text-[#f49b5f] font-semibold text-lg"
                  initial={{ opacity: 0, y: 8 }}
                  animate={
                    isLoveDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  Don't Forget!
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

function OurStorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  })
  const topDividerPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'M0 40 L0 22 C25 -6 75 -6 100 22 L100 40 Z', // melengkung ke atas
      'M0 40 L0 40 C25 40 75 40 100 40 L100 40 Z', // flat
    ]
  )

  const bottomDividerPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'M0 0 L0 0 C25 0 75 0 100 0 L100 0 Z', // flat
      'M0 0 L0 18 C25 44 75 44 100 18 L100 0 Z', // melengkung ke bawah
    ]
  )

  return (
    <section ref={ref} className="relative py-10">
      <svg
        className="absolute left-0 top-0 z-10 h-10 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <MotionPath d={topDividerPath} fill="#565f44" />
      </svg>

      <div className="relative bg-[#565f44] px-4 py-16">
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
            It started with a chance meeting and a smile that was hard to
            forget. Two hearts found each other in the most unexpected moment,
            and from that day on, every season felt like a gift. Today, we
            choose each other — for every tomorrow to come.
          </MotionP>

          <MotionSpan
            className="text-3xl capitalize text-white"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
          >
          <span className='font-alex-brush'>— Deffin & Sarah —</span> 
          </MotionSpan>
        </MotionDiv>
      </div>

      <svg
        className="absolute bottom-0 left-0 z-10 h-10 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <MotionPath d={bottomDividerPath} fill="#565f44" />
      </svg>
    </section>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden touch-pan-y">
      <MotionImg
        src="/assets/images/hero.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="decorative-media absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 3 }}
        animate={{ scale: [3, 1, 1, 1.5] }}
        transition={{
          duration: HERO_SCALE_DURATION,
          times: [
            0,
            HERO_INTRO_DURATION / HERO_SCALE_DURATION,
            INVITATION_REVEAL_DELAY / HERO_SCALE_DURATION,
            1,
          ],
          ease: 'easeOut',
        }}
      />

      <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2">
        <MotionDiv
          className="flex h-[85vh] flex-col items-center rounded-[100%_100%_0_0/70%_70%_0_0] bg-white/50 pt-32"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{
            delay: INVITATION_REVEAL_DELAY,
            duration: INVITATION_REVEAL_DURATION,
            ease: 'easeOut',
          }}
        >
          <MotionImg
            src="/assets/images/logo.webp"
            className="w-28 mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.5,
              duration: 1.2,
              ease: 'easeOut',
            }}
          />
          <MotionSpan
            className="uppercase text-[#565f44]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.6,
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            the wedding of
          </MotionSpan>

          <MotionDiv
            className="flex flex-col items-center justify-center text-center gap-1 text-[#565f44] relative mt-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.7,
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            <span className="capitalize text-5xl font-bold font-alex-brush">deffin</span>
            <span className="capitalize text-5xl font-bold font-alex-brush">&</span>
            <span className="capitalize text-5xl font-bold font-alex-brush">sarah</span>
          </MotionDiv>
        </MotionDiv>
      </div>

      <SwayImage
        src="/assets/images/pohon.webp"
        className="absolute bottom-48 -left-64 w-11/12 transform -scale-x-100"
        duration={4.8}
        enter="scale"
        enterDelay={0.35}
      />
      <SwayImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-32 -left-20 w-1/2 rotate-[10deg]"
        rotate={[1.5, -3, 1.5]}
        duration={3.4}
        delay={0.35}
        enter="bounceUp"
        enterDelay={0.7}
      />
      <SwayImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-22 -left-16 w-1/2 rotate-[38deg]"
        rotate={[-2, 3.5, -2]}
        duration={3.8}
        delay={1.1}
        enter="bounceUp"
        enterDelay={0.9}
      />
      <SwayImage
        src="/assets/images/melati.webp"
        className="absolute -bottom-8 -left-16 w-1/2 rotate-[30deg]"
        rotate={[-3.5, 1.75, -3.5]}
        duration={2.9}
        delay={0.75}
        enter="bounceUp"
        enterDelay={1.1}
      />
      <SwayImage
        src="/assets/images/melati2.webp"
        className="absolute -bottom-30 -left-8 w-1/2 rotate-[45deg]"
        rotate={[2.75, -1.25, 2.75]}
        duration={3.6}
        delay={1.45}
        enter="bounceUp"
        enterDelay={1.25}
      />

      <SwayImage
        src="/assets/images/pohon.webp"
        className="absolute bottom-48 -right-64 w-11/12"
        rotate={[2, -2.25, 2]}
        duration={5.2}
        delay={0.65}
        enter="scale"
        enterDelay={0.45}
      />
      <SwayImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-32 -right-20 w-1/2 rotate-[350deg] transform -scale-x-100"
        rotate={[-1.75, 3.25, -1.75]}
        duration={3.2}
        delay={0.95}
        enter="bounceUp"
        enterDelay={0.8}
      />
      <SwayImage
        src="/assets/images/sedap-malam.webp"
        className="absolute bottom-22 -right-16 w-1/2 rotate-[322deg] transform -scale-x-100"
        rotate={[3, -2, 3]}
        duration={4}
        delay={0.2}
        enter="bounceUp"
        enterDelay={1}
      />
      <SwayImage
        src="/assets/images/melati.webp"
        className="absolute -bottom-8 -right-16 w-1/2 rotate-[330deg] transform -scale-x-100"
        rotate={[2.5, -3.25, 2.5]}
        duration={3.1}
        delay={1.25}
        enter="bounceUp"
        enterDelay={1.2}
      />
      <SwayImage
        src="/assets/images/melati2.webp"
        className="absolute -bottom-30 -right-8 w-1/2 rotate-[315deg] transform -scale-x-100"
        rotate={[-2.75, 1.5, -2.75]}
        duration={3.7}
        delay={0.55}
        enter="bounceUp"
        enterDelay={1.35}
      />
    </section>
  )
}

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const audioRef = useRef(null)
  const inviteName =
    new URLSearchParams(window.location.search).get('to')?.trim() ||
    'Tamu Undangan'

  const maxPerson =
    new URLSearchParams(window.location.search).get('max')?.trim() || '1'

  const handleOpenInvitation = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/audios/sempurna.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.55
    }

    audioRef.current.play().catch(() => { })
    setIsInvitationOpen(true)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }

  if (!isInvitationOpen) {
    return (
      <div className="min-h-svh w-full overflow-x-clip touch-pan-y">
        <OpeningSection
          onOpen={handleOpenInvitation}
          inviteName={inviteName}
          maxPerson={maxPerson}
        />
      </div>
    )
  }

  return (
    <div className="min-h-svh w-full overflow-x-clip touch-pan-y">
      <HeroSection />
      <QuoteSection />
      <SaveTheDateSection />
      <WeddingEventsSection />
      <OurStorySection />
      <DresscodeSection />
      <RsvpSection maxPerson={maxPerson} />
      <FooterSection />
    </div>
  )
}

export default App

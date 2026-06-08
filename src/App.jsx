import './App.css'
import translations from './lang.json'
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
const MotionAnchor = motion.a
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

function LanguageToggle({ language, onChange, label }) {
  return (
    <MotionDiv
      className="fixed right-4 top-4 z-50 rounded-full border border-white/70 bg-white/75 p-1 shadow-lg shadow-secondary/15 backdrop-blur-md"
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      role="group"
      aria-label={label}
    >
      <div className="relative grid grid-cols-2 gap-1">
        {['en', 'id'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`relative z-10 h-9 min-w-11 rounded-full px-3 text-xs font-semibold uppercase transition ${
              language === item ? 'text-white' : 'text-secondary'
            }`}
            aria-pressed={language === item}
          >
            {item}
          </button>
        ))}
        <MotionSpan
          className="absolute bottom-0 top-0 z-0 w-[calc(50%-2px)] rounded-full bg-secondary"
          animate={{ x: language === 'en' ? 0 : 'calc(100% + 4px)' }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      </div>
    </MotionDiv>
  )
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
    setVisibleText('')
    hasCompletedRef.current = false

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

function OpeningSection({ onOpen, inviteName, maxPerson, t }) {
  return (
    <section className="relative min-h-svh w-full overflow-hidden touch-pan-y">
      <StaticDecorImage
        src="/assets/images/hero.webp"
        className="absolute inset-0 h-full w-full scale-150 object-cover"
      />

      <div className="absolute bottom-0 left-1/2 z-10 flex h-[85vh] w-[90vw] -translate-x-1/2 flex-col gap-4 items-center justify-center rounded-[100%_100%_0_0/70%_70%_0_0] bg-white/70 p-6 pb-14 text-center">
        <div className="flex flex-col">
          <span className="uppercase text-secondary">{t.dear}</span>
          <span className="uppercase text-secondary font-semibold">
            {inviteName}
          </span>
        </div>

        <img
          src="/assets/images/logo.webp"
          alt="Sarah and Deffin"
          className="mb-8 w-28"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-[0.2em] text-secondary">
              {t.invitedTo}
            </span>
            <span className="uppercase text-secondary">{t.weddingOf}</span>
          </div>
          <span className="capitalize text-secondary text-5xl font-bold font-alex-brush">
            Sarah & Deffin
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-10 rounded-full bg-secondary px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-secondary/20 transition duration-300 active:scale-95"
        >
          {t.openInvitation}
        </button>

        <span className="absolute bottom-6 left-1/2 w-[min(100%-32px,420px)] -translate-x-1/2 text-xs leading-5 text-gray-500">
          {t.invitationNote} {t.invitationValid} {maxPerson} {t.person}
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
        <span className="text-lg font-light text-primary">{time}</span>
        <span className="text-xl font-semibold text-primary">{title}</span>
        <p className="text-primary">{description}</p>
        {reminder && <span className="text-xs text-primary">{reminder}</span>}
      </div>

      {align === 'left' && <div className="col-span-4"></div>}
    </>
  )
}

function WeddingEventsSection({ t }) {
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

function LocationSection({ t }) {
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

function DresscodeSection({ t }) {
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

function RsvpSection({ maxPerson, t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section ref={ref} className="px-4 py-8">
      <MotionDiv
        className="rounded-2xl border border-secondary p-4 flex flex-col gap-5 min-h-[400px] relative overflow-hidden"
        initial={{ opacity: 0, y: 64 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 64 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="relative z-10 flex flex-col items-center text-center gap-2">
          <span className="text-3xl font-semibold text-primary">RSVP</span>
          <p className="text-primary">{t.rsvpIntro}</p>
        </div>

        <form className="relative z-10 grid gap-4">
          <label className="grid gap-2 text-left text-sm font-semibold text-primary">
            {t.name}
            <input
              type="text"
              placeholder={t.namePlaceholder}
              className="rounded-xl border border-secondary/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-accent"
            />
          </label>

          <label className="grid gap-2 text-left text-sm font-semibold text-primary">
            {t.attendance}
            <select className="rounded-xl border border-secondary/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-accent">
              <option>{t.attend}</option>
              <option>{t.unableAttend}</option>
            </select>
          </label>

          <label className="grid gap-2 text-left text-sm font-semibold text-primary">
            {t.wishes}
            <textarea
              rows="4"
              placeholder={t.wishesPlaceholder}
              className="resize-none rounded-xl border border-secondary/25 font-normal! bg-white/85 px-4 py-3 outline-none transition focus:border-accent"
            />
          </label>

          <span className="text-sm text-gray-500 font-semibold">
            {t.invitationNote} {t.invitationValid} {maxPerson} {t.person}
          </span>

          <button
            type="submit"
            className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition active:scale-95"
          >
            {t.sendRsvp}
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

function FooterSection({ t }) {
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

function QuoteSection({ t }) {
  const [isQuoteDone, setIsQuoteDone] = useState(false)
  const hasCompleted = useRef(false)

  useEffect(() => {
    hasCompleted.current = false
    setIsQuoteDone(false)
  }, [t.quote])

  const handleComplete = useCallback(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true
      setIsQuoteDone(true)
    }
  }, [])

  return (
    <section className="overflow-hidden">
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-4 text-center">
        <TypewriterText
          key={t.quote}
          className="text-xl italic text-accent"
          text={t.quote}
          speed={50}
          onComplete={handleComplete}
        />
        <MotionSpan
          className="uppercase font-semibold text-primary"
          initial={{ opacity: 0, y: 12 }}
          animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          QS. Ar-rum : 21
        </MotionSpan>
        <MotionImg
          src="/assets/images/melati5.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="decorative-media mt-6 w-[200px]"
          initial={{ opacity: 0, y: 80 }}
          animate={isQuoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </section>
  )
}

function InvitationWaveCardSection({ t }) {
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
      className="flex min-h-[74vh] items-center justify-center overflow-hidden bg-secondary px-4 py-14"
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

const calendarDays = [
  { day: 'Mon', date: '13' },
  { day: 'Tue', date: '14' },
  { day: 'Wed', date: '15' },
  { day: 'Thu', date: '16' },
  { day: 'Fri', date: '17' },
  { day: 'Sat', date: '18', active: true },
  { day: 'Sun', date: '19' },
]

function SaveTheDateSection({ t }) {
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

function OurStorySection({ t }) {
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

function HeroSection({ t }) {
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
            className="uppercase text-secondary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.6,
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            {t.weddingOf}
          </MotionSpan>

          <MotionDiv
            className="flex flex-col items-center justify-center text-center gap-1 text-secondary relative mt-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.7,
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            <span className="capitalize text-5xl font-bold font-alex-brush">
              sarah
            </span>
            <span className="capitalize text-5xl font-bold font-alex-brush">
              &
            </span>
            <span className="capitalize text-5xl font-bold font-alex-brush">
              deffin
            </span>
          </MotionDiv>
        </MotionDiv>
      </div>

      <SwayImage
        src="/assets/images/pohon.webp"
        className="absolute bottom-96 -left-64 w-11/12 transform -scale-x-100"
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
        className="absolute bottom-96 -right-64 w-11/12"
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
  const [language, setLanguage] = useState('id')
  const audioRef = useRef(null)
  const t = translations[language]
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

    audioRef.current.play().catch(() => {})
    setIsInvitationOpen(true)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }

  if (!isInvitationOpen) {
    return (
      <div className="min-h-svh w-full overflow-x-clip touch-pan-y">
        <LanguageToggle
          language={language}
          onChange={setLanguage}
          label={t.languageLabel}
        />
        <OpeningSection
          onOpen={handleOpenInvitation}
          inviteName={inviteName}
          maxPerson={maxPerson}
          t={t}
        />
      </div>
    )
  }

  return (
    <div className="min-h-svh w-full overflow-x-clip touch-pan-y">
      <LanguageToggle
        language={language}
        onChange={setLanguage}
        label={t.languageLabel}
      />
      <HeroSection t={t} />
      <QuoteSection t={t} />
      <InvitationWaveCardSection t={t} />
      <SaveTheDateSection t={t} />
      <WeddingEventsSection t={t} />
      <OurStorySection t={t} />
      <DresscodeSection t={t} />
      <RsvpSection maxPerson={maxPerson} t={t} />
      <FooterSection t={t} />
    </div>
  )
}

export default App

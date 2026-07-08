// Konstanta animasi & aset audio untuk undangan.

export const HERO_INTRO_DURATION = 1.2
export const INVITATION_REVEAL_DELAY = 2.2
export const INVITATION_REVEAL_DURATION = 1.2
export const HERO_SCALE_DURATION =
  INVITATION_REVEAL_DELAY + INVITATION_REVEAL_DURATION

export const DEFAULT_AUDIO_SRC = '/assets/audios/sempurna.mp3'
export const PARENTS_AUDIO_SRC = '/assets/audios/master-nasif.mp3'

export const defaultSway = {
  style: { transformOrigin: '50% 100%' },
  rotate: [-2.5, 2.5, -2.5],
  duration: 3,
  delay: 0,
}

export const enterAnimations = {
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

export const calendarDays = [
  { day: 'Mon', date: '13' },
  { day: 'Tue', date: '14' },
  { day: 'Wed', date: '15' },
  { day: 'Thu', date: '16' },
  { day: 'Fri', date: '17' },
  { day: 'Sat', date: '18', active: true },
  { day: 'Sun', date: '19' },
]

import { MotionDiv, MotionImg, MotionSpan } from '@/features/users/motion'
import {
  HERO_INTRO_DURATION,
  HERO_SCALE_DURATION,
  INVITATION_REVEAL_DELAY,
  INVITATION_REVEAL_DURATION,
} from '@/features/users/constants'
import { SwayImage } from './SwayImage'

export function HeroSection({ t }) {
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

      <div className="absolute bottom-0 left-1/2 w-[90%] md:max-w-[420px] -translate-x-1/2">
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

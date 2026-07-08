import { MotionDiv, MotionImg } from '@/features/users/motion'
import { defaultSway, enterAnimations } from '@/features/users/constants'

export function SwayImage({
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

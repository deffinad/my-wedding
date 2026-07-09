import { MotionDiv, MotionSpan } from '@/features/users/motion'

export function LanguageToggle({ language, onChange, label }) {
  return (
    <MotionDiv
      className="absolute right-4 top-4 z-50 rounded-full border border-white/70 bg-white/75 p-1 shadow-lg shadow-secondary/15 backdrop-blur-md"
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

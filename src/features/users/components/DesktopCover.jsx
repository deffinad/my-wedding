import translations from '@/lang.json'
import { useLanguageStore } from '@/features/users/store/languageStore'

export function DesktopCover() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  return (
    <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[calc(100%-480px)] h-screen flex-col items-center justify-center text-white overflow-hidden select-none">
      {/* Elegant overlay to match wedding secondary brand tone */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Cursive / Calligraphy Cover Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <span className="text-sm uppercase tracking-[0.3em] font-semibold text-white/90 drop-shadow-sm">
          {t.weddingOf}
        </span>
        <h1 className="text-7xl font-bold font-alex-brush capitalize text-[#fbf6ef] tracking-wide select-none drop-shadow-md">
          Sarah & Deffin
        </h1>
        <div className="h-[2px] w-24 bg-white/40 my-2" />
        <span className="text-base font-medium tracking-[0.2em] text-white/80 drop-shadow-sm">
          {language === 'en' ? 'JULY 18, 2026' : '18 JULI 2026'}
        </span>
      </div>
    </div>
  )
}

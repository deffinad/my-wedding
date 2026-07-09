import { useRef, useState } from 'react'
import translations from '@/lang.json'
import { useLanguageStore } from '@/features/users/store/languageStore'
import {
  DEFAULT_AUDIO_SRC,
  PARENTS_AUDIO_SRC,
} from '@/features/users/constants'
import { LanguageToggle } from '@/features/users/components/LanguageToggle'
import { OpeningSection } from '@/features/users/components/OpeningSection'
import { HeroSection } from '@/features/users/components/HeroSection'
import { QuoteSection } from '@/features/users/components/QuoteSection'
import { InvitationWaveCardSection } from '@/features/users/components/InvitationWaveCardSection'
import { SaveTheDateSection } from '@/features/users/components/SaveTheDateSection'
import { WeddingEventsSection } from '@/features/users/components/WeddingEventsSection'
import { OurStorySection } from '@/features/users/components/OurStorySection'
import { DresscodeSection } from '@/features/users/components/DresscodeSection'
import { RsvpSection } from '@/features/users/components/RsvpSection'
import { FooterSection } from '@/features/users/components/FooterSection'
import { DesktopCover } from '@/features/users/components/DesktopCover'

export default function UserPage() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const audioRef = useRef(null)
  const t = translations[language]

  const params = new URLSearchParams(window.location.search)
  const inviteName = params.get('to')?.trim() || 'Tamu Undangan'
  const maxPerson = params.get('max')?.trim() || '1'
  const audience = params.get('audience')?.trim()
  const audioSrc =
    audience === 'parents' ? PARENTS_AUDIO_SRC : DEFAULT_AUDIO_SRC

  const handleOpenInvitation = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = 0.55
    }

    audioRef.current.play().catch(() => {})
    setIsInvitationOpen(true)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }

  if (!isInvitationOpen) {
    return (
      <div className="min-h-screen w-full bg-[#fbf6ef] overflow-x-hidden flex lg:flex-row">
        <DesktopCover />
        <div className="w-full md:max-w-[480px] lg:w-[480px] md:mx-auto lg:mr-0 min-h-screen bg-[#fbf6ef] md:shadow-2xl relative flex flex-col overflow-y-hidden">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#fbf6ef] overflow-x-hidden flex lg:flex-row">
      <DesktopCover />
      <div className="w-full md:max-w-[480px] lg:w-[480px] md:mx-auto lg:mr-0 min-h-screen bg-[#fbf6ef] md:shadow-2xl relative flex flex-col overflow-y-hidden">
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
        <RsvpSection maxPerson={maxPerson} inviteName={inviteName} t={t} />
        <FooterSection t={t} />
      </div>
    </div>
  )
}

import { StaticDecorImage } from './StaticDecorImage'

export function OpeningSection({ onOpen, inviteName, maxPerson, t }) {
  return (
    <section className="relative min-h-svh w-full overflow-hidden touch-pan-y">
      <StaticDecorImage
        src="/assets/images/hero.webp"
        className="absolute inset-0 h-full w-full scale-150 object-cover"
      />

      <div className="absolute bottom-0 left-1/2 z-10 flex h-[85vh] w-[90%] md:max-w-[420px] -translate-x-1/2 flex-col gap-4 items-center justify-center rounded-[100%_100%_0_0/70%_70%_0_0] bg-white/70 p-6 pb-14 text-center">
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

import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { CheckCircle2, CircleCheck, CircleX } from 'lucide-react'
import { MotionDiv, MotionImg } from '@/features/users/motion'
import { useRsvpStore } from '@/features/users/store/rsvpStore'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WishesSheet } from './WishesSheet'

// Kelas dasar agar komponen shadcn tetap mengikuti gaya form undangan saat ini.
const fieldClass =
  'h-auto! rounded-xl border-secondary/25 bg-white/85 px-4 py-3 text-base font-normal text-primary shadow-none focus-visible:border-accent focus-visible:ring-accent/20'

const DEFAULT_INVITE_NAME = 'Tamu Undangan'

export function RsvpSection({ maxPerson, inviteName, t }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  const status = useRsvpStore((state) => state.status)
  const submit = useRsvpStore((state) => state.submit)
  const reset = useRsvpStore((state) => state.reset)

  const defaultName =
    inviteName && inviteName !== DEFAULT_INVITE_NAME ? inviteName : ''

  const [name, setName] = useState(defaultName)
  const [attendance, setAttendance] = useState('yes')
  const [wishes, setWishes] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const isSubmitting = status === 'submitting'

  const resetForm = () => {
    setName(defaultName)
    setAttendance('yes')
    setWishes('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg(t.rsvpNameRequired)
      return
    }

    try {
      await submit({
        name: name.trim(),
        isAttending: attendance === 'yes',
        wishes: wishes.trim(),
        maxPersons: Number.parseInt(maxPerson, 10) || 1,
      })
      resetForm()
      reset()
      setShowSuccess(true)
    } catch {
      setErrorMsg(t.rsvpErrorMessage)
    }
  }

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

        <form onSubmit={handleSubmit} className="relative z-10 grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="rsvp-name"
              className="text-sm font-semibold text-primary"
            >
              {t.name}
            </Label>
            <Input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t.namePlaceholder}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-semibold text-primary">
              {t.attendance}
            </Label>
            <Select value={attendance} onValueChange={setAttendance}>
              <SelectTrigger
                className={`${fieldClass} w-full [&>span]:flex [&>span]:items-center [&>span]:gap-2`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-secondary/20 bg-white p-1.5 shadow-xl shadow-secondary/10">
                <SelectItem
                  value="yes"
                  className="gap-2.5 rounded-lg py-2.5 pl-3 text-primary focus:bg-secondary/10 focus:text-primary data-[state=checked]:bg-secondary/10 data-[state=checked]:font-medium"
                >
                  <CircleCheck className="size-4 text-emerald-600" />
                  {t.attend}
                </SelectItem>
                <SelectItem
                  value="no"
                  className="gap-2.5 rounded-lg py-2.5 pl-3 text-primary focus:bg-secondary/10 focus:text-primary data-[state=checked]:bg-secondary/10 data-[state=checked]:font-medium"
                >
                  <CircleX className="size-4 text-secondary/60" />
                  {t.unableAttend}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="rsvp-wishes"
              className="text-sm font-semibold text-primary"
            >
              {t.wishes}
            </Label>
            <Textarea
              id="rsvp-wishes"
              rows={1}
              value={wishes}
              onChange={(event) => setWishes(event.target.value)}
              placeholder={t.wishesPlaceholder}
              className={`${fieldClass} resize-none`}
            />
          </div>

          {errorMsg && (
            <span className="text-sm font-medium text-destructive" role="alert">
              {errorMsg}
            </span>
          )}

          <span className="text-sm text-gray-500 font-semibold">
            {t.invitationNote} {t.invitationValid} {maxPerson} {t.person}
          </span>

          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="rounded-full px-6 py-3 h-auto text-sm font-semibold uppercase tracking-[0.14em] text-white active:scale-95"
          >
            {isSubmitting ? t.sending : t.sendRsvp}
          </Button>

          <WishesSheet t={t} />
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

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-[300px] rounded-2xl border-secondary/20 text-center sm:max-w-sm">
          <DialogHeader className="items-center gap-3">
            <span className="grid size-16 place-items-center rounded-full bg-accent/15">
              <CheckCircle2 className="size-9 text-accent" strokeWidth={1.5} />
            </span>
            <DialogTitle className="text-2xl text-primary">
              {t.rsvpSuccessTitle}
            </DialogTitle>
            <DialogDescription className="text-primary/80">
              {t.rsvpSuccessMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center bg-white border-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowSuccess(false)}
              className="rounded-full px-8 text-white"
            >
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

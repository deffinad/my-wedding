import { useEffect, useRef, useState } from 'react'
import { Loader2, MessageCircleHeart } from 'lucide-react'
import { useRsvpStore } from '@/features/users/store/rsvpStore'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
})

function WishCard({ item, t }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-secondary/15 bg-white/70 p-4">
      <div className="flex min-w-0 flex-col gap-1">
        <div>
          {item.created_at && (
            <p className="text-xs text-gray-400">
              {dateFormatter.format(new Date(item.created_at))}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-primary">{item.name}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                item.is_attending
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-red-100 text-red-500'
              }`}
            >
              {item.is_attending ? t.attend : t.unableAttend}
            </span>
          </div>
        </div>
        <p className="break-words text-sm leading-relaxed text-primary/80">
          {item.wishes}
        </p>
      </div>
    </div>
  )
}

function WishSkeleton() {
  return (
    <div className="flex animate-pulse gap-3 rounded-2xl border border-secondary/10 bg-white/50 p-4">
      <span className="size-10 shrink-0 rounded-full bg-secondary/10" />
      <div className="flex flex-1 flex-col gap-2">
        <span className="h-3 w-24 rounded bg-secondary/10" />
        <span className="h-3 w-full rounded bg-secondary/10" />
        <span className="h-3 w-2/3 rounded bg-secondary/10" />
      </div>
    </div>
  )
}

export function WishesSheet({ t }) {
  const [open, setOpen] = useState(false)

  const list = useRsvpStore((state) => state.list)
  const listStatus = useRsvpStore((state) => state.listStatus)
  const loadingMore = useRsvpStore((state) => state.loadingMore)
  const hasMore = useRsvpStore((state) => state.hasMore)
  const loadFirst = useRsvpStore((state) => state.loadFirst)
  const loadMore = useRsvpStore((state) => state.loadMore)

  const scrollRef = useRef(null)
  const sentinelRef = useRef(null)

  // Muat ulang halaman pertama setiap sheet dibuka.
  useEffect(() => {
    if (open) loadFirst()
  }, [open, loadFirst])

  // Infinite scroll: amati sentinel di dalam viewport ScrollArea.
  useEffect(() => {
    if (!open) return undefined
    const root = scrollRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    const sentinel = sentinelRef.current
    if (!root || !sentinel) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { root, rootMargin: '0px 0px 160px 0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [open, loadMore, hasMore, list.length])

  const isInitialLoading = listStatus === 'loading' && list.length === 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="mx-auto w-fit text-sm font-semibold text-secondary underline decoration-secondary/50 underline-offset-4 transition hover:text-secondary/80"
        >
          {t.viewWishes}
        </button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-[80vh]! rounded-t-3xl border-secondary/15 p-0"
      >
        <SheetHeader className="items-center border-b border-secondary/10 pb-4 text-center">
          <SheetTitle className="flex items-center justify-center gap-2 text-xl text-primary">
            <MessageCircleHeart className="size-5 text-accent" />
            {t.wishesListTitle}
          </SheetTitle>
          <SheetDescription className="text-primary/60">
            {t.rsvpIntro}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 relative">
          <div className="absolute w-full h-full">
            {list.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-center text-sm text-gray-400">
                  {t.wishesEmpty}
                </p>
              </div>
            ) : (
              <ScrollArea ref={scrollRef} className="w-full h-full">
                <div className="mx-auto flex max-w-lg flex-col gap-3 px-4 pb-10 pt-4">
                  {isInitialLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <WishSkeleton key={i} />
                    ))
                  ) : (
                    <>
                      {list.map((item) => (
                        <WishCard key={item.id} item={item} t={t} />
                      ))}

                      <div ref={sentinelRef} aria-hidden="true" />

                      {loadingMore && (
                        <div className="flex justify-center py-2">
                          <Loader2 className="size-5 animate-spin text-secondary" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

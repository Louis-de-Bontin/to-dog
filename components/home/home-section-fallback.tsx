import { cn } from '@/lib/utils'

export function HomeSectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('mx-auto max-w-6xl px-4 py-16 sm:px-6 animate-pulse', className)}
      aria-hidden
    >
      <div className="space-y-3">
        <div className="h-10 max-w-xs rounded-lg bg-muted" />
        <div className="h-4 max-w-xl rounded-lg bg-muted" />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-muted md:h-52" />
        ))}
      </div>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconTitleRowProps {
  icon: LucideIcon
  title: React.ReactNode
  iconClassName?: string
  titleClassName?: string
}

export function IconTitleRow({
  icon: Icon,
  title,
  iconClassName,
  titleClassName,
}: IconTitleRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10',
          iconClassName,
        )}
      >
        <Icon className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <span className={cn('font-heading font-semibold text-foreground', titleClassName)}>
        {title}
      </span>
    </div>
  )
}

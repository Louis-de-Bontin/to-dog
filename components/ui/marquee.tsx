'use client'

import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  pauseOnHover?: boolean
  reverse?: boolean
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  pauseOnHover = false,
  reverse = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex w-full overflow-hidden [--duration:40s] [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
      {...props}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 items-center [gap:var(--gap)]',
            vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
            'motion-reduce:animate-none',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

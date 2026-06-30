import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  priority?: boolean
  className?: string
}

/** To Dog logo — served unoptimized to avoid stale /_next/image cache on asset updates. */
export function BrandLogo({ priority = false, className }: BrandLogoProps) {
  return (
    <Image
      src="/margaux-brand-logo.png"
      alt="To Dog Education — éducatrice canine"
      width={370}
      height={386}
      sizes="48px"
      unoptimized
      className={cn('size-10 shrink-0 object-contain', className)}
      priority={priority}
    />
  )
}

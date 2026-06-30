'use client'

import type { ComponentProps } from 'react'
import { Link, usePathname } from '@/lib/navigation'
import { cn } from '@/lib/utils'

type OpenBookingLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  service?: string
}

export function OpenBookingLink({ service, children, className, ...props }: OpenBookingLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={{
        pathname,
        query: {
          booking: 'true',
          ...(service ? { service } : {}),
        },
      }}
      scroll={false}
      className={cn('no-underline', className)}
      {...props}
    >
      {children}
    </Link>
  )
}

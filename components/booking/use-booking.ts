'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from '@/lib/navigation'
import { useCallback } from 'react'

export function useBooking() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('booking') === 'true'
  const preselectedService = searchParams.get('service') || undefined

  const openBooking = useCallback(
    (serviceSlug?: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('booking', 'true')
      if (serviceSlug) {
        params.set('service', serviceSlug)
      }
      const q = params.toString()
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const closeBooking = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('booking')
    params.delete('service')
    const q = params.toString()
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  return {
    isOpen,
    preselectedService,
    openBooking,
    closeBooking,
  }
}

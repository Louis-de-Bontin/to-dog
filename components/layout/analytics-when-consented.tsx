'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { getStoredConsent, type ConsentValue } from './cookie-consent-banner'

function analyticsAllowed(value: ConsentValue | null) {
  return value === 'analytics'
}

export function AnalyticsWhenConsented() {
  const [allow, setAllow] = useState(false)

  useEffect(() => {
    const refresh = () => setAllow(analyticsAllowed(getStoredConsent()))
    refresh()
    window.addEventListener('margaux-consent-change', refresh)
    return () => window.removeEventListener('margaux-consent-change', refresh)
  }, [])

  if (process.env.NODE_ENV !== 'production' || !allow) return null
  return <Analytics />
}

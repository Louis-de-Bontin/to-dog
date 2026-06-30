'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'margaux-cookie-consent'

export type ConsentValue = 'essential' | 'analytics'

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'analytics' || v === 'essential') return v
    return null
  } catch {
    return null
  }
}

export function announceConsentChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('margaux-consent-change'))
}

export function CookieConsentBanner() {
  const t = useTranslations('cookies')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getStoredConsent() !== null) return
    setVisible(true)
  }, [])

  const persist = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    announceConsentChange()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card p-4 shadow-lg md:p-6'
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm md:max-w-xl">
          <p id="cookie-consent-title" className="font-heading font-semibold text-foreground">
            {t('title')}
          </p>
          <p className="text-muted-foreground">{t('body')}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => persist('essential')}>
            {t('essentials')}
          </Button>
          <Button
            type="button"
            onClick={() => persist('analytics')}
            className="bg-accent text-accent-foreground"
          >
            {t('acceptAnalytics')}
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'

export function BrandRibbon() {
  const t = useTranslations('brandRibbon')
  const items = [t('i1'), t('i2'), t('i3'), t('i4')]

  return (
    <div className="relative z-10 -mt-2 overflow-hidden border-y border-primary/15 bg-primary py-3 text-primary-foreground shadow-md">
      <div className="flex min-w-max animate-[scroll-ribbon_28s_linear_infinite] gap-8 whitespace-nowrap px-4 font-heading text-sm font-bold uppercase tracking-[0.14em] motion-reduce:animate-none">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            {item}
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { useTranslations } from 'next-intl'

export function SolutionSection() {
  const t = useTranslations('solution')
  const benefits = [t('b1'), t('b2'), t('b3'), t('b4'), t('b5')]

  return (
    <SectionWrapper id="solution">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-primary/20 shadow-xl">
            <Image
              src="/images/trainer-action.jpg"
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 rounded-xl bg-accent p-4 text-accent-foreground shadow-lg md:-right-8">
            <p className="font-heading text-2xl font-bold">{t('badgeLine1')}</p>
            <p className="text-sm">{t('badgeLine2')}</p>
          </div>
        </div>

        <div className="surface-cream order-1 p-6 sm:p-8 lg:order-2 lg:p-10">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t('h2before')}{' '}
            <span className="brand-highlight mt-2 block">{t('h2highlight')}</span>
          </h2>

          <div className="my-5 h-1 w-16 rounded-full bg-primary/80" aria-hidden />

          <p className="text-pretty text-lg text-muted-foreground">{t('p1')}</p>

          <p className="mt-4 text-muted-foreground">{t('p2')}</p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" aria-hidden />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}

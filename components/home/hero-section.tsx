'use client'

import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection9 } from '@/components/ui/hero-section-9'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="brand-section-gradient relative overflow-hidden">
      <HeroSection9
        badge={
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" aria-hidden />
            <span>{t('badge')}</span>
          </div>
        }
        title={
          <h1 className="text-balance font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {t('titleBefore')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>{' '}
            {t('titleAfter')}
          </h1>
        }
        subtitle={t('intro')}
        actions={
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/services">
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
        trustChips={[t('chip1'), t('chip2'), t('chip3')]}
        images={[
          { src: '/images/hero.jpg', alt: t('imageAlt') },
          {
            src: '/images/trust-group.jpg',
            alt: t('collageAlt2'),
            className: 'object-[center_35%]',
          },
          {
            src: '/images/service-programme.jpg',
            alt: t('collageAlt3'),
            className: 'object-[center_40%]',
          },
        ]}
      />
    </section>
  )
}

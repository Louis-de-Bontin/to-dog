'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { OpenBookingLink } from '@/components/booking'

export function FinalCTASection() {
  const t = useTranslations('finalCta')

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-y border-primary/20 bg-gradient-to-br from-primary via-primary to-primary/95 py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.16_35_/_0.18),transparent_55%)]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <h2
          id="final-cta-heading"
          className="text-balance font-heading text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl"
        >
          {t('title')}
        </h2>

        <p className="mt-6 text-lg text-primary-foreground/85 md:text-xl">{t('sub')}</p>

        <div className="mt-10 flex flex-col items-center justify-center">
          <Button
            asChild
            size="lg"
            className="w-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 sm:w-auto"
          >
            <OpenBookingLink>
              <Calendar className="mr-2 h-5 w-5" />
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </OpenBookingLink>
          </Button>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/70">{t('note')}</p>
      </motion.div>
    </section>
  )
}

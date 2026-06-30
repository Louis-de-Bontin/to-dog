'use client'

import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { getFeaturedFAQ } from '@/lib/data/faq'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import type { AppLocale } from '@/lib/data/service-types'

export function FAQSection() {
  const locale = useLocale() as AppLocale
  const t = useTranslations('faq')
  const faqItems = getFeaturedFAQ(6, locale)

  return (
    <SectionWrapper className="brand-section-gradient">
      <div className="grid gap-10 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-2">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{t('subtitle')}</p>
          <p className="mt-8 text-base text-muted-foreground">
            {t('contactPrompt')}{' '}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-medium text-primary no-underline transition-colors hover:text-accent"
            >
              {t('contactLink')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>

        <div className="md:col-span-3">
          <Accordion
            type="single"
            collapsible
            className="-space-y-px overflow-hidden rounded-2xl border border-border bg-card"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={cn(
                  'border-b border-border last:border-b-0',
                  'data-[state=open]:border-l-4 data-[state=open]:border-accent data-[state=open]:bg-primary/5',
                  index === 0 && 'rounded-t-2xl',
                  index === faqItems.length - 1 && 'rounded-b-2xl',
                )}
              >
                <AccordionTrigger className="px-6 py-4 text-left font-heading text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionWrapper>
  )
}

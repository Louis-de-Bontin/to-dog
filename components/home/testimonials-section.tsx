'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { getFeaturedTestimonials } from '@/lib/data/testimonials'
import type { Testimonial } from '@/lib/data/testimonials'
import { useFadeUpReveal } from '@/lib/motion-presets'
import { useLocale, useTranslations } from 'next-intl'
import type { AppLocale } from '@/lib/data/service-types'

function TestimonialCard({
  testimonial,
  delayIndex,
}: {
  testimonial: Testimonial
  delayIndex: number
}) {
  const reveal = useFadeUpReveal(delayIndex * 0.08)
  return (
    <motion.div
      {...reveal}
      className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />
      <div className="mb-4 flex gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="mb-6 leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
          <Image
            src={testimonial.image}
            alt={testimonial.dog.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-heading font-semibold text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.dog.name}, {testimonial.dog.breed}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const locale = useLocale() as AppLocale
  const t = useTranslations('testimonials')
  const testimonials = getFeaturedTestimonials(3, locale)

  return (
    <SectionWrapper>
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            delayIndex={index}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

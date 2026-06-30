'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, MapPin, Users, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import type { Service } from '@/lib/data/services'
import { setLastViewedServiceSlug } from '@/lib/booking-flow-storage'
import { useTranslations } from 'next-intl'
import { OpenBookingLink } from '@/components/booking'

interface ServicePageTemplateProps {
  service: Service
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const t = useTranslations('servicePage')
  useEffect(() => {
    setLastViewedServiceSlug(service.slug)
  }, [service.slug])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-card py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                {service.shortTitle}
              </Badge>

              <h1 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
                {service.title}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground">
                {service.tagline}
              </p>

              <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="sr-only">{t('durationLabel')}</span>
                  {service.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="sr-only">{t('locationLabel')}</span>
                  {service.location}
                </span>
              </div>

              <p className="mb-8 text-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <OpenBookingLink service={service.slug}>
                    {t('bookThisService')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </OpenBookingLink>
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
              {t('forWhomTitle')}
            </h2>
            <ul className="space-y-3">
              {service.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
              {t('benefitsTitle')}
            </h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* What's Included Section */}
      <SectionWrapper background="alt">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
          {t('includesTitle')}
        </h2>
        <div className="mx-auto max-w-2xl">
          <ul className="space-y-4">
            {service.includes.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-lg bg-background p-4 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm">
                  {index + 1}
                </div>
                <span className="pt-1 text-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper>
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
          {t('pricingTitle')}
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.pricing.map((price, index) => (
            <motion.div
              key={price.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-xl border p-6 ${
                index === 1 
                  ? 'border-accent bg-accent/5 shadow-lg' 
                  : 'border-border bg-card'
              }`}
            >
              {index === 1 && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  {t('popularBadge')}
                </Badge>
              )}
              
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                {price.label}
              </h3>
              
              {price.description && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {price.description}
                </p>
              )}
              
              <div className="mb-4">
                <span className="font-heading text-3xl font-bold text-foreground">
                  {price.price} €
                </span>
                {price.perSession && (
                  <span className="text-sm text-muted-foreground">
                    {' '}( {price.perSession} € {t('perSession')})
                  </span>
                )}
              </div>
              
              <Button
                asChild
                className={`w-full ${
                  index === 1
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : ''
                }`}
                variant={index === 1 ? 'default' : 'outline'}
              >
                <OpenBookingLink service={service.slug}>{t('choosePlan')}</OpenBookingLink>
              </Button>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonial Section */}
      {service.testimonial && (
        <SectionWrapper background="alt">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="mb-6 font-heading text-xl font-medium text-foreground md:text-2xl">
              &ldquo;{service.testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {service.testimonial.author}
              </span>
              {' '}&mdash; {service.testimonial.dog}
            </p>
          </div>
        </SectionWrapper>
      )}

      {/* CTA Section */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {t('ctaHeading')}
          </h2>
          <p className="mb-8 text-muted-foreground">{t('ctaBody')}</p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <OpenBookingLink service={service.slug}>
              {t('ctaButton')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </OpenBookingLink>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}

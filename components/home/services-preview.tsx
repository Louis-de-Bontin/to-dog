'use client'

import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { IconTitleRow } from '@/components/shared/icon-title-row'
import { BentoGridWithFeatures, type BentoFeature } from '@/components/ui/bento-grid'
import { OpenBookingLink } from '@/components/booking'
import { getServices } from '@/lib/data/services'
import type { AppLocale, Service } from '@/lib/data/service-types'
import { cn } from '@/lib/utils'
import { Link } from '@/lib/navigation'
import { useLocale, useTranslations } from 'next-intl'

const iconMap: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  'arrow-left': ArrowLeft,
  calendar: Calendar,
  target: Target,
  star: Star,
  users: Users,
  sparkles: Sparkles,
  'clipboard-check': ClipboardCheck,
  zap: Zap,
  heart: Heart,
  'map-pin': MapPin,
  home: Home,
}

function formatFromPrice(fromPrice: string, service: Service) {
  return `${fromPrice} ${service.pricing[0].price} €`
}

function getSmallCellClassName(index: number) {
  return cn(
    'surface-cream border border-border p-0 transition-shadow hover:shadow-md hover:border-primary/30 md:col-span-2 border-b',
    index >= 2 && index <= 3 && 'md:border-r',
  )
}

function ServiceBentoCellContent({
  service,
  fromPrice,
  imageSizes,
  titleClassName,
  variant = 'compact',
}: {
  service: Service
  fromPrice: string
  imageSizes: string
  titleClassName?: string
  variant?: 'flagship' | 'compact'
}) {
  const Icon = iconMap[service.icon] || GraduationCap
  const price = (
    <p className="font-heading text-lg font-bold text-accent">
      {formatFromPrice(fromPrice, service)}
    </p>
  )

  if (variant === 'flagship') {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group grid h-full grid-cols-1 gap-4 no-underline p-4 sm:p-8 md:grid-cols-2 md:gap-6"
        prefetch
      >
        <div className="flex flex-col justify-center">
          <IconTitleRow icon={Icon} title={service.shortTitle} titleClassName={titleClassName} />
          <p className="my-2 max-w-sm text-left text-sm text-muted-foreground md:text-base">
            {service.tagline}
          </p>
          <div className="mt-2">{price}</div>
        </div>
        <div className="relative min-h-[200px] overflow-hidden rounded-xl md:min-h-0 md:h-full">
          <Image
            src={service.image}
            alt={service.shortTitle}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col no-underline p-4 sm:p-8"
      prefetch
    >
      <IconTitleRow icon={Icon} title={service.shortTitle} titleClassName={titleClassName} />
      <p className="my-2 max-w-sm text-left text-sm text-muted-foreground md:text-base">
        {service.tagline}
      </p>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={service.image}
          alt={service.shortTitle}
          fill
          sizes={imageSizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3">{price}</div>
    </Link>
  )
}

function buildServiceFeatures(
  flagship: Service,
  others: Service[],
  fromPrice: string,
): BentoFeature[] {
  const flagshipFeature: BentoFeature = {
    id: flagship.slug,
    className: cn(
      'surface-cream border border-border p-0 transition-shadow hover:shadow-md hover:border-primary/30',
      'md:col-span-4 md:row-span-2 border-b md:border-r',
    ),
    content: (
      <ServiceBentoCellContent
        service={flagship}
        fromPrice={fromPrice}
        imageSizes="(max-width: 768px) 100vw, 25vw"
        titleClassName="text-xl md:text-2xl"
        variant="flagship"
      />
    ),
  }

  const otherFeatures: BentoFeature[] = others.map((service, index) => ({
    id: service.slug,
    className: getSmallCellClassName(index),
    content: (
      <ServiceBentoCellContent
        service={service}
        fromPrice={fromPrice}
        imageSizes="(max-width: 768px) 100vw, 33vw"
        variant="compact"
      />
    ),
  }))

  return [flagshipFeature, ...otherFeatures]
}

export function ServicesPreview() {
  const locale = useLocale() as AppLocale
  const t = useTranslations('servicesPreview')
  const services = getServices(locale)
  const flagship = services.find((s) => s.slug === 'programme-10-semaines') ?? services[0]
  const others = services.filter((s) => s.slug !== flagship.slug)
  const fromPrice = t('fromPrice')
  const features = buildServiceFeatures(flagship, others, fromPrice)

  return (
    <SectionWrapper background="alt">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="surface-sage mb-10 flex flex-col items-center gap-4 px-4 py-5 text-center shadow-sm sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{t('ratingLine')}</span>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <OpenBookingLink>{t('bookDemo')}</OpenBookingLink>
        </Button>
      </div>

      <BentoGridWithFeatures features={features} className="md:auto-rows-min" />

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/services" prefetch>
            {t('allServices')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  )
}

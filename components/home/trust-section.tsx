'use client'

import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { Award, Clock, Heart, Shield, Users, Zap } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { useTranslations } from 'next-intl'

function TrustStatCard({
  icon: Icon,
  value,
  title,
  description,
}: {
  icon: LucideIcon
  value: string
  title: string
  description: string
}) {
  return (
    <div className="min-w-[280px] shrink-0 snap-start rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md lg:min-w-0">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="font-heading text-3xl font-bold text-primary">{value}</p>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
        </div>
      </div>
      <h3 className="font-heading font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function TrustFeaturedCard({
  icon: Icon,
  value,
  title,
  description,
  imageAlt,
}: {
  icon: LucideIcon
  value: string
  title: string
  description: string
  imageAlt: string
}) {
  return (
    <div className="relative min-h-[220px] min-w-[280px] shrink-0 snap-start overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md lg:min-w-0">
      <Image
        src="/images/trust-group.jpg"
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 280px, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-5 text-white">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="font-heading text-3xl font-bold text-white">{value}</p>
          <div className="rounded-lg bg-white/15 p-2">
            <Icon className="h-4 w-4 text-white" aria-hidden />
          </div>
        </div>
        <h3 className="font-heading font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-white/80">{description}</p>
      </div>
    </div>
  )
}

export function TrustSection() {
  const t = useTranslations('trust')
  const trustPoints = [
    {
      icon: Award,
      value: t('t1Value'),
      title: t('t1Title'),
      description: t('t1Desc'),
      featured: false,
    },
    {
      icon: Heart,
      value: t('t2Value'),
      title: t('t2Title'),
      description: t('t2Desc'),
      featured: false,
    },
    {
      icon: Users,
      value: t('t3Value'),
      title: t('t3Title'),
      description: t('t3Desc'),
      featured: true,
    },
    {
      icon: Clock,
      value: t('t4Value'),
      title: t('t4Title'),
      description: t('t4Desc'),
      featured: false,
    },
    {
      icon: Shield,
      value: t('t5Value'),
      title: t('t5Title'),
      description: t('t5Desc'),
      featured: false,
    },
    {
      icon: Zap,
      value: t('t6Value'),
      title: t('t6Title'),
      description: t('t6Desc'),
      featured: false,
    },
  ]

  return (
    <SectionWrapper>
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 lg:snap-none">
        {trustPoints.map((point) =>
          point.featured ? (
            <TrustFeaturedCard
              key={point.title}
              icon={point.icon}
              value={point.value}
              title={point.title}
              description={point.description}
              imageAlt={t('t3Title')}
            />
          ) : (
            <TrustStatCard
              key={point.title}
              icon={point.icon}
              value={point.value}
              title={point.title}
              description={point.description}
            />
          ),
        )}
      </div>
    </SectionWrapper>
  )
}

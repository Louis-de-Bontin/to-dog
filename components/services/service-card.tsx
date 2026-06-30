'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import type { Service } from '@/lib/data/services'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'

const MotionLink = motion.create(Link)

interface ServiceCardProps {
  service: Service
  index?: number
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const t = useTranslations('serviceCard')

  return (
    <MotionLink
      href={`/services/${service.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group block no-underline overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-neutral-900">
            {t('from')} {service.pricing[0].price} €
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">{service.title}</h3>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{service.tagline}</p>

        <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {service.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {service.location}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm font-medium text-primary">
          <span>{t('detailCta')}</span>
          <ArrowRight className="h-4 w-4 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
      </div>
    </MotionLink>
  )
}

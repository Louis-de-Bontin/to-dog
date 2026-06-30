import type { AppLocale, Service, ServicePricing } from '@/lib/data/service-types'
import { servicesEn } from '@/lib/data/services-en'
import { servicesFr } from '@/lib/data/services-fr'

export type { AppLocale, Service, ServicePricing } from '@/lib/data/service-types'

const byLocale: Record<AppLocale, Service[]> = {
  fr: servicesFr,
  en: servicesEn,
}

export function getServices(locale: string): Service[] {
  return byLocale[locale === 'en' ? 'en' : 'fr']
}

export function getServiceBySlug(
  slug: string,
  locale: string
): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug)
}

export function getServicePricingDefault(service: Service): ServicePricing {
  return service.pricing.find((p) => p.type === 'single') || service.pricing[0]
}

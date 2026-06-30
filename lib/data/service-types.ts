export interface ServicePricing {
  type: 'single' | 'pack'
  label: string
  price: number
  description?: string
  sessions?: number
  perSession?: number
}

export interface Service {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  image: string
  icon: string
  duration: string
  location: string
  forWhom: string[]
  benefits: string[]
  includes: string[]
  pricing: ServicePricing[]
  testimonial?: {
    quote: string
    author: string
    dog: string
  }
}

export type AppLocale = 'fr' | 'en'

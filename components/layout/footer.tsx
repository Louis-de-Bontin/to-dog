'use client'

import { Mail, MapPin, Instagram, Facebook, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/layout/brand-logo'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { getServices } from '@/lib/data/services'
import { OpenBookingLink } from '@/components/booking'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()
  const services = getServices(locale)

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="no-underline flex items-center gap-2 font-heading text-xl font-bold text-foreground transition-colors hover:text-primary"
            >
              <BrandLogo />
              <span>{tNav('brand')}</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${t('email')}`}
                className="no-underline flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {t('email')}
              </a>
              <a
                href={`tel:${t('phone').replace(/\s/g, '')}`}
                className="no-underline flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {t('phone')}
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {t('location')}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">
              {t('usefulTitle')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('allServices')}
                </Link>
              </li>
              <li>
                <Link
                  href="/evenements"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav('events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav('contact')}
                </Link>
              </li>
              <li>
                <OpenBookingLink className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t('bookSession')}
                </OpenBookingLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">
              {t('followTitle')}
            </h3>
            <div className="mb-6 flex gap-4">
              <a
                href="https://www.instagram.com/to_dog_education/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={t('instagram')}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/people/To-Dog-Education/61580371987044/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={t('facebook')}
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <h4 className="mb-2 text-sm font-medium text-foreground">{t('legalTitle')}</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/mentions-legales"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('legalLinks.mentions')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="no-underline text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('legalLinks.cgv')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} To Dog Education. {t('rights')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('prototypeCredit')}{' '}
              <a
                href="https://designcanin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline font-medium text-foreground transition-colors hover:text-primary"
              >
                {t('prototypeStudio')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  // Keep French URLs as the baseline; `/en` is opt-in via the navbar, not Accept-Language.
  localeDetection: false,
})

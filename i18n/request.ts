import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale
  }

  const messages =
    locale === 'en'
      ? (await import('../messages/en')).default
      : (await import('../messages/fr')).default

  return {
    locale,
    messages,
  }
})

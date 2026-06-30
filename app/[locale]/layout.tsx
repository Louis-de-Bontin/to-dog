import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import { CookieConsentBanner } from '@/components/layout/cookie-consent-banner'
import { EmailCapturePopup } from '@/components/layout/email-capture-popup'
import { DemoChatWidget } from '@/components/layout/demo-chat-widget'
import { AnalyticsWhenConsented } from '@/components/layout/analytics-when-consented'
import { BookingModal } from '@/components/booking'

type Props = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  const isEn = locale === 'en'
  return {
    openGraph: {
      locale: isEn ? 'en_US' : 'fr_FR',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
        <CookieConsentBanner />
        <EmailCapturePopup />
        <DemoChatWidget />
        <BookingModal />
      </ThemeProvider>
      <AnalyticsWhenConsented />
    </NextIntlClientProvider>
  )
}

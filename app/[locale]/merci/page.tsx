'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/lib/navigation'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import {
  CheckCircle,
  Calendar,
  Clock,
  Mail,
  ArrowRight,
  Home,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getBookingData, clearBookingData, type BookingData } from '@/lib/booking-storage'

export default function MerciPage() {
  const t = useTranslations('merci')
  const locale = useLocale()
  const dfLocale = locale === 'en' ? enUS : fr
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = getBookingData()
    if (data) {
      setBooking(data)
      clearBookingData()
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </>
    )
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold text-foreground">{t('noneTitle')}</h1>
          <p className="mb-8 text-muted-foreground">{t('noneBody')}</p>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t('noneCta')}
            </Link>
          </Button>
        </main>
        <Footer />
      </>
    )
  }

  const bookingDate = new Date(booking.date)

  return (
    <>
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-4" variant="outline">
              {t('demoBadge')}
            </Badge>

            <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {t('thanks')}, {booking.name.split(' ')[0]} !
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              {t('confirmation')} <strong>{booking.email}</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 rounded-xl border border-border bg-card p-6 text-left shadow-sm"
          >
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              {t('summaryTitle')}
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">{t('service')}</span>
                <span className="font-medium text-foreground">{booking.serviceTitle}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {t('dateLabel')}
                </span>
                <span className="font-medium text-foreground">
                  {format(bookingDate, 'EEEE d MMMM yyyy', { locale: dfLocale })}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {t('timeLabel')}
                </span>
                <span className="font-medium text-foreground">{booking.time}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {t('emailLabel')}
                </span>
                <span className="font-medium text-foreground">{booking.email}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-medium text-foreground">{t('totalPaid')}</span>
                <span className="font-heading text-xl font-bold text-accent">
                  {booking.amount} €
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t('homeCta')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                {t('servicesCta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            {t('footerHint')}
          </motion.p>
        </div>
      </main>
      <Footer />
    </>
  )
}

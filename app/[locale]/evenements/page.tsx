import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { format, parseISO } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { OpenBookingLink } from '@/components/booking'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Timer, Users } from 'lucide-react'
import { events, getEventLabels, getLocalizedEvent } from '@/lib/data/events'
import type { AppLocale } from '@/lib/data/service-types'
import { Link } from '@/lib/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'eventsPage' })
  return { title: t('title') }
}

export default async function EvenementsPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const loc = locale as AppLocale
  const t = await getTranslations({ locale: loc, namespace: 'eventsPage' })
  const dfLocale = loc === 'en' ? enUS : fr
  const { typeLabel } = getEventLabels(loc)

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{t('title')}</h1>
            <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {events.map((e) => {
              const ev = getLocalizedEvent(e, loc)
              const start = parseISO(e.startISO)
              return (
                <article
                  key={e.slug}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{typeLabel[e.type]}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(start, 'EEEE d MMMM yyyy · HH:mm', { locale: dfLocale })}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">{ev.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{ev.summary}</p>
                  <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-primary" />
                      <dt className="sr-only">{t('duration')}</dt>
                      <dd>{t('duration')} : {e.duration}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <dt className="sr-only">{t('where')}</dt>
                      <dd>{t('where')} : {ev.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <dd>
                        {e.spotsLeft != null ? t('spots', { count: e.spotsLeft }) : t('spotsUnknown')}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild variant="default" className="bg-accent text-accent-foreground">
                      <OpenBookingLink>
                        <Calendar className="mr-2 h-4 w-4" />
                        {t('ctaBooking')}
                      </OpenBookingLink>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/contact">{t('ctaContact')}</Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

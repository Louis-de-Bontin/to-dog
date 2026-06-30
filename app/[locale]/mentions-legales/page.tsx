import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Navbar, Footer } from '@/components/layout'
import { SectionWrapper } from '@/components/shared/section-wrapper'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'mentions' })
  return { title: t('title') }
}

export default async function MentionsLegalesPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'mentions' })

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {t('title')}
            </h1>

            <div className="max-w-none rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
              <strong>{t('noteStrong')}</strong> {t('noteBody')}
            </div>

            <section className="mt-8 mb-8 space-y-3">
              <h2 className="font-heading text-xl font-semibold text-foreground">{t('s1Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('name')}</p>
                <p>{t('profession')}</p>
                <p>{t('siret')}</p>
                <p>{t('address')}</p>
                <p>{t('email')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{t('s2Title')}</h2>
              <p className="text-muted-foreground">{t('hostBody')}</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{t('s3Title')}</h2>
              <p className="text-muted-foreground">{t('ipBody')}</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{t('s4Title')}</h2>
              <p className="text-muted-foreground">{t('privacyBody')}</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{t('s5Title')}</h2>
              <p className="text-muted-foreground">{t('cookieBody')}</p>
            </section>

            <section>
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{t('s6Title')}</h2>
              <p className="text-muted-foreground">{t('liabilityBody')}</p>
            </section>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}

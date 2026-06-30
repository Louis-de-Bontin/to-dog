import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Navbar, Footer } from '@/components/layout'
import { SectionWrapper } from '@/components/shared/section-wrapper'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'cgv' })
  return { title: t('title') }
}

export default async function CGVPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'cgv' })

  const sections = [
    ['s1Title', 's1Body'],
    ['s2Title', 's2Body'],
    ['s3Title', 's3Body'],
    ['s4Title', 's4Body'],
    ['s5Title', 's5Body'],
    ['s6Title', 's6Body'],
  ] as const

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {t('title')}
            </h1>
            <p className="mb-10 text-muted-foreground">
              <strong>{t('introStrong')}</strong> {t('introRest')}
            </p>

            {sections.map(([ht, bt]) => (
              <section key={ht} className="mb-10">
                <h2 className="mb-3 font-heading text-xl font-semibold text-foreground">{t(ht)}</h2>
                <p className="text-muted-foreground">{t(bt)}</p>
              </section>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}

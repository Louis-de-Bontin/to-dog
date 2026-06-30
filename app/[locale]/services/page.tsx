import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { ServiceCard } from '@/components/services'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { getServices } from '@/lib/data/services'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'servicesListing' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ServicesPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'servicesListing' })
  const services = getServices(locale)

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

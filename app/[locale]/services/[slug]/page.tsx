import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { ServicePageTemplate } from '@/components/services'
import { getServiceBySlug, getServices } from '@/lib/data/services'
import { routing } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = getServices('fr').map((s) => s.slug)
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const service = getServiceBySlug(slug, locale)
  if (!service) return { title: 'Service' }
  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServiceDetailPage(props: Props) {
  const { locale, slug } = await props.params
  setRequestLocale(locale)

  const service = getServiceBySlug(slug, locale)
  if (!service) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        <ServicePageTemplate service={service} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

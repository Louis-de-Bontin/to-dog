import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import {
  HeroSection,
  BrandRibbon,
  ProblemSection,
  SolutionSection,
  ProcessSection,
  TrustSection,
  ServicesPreview,
  FinalCTASection,
} from '@/components/home'
import { HomeSectionSkeleton } from '@/components/home/home-section-fallback'

const TestimonialsSection = dynamic(
  () =>
    import('@/components/home/testimonials-section').then((m) => ({
      default: m.TestimonialsSection,
    })),
  {
    loading: () => <HomeSectionSkeleton className="bg-background" />,
    ssr: true,
  }
)

const LeadMagnetSection = dynamic(
  () =>
    import('@/components/home/lead-magnet-section').then((m) => ({
      default: m.LeadMagnetSection,
    })),
  {
    loading: () => (
      <div
        className="mx-auto max-w-6xl px-4 py-16 animate-pulse sm:px-6"
        aria-hidden
      >
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
          <div className="h-10 rounded-lg bg-muted" />
          <div className="h-24 rounded-lg bg-muted" />
        </div>
      </div>
    ),
    ssr: true,
  }
)

const FAQSection = dynamic(
  () =>
    import('@/components/home/faq-section').then((m) => ({
      default: m.FAQSection,
    })),
  {
    loading: () => <HomeSectionSkeleton className="bg-background" />,
    ssr: true,
  }
)

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: { absolute: t('title') },
    description: t('description'),
    keywords: t('keywords').split(','),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export default async function Home(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BrandRibbon />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <TrustSection />
        <ServicesPreview />
        <TestimonialsSection />
        <LeadMagnetSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

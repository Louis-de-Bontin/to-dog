'use client'

import Image from 'next/image'
import { Home, ArrowLeft } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="relative mb-8 h-48 w-48 animate-bounce-gentle">
          <Image
            src="/images/dog-404.jpg"
            alt={t('alt')}
            fill
            sizes="192px"
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">{t('title')}</h1>

        <p className="mb-2 max-w-md text-lg text-muted-foreground">{t('line1')}</p>
        <p className="mb-8 max-w-md text-muted-foreground">{t('line2')}</p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t('home')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('services')}
            </Link>
          </Button>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">{t('code')}</p>
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { blogPosts, getBlogPostLocalized } from '@/lib/data/blog-posts'
import type { AppLocale } from '@/lib/data/service-types'
import { Link } from '@/lib/navigation'
import { ArrowRight } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return { title: t('title'), description: t('subtitle') }
}

export default async function BlogIndexPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const loc = locale as AppLocale
  const t = await getTranslations({ locale: loc, namespace: 'blogPage' })
  const dfLocale = loc === 'en' ? enUS : fr

  const posts = [...blogPosts].sort(
    (a, b) => parseISO(b.publishedAt).getTime() - parseISO(a.publishedAt).getTime()
  )

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{t('title')}</h1>
            <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-10">
            {posts.map((post) => {
              const p = getBlogPostLocalized(post, loc)
              const date = parseISO(post.publishedAt)
              return (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid md:grid-cols-2"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/11] no-underline md:aspect-auto md:min-h-[240px]"
                  >
                    <Image
                      src={post.coverImage}
                      alt={p.alt}
                      fill
                      className="object-cover transition-transform hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <time className="text-xs uppercase tracking-wide text-muted-foreground" dateTime={post.publishedAt}>
                      {format(date, 'd MMMM yyyy', { locale: dfLocale })}
                    </time>
                    <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="no-underline transition-colors hover:text-primary"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span>{t('readTime', { minutes: post.readingMinutes[loc === 'en' ? 'en' : 'fr'] })}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-medium text-primary no-underline transition-colors hover:text-accent"
                      >
                        {t('readMore')}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-muted-foreground">{t('disclaimerFooter')}</p>
        </SectionWrapper>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { BlogPostBody } from '@/components/blog/blog-post-body'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { blogPosts, getBlogPost, getBlogPostLocalized } from '@/lib/data/blog-posts'
import { routing } from '@/i18n/routing'
import type { AppLocale } from '@/lib/data/service-types'
import { Link } from '@/lib/navigation'
import { ArrowLeft } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'

type ArticleProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata(props: ArticleProps): Promise<Metadata> {
  const { locale, slug } = await props.params
  setRequestLocale(locale)
  const post = getBlogPost(slug)
  if (!post) return {}
  const p = getBlogPostLocalized(post, locale as AppLocale)
  return {
    title: p.title,
    description: p.description,
    openGraph: {
      images: [{ url: post.coverImage }],
    },
  }
}

export default async function BlogArticlePage(props: ArticleProps) {
  const { locale, slug } = await props.params
  setRequestLocale(locale)
  const loc = locale as AppLocale
  const post = getBlogPost(slug)
  if (!post) notFound()

  const p = getBlogPostLocalized(post, loc)
  const tBlog = await getTranslations({ locale: loc, namespace: 'blogPage' })
  const dfLocale = loc === 'en' ? enUS : fr
  const date = parseISO(post.publishedAt)

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper className="!py-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> {tBlog('backToListing')}
            </Link>

            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {format(date, 'd MMMM yyyy', { locale: dfLocale })}
            </p>

            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">{p.title}</h1>

            <p className="mt-4 text-muted-foreground">{p.description}</p>

            <p className="mt-4 text-xs text-muted-foreground">
              {tBlog('readTime', { minutes: post.readingMinutes[loc === 'en' ? 'en' : 'fr'] })}
            </p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[21/11] max-w-4xl overflow-hidden rounded-xl border border-border">
            <Image
              src={post.coverImage}
              alt={p.alt}
              fill
              sizes="(max-width:1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>

          <article className="mx-auto mt-10 max-w-3xl pb-16">
            <BlogPostBody markdown={p.body} />
            <p className="mt-10 border-t border-border pt-8 text-xs text-muted-foreground">
              {tBlog('disclaimerFooter')}
            </p>
          </article>
        </SectionWrapper>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

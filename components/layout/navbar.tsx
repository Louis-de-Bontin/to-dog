'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'
import { ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/layout/brand-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { OpenBookingLink } from '@/components/booking'

function LocaleSwitcher({
  pathname,
  locale,
  triggerClassName,
  onNavigate,
}: {
  pathname: string
  locale: string
  triggerClassName?: string
  onNavigate?: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn('gap-1.5 px-2.5', triggerClassName)}
          aria-label={locale === 'fr' ? 'Français' : 'English'}
        >
          <span aria-hidden className="text-base leading-none">
            {locale === 'fr' ? '🇫🇷' : '🇬🇧'}
          </span>
          <span className="text-xs font-semibold uppercase tabular-nums">
            {locale === 'fr' ? 'FR' : 'EN'}
          </span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem]">
        <DropdownMenuItem asChild className={locale === 'fr' ? 'font-medium' : ''}>
          <Link href={pathname} locale="fr" onClick={onNavigate} className="no-underline">
            <span aria-hidden>🇫🇷</span> Français
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={locale === 'en' ? 'font-medium' : ''}>
          <Link href={pathname} locale="en" onClick={onNavigate} className="no-underline">
            <span aria-hidden>🇬🇧</span> English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/evenements' as const, label: t('events') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ]

  function match(path: string) {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-[box-shadow,background-color] duration-300',
        elevated && 'border-primary/10 shadow-sm border-border/80 bg-background/98'
      )}
    >
      <div className="border-b border-border/40 bg-muted/35">
        <p className="mx-auto max-w-6xl px-4 py-1.5 text-center text-[11px] leading-snug text-muted-foreground sm:px-6 sm:text-xs">
          Démo·Contenu fictif — démonstration uniquement. Créé par{' '}
          <a
            href="https://designcanin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline font-medium text-foreground transition-colors hover:text-primary"
          >
            designcanin.com
          </a>
        </p>
      </div>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="no-underline flex min-w-0 items-center gap-2 font-heading text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          <BrandLogo priority />
          <span>{t('brand')}</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex md:gap-4 lg:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'no-underline text-sm font-medium transition-colors hover:text-primary',
                match(link.href)
                  ? 'border-b-2 border-primary pb-0.5 text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher pathname={pathname} locale={locale} />
          <ThemeToggle />
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <OpenBookingLink>{t('book')}</OpenBookingLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <OpenBookingLink>{t('book')}</OpenBookingLink>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('menu')} type="button">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-heading">
                  <BrandLogo className="size-8" />
                  <span>{t('brand')}</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'no-underline rounded-lg px-4 py-2 text-base font-medium transition-colors hover:bg-card hover:text-primary',
                      match(link.href)
                        ? 'bg-card text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <LocaleSwitcher
                  pathname={pathname}
                  locale={locale}
                  triggerClassName="w-full justify-between border-border px-4 py-2.5 font-normal normal-case tracking-normal"
                  onNavigate={() => setOpen(false)}
                />
                <div className="mt-4 border-t border-border pt-4">
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <OpenBookingLink>{t('bookSession')}</OpenBookingLink>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

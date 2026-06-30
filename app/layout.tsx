import type { Metadata, Viewport } from 'next'
import { Nunito, DM_Sans } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'To Dog Education | Marie — Éducatrice canine Lyon 9',
    template: '%s | To Dog Education',
  },
  description:
    'Marie, éducatrice canine diplômée d\'État à Lyon 9. Méthode positive, programmes personnalisés et suivi WhatsApp.',
  generator: 'v0.app',
  authors: [{ name: 'Marie — To Dog Education' }],
  icons: {
    icon: [{ url: '/icon', sizes: '48x48', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#1A2B44',
  width: 'device-width',
  initialScale: 1,
}

const THEME_INIT_SCRIPT = `(function(){try{var k='theme',d=document.documentElement,t=localStorage.getItem(k)||'light',dark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark){d.classList.add('dark');d.style.colorScheme='dark';}else{d.classList.remove('dark');d.style.colorScheme='light';}}catch(e){}})();`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${nunito.variable} ${dmSans.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
          suppressHydrationWarning
        />
        {children}
      </body>
    </html>
  )
}

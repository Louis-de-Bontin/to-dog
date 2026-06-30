'use client'

import { useState } from 'react'
import { Mail, MapPin, Send, Phone } from 'lucide-react'
import { Navbar, Footer, FloatingCTA } from '@/components/layout'
import { OpenBookingLink } from '@/components/booking'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const tFooter = useTranslations('footer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })

    toast.success(t('toastTitle'), {
      description: t('toastDesc'),
    })
  }

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
                  {t('detailsTitle')}
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${tFooter('email')}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span>{tFooter('email')}</span>
                  </a>
                  <a
                    href={`tel:${tFooter('phone').replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span>{tFooter('phone')}</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span>{tFooter('location')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
                  {t('hoursTitle')}
                </h3>
                <p className="text-muted-foreground">{t('hoursBody')}</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-2 font-heading font-semibold text-foreground">{t('cardTitle')}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t('cardBody')}</p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <OpenBookingLink>{t('cardCta')}</OpenBookingLink>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('nameLabel')}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('namePh')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('emailLabel')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('messageLabel')}</Label>
                  <Textarea
                    id="message"
                    placeholder={t('messagePh')}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('sendCta')}
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">{t('disclaimer')}</p>
              </form>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

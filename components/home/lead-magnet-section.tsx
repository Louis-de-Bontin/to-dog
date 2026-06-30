'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

export function LeadMagnetSection() {
  const t = useTranslations('leadMagnet')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
    toast.success(t('successTitle'), {
      description: t('successNote'),
    })
  }

  return (
    <SectionWrapper background="alt">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-2xl border border-primary/15 bg-background/80 p-8 text-center shadow-sm backdrop-blur-sm md:p-10"
      >
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/15" aria-hidden>
          <Phone className="h-8 w-8 text-accent" />
        </div>

        <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t('heading')}
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">{t('sub')}</p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-primary/10 p-4 text-primary"
          >
            <Check className="h-5 w-5" />
            <span className="font-medium">{t('successTitle')}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="pl-10"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  …
                </>
              ) : (
                t('cta')
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </SectionWrapper>
  )
}

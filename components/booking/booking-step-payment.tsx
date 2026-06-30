'use client'

import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { ArrowLeft, Calendar, Clock, CreditCard, AlertTriangle } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Service, ServicePricing } from '@/lib/data/services'
import type { BookingFormData } from './booking-modal'

interface BookingStepPaymentProps {
  formData: BookingFormData
  service: Service
  pricing: ServicePricing
  isSubmitting: boolean
  onBack: () => void
  onConfirm: () => void
}

export function BookingStepPayment({
  formData,
  service,
  pricing,
  isSubmitting,
  onBack,
  onConfirm,
}: BookingStepPaymentProps) {
  const locale = useLocale()
  const t = useTranslations('booking')
  const dfLocale = locale === 'en' ? enUS : fr

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-100">
          <strong>{t('demoAlertStrong')}</strong> {t('demoAlertRest')}
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-3 font-heading font-semibold text-foreground">{t('summaryTitle')}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('summaryService')}</span>
            <span className="font-medium">{service.title}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {t('summaryDate')}
            </span>
            <span className="font-medium">
              {formData.date
                ? format(formData.date, 'EEEE d MMMM yyyy', { locale: dfLocale })
                : '-'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {t('summaryTime')}
            </span>
            <span className="font-medium">{formData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('summaryClient')}</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <div className="flex justify-between text-base">
              <span className="font-medium">{t('total')}</span>
              <span className="font-bold text-accent">{pricing.price} €</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-heading font-semibold text-foreground">{t('paymentHeading')}</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="card">{t('cardNumber')}</Label>
            <Input
              id="card"
              placeholder="4242 4242 4242 4242"
              defaultValue="4242 4242 4242 4242"
              disabled
              className="bg-muted"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="expiry">{t('expiry')}</Label>
              <Input
                id="expiry"
                placeholder="MM/AA"
                defaultValue="12/28"
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">{t('cvc')}</Label>
              <Input
                id="cvc"
                placeholder="123"
                defaultValue="123"
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{t('cardNote')}</p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              {t('processing')}
            </>
          ) : (
            `${t('confirm')} (${pricing.price} €)`
          )}
        </Button>
      </div>
    </div>
  )
}

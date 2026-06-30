'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from '@/lib/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useBooking } from './use-booking'
import { BookingStepInfo } from './booking-step-info'
import { BookingStepPayment } from './booking-step-payment'
import { getServices, getServiceBySlug, getServicePricingDefault } from '@/lib/data/services'
import { saveBookingData } from '@/lib/booking-storage'
import { getLastViewedServiceSlug } from '@/lib/booking-flow-storage'
import { Badge } from '@/components/ui/badge'

export interface BookingFormData {
  service: string
  date: Date | undefined
  time: string
  name: string
  email: string
  phone: string
}

function BookingModalContent() {
  const locale = useLocale()
  const t = useTranslations('booking')
  const services = getServices(locale)
  const { isOpen, preselectedService, closeBooking } = useBooking()
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<BookingFormData>({
    service: preselectedService || '',
    date: undefined,
    time: '',
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        service: preselectedService,
      }))
    }
  }, [preselectedService])

  useEffect(() => {
    if (!isOpen || preselectedService) return
    const last = getLastViewedServiceSlug()
    if (last && getServiceBySlug(last, locale)) {
      setFormData((prev) => ({
        ...prev,
        service: prev.service || last,
      }))
    }
  }, [isOpen, preselectedService, locale])

  const selectedService = formData.service
    ? getServiceBySlug(formData.service, locale)
    : null
  const pricing = selectedService ? getServicePricingDefault(selectedService) : null

  const handleStep1Complete = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleConfirm = async () => {
    if (!selectedService || !pricing || !formData.date) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    saveBookingData({
      service: selectedService.slug,
      serviceTitle: selectedService.title,
      date: formData.date.toISOString(),
      time: formData.time,
      amount: pricing.price,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })

    setIsSubmitting(false)
    closeBooking()
    router.push('/merci')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeBooking()
      setTimeout(() => {
        setStep(1)
        setFormData({
          service: '',
          date: undefined,
          time: '',
          name: '',
          email: '',
          phone: '',
        })
      }, 200)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        data-booking-modal
        className="max-h-[90vh] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="font-heading text-xl">
              {step === 1 ? t('step1Title') : t('step2Title')}
            </DialogTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {t('demoBadge')}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{t('disclaimer')}</p>
        </DialogHeader>

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div
              key="booking-step-info"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <BookingStepInfo
                services={services}
                initialData={formData}
                preselectedService={preselectedService}
                onComplete={handleStep1Complete}
              />
            </motion.div>
          ) : (
            selectedService &&
            pricing && (
              <motion.div
                key="booking-step-payment"
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <BookingStepPayment
                  formData={formData}
                  service={selectedService}
                  pricing={pricing}
                  isSubmitting={isSubmitting}
                  onBack={handleBack}
                  onConfirm={handleConfirm}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export function BookingModal() {
  return (
    <Suspense fallback={null}>
      <BookingModalContent />
    </Suspense>
  )
}

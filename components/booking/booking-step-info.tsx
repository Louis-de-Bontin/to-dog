'use client'

import { useState, useMemo, useEffect } from 'react'
import { addDays, format, isBefore, startOfDay } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Service } from '@/lib/data/services'
import type { BookingFormData } from './booking-modal'
import { useLocale, useTranslations } from 'next-intl'

interface TimeSlot {
  time: string
  available: boolean
}

function getTimeSlotsForDate(date: Date): TimeSlot[] {
  const baseSlots = ['09:00', '10:30', '14:00', '15:30', '17:00']
  const dateNum = date.getDate() + date.getMonth() * 31

  return baseSlots.map((time, index) => ({
    time,
    available: !((dateNum + index) % 4 === 0 || (dateNum * 2 + index) % 7 === 0),
  }))
}

interface BookingStepInfoProps {
  services: Service[]
  initialData: BookingFormData
  preselectedService?: string
  onComplete: (data: Partial<BookingFormData>) => void
}

export function BookingStepInfo({
  services,
  initialData,
  preselectedService,
  onComplete,
}: BookingStepInfoProps) {
  const locale = useLocale()
  const t = useTranslations('booking')
  const dfLocale = locale === 'en' ? enUS : fr

  const [service, setService] = useState(initialData.service || preselectedService || '')
  const [date, setDate] = useState<Date | undefined>(initialData.date)
  const [time, setTime] = useState(initialData.time)
  const [name, setName] = useState(initialData.name)
  const [email, setEmail] = useState(initialData.email)
  const [phone, setPhone] = useState(initialData.phone)

  useEffect(() => {
    const next = initialData.service || preselectedService || ''
    if (!next) return
    setService((prev) => (prev === next ? prev : next))
  }, [initialData.service, preselectedService])

  const today = startOfDay(new Date())
  const maxDate = addDays(today, 30)

  const timeSlots = useMemo(() => {
    if (!date) return []
    return getTimeSlotsForDate(date)
  }, [date])

  const isFormValid =
    service && date && time && name.trim() && email.trim() && phone.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    onComplete({ service, date, time, name, email, phone })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="service">{t('serviceLabel')}</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" className="w-full">
            <SelectValue placeholder={t('servicePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>
                {s.shortTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t('dateLabel')}</Label>
        <div className="flex justify-center rounded-lg border border-border p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              setTime('')
            }}
            disabled={(d) => isBefore(d, today) || isBefore(maxDate, d)}
            locale={dfLocale}
            className="rounded-md"
          />
        </div>
      </div>

      {date && (
        <div className="space-y-2">
          <Label>
            {t('timeLabelHeading')} {format(date, 'EEEE d MMMM', { locale: dfLocale })}
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                type="button"
                variant={time === slot.time ? 'default' : 'outline'}
                size="sm"
                disabled={!slot.available}
                onClick={() => setTime(slot.time)}
                className={cn(
                  'w-full',
                  time === slot.time && 'bg-primary text-primary-foreground',
                  !slot.available && 'line-through opacity-50'
                )}
              >
                {slot.time}
              </Button>
            ))}
          </div>
          {timeSlots.every((s) => !s.available) && (
            <p className="text-sm text-muted-foreground">{t('noSlots')}</p>
          )}
        </div>
      )}

      <div className="space-y-4 border-t border-border pt-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('fullNameLabel')}</Label>
          <Input
            id="name"
            type="text"
            placeholder={t('fullNamePh')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('emailLabel')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phoneLabel')}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t('phonePh')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        disabled={!isFormValid}
      >
        {t('continuePayment')}
      </Button>
    </form>
  )
}

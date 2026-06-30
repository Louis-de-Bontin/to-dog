'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

const STORAGE_DISMISS = 'margaux-email-popup-dismissed'

export function EmailCapturePopup() {
  const t = useTranslations('emailPopup')
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_DISMISS) === '1') return
    } catch {
      return
    }

    const id = window.setTimeout(() => {
      try {
        if (localStorage.getItem(STORAGE_DISMISS) === '1') return
      } catch {
        /* ignore */
      }
      setOpen(true)
    }, 30_000)

    return () => window.clearTimeout(id)
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_DISMISS, '1')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 800))
    setBusy(false)
    toast.success(t('successTitle'), { description: t('successBody') })
    dismiss()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) dismiss()
        else setOpen(v)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <Badge variant="outline" className="w-fit font-normal">
            {t('badge')}
          </Badge>
          <DialogTitle className="font-heading">{t('title')}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            autoComplete="email"
          />
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={dismiss}>
              {t('dismiss')}
            </Button>
            <Button type="submit" disabled={busy} className="bg-accent text-accent-foreground">
              {busy ? <Spinner className="h-4 w-4" /> : t('cta')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

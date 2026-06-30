'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, MessageCircle, Minus, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface Msg {
  id: string
  role: 'user' | 'system'
  body: string
}

type PanelState = 'closed' | 'open' | 'minimized'

export function DemoChatWidget() {
  const t = useTranslations('chatDemo')
  const [panel, setPanel] = useState<PanelState>('closed')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, panel])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('margaux-chat-panel', { detail: { state: panel } })
    )
  }, [panel])

  useEffect(() => {
    if (panel !== 'closed' && panel !== 'open') return
    if (messages.length !== 0) return
    if (panel !== 'open') return
    setMessages([
      {
        id: 'intro',
        role: 'system',
        body: t('openerHint'),
      },
    ])
  }, [panel, messages.length, t])

  function onSubmit(e: FormEvent) {
    if (panel === 'closed') return
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', body: trimmed },
    ])
    setInput('')
    if (panel === 'minimized') setPanel('open')
  }

  const dockClass =
    'fixed bottom-6 right-4 z-50 w-[min(calc(100vw-2rem),380px)] sm:right-6 print:hidden'

  return (
    <div className={cn(dockClass, 'pointer-events-none')}>
      {/* FAB — pointer-events restored on interactive nodes */}
      {panel === 'closed' && (
        <div className="flex justify-end">
          <Button
            type="button"
            size="lg"
            onClick={() => setPanel('open')}
            className={cn(
              'pointer-events-auto h-14 w-14 rounded-full p-0 shadow-lg',
              'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            aria-label={t('fabLabel')}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {panel !== 'closed' && (
        <div
          className={cn(
            'pointer-events-auto flex min-h-0 flex-col overflow-hidden rounded-t-xl border border-border bg-background shadow-2xl transition-[max-height] duration-200 ease-out',
            panel === 'open'
              ? 'max-h-[min(520px,calc(100vh-5rem))]'
              : 'max-h-[52px]'
          )}
        >
          {panel === 'minimized' ? (
            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-2 border-b border-border px-3 py-2.5 text-left hover:bg-accent/40'
              )}
              onClick={() => setPanel('open')}
              aria-label={t('expand')}
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1 truncate font-heading text-sm font-semibold">
                {t('title')}
              </span>
              <Badge variant="destructive" className="hidden max-w-[7rem] shrink-0 truncate font-normal sm:inline-flex">
                {t('badge')}
              </Badge>
              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          ) : (
            <>
              <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card/90 px-2 py-1.5 pl-3 backdrop-blur">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary sm:hidden" aria-hidden />
                <span className="min-w-0 flex-1 font-heading text-sm font-semibold leading-none">
                  {t('title')}
                </span>
                <Badge variant="destructive" className="max-w-[9rem] shrink-0 truncate font-normal">
                  {t('badge')}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label={t('minimize')}
                  onClick={() => setPanel('minimized')}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label={t('close')}
                  onClick={() => {
                    setPanel('closed')
                    setMessages([])
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="shrink-0 border-b border-border px-3 py-2 text-xs text-muted-foreground">
                {t('subtitle')}
              </p>

              <ScrollArea className="mx-3 mb-2 h-[min(260px,calc(100vh-16rem))] pr-4">
                <div className="space-y-3 py-3 pr-2">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        'max-w-[90%] rounded-lg px-3 py-2 text-sm',
                        m.role === 'user'
                          ? 'ml-auto bg-primary text-primary-foreground'
                          : 'mr-auto bg-muted text-muted-foreground'
                      )}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-80">
                        {m.role === 'user' ? t('userBubbleLabel') : 'Info'}
                      </span>
                      {m.body}
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
              </ScrollArea>

              <form onSubmit={onSubmit} className="flex shrink-0 gap-2 border-t border-border p-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  aria-label={t('placeholder')}
                  className="min-w-0 flex-1"
                />
                <Button type="submit" size="icon" className="shrink-0" aria-label={t('send')}>
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0 sm:hidden"
                  aria-label={t('minimize')}
                  onClick={() => setPanel('minimized')}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  )
}

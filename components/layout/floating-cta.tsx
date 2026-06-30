'use client'

import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { OpenBookingLink } from '@/components/booking'

type ChatPanelState = 'closed' | 'open' | 'minimized'

export function FloatingCTA() {
  const t = useTranslations('floatingCta')
  const [isVisible, setIsVisible] = useState(false)
  const [chatActive, setChatActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onChatPanel = (e: Event) => {
      const state = (e as CustomEvent<{ state: ChatPanelState }>).detail?.state
      setChatActive(state !== 'closed' && state !== undefined)
    }
    window.addEventListener('margaux-chat-panel', onChatPanel)
    return () => window.removeEventListener('margaux-chat-panel', onChatPanel)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && !chatActive && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-40 md:hidden"
        >
          <Button
            asChild
            size="lg"
            className="h-14 gap-2 rounded-full bg-accent px-6 text-accent-foreground shadow-lg hover:bg-accent/90"
          >
            <OpenBookingLink>
              <Calendar className="h-5 w-5" />
              <span>{t('book')}</span>
            </OpenBookingLink>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

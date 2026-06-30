'use client'

import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, Target, TrendingUp } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { motionEaseDefault, useFadeUpReveal } from '@/lib/motion-presets'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

function ProcessStep({
  icon: Icon,
  step,
  title,
  description,
  index,
}: {
  icon: LucideIcon
  step: string
  title: string
  description: string
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const reveal = useFadeUpReveal(index * 0.12)
  const stepDelay = index * 0.12

  return (
    <motion.div
      {...reveal}
      className={cn(
        'surface-sage relative z-10 rounded-xl border-l-4 border-accent p-4 pl-5 transition-shadow',
        'hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:hover:shadow-none',
        'md:border-l-0 md:pl-4 md:text-center',
      )}
    >
      <div className="flex items-center gap-4 md:flex-col md:items-center md:justify-center md:gap-3">
        <motion.div
          className="relative z-10 shrink-0"
          initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            ease: motionEaseDefault,
            delay: stepDelay,
          }}
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:h-20 md:w-20">
            <Icon className="h-7 w-7 md:h-8 md:w-8" aria-hidden />
            <motion.span
              className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground"
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: motionEaseDefault,
                delay: reduceMotion ? 0 : stepDelay + 0.1,
              }}
            >
              {step}
            </motion.span>
          </div>
        </motion.div>

        <h3 className="min-w-0 font-heading text-xl font-semibold text-foreground md:text-center">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-center">{description}</p>
    </motion.div>
  )
}

export function ProcessSection() {
  const t = useTranslations('process')
  const reduceMotion = useReducedMotion()
  const steps = [
    {
      icon: ClipboardCheck,
      step: '1',
      title: t('s1Title'),
      description: t('s1Desc'),
    },
    {
      icon: Target,
      step: '2',
      title: t('s2Title'),
      description: t('s2Desc'),
    },
    {
      icon: TrendingUp,
      step: '3',
      title: t('s3Title'),
      description: t('s3Desc'),
    },
  ]

  return (
    <SectionWrapper className="brand-section-gradient">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="relative">
        <motion.div
          className="absolute left-[16.67%] right-[16.67%] top-[2.5rem] z-0 hidden h-px origin-left bg-primary/25 md:top-[2.75rem] md:block"
          aria-hidden
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: motionEaseDefault,
          }}
        />

        <div className="relative z-10 flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <ProcessStep
              key={item.step}
              index={index}
              icon={item.icon}
              step={item.step}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

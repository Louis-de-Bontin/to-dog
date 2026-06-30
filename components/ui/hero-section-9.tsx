'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { motionEaseDefault } from '@/lib/motion-presets'
import { cn } from '@/lib/utils'

export interface HeroImage {
  src: string
  alt: string
  className?: string
}

export interface HeroSection9Props {
  badge?: React.ReactNode
  title?: React.ReactNode
  subtitle?: string
  actions?: React.ReactNode
  trustChips?: string[]
  images?: HeroImage[]
  className?: string
}

const collageFrameClass =
  'surface-sage relative overflow-hidden rounded-2xl border border-primary/15 shadow-sm'

export function HeroSection9({
  badge,
  title,
  subtitle,
  actions,
  trustChips,
  images = [],
  className,
}: HeroSection9Props) {
  const reduceMotion = useReducedMotion()
  const stagger = reduceMotion ? 0 : 0.12
  const duration = reduceMotion ? 0 : 0.55
  const imageDelayStep = reduceMotion ? 0 : 0.15

  return (
    <div className={cn('mx-auto max-w-6xl p-6 sm:p-8 md:p-10', className)}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          className="flex flex-col"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          {badge ? (
            <motion.div
              className="mb-4"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: motionEaseDefault, delay: stagger * 0 }}
            >
              {badge}
            </motion.div>
          ) : null}

          {title ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: motionEaseDefault, delay: stagger * 1 }}
            >
              {title}
            </motion.div>
          ) : null}

          {subtitle ? (
            <motion.p
              className="mt-5 max-w-lg text-pretty text-lg text-muted-foreground md:text-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: motionEaseDefault, delay: stagger * 2 }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          {actions ? (
            <motion.div
              className="mt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: motionEaseDefault, delay: stagger * 3 }}
            >
              {actions}
            </motion.div>
          ) : null}

          {trustChips && trustChips.length > 0 ? (
            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: motionEaseDefault, delay: stagger * 4 }}
            >
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>

        {images.length > 0 ? (
          <div className="relative min-h-[420px] w-full sm:min-h-[480px] lg:min-h-[540px]">
            <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
              {images[0] ? (
                <motion.div
                  className={cn(collageFrameClass, 'col-span-1 h-[200px] sm:h-[240px] lg:h-[260px]')}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration,
                    ease: motionEaseDefault,
                    delay: imageDelayStep * 0,
                  }}
                >
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className={cn('object-cover', images[0].className)}
                  />
                </motion.div>
              ) : null}

              {images[1] ? (
                <motion.div
                  className={cn(
                    collageFrameClass,
                    'col-span-1 mt-6 h-[200px] sm:mt-10 sm:h-[240px] lg:mt-12 lg:h-[260px]',
                  )}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration,
                    ease: motionEaseDefault,
                    delay: imageDelayStep * 1,
                  }}
                >
                  <Image
                    src={images[1].src}
                    alt={images[1].alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className={cn('object-cover', images[1].className)}
                  />
                </motion.div>
              ) : null}

              {images[2] ? (
                <motion.div
                  className={cn(collageFrameClass, 'col-span-2 h-[200px] sm:h-[220px] lg:h-[240px]')}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration,
                    ease: motionEaseDefault,
                    delay: imageDelayStep * 2,
                  }}
                >
                  <Image
                    src={images[2].src}
                    alt={images[2].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={cn('object-cover', images[2].className)}
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

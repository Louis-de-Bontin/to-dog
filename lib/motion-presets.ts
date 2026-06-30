'use client'

import type { Transition } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export const motionEaseDefault: Transition['ease'] = [0.22, 1, 0.36, 1]

/** Scroll-reveal: fade up into view */
export function useFadeUpReveal(extraDelaySec = 0) {
  const reduce = useReducedMotion()
  if (reduce) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0 },
    }
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, ease: motionEaseDefault, delay: extraDelaySec },
  }
}

/** Hero panels (mount animation, no viewport) */
export function useHeroContentMotion(delayContentSec = 0) {
  const reduce = useReducedMotion()
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    }
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: motionEaseDefault, delay: delayContentSec },
  }
}

export function useHeroImageMotion(delayImageSec = 0.15) {
  const reduce = useReducedMotion()
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0 },
    }
  }
  return {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.55, ease: motionEaseDefault, delay: delayImageSec },
  }
}

export function useSlideInX(sign: -1 | 1) {
  const reduce = useReducedMotion()
  const x = 20 * sign
  if (reduce) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0 },
    }
  }
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.48, ease: motionEaseDefault },
  }
}

const LAST_VIEWED_SERVICE_KEY = 'margaux_last_service_slug'

/** Last service detail slug — client-only, for softer booking funnel (demo). */
export function getLastViewedServiceSlug(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(LAST_VIEWED_SERVICE_KEY)
  } catch {
    return null
  }
}

export function setLastViewedServiceSlug(slug: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LAST_VIEWED_SERVICE_KEY, slug)
  } catch {
    /* ignore quota / privacy mode */
  }
}

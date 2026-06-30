'use client'

import * as React from 'react'

const STORAGE_KEY = 'theme'

export type ThemeName = 'light' | 'dark' | 'system'

export type ThemeContextValue = {
  theme?: ThemeName
  setTheme: (theme: ThemeName | string) => void
  themes: readonly string[]
  resolvedTheme?: 'light' | 'dark'
  systemTheme?: 'light' | 'dark'
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function readSystem(): 'light' | 'dark' {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function resolveTheme(theme: ThemeName): 'light' | 'dark' {
  return theme === 'system' ? readSystem() : theme === 'dark' ? 'dark' : 'light'
}

function readStored(defaultTheme: string, enableSystem: boolean): ThemeName {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    /* ignore */
  }
  if (enableSystem && defaultTheme === 'system') return 'system'
  if (defaultTheme === 'dark' || defaultTheme === 'light') return defaultTheme as ThemeName
  return enableSystem ? 'system' : 'light'
}

function applyDOM(theme: ThemeName, disableTransitionOnChange?: boolean) {
  const resolved = resolveTheme(theme)
  const root = document.documentElement

  let cleanupTransitions = () => {}
  if (disableTransitionOnChange) {
    const el = document.createElement('style')
    el.appendChild(
      document.createTextNode(
        '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;transition:none!important}'
      )
    )
    document.head.appendChild(el)
    cleanupTransitions = () => {
      window.getComputedStyle(document.body).getPropertyValue('opacity')
      window.setTimeout(() => el.remove(), 1)
    }
  }

  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light'
  cleanupTransitions()
}

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string | string[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

function initialTheme(defaultTheme: string, enableSystem: boolean): ThemeName {
  if (defaultTheme === 'dark' || defaultTheme === 'light') return defaultTheme
  if (defaultTheme === 'system' && enableSystem) return 'system'
  return 'light'
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystem = true,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeName>(() =>
    initialTheme(defaultTheme, enableSystem)
  )
  const hydrated = React.useRef(false)
  const themeRef = React.useRef(theme)
  themeRef.current = theme

  React.useLayoutEffect(() => {
    const t = readStored(defaultTheme, enableSystem)
    setThemeState(t)
    applyDOM(t, disableTransitionOnChange)
    hydrated.current = true
  }, [defaultTheme, enableSystem, disableTransitionOnChange])

  React.useEffect(() => {
    if (!hydrated.current) return
    applyDOM(theme, disableTransitionOnChange)
  }, [theme, disableTransitionOnChange])

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onMq = () => applyDOM(themeRef.current, disableTransitionOnChange)
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [disableTransitionOnChange])

  const setTheme = React.useCallback((value: ThemeName | string) => {
    const next: ThemeName =
      value === 'dark' || value === 'light' || value === 'system' ? value : 'system'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    setThemeState(next)
  }, [])

  const themesList = React.useMemo(
    () => (enableSystem ? (['light', 'dark', 'system'] as const) : (['light', 'dark'] as const)),
    [enableSystem]
  )

  const resolvedTheme = resolveTheme(theme)
  const systemTheme = readSystem()

  const value = React.useMemo(
    (): ThemeContextValue => ({
      theme,
      setTheme,
      themes: [...themesList],
      resolvedTheme,
      systemTheme,
    }),
    [theme, setTheme, themesList, resolvedTheme, systemTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): Omit<ThemeContextValue, never> & { forcedTheme?: string } {
  const ctx = React.useContext(ThemeContext)
  if (!ctx)
    return {
      setTheme: () => {},
      themes: [],
      theme: undefined,
      resolvedTheme: undefined,
      systemTheme: undefined,
    }
  return ctx
}

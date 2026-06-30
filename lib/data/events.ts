import type { AppLocale } from '@/lib/data/service-types'

export type EventKind = 'group_class' | 'masterclass' | 'other'

export interface LocalizedEvent {
  slug: string
  type: EventKind
  startISO: string
  duration: string
  location: { fr: string; en: string }
  spotsLeft?: number
  title: { fr: string; en: string }
  summary: { fr: string; en: string }
}

export const events: LocalizedEvent[] = [
  {
    slug: 'cours-collectif-printemps',
    type: 'group_class',
    startISO: '2026-06-07T10:00:00+02:00',
    duration: '90 min',
    location: { fr: 'Parc de la Tête d’Or, Lyon', en: 'Parc de la Tête d’Or, Lyon' },
    spotsLeft: 6,
    title: {
      fr: 'Cours collectif : bases en ville',
      en: 'Group class: city foundations',
    },
    summary: {
      fr: 'Petit groupe pour travailler attention, marche au pied et calme en présence de stimulations urbaines.',
      en: 'Small-group session for focus, polite walking, and calm around urban distractions.',
    },
  },
  {
    slug: 'masterclass-agility',
    type: 'masterclass',
    startISO: '2026-06-21T14:00:00+02:00',
    duration: '2 h',
    location: {
      fr: 'Terrain partenaire — Bron',
      en: 'Partner field — Bron',
    },
    spotsLeft: 12,
    title: {
      fr: 'Masterclass agilité intermédiaire',
      en: 'Intermediate agility masterclass',
    },
    summary: {
      fr: 'Enchaînements, angles d’obstacles et gestion du sprint — pour binômes qui maîtrisent déjà les équipements de base.',
      en: 'Sequences, obstacle angles, and sprint handling—for teams who already know basic equipment.',
    },
  },
  {
    slug: 'atelier-rappel-distractions',
    type: 'other',
    startISO: '2026-07-05T09:30:00+02:00',
    duration: '2 h',
    location: { fr: 'Bois de Vincennes (transfert)', en: 'Partner woodland near Lyon' },
    spotsLeft: 8,
    title: {
      fr: 'Atelier rappel & distractions',
      en: 'Recall workshop with distractions',
    },
    summary: {
      fr: 'Travail progressif autour d’odeurs, autres chiens et jeu — longes et récompenses haute valeur.',
      en: 'Gradual work around scent, other dogs, and toys—long lines and high-value rewards.',
    },
  },
  {
    slug: 'pause-cafe-chiots',
    type: 'group_class',
    startISO: '2026-06-14T15:00:00+02:00',
    duration: '45 min',
    location: { fr: 'Lyon 9', en: 'Lyon 9th' },
    spotsLeft: 5,
    title: {
      fr: 'Café-chiots (socialisation douce)',
      en: 'Puppy café (gentle social hour)',
    },
    summary: {
      fr: 'Chiots 8–16 semaines : jeux calmes, habituation bruits et questions propriétaires avec mini-atelier.',
      en: 'Puppies 8–16 weeks: calm play, sound habituation, and owner Q&A mini-session.',
    },
  },
]

export function getEventLabels(locale: AppLocale) {
  const isEn = locale === 'en'
  const typeLabel: Record<EventKind, string> = isEn
    ? {
        group_class: 'Group class',
        masterclass: 'Masterclass',
        other: 'Workshop',
      }
    : {
        group_class: 'Cours collectif',
        masterclass: 'Masterclass',
        other: 'Atelier',
      }
  return { typeLabel }
}

export function getLocalizedEvent(e: LocalizedEvent, locale: AppLocale) {
  const l = locale === 'en' ? 'en' : 'fr'
  return {
    ...e,
    title: e.title[l],
    summary: e.summary[l],
    location: e.location[l],
  }
}

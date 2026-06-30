import type { Service } from '@/lib/data/service-types'

export const servicesFr: Service[] = [
  {
    slug: 'programme-10-semaines',
    title: 'Programme 10 semaines Standard',
    shortTitle: 'Programme 10 sem.',
    tagline: 'Ancrer des habitudes solides sur le long terme',
    description:
      'Parce qu\'une relation sereine ne se construit pas en une seule séance. Programme complet de 10 semaines : bilan comportemental, 5 séances individuelles 100 % personnalisées et suivi WhatsApp pour progresser ensemble, pas à pas.',
    image: '/images/service-programme.jpg',
    icon: 'calendar',
    duration: '10 semaines',
    location: 'À domicile ou en extérieur · Lyon 9',
    forWhom: [
      'Propriétaires qui veulent un vrai changement durable',
      'Chiens avec plusieurs problématiques à travailler',
      'Binômes prêts à s\'investir pas à pas',
    ],
    benefits: [
      'Habitudes solides ancrées dans le quotidien',
      'Compréhension profonde du comportement de votre chien',
      'Suivi WhatsApp pour ne jamais rester seul',
      'Progression structurée semaine après semaine',
    ],
    includes: [
      'Bilan comportemental complet (85 €)',
      '5 séances individuelles personnalisées (55 €/séance)',
      'Soutien et ajustements continus par WhatsApp',
    ],
    pricing: [
      {
        type: 'pack',
        label: 'Programme 10 semaines',
        price: 360,
        sessions: 10,
        description: 'Bilan + 5 séances + suivi WhatsApp inclus',
      },
    ],
    testimonial: {
      quote:
        'Marie nous a accompagnés avec patience et bienveillance. Moka progresse visiblement séance après séance.',
      author: 'Aline G.',
      dog: 'Moka, Malinoise',
    },
  },
  {
    slug: 'programme-6-semaines',
    title: 'Programme 6 semaines Standard',
    shortTitle: 'Programme 6 sem.',
    tagline: 'Cibler une problématique précise',
    description:
      'Besoin d\'un vrai changement au quotidien ? Programme de 6 semaines combinant bilan, cours individuels et suivi WhatsApp. Objectif : cibler et corriger une problématique précise pour relancer une bonne dynamique.',
    image: '/images/service-programme-6.jpg',
    icon: 'target',
    duration: '6 semaines',
    location: 'À domicile ou en extérieur · Lyon 9',
    forWhom: [
      'Une problématique claire (tirage, réactivité, chiot…)',
      'Propriétaires qui veulent un cadre structuré',
      'Binômes motivés pour appliquer entre les séances',
    ],
    benefits: [
      'Focus sur votre difficulté principale',
      'Plan d\'action concret dès le bilan',
      'Suivi WhatsApp pour ajuster en route',
      'Tarif avantageux sur les séances individuelles',
    ],
    includes: [
      'Bilan comportemental complet (85 €)',
      '3 séances individuelles personnalisées (55 €/séance)',
      'Soutien et ajustements continus par WhatsApp',
    ],
    pricing: [
      {
        type: 'pack',
        label: 'Programme 6 semaines',
        price: 250,
        sessions: 6,
        description: 'Bilan + 3 séances + suivi WhatsApp inclus',
      },
    ],
  },
  {
    slug: 'programme-premium',
    title: 'Programme 6 semaines Premium',
    shortTitle: 'Programme Premium',
    tagline: 'Accompagnement VIP avec fiches et visios d\'urgence',
    description:
      'Optez pour la sérénité absolue avec nos formules Premium : en plus du suivi complet, bénéficiez de fiches conseils personnalisées après chaque cours et de visios d\'urgence pour ne jamais rester dans le doute.',
    image: '/images/service-premium.jpg',
    icon: 'star',
    duration: '6 semaines',
    location: 'À domicile ou en extérieur · Lyon 9',
    forWhom: [
      'Propriétaires qui veulent un suivi renforcé',
      'Situations où le doute revient vite entre les séances',
      'Binômes qui apprécient un cadre très structuré',
    ],
    benefits: [
      'Fiche conseil personnalisée après chaque cours',
      '2 visios d\'urgence (20 min) en cas de doute',
      'Suivi WhatsApp premium',
      'Sérénité entre chaque séance',
    ],
    includes: [
      'Bilan comportemental complet (85 €)',
      '3 séances individuelles personnalisées',
      'Suivi WhatsApp + fiches conseils + 2 visios d\'urgence',
    ],
    pricing: [
      {
        type: 'pack',
        label: 'Programme 6 sem. Premium',
        price: 380,
        sessions: 6,
        description: 'Formule VIP — fiches + visios d\'urgence',
      },
      {
        type: 'pack',
        label: 'Programme 10 sem. Premium',
        price: 490,
        sessions: 10,
        description: 'Suivi long terme premium',
      },
    ],
  },
  {
    slug: 'balades-collectives',
    title: 'Balades collectives',
    shortTitle: 'Balades collectives',
    tagline: 'Socialisation et marche sereine en groupe',
    description:
      'Votre chien tire, s\'excite dès qu\'il croise un autre chien en ville ? Rejoignez nos balades collectives à Lyon : cadre sécurisé, 100 % bienveillant et sans jugement. On apprend à décoder leurs émotions pour retrouver le plaisir de se promener sereinement.',
    image: '/images/service-collectif.jpg',
    icon: 'users',
    duration: '1h',
    location: 'Lyon · lieux adaptés',
    forWhom: [
      'Chiens qui tirent ou s\'excitent en ville',
      'Chiots ou adultes à socialiser',
      'Propriétaires qui veulent retrouver le plaisir de se promener',
    ],
    benefits: [
      'Travail en conditions réelles avec distractions',
      'Cadre sécurisé sans jugement',
      'Décodage des émotions de votre chien',
      'Moment convivial entre propriétaires',
    ],
    includes: [
      'Balade encadrée en petit groupe',
      'Conseils personnalisés en direct',
      'Exercices adaptés au niveau du groupe',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Balade collective',
        price: 25,
        description: 'Séance à l\'unité',
      },
    ],
    testimonial: {
      quote:
        'Nous faisons régulièrement des balades collectives avec notre shiba. Super conseils et toujours dans la bienveillance.',
      author: 'Eva A.',
      dog: 'Shiba inu, 1 an',
    },
  },
  {
    slug: 'cours-collectifs',
    title: 'Cours collectifs',
    shortTitle: 'Cours collectifs',
    tagline: 'Apprendre en s\'amusant ensemble',
    description:
      'Marre de la routine ? Venez partager un moment ludique avec votre chien ! Cours collectifs pensés pour s\'amuser avant tout — flair, obéissance, proprioception et tant d\'autres activités pour renforcer votre complicité.',
    image: '/images/service-agility.jpg',
    icon: 'sparkles',
    duration: '1h',
    location: 'Lyon · salle ou extérieur',
    forWhom: [
      'Propriétaires qui veulent varier les activités',
      'Chiens curieux et sociables',
      'Binômes qui aiment apprendre en groupe',
    ],
    benefits: [
      'Activités diverses et motivantes',
      'Renforcement de la complicité',
      'Progression dans un cadre convivial',
      'Découverte de nouvelles disciplines',
    ],
    includes: [
      'Cours collectif encadré',
      'Exercices variés (flair, obéissance, proprioception…)',
      'Conseils adaptés à chaque binôme',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Cours collectif',
        price: 25,
        description: 'Séance à l\'unité',
      },
    ],
  },
  {
    slug: 'bilan-comportemental',
    title: 'Bilan comportemental',
    shortTitle: 'Bilan comportemental',
    tagline: 'Comprendre avant d\'agir',
    description:
      'Le bilan comportemental est un rendez-vous obligatoire pour faire une analyse de la situation en profondeur. À domicile ou en extérieur, Marie observe votre binôme et pose les bases d\'un plan sur mesure.',
    image: '/images/service-bilan.jpg',
    icon: 'clipboard-check',
    duration: '1h30',
    location: 'À domicile ou en extérieur · Lyon 9',
    forWhom: [
      'Première prise de contact avant un programme',
      'Situations complexes ou multi-problématiques',
      'Propriétaires qui veulent un diagnostic clair',
    ],
    benefits: [
      'Analyse complète de la situation',
      'Compréhension des causes, pas seulement des symptômes',
      'Plan d\'action personnalisé',
      'Obligatoire et inclus dans les programmes',
    ],
    includes: [
      'Observation du binôme en contexte réel',
      'Échange approfondi sur l\'historique et vos objectifs',
      'Recommandations concrètes pour la suite',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Bilan comportemental',
        price: 85,
        description: 'Inclus dans les programmes 6 et 10 semaines',
      },
    ],
    testimonial: {
      quote:
        'Marie connaît très bien les molosses et nous apporte énormément de conseils. Merci pour tout.',
      author: 'Clémentine G.',
      dog: 'Caly, molosse',
    },
  },
]

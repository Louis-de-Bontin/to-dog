import type { Service } from '@/lib/data/service-types'

export const servicesEn: Service[] = [
  {
    slug: 'programme-10-semaines',
    title: '10-Week Standard Programme',
    shortTitle: '10-Week Programme',
    tagline: 'Build lasting habits over time',
    description:
      'A calm relationship isn\'t built in one session. Full 10-week programme: behavioural assessment, 5 fully personalised individual sessions and WhatsApp support to progress together, step by step.',
    image: '/images/service-programme.jpg',
    icon: 'calendar',
    duration: '10 weeks',
    location: 'At home or outdoors · Lyon 9',
    forWhom: [
      'Guardians seeking lasting change',
      'Dogs with several issues to work on',
      'Teams ready to commit step by step',
    ],
    benefits: [
      'Solid habits anchored in daily life',
      'Deeper understanding of your dog',
      'WhatsApp support so you\'re never alone',
      'Structured weekly progression',
    ],
    includes: [
      'Full behavioural assessment (€85)',
      '5 personalised individual sessions (€55/session)',
      'Ongoing WhatsApp support and adjustments',
    ],
    pricing: [
      {
        type: 'pack',
        label: '10-week programme',
        price: 360,
        sessions: 10,
        description: 'Assessment + 5 sessions + WhatsApp included',
      },
    ],
    testimonial: {
      quote:
        'Marie supported us with patience and kindness. Moka improves visibly session after session.',
      author: 'Aline G.',
      dog: 'Moka, Malinois',
    },
  },
  {
    slug: 'programme-6-semaines',
    title: '6-Week Standard Programme',
    shortTitle: '6-Week Programme',
    tagline: 'Target one specific issue',
    description:
      'Need real change in daily life? 6-week programme combining assessment, individual lessons and WhatsApp support. Goal: target and fix one specific issue to restart a positive dynamic.',
    image: '/images/service-programme-6.jpg',
    icon: 'target',
    duration: '6 weeks',
    location: 'At home or outdoors · Lyon 9',
    forWhom: [
      'One clear issue (pulling, reactivity, puppy basics…)',
      'Guardians wanting a structured framework',
      'Teams motivated to practise between sessions',
    ],
    benefits: [
      'Focus on your main difficulty',
      'Concrete action plan from the assessment',
      'WhatsApp support to adjust along the way',
      'Reduced rate on individual sessions',
    ],
    includes: [
      'Full behavioural assessment (€85)',
      '3 personalised individual sessions (€55/session)',
      'Ongoing WhatsApp support',
    ],
    pricing: [
      {
        type: 'pack',
        label: '6-week programme',
        price: 250,
        sessions: 6,
        description: 'Assessment + 3 sessions + WhatsApp included',
      },
    ],
  },
  {
    slug: 'programme-premium',
    title: '6-Week Premium Programme',
    shortTitle: 'Premium Programme',
    tagline: 'VIP support with tip sheets and emergency video calls',
    description:
      'Choose peace of mind with Premium packages: full follow-up plus personalised tip sheets after each lesson and emergency video calls so you\'re never left in doubt.',
    image: '/images/service-premium.jpg',
    icon: 'star',
    duration: '6 weeks',
    location: 'At home or outdoors · Lyon 9',
    forWhom: [
      'Guardians wanting reinforced follow-up',
      'Situations where doubt returns quickly between sessions',
      'Teams who appreciate a very structured framework',
    ],
    benefits: [
      'Personalised tip sheet after each session',
      '2 emergency video calls (20 min) if in doubt',
      'Premium WhatsApp support',
      'Peace of mind between every session',
    ],
    includes: [
      'Full behavioural assessment (€85)',
      '3 personalised individual sessions',
      'WhatsApp + tip sheets + 2 emergency video calls',
    ],
    pricing: [
      {
        type: 'pack',
        label: '6-week Premium',
        price: 380,
        sessions: 6,
        description: 'VIP — tip sheets + emergency calls',
      },
      {
        type: 'pack',
        label: '10-week Premium',
        price: 490,
        sessions: 10,
        description: 'Long-term premium follow-up',
      },
    ],
  },
  {
    slug: 'balades-collectives',
    title: 'Group walks',
    shortTitle: 'Group walks',
    tagline: 'Socialisation and calm walking together',
    description:
      'Does your dog pull or get excited when meeting other dogs in town? Join our group walks in Lyon: a safe, 100% kind, judgment-free setting. Learn to read their emotions and enjoy walks again.',
    image: '/images/service-collectif.jpg',
    icon: 'users',
    duration: '1h',
    location: 'Lyon · suitable locations',
    forWhom: [
      'Dogs who pull or get excited in town',
      'Puppies or adults to socialise',
      'Guardians who want enjoyable walks again',
    ],
    benefits: [
      'Real-world practice with distractions',
      'Safe, judgment-free setting',
      'Reading your dog\'s emotions',
      'Friendly moment with other guardians',
    ],
    includes: [
      'Supervised small-group walk',
      'Personalised advice in the moment',
      'Exercises adapted to the group level',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Group walk',
        price: 25,
        description: 'Single session',
      },
    ],
    testimonial: {
      quote:
        'We regularly join group walks with our shiba. Great advice, always kind and supportive.',
      author: 'Eva A.',
      dog: 'Shiba Inu, 1 year',
    },
  },
  {
    slug: 'cours-collectifs',
    title: 'Group classes',
    shortTitle: 'Group classes',
    tagline: 'Learn while having fun together',
    description:
      'Tired of the routine? Come share a fun moment with your dog! Group classes designed for enjoyment first — scent work, obedience, proprioception and more to strengthen your bond.',
    image: '/images/service-agility.jpg',
    icon: 'sparkles',
    duration: '1h',
    location: 'Lyon · indoor or outdoor',
    forWhom: [
      'Guardians who want varied activities',
      'Curious, sociable dogs',
      'Teams who enjoy learning in a group',
    ],
    benefits: [
      'Varied, motivating activities',
      'Stronger bond with your dog',
      'Progress in a friendly setting',
      'Discovery of new disciplines',
    ],
    includes: [
      'Supervised group class',
      'Varied exercises (scent, obedience, proprioception…)',
      'Advice tailored to each team',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Group class',
        price: 25,
        description: 'Single session',
      },
    ],
  },
  {
    slug: 'bilan-comportemental',
    title: 'Behavioural assessment',
    shortTitle: 'Assessment',
    tagline: 'Understand before acting',
    description:
      'The behavioural assessment is a mandatory appointment for an in-depth analysis. At home or outdoors, Marie observes your team and builds a tailored plan.',
    image: '/images/service-bilan.jpg',
    icon: 'clipboard-check',
    duration: '1h30',
    location: 'At home or outdoors · Lyon 9',
    forWhom: [
      'First contact before a programme',
      'Complex or multi-issue situations',
      'Guardians wanting a clear diagnosis',
    ],
    benefits: [
      'Complete situation analysis',
      'Understanding causes, not just symptoms',
      'Personalised action plan',
      'Required and included in programmes',
    ],
    includes: [
      'Observation of your team in real context',
      'In-depth discussion of history and goals',
      'Concrete recommendations for next steps',
    ],
    pricing: [
      {
        type: 'single',
        label: 'Behavioural assessment',
        price: 85,
        description: 'Included in 6- and 10-week programmes',
      },
    ],
    testimonial: {
      quote:
        'Marie knows molosser breeds very well and gives us so much useful advice. Thank you!',
      author: 'Clémentine G.',
      dog: 'Caly, molosser',
    },
  },
]

import type { AppLocale } from '@/lib/data/service-types'

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

const faqFr: FAQItem[] = [
  {
    id: '1',
    question: 'Pourquoi éduquer son chien ?',
    answer:
      'Nos chiens vivent dans un monde d\'humains. Le but de l\'éducation est de leur apprendre les règles de notre monde et d\'apprendre, nous, à les comprendre. L\'éducation canine permet d\'avoir une relation chien-humain saine et apaisée.',
    category: 'general',
  },
  {
    id: '2',
    question: 'La friandise, c\'est pour toujours ?',
    answer:
      'La friandise est un « renforçateur » : elle permet de récompenser le chien quand il a eu le bon comportement. Tout d\'abord, la friandise n\'est pas la seule récompense — ça peut être un jouet, une caresse, une odeur, etc. Chaque chien a un ou plusieurs renforçateurs. Ensuite, une fois que le comportement est acquis, on enlève le renforçateur. Au besoin, on remet le renforçateur en place pour apprendre un nouveau comportement ou pour entretenir un comportement acquis.',
    category: 'general',
  },
  {
    id: '3',
    question: 'Mon chien est adulte, est-il trop tard ?',
    answer:
      'Tous les chiens peuvent apprendre des choses et à tout âge. La seule différence entre le chiot et le chien adulte est son expérience. Par exemple, un chien adulte qui saute sur les invités depuis 4 ans s\'est conditionné à avoir ce comportement et il lui faudra potentiellement plus de temps pour « perdre l\'habitude » qu\'un jeune chiot. Donc non, il n\'est jamais trop tard — cela peut juste prendre un peu plus de temps.',
    category: 'general',
  },
  {
    id: '4',
    question: 'À partir de quel âge commencer l\'éducation ?',
    answer:
      'On peut commencer l\'éducation de son chiot dès son arrivée — d\'ailleurs on peut même la commencer avant son adoption grâce au « conseil à l\'adoption », qui permet en amont de choisir la bonne race de chien selon votre mode de vie, le bon élevage, etc. Dès l\'arrivée du chiot, on peut commencer à prendre des cours d\'éducation afin d\'avoir des bases solides pour toute son éducation.',
    category: 'general',
  },
  {
    id: '5',
    question: 'Parcs à chiens : bonne ou mauvaise idée ?',
    answer:
      'Les parcs à chiens sont de plus en plus nombreux en ville et peuvent être une bonne idée — mais pas sans certaines informations. Les parcs à chiens sont comme une cour de récréation sans règles et sans adultes pour surveiller. Votre rôle est de voir (via les signaux de communication) si votre chien est à l\'aise avec les autres chiens, mais aussi s\'il ne met pas mal à l\'aise les autres chiens. Votre rôle est de surveiller et de lui trouver des solutions quand il est avec ses congénères.',
    category: 'general',
  },
  {
    id: '6',
    question: 'Comment se déroule un programme 6 ou 10 semaines ?',
    answer:
      'Chaque programme combine un bilan comportemental complet, des séances individuelles 100 % personnalisées et un suivi WhatsApp entre les séances. L\'objectif du programme 6 semaines : cibler et corriger une problématique précise. Le programme 10 semaines : ancrer des habitudes solides et comprendre votre chien en profondeur. Les formules Premium ajoutent des fiches conseils et des visios d\'urgence.',
    category: 'services',
  },
  {
    id: '7',
    question: 'Proposez-vous un appel découverte ?',
    answer:
      'Oui ! Vous hésitez à être accompagné(e) par un éducateur canin ? Vous avez des questions ? Réservez dès maintenant un appel découverte gratuit avant de vous lancer.',
    category: 'services',
  },
  {
    id: '8',
    question: 'Quelle zone géographique couvrez-vous ?',
    answer:
      'Je suis basée à Lyon 9 et j\'interviens sur Lyon et ses alentours pour les bilans, séances individuelles et collectifs.',
    category: 'logistics',
  },
]

const faqEn: FAQItem[] = faqFr.map((item) => {
  const map: Record<string, { q: string; a: string }> = {
    '1': {
      q: 'Why train your dog?',
      a: 'Dogs live in a human world. Training teaches them our rules and helps us understand them — for a healthier, calmer relationship.',
    },
    '2': {
      q: 'Do you use treats forever?',
      a: 'Treats are reinforcers for good behaviour — not the only option (toys, praise, scent work). Once a behaviour is learned, we fade the reinforcer and bring it back when teaching or maintaining something new.',
    },
    '3': {
      q: 'Is my adult dog too old?',
      a: 'Dogs can learn at any age. Adults with long-standing habits may need more time than puppies — but it\'s never too late.',
    },
    '4': {
      q: 'How early can we start?',
      a: 'From day one at home — or even before adoption with a pre-adoption consult to choose the right breed and breeder. Early months are ideal for solid foundations.',
    },
    '5': {
      q: 'Dog parks — good idea?',
      a: 'They can help if you watch closely: is your dog comfortable, and is he making others uncomfortable? Your job is to supervise and support — like a playground without rules.',
    },
    '6': {
      q: 'How do 6- or 10-week programmes work?',
      a: 'Each combines a full behavioural assessment, personalised individual sessions and WhatsApp support. The 6-week programme targets one specific issue; the 10-week programme builds lasting habits. Premium adds tip sheets and emergency video calls.',
    },
    '7': {
      q: 'Do you offer a discovery call?',
      a: 'Yes — book a free discovery call if you\'re unsure about working with a trainer or have questions before you commit.',
    },
    '8': {
      q: 'What area do you cover?',
      a: 'Based in Lyon 9th — assessments, individual and group sessions across Lyon and nearby areas.',
    },
  }
  const t = map[item.id]
  return t ? { ...item, question: t.q, answer: t.a } : item
})

export function getFAQByCategory(category: string, locale: AppLocale): FAQItem[] {
  const list = locale === 'en' ? faqEn : faqFr
  return list.filter((item) => item.category === category)
}

export function getFeaturedFAQ(count = 6, locale: AppLocale = 'fr'): FAQItem[] {
  const list = locale === 'en' ? faqEn : faqFr
  return list.slice(0, count)
}

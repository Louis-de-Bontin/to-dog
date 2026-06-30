import type { AppLocale } from '@/lib/data/service-types'

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  dog: {
    name: string
    breed: string
  }
  service: string
  rating: number
  image: string
}

const testimonialsFr: Testimonial[] = [
  {
    id: '1',
    quote:
      'Marie est une super éducatrice, bienveillante, à l\'écoute, et sait s\'adapter au chien. Je recommande franchement !',
    author: 'Mathilde Simond',
    location: 'Lyon',
    dog: { name: '—', breed: 'Client satisfait' },
    service: 'programme-6-semaines',
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '2',
    quote:
      'Cela fait presque un an que nous avons rencontré Marie pour des balades collectives puis des cours collectifs et un bilan individuel pour Moka. Marie est professionnelle, patiente, à l\'écoute. Nous recommandons sans hésitation.',
    author: 'Aline Georges',
    location: 'Lyon',
    dog: { name: 'Moka', breed: 'Malinoise' },
    service: 'balades-collectives',
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '3',
    quote:
      'Marie a beaucoup aidé mon chien Nao, qui est malvoyant, avec patience et bienveillance. Ses conseils sont clairs et elle est très sympa et à l\'écoute. Merci encore !',
    author: 'Camille Dubois',
    location: 'Lyon',
    dog: { name: 'Nao', breed: 'Chien malvoyant' },
    service: 'programme-10-semaines',
    rating: 5,
    image: '/images/trust-group.jpg',
  },
  {
    id: '4',
    quote:
      'Marie nous aide énormément pour Caly. Elle nous a apporté plein de tips pour le renoncement et la gestion des émotions. Gros point positif : Marie connaît très bien les molosses.',
    author: 'Clémentine Gallais',
    location: 'Lyon',
    dog: { name: 'Caly', breed: 'Molosse' },
    service: 'programme-premium',
    rating: 5,
    image: '/images/about-marie.jpg',
  },
  {
    id: '5',
    quote:
      'Très bonne expérience avec Marie. Excellente connaissance des comportements canins, très à l\'écoute de nos besoins. J\'ai testé les cours individuels et collectifs.',
    author: 'Anne Laffont',
    location: 'Lyon',
    dog: { name: '—', breed: 'Client régulier' },
    service: 'cours-collectifs',
    rating: 5,
    image: '/images/hero-3.jpg',
  },
  {
    id: '6',
    quote:
      'Nous faisons régulièrement des balades et cours collectifs avec notre shiba. Nous sommes ravis ! De super conseils et toujours dans la bienveillance.',
    author: 'Eva Andres',
    location: 'Lyon',
    dog: { name: 'Shiba', breed: 'Shiba Inu' },
    service: 'balades-collectives',
    rating: 5,
    image: '/images/hero-2.jpg',
  },
  {
    id: '7',
    quote:
      'Vous recherchez un éducateur canin ? Marie est la personne qu\'il vous faut ! Patient, douce, à l\'écoute — grâce à son accompagnement, j\'accompagne mon chiot sereinement avec les bonnes clés.',
    author: 'Amaryllis Carre',
    location: 'Lyon',
    dog: { name: 'Chiot', breed: '4 mois' },
    service: 'bilan-comportemental',
    rating: 5,
    image: '/images/testimonial-max.jpg',
  },
  {
    id: '8',
    quote:
      'Merci à Marie pour sa patience et sa gentillesse avec mon chien Rainy et moi-même ! Les cours sont une immense source d\'inspiration et un plaisir partagé. J\'ai une confiance énorme en Marie.',
    author: 'Elisa Vogin',
    location: 'Lyon',
    dog: { name: 'Rainy', breed: '—' },
    service: 'cours-collectifs',
    rating: 5,
    image: '/images/testimonial-oscar.jpg',
  },
]

const testimonialsEn: Testimonial[] = testimonialsFr.map((item, idx) => {
  const enQuotes = [
    'Marie is a wonderful trainer — kind, attentive, and adapts to each dog. Highly recommended!',
    'We\'ve been with Marie for almost a year — group walks, group classes, and an individual assessment for Moka. Professional, patient, and caring. We recommend without hesitation.',
    'Marie helped my visually impaired dog Nao so much — patient, clear advice, and genuinely kind. Thank you again!',
    'Marie has been a huge help with Caly — great tips on impulse control and emotions. She really knows molosser breeds.',
    'Great experience with Marie — deep knowledge of dog behaviour, listens to our needs. I tried individual and group sessions.',
    'We regularly join group walks and classes with our shiba. Excellent advice, always kind and supportive.',
    'Looking for a dog trainer? Marie is the one! Patient, gentle, attentive — thanks to her support I can raise my puppy with confidence.',
    'Thank you Marie for your patience and kindness with my dog Rainy and me! The classes are inspiring and a shared pleasure. I trust Marie completely.',
  ]
  return { ...item, quote: enQuotes[idx] ?? item.quote }
})

export function getTestimonials(locale: AppLocale = 'fr'): Testimonial[] {
  return locale === 'en' ? testimonialsEn : testimonialsFr
}

export function getFeaturedTestimonials(count = 3, locale: AppLocale = 'fr'): Testimonial[] {
  return getTestimonials(locale).slice(0, count)
}

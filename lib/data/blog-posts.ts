import type { AppLocale } from '@/lib/data/service-types'

export interface BlogPost {
  slug: string
  coverImage: string
  alt: { fr: string; en: string }
  publishedAt: string
  readingMinutes: { fr: number; en: number }
  title: { fr: string; en: string }
  description: { fr: string; en: string }
  body: { fr: string; en: string }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'vaccination-chien',
    coverImage: '/images/blog/vaccination.png',
    alt: {
      fr: 'Illustration : chien chez le vétérinaire (aperçu démo)',
      en: 'Illustration: dog at veterinary visit (demo preview)',
    },
    publishedAt: '2026-04-02',
    readingMinutes: { fr: 6, en: 5 },
    title: {
      fr: 'Calendrier vaccinal du chiot et du chien adulte : que faut-il savoir ?',
      en: 'Puppy and adult dog vaccinations: what owners should know',
    },
    description: {
      fr: 'Réflexes pratiques et limites — ce texte informe mais ne remplace jamais l’avis d’un vétérinaire.',
      en: 'Practical habits and boundaries—informational only; always follow your veterinarian’s advice.',
    },
    body: {
      fr: `## Vaccins : protéger sans vous substituer au vétérinaire

Les vaccins aident à prévenir certaines maladies graves. Le **plan exact** (produits, rythme, rappels) dépend de l’âge, du mode de vie, des voyages et des risques locaux : c’est votre vétérinaire qui le personnalise.

### Chiot

- La série démarre en général **autour de 8 semaines** et se poursuit par des injections espacées selon le protocole choisi.
- Évitez les parcs très fréquentés et les contacts avec des chiens inconnus **tant que le schéma n’est pas complété**, sauf avis contraire professionnel.

### Adulte

- Les **rappels** ne sont pas tous annuels : certains antigènes peuvent être espacés après un historique complet.
- Notez les dates dans un carnet ou une appli : cela facilite les voyages et la pension.

### Ce que ce guide ne fait pas

Remplacer un examen clinique, interpréter un résultat sanguin ou décider seul d’arrêter un vaccin. En cas de réaction suspecte après injection, **contactez immédiatement votre clinique**.

---

*Image générée pour démonstration — ne représente pas un cas réel précis.*
`,
      en: `## Vaccinations: prevent disease, keep your vet in the loop

Core vaccines reduce risk for severe illnesses. The **exact schedule** (products, intervals, titre testing vs boosters) depends on age, lifestyle, travel, and local regulation—your veterinarian decides.

### Puppies

- Series commonly begin **near 8 weeks** with boosters spaced per clinic protocol.
- Limit dog parks and unknown dogs **until your vet clears broader exposure**.

### Adults

- **Boosters are not automatically yearly** once the primary series is complete.
- Track dates—it simplifies boarding and international paperwork.

### What this article is not

A substitute for an exam or for stopping boosters without professional guidance. If you notice swelling, lethargy, or breathing issues soon after a shot, **call your veterinary team right away**.

---

*AI-generated illustrative image for this prototype.*
`,
    },
  },
  {
    slug: 'voyager-avion-chien',
    coverImage: '/images/blog/travel.png',
    alt: {
      fr: 'Illustration : voyage en avion avec chien (aperçu démo)',
      en: 'Illustration: flying with a dog (demo preview)',
    },
    publishedAt: '2026-04-18',
    readingMinutes: { fr: 7, en: 6 },
    title: {
      fr: 'Prendre l’avion avec son chien : formalités, caisse et bons réflexes',
      en: 'Flying internationally with your dog: paperwork, crates, and planning',
    },
    description: {
      fr: 'Check-list générale — vérifiez toujours compagnie, pays de départ/arrivée et dates de publication des règles.',
      en: 'General checklist—always confirm airline, departure/arrival countries, and the latest rule updates.',
    },
    body: {
      fr: `## Pourquoi il n’existe pas de “règle universelle”

Chaque **compagnie aérienne** définit des gabarits de caisse, des températures mini/maxi (cabine / soute) et des quotas. Chaque **pays** exige santé, anti-parasitaires ou délais d’entrée différents. Les textes changent souvent — notez toujours la **source officielle**.

### Étapes robustes avant achat billet

1. Appelez ou lisez la page fret / animaux du transporteur avec le **modèle précis de l’appareil** (Airbus vs Boeing sur la même ligne = parfois des contraintes différentes).
2. Mesurez chien debout puis choisissez une **caisse compatible IATA** avec gamelles fixées et ventilation sur plusieurs faces.
3. Vérifiez **temps de correspondance**, surtout en soute uniquement climatisée jusqu’à l’avion.
4. Préparez dossier santé avec **microchip lisible**, vaccins obligatoires, titre rabique ou visite officielle selon pays.

### Bien-être

- Hydratation régulière, sorties avant embarquement **sans précipitation stressante**.
- Faites de la caisse un lieu repos à la maison avant le trajet critique.

Je ne certifie pas vos dossiers administratifs — travaillez avec **clinique voyage / vétérinaire officiel** hors Europe comme en intra-UE.

---

*Illustration générée par IA pour la démo.*
`,
      en: `## Why there is no single global checklist

Airlines publish **carrier sizes**, cargo vs cabin rules, embargo windows for heat/cold, and quotas. Governments differ on **timing** for vaccines, parasite treatments, and rabies titre tests.

### Robust prep workflow

1. Read the airline’s live animal FAQ for **your precise aircraft**.
2. Measure your dog upright and reclining; secure an **airline-approved rigid or soft crate** per cabin/hold placement.
3. Audit **connection times** especially for hold travel.
4. Bundle microchip digits, vaccinations, parasite proof, rabies titre if applicable.

### Welfare

Condition the crate calmly; frantic pre-flight arousal spikes cortisol when you actually need digestion stable.

Professionals certify paperwork—blogs don’t—especially outside the EU.

---

*AI illustration for demonstration.*
`,
    },
  },
  {
    slug: 'rappel-echec-causes',
    coverImage: '/images/blog/recall.png',
    alt: {
      fr: 'Illustration : rappel au parc (aperçu démo)',
      en: 'Illustration: recall training in park (demo preview)',
    },
    publishedAt: '2026-05-01',
    readingMinutes: { fr: 8, en: 7 },
    title: {
      fr: 'Pourquoi mon chien ne revient pas quand je l’appelle ?',
      en: 'Why doesn’t my dog come when called?',
    },
    description: {
      fr: 'Quatre pièges classiques — et une progression courte avant grosses distractions.',
      en: 'Four classic pitfalls—and staged training before maximal distractions.',
    },
    body: {
      fr: `## Ce n’est pas “de l’obstination” au hasard

Le rappel combine **valeur**, **la clarté de ce que votre chien anticipe juste après le rappel**, et **le** niveau de distraction environnementale. Sauter des étapes fait vite perdre fiabilité à la demande.

### 1 — Le mot précède la fin du jeu

« Viens » suivi chaque fois d’un retour au véhicule ou d’une remise en laisse = la prochaine fois votre chien retarde le retour (« jusqu’où puis-je prolonger ? »). Variez la séquence avec un **bonus surprise** après les rappels volontaires.

### 2 — Récompense faible versus distraction forte

Une croquette sèche ne rivalise pas **avec** un binôme en jeu animé ni **avec** une piste d’odeurs brûlante : rapprochez-vous (**distance courte**) tout en augmentant la valeur **et** la variété **des** récompenses.

### 3 — Timing et volume des signaux

Un appel monocorde quand votre chien est déjà hypnotisé = habitude à ignorer. Changez tonalité courte + posture engageante puis **récompenses haute densité**.

### 4 — Défaut de généralisation

Maison impeccable ≠ forêt grouillante. Ajoutez un facteur environnement (+1 à la fois) en **longe** avant détacher.

### Amateur mini-plan

1. Séquences courtes très bien rémunérées, puis longe nylon ou biothane avant liberté **dans** une nouvelle zone.
2. Une deuxième personne ludique aide **à fractionner** l’attention si le terrain **l’exige**.

Un professionnel aide à tracer un plan adapté au **tempérament** individuel du chien.

---

*Couverture générée — article démo.*
`,
      en: `## Recall is stacked skills, not shouting louder

Cue meaning, **prediction of punishment or boring outcomes**, reinforcement quality, environmental challenge—skip layers and cue breaks fast.

### 1 — Recall predicts leaving fun

Ending play every time trains distance games. Surprise continues after recalls sometimes—not randomly cruel, just probabilistic richness.

### 2 — Reward too cheap

Bump food + tug + chasing you in straight lines—the competition is squirrels, scents, flirt poles from other handlers.

### 3 — Signals too flat

If monotone fails, switch upbeat markers only when manageable distance already closed.

### 4 — Lack of layering

Parking-lot brilliance ≠ wetland wildlife. Thin contexts on long lines until metrics say otherwise.

Tiny progression: high hit-rate hallway → leash laws field → fenced rentable spaces → audited off leash.

Coach eyes catch handler patterns text cannot.

---

*AI-generated cover — demo lesson.*
`,
    },
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getBlogPostLocalized(post: BlogPost, locale: AppLocale) {
  const l = locale === 'en' ? 'en' : 'fr'
  return {
    ...post,
    title: post.title[l],
    description: post.description[l],
    body: post.body[l],
    alt: post.alt[l],
    readingMinutes: post.readingMinutes[l],
  }
}

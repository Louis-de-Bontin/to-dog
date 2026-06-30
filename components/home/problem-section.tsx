'use client'

import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { AlertCircle, ArrowRight, Frown, HelpCircle, XCircle } from 'lucide-react'
import { IconTitleRow } from '@/components/shared/icon-title-row'
import { SectionWrapper, SectionHeader } from '@/components/shared/section-wrapper'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const imageFrameClass =
  'relative overflow-hidden rounded-2xl border border-primary/15 shadow-sm'

type ProblemCellData = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
  imageClassName?: string
  iconClassName?: string
}

function ProblemBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground md:text-base">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            aria-hidden
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}

function ProblemFeaturedWithNested({
  primary,
  nested,
}: {
  primary: ProblemCellData
  nested: ProblemCellData
}) {
  const PrimaryIcon = primary.icon
  const NestedIcon = nested.icon

  return (
    <div className="flex flex-col">
      <div className="border-l-4 border-accent pl-4">
        <IconTitleRow
          icon={PrimaryIcon}
          title={primary.title}
          iconClassName={primary.iconClassName}
          titleClassName="text-xl md:text-2xl"
        />
        <p className="mt-3 text-sm text-muted-foreground md:text-base">{primary.description}</p>
        <ProblemBulletList bullets={primary.bullets} />
      </div>
      <div className={cn(imageFrameClass, 'mt-6 aspect-[16/10]')}>
        <Image
          src={primary.image}
          alt={primary.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className={cn('object-cover', primary.imageClassName)}
        />
      </div>

      <div className="mt-6 border-t border-primary/15 pt-6">
        <div className="surface-cream rounded-xl border border-border bg-card/60 p-4">
          <IconTitleRow
            icon={NestedIcon}
            title={nested.title}
            iconClassName={nested.iconClassName}
          />
          <p className="mt-3 text-sm text-muted-foreground">{nested.description}</p>
          <ProblemBulletList bullets={nested.bullets} />
          <div className={cn(imageFrameClass, 'mt-4 aspect-[4/3]')}>
            <Image
              src={nested.image}
              alt={nested.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={cn('object-cover', nested.imageClassName ?? 'object-[center_38%]')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProblemCompactCell({
  icon: Icon,
  title,
  description,
  bullets,
  image,
  imageAlt,
  imageClassName,
  iconClassName,
}: ProblemCellData) {
  return (
    <div className="flex h-full flex-col">
      <IconTitleRow icon={Icon} title={title} iconClassName={iconClassName} />
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      <ProblemBulletList bullets={bullets} />
      <div className={cn(imageFrameClass, 'mt-4 aspect-[4/3]')}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          className={cn('object-cover', imageClassName)}
        />
      </div>
    </div>
  )
}

export function ProblemSection() {
  const t = useTranslations('problem')

  const primary: ProblemCellData = {
    icon: XCircle,
    title: t('p1Title'),
    description: t('p1Desc'),
    bullets: t.raw('p1Bullets') as string[],
    image: '/images/service-programme.jpg',
    imageAlt: t('p1ImageAlt'),
    imageClassName: 'object-[center_45%]',
    iconClassName: 'bg-accent/15',
  }

  const nested: ProblemCellData = {
    icon: HelpCircle,
    title: t('p4Title'),
    description: t('p4Desc'),
    bullets: t.raw('p4Bullets') as string[],
    image: '/images/service-education.jpg',
    imageAlt: t('p4ImageAlt'),
    imageClassName: 'object-[center_40%]',
  }

  const compactCells = [
    {
      id: 'problem-p2',
      data: {
        icon: Frown,
        title: t('p2Title'),
        description: t('p2Desc'),
        bullets: t.raw('p2Bullets') as string[],
        image: '/images/service-reeducation.jpg',
        imageAlt: t('p2ImageAlt'),
        imageClassName: 'object-[center_40%]',
      } satisfies ProblemCellData,
      className: cn(
        'surface-sage transition-shadow hover:shadow-md md:col-span-2',
        'border-b border-border',
      ),
    },
    {
      id: 'problem-p3',
      data: {
        icon: AlertCircle,
        title: t('p3Title'),
        description: t('p3Desc'),
        bullets: t.raw('p3Bullets') as string[],
        image: '/images/service-promenades.jpg',
        imageAlt: t('p3ImageAlt'),
        imageClassName: 'object-[center_35%]',
        iconClassName: 'bg-accent/10',
      } satisfies ProblemCellData,
      className: cn(
        'bg-card transition-shadow hover:shadow-md md:col-span-2',
        'border-b border-border',
      ),
    },
  ]

  return (
    <SectionWrapper background="alt" id="problemes">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <BentoGrid className="md:auto-rows-min">
        <BentoCard
          id="problem-p1"
          className={cn(
            'surface-terracotta transition-shadow hover:shadow-md md:col-span-4 md:row-span-2',
            'border-b border-border md:border-r',
          )}
        >
          <ProblemFeaturedWithNested primary={primary} nested={nested} />
        </BentoCard>

        {compactCells.map((cell) => (
          <BentoCard key={cell.id} id={cell.id} className={cell.className}>
            <ProblemCompactCell {...cell.data} />
          </BentoCard>
        ))}
      </BentoGrid>

      <p className="mt-8 text-center text-base text-muted-foreground md:text-lg">
        {t('bridge')}{' '}
        <Link
          href="#solution"
          className="inline-flex items-center gap-1 font-medium text-primary no-underline transition-colors hover:text-accent"
        >
          {t('bridgeLink')}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </SectionWrapper>
  )
}

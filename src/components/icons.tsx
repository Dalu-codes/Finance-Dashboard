import type { SVGProps } from 'react'

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth={2.5} />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth={2.5} />
    </svg>
  )
}

export function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3 9L12 2L21 9V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <polyline points="20 12 20 22 4 22 4 12" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="7" width="20" height="5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="22" x2="12" y2="7" strokeLinecap="round" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const investmentIcons = {
  plane: PlaneIcon,
  home: HomeIcon,
  gift: GiftIcon,
} as const

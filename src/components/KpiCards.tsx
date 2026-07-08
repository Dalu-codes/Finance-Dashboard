import type { Overview } from '@/types/finance'
import { formatCompactNaira } from '@/utils/format'

interface KpiCardsProps {
  overview: Overview
}

export function KpiCards({ overview }: KpiCardsProps) {
  const cards = [
    { label: 'Overall Balance', value: overview.overallBalance },
    { label: 'Total Balance', value: overview.totalBalance },
    { label: 'Total Expense', value: overview.totalExpense },
  ]

  return (
    <section aria-label="Key financial metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-card border border-stroke bg-white px-5 pb-6 pt-5">
          <p className="mb-3 font-body text-[13px] text-body">{card.label}</p>
          <p className="font-heading text-3xl font-bold tracking-heading text-ink">
            {formatCompactNaira(card.value)}
          </p>
        </div>
      ))}
    </section>
  )
}

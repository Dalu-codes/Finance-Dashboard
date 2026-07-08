import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { ExpenseSummary } from '@/types/finance'
import { formatNaira } from '@/utils/format'

interface ExpenseDonutProps {
  expenses: ExpenseSummary
}

const GREEN_DK = '#118B1D'
const STROKE = '#EFEFEF'

export function ExpenseDonut({ expenses }: ExpenseDonutProps) {
  // The donut ring itself is a fixed 80/20 illustrative split (matches the
  // original design), independent of the category breakdown below it.
  const ringData = [
    { name: 'filled', value: 80 },
    { name: 'empty', value: 20 },
  ]

  const changeLabel =
    expenses.percentChangeVsLastWeek <= 0
      ? `${expenses.percentChangeVsLastWeek}% compared to last week`
      : `+${expenses.percentChangeVsLastWeek}% compared to last week`

  return (
    <aside aria-labelledby="right-title" className="flex h-full flex-col rounded-card border border-stroke bg-white p-5">
      <p id="right-title" className="mb-5 font-body text-sm text-body">
        Total Expense
      </p>

      <div className="mb-7 flex items-center justify-center">
        <div
          className="relative h-[180px] w-[180px]"
          role="img"
          aria-label={`Donut chart showing total expense of ${formatNaira(
            expenses.total,
          )}, which is ${expenses.percentChangeVsLastWeek}% compared to last week.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ringData}
                dataKey="value"
                innerRadius="76%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive
                animationDuration={1000}
              >
                <Cell fill={GREEN_DK} />
                <Cell fill={STROKE} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-xl font-bold leading-tight tracking-heading text-ink">
              {formatNaira(expenses.total)}
            </span>
            <span className="mt-1 max-w-[100px] text-center font-body text-[11px] leading-tight text-body">
              {changeLabel}
            </span>
          </div>
        </div>
      </div>

      <div role="list" aria-label="Expense breakdown" className="flex flex-col">
        {expenses.categories.map((category, i) => (
          <div
            key={category.id}
            role="listitem"
            className={`flex items-center justify-between py-3.5 ${
              i !== expenses.categories.length - 1 ? 'border-b border-stroke' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-full bg-ink" />
              <span className="font-body text-sm text-ink">{category.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-[13px] leading-none text-red">
                &#x2197;
              </span>
              <span className="font-heading text-[13px] font-semibold tracking-heading text-red">
                {formatNaira(category.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

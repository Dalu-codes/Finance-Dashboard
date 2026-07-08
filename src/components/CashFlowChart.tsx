import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CashFlowPeriod, CashFlowPoint } from '@/types/finance'
import { ChevronDownIcon } from './icons'
import { formatNaira } from '@/utils/format'

interface CashFlowChartProps {
  data: CashFlowPoint[]
  period: CashFlowPeriod
  onPeriodChange: (period: CashFlowPeriod) => void
}

const PERIODS: CashFlowPeriod[] = ['This week', 'This month', 'This year']

const GRID = '#EFEFEF'
const BLUE = '#0983B7'
const GREEN = '#2BA000'

export function CashFlowChart({ data, period, onPeriodChange }: CashFlowChartProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section aria-labelledby="cashflow-title" className="rounded-card border border-stroke bg-white px-5 py-5 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p id="cashflow-title" className="font-body text-sm text-body">
          Cash flow
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-body text-[13px] text-body">
              <span aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 rounded-sm" style={{ background: BLUE }} />
              Expense
            </span>
            <span className="flex items-center gap-1.5 font-body text-[13px] text-body">
              <span aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 rounded-sm bg-green-lt" />
              Savings
            </span>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Select time period"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 border-none bg-none font-body text-[13px] font-medium text-ink"
            >
              {period}
              <ChevronDownIcon className="h-3.5 w-3.5 text-ink" />
            </button>
            {menuOpen && (
              <ul
                role="listbox"
                className="absolute right-0 z-10 mt-1 w-32 overflow-hidden rounded-md border border-stroke bg-white shadow-md"
              >
                {PERIODS.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={p === period}
                      onClick={() => {
                        onPeriodChange(p)
                        setMenuOpen(false)
                      }}
                      className={`w-full px-3 py-2 text-left font-body text-[13px] hover:bg-bg ${
                        p === period ? 'font-semibold text-ink' : 'text-body'
                      }`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div
        role="img"
        aria-label="Bar chart showing cash flow. Expense (blue) and Savings (green) bars."
        className="h-[220px] w-full sm:h-[240px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fill: '#535353' }}
              tickFormatter={(day: string) => day.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 100000]}
              tickCount={6}
              tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#535353' }}
              tickFormatter={(v: number) => `\u20A6 ${(v / 1000).toFixed(0)},000`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
              formatter={(value: number) => formatNaira(value)}
              contentStyle={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #EFEFEF',
              }}
            />
            <Bar dataKey="expense" name="Expense" fill={BLUE} radius={[3, 3, 0, 0]} maxBarSize={18} />
            <Bar dataKey="savings" name="Savings" fill={GREEN} radius={[3, 3, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

import type { InvestmentSummary } from '@/types/finance'
import { investmentIcons, PlusIcon } from './icons'
import { formatNaira } from '@/utils/format'

interface InvestmentPlansProps {
  investments: InvestmentSummary
  onAddInvestment?: () => void
}

export function InvestmentPlans({ investments, onAddInvestment }: InvestmentPlansProps) {
  return (
    <section aria-labelledby="invest-title" className="rounded-card border border-stroke bg-white px-5 py-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p id="invest-title" className="mb-1 font-body text-sm text-body">
            Investment plans
          </p>
          <button
            type="button"
            aria-label="Add new investment plan"
            onClick={onAddInvestment}
            className="flex items-center gap-1 font-body text-[13px] font-medium text-green-lt"
          >
            <PlusIcon className="h-3.5 w-3.5 text-green-lt" />
            Add
          </button>
        </div>
        <div>
          <p className="text-right font-heading text-xl font-bold leading-tight tracking-heading text-ink">
            {formatNaira(investments.totalSavings)}
          </p>
          <p className="text-right font-body text-xs text-body">Total Savings</p>
        </div>
      </div>

      <div className="flex flex-col gap-[18px]">
        {investments.plans.map((plan) => {
          const Icon = investmentIcons[plan.icon]
          const percent = Math.min(100, Math.round((plan.current / plan.target) * 100))
          return (
            <div key={plan.id}>
              <div className="mb-1.5 flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-green-dk"
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="flex-1 font-heading text-[15px] font-semibold tracking-heading text-ink">
                  {plan.name}
                </span>
                <span className="font-body text-xs text-body">
                  {formatNaira(plan.current)}/{formatNaira(plan.target)}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${plan.name}: ${percent}% funded`}
                className="ml-[46px] h-[5px] overflow-hidden rounded-full bg-stroke"
              >
                <div
                  className="h-full rounded-full bg-green-lt transition-[width] duration-1000 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

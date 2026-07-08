import { useState } from 'react'
import { TopBar } from '@/components/TopBar'
import { KpiCards } from '@/components/KpiCards'
import { CashFlowChart } from '@/components/CashFlowChart'
import { InvestmentPlans } from '@/components/InvestmentPlans'
import { UpcomingBills } from '@/components/UpcomingBills'
import { ExpenseDonut } from '@/components/ExpenseDonut'
import { AddBillModal } from '@/components/AddBillModal'
import { AddInvestmentModal } from '@/components/AddInvestmentModal'
import { useFinanceDashboard } from '@/hooks/useFinanceDashboard'
import type { CashFlowPeriod } from '@/types/finance'

function App() {
  const [period, setPeriod] = useState<CashFlowPeriod>('This week')
  const [isAddBillOpen, setIsAddBillOpen] = useState(false)
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false)
  const { data, isLoading, isFallback, error, refetch } = useFinanceDashboard(period)

  return (
    <div className="mx-auto max-w-page bg-bg pb-10">
      <TopBar user={data.user} />

      {isFallback && (
        <div className="mx-4 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-card border border-stroke bg-white px-4 py-2.5 sm:mx-5">
          <p className="font-body text-[13px] text-body">
            Showing sample data — couldn&apos;t reach the backend{error ? ` (${error})` : ''}.
          </p>
          <button
            type="button"
            onClick={refetch}
            className="font-body text-[13px] font-semibold text-green-lt"
          >
            Retry
          </button>
        </div>
      )}

      <main role="main" className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-5 lg:px-5">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4" aria-busy={isLoading}>
          <KpiCards overview={data.overview} />

          <CashFlowChart data={data.cashFlow} period={period} onPeriodChange={setPeriod} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InvestmentPlans investments={data.investments} onAddInvestment={() => setIsAddInvestmentOpen(true)} />
            <UpcomingBills bills={data.bills} onAddBill={() => setIsAddBillOpen(true)} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <ExpenseDonut expenses={data.expenses} />
      </main>

      {isAddBillOpen && (
        <AddBillModal onClose={() => setIsAddBillOpen(false)} onSuccess={refetch} />
      )}
      {isAddInvestmentOpen && (
        <AddInvestmentModal onClose={() => setIsAddInvestmentOpen(false)} onSuccess={refetch} />
      )}
    </div>
  )
}

export default App

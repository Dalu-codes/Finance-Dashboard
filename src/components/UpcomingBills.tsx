import type { Bill } from '@/types/finance'
import { PlusIcon } from './icons'
import { formatDueDate, formatNaira } from '@/utils/format'

interface UpcomingBillsProps {
  bills: Bill[]
  onAddBill?: () => void
}

export function UpcomingBills({ bills, onAddBill }: UpcomingBillsProps) {
  return (
    <section aria-labelledby="bills-title" className="rounded-card border border-stroke bg-white px-5 py-5">
      <div className="mb-4 flex items-center justify-between">
        <p id="bills-title" className="font-body text-sm text-body">
          Upcoming bills
        </p>
        <button
          type="button"
          aria-label="Add new bill"
          onClick={onAddBill}
          className="flex items-center gap-1 font-body text-[13px] font-medium text-green-lt"
        >
          <PlusIcon className="h-3.5 w-3.5 text-green-lt" />
          Add
        </button>
      </div>
      <div role="list" className="flex flex-col">
        {bills.map((bill, i) => (
          <div
            key={bill.id}
            role="listitem"
            className={`flex items-center justify-between py-3.5 ${
              i !== bills.length - 1 ? 'border-b border-stroke' : ''
            }`}
          >
            <div>
              <p className="mb-0.5 font-heading text-sm font-semibold tracking-heading text-ink">{bill.name}</p>
              <p className="font-body text-xs text-body">{formatDueDate(bill.dueDate)}</p>
            </div>
            <p className="text-right font-heading text-sm font-bold tracking-heading text-ink">
              {formatNaira(bill.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

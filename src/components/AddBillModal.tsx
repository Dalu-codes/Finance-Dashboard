import { useState, type FormEvent } from 'react'
import { financeApi } from '@/api/financeApi'

interface AddBillModalProps {
  onClose: () => void
  /** Called after the bill was saved successfully, so the caller can refetch the dashboard. */
  onSuccess: () => void
}

export function AddBillModal({ onClose, onSuccess }: AddBillModalProps) {
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const parsedAmount = Number(amount)
    if (!name.trim() || !dueDate || !parsedAmount || parsedAmount <= 0) {
      setError('Please fill in a name, due date, and an amount greater than 0.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // This is the actual call to the backend: POST /api/finance/bills
    try {
      await financeApi.addBill({ name: name.trim(), dueDate, amount: parsedAmount })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add bill')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-bill-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-card border border-stroke bg-white p-5"
      >
        <h2 id="add-bill-title" className="mb-4 font-heading text-lg font-bold tracking-heading text-ink">
          Add bill
        </h2>

        <label className="mb-3 block">
          <span className="mb-1 block font-body text-[13px] text-body">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Netflix subscription"
            className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
          />
        </label>

        <label className="mb-3 block">
          <span className="mb-1 block font-body text-[13px] text-body">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block font-body text-[13px] text-body">Amount (₦)</span>
          <input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 15000"
            className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
          />
        </label>

        {error && <p className="mb-3 font-body text-[13px] text-red">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 font-body text-[13px] font-medium text-body"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-green-lt px-4 py-2 font-body text-[13px] font-semibold text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save bill'}
          </button>
        </div>
      </form>
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import { financeApi } from '@/api/financeApi'
import { investmentIcons } from './icons'

interface AddInvestmentModalProps {
  onClose: () => void
  onSuccess: () => void
}

const ICON_OPTIONS: Array<{ value: 'plane' | 'home' | 'gift'; label: string }> = [
  { value: 'plane', label: 'Travel' },
  { value: 'home', label: 'Home' },
  { value: 'gift', label: 'Gift' },
]

export function AddInvestmentModal({ onClose, onSuccess }: AddInvestmentModalProps) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<'plane' | 'home' | 'gift'>('plane')
  const [current, setCurrent] = useState('')
  const [target, setTarget] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const parsedCurrent = current === '' ? 0 : Number(current)
    const parsedTarget = Number(target)

    if (!name.trim() || !parsedTarget || parsedTarget <= 0 || parsedCurrent < 0) {
      setError('Please fill in a name and a target amount greater than 0.')
      return
    }
    if (parsedCurrent > parsedTarget) {
      setError('Current amount can\u2019t be more than the target.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // POST /api/finance/investments
    try {
      await financeApi.addInvestmentPlan({
        name: name.trim(),
        icon,
        current: parsedCurrent,
        target: parsedTarget,
      })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add investment plan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-investment-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-card border border-stroke bg-white p-5"
      >
        <h2 id="add-investment-title" className="mb-4 font-heading text-lg font-bold tracking-heading text-ink">
          Add investment plan
        </h2>

        <label className="mb-3 block">
          <span className="mb-1 block font-body text-[13px] text-body">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. New Laptop"
            className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
          />
        </label>

        <fieldset className="mb-3">
          <legend className="mb-1 font-body text-[13px] text-body">Icon</legend>
          <div className="flex gap-2">
            {ICON_OPTIONS.map((opt) => {
              const Icon = investmentIcons[opt.value]
              const selected = icon === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={selected}
                  aria-label={opt.label}
                  onClick={() => setIcon(opt.value)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-green-lt bg-green-dk' : 'border-stroke bg-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${selected ? 'text-white' : 'text-body'}`} />
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block font-body text-[13px] text-body">Current (₦)</span>
            <input
              type="number"
              min="0"
              step="1"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-body text-[13px] text-body">Target (₦)</span>
            <input
              type="number"
              min="1"
              step="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 400000"
              className="w-full rounded-md border border-stroke px-3 py-2 font-body text-sm text-ink outline-none focus:border-green-lt"
            />
          </label>
        </div>

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
            {isSubmitting ? 'Saving…' : 'Save plan'}
          </button>
        </div>
      </form>
    </div>
  )
}

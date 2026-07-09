import { useCallback, useEffect, useRef, useState } from 'react'
import { financeApi } from '@/api/financeApi'
import { mockDashboard } from '@/data/mockData'
import type { CashFlowPeriod, FinanceDashboard } from '@/types/finance'

interface UseFinanceDashboardResult {
  data: FinanceDashboard
  isLoading: boolean
  error: string | null
  isFallback: boolean
  refetch: () => void
}

/**
 * Fetches the dashboard payload from the Spring Boot backend
 * (GET /api/finance/dashboard). Falls back to local mock data if the
 * request fails, so the UI stays populated (e.g. backend not running yet
 * during development).
 */
export function useFinanceDashboard(period: CashFlowPeriod): UseFinanceDashboardResult {
  const [data, setData] = useState<FinanceDashboard>(mockDashboard)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(false)
  const [reloadToken, setReloadToken] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    financeApi
      .getDashboard(period, controller.signal)
      .then((result) => {
        setData(result)
        setIsFallback(false)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : 'Failed to load dashboard data'
        setError(message)
        setData(mockDashboard)
        setIsFallback(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [period, reloadToken])

  const refetch = useCallback(() => setReloadToken((t) => t + 1), [])

  return { data, isLoading, error, isFallback, refetch }
}

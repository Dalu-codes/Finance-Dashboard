import type { CashFlowPeriod, FinanceDashboard } from '@/types/finance'

/**
 * Base URL for the Spring Boot backend.
 *
 * - In dev, leave VITE_API_BASE_URL unset and requests go to same-origin
 *   "/api/..." paths, which vite.config.ts proxies to http://localhost:8080.
 * - In production, set VITE_API_BASE_URL to the deployed backend origin,
 *   e.g. https://api.yourdomain.com
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new ApiError(body || res.statusText, res.status)
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T

  return (await res.json()) as T
}

export const financeApi = {
  /** GET /api/finance/dashboard?period=This week */
  getDashboard(period: CashFlowPeriod = 'This week', signal?: AbortSignal): Promise<FinanceDashboard> {
    const params = new URLSearchParams({ period })
    return request<FinanceDashboard>(`/finance/dashboard?${params.toString()}`, { signal })
  },

  /** POST /api/finance/bills */
  addBill(input: { name: string; dueDate: string; amount: number }): Promise<void> {
    return request<void>(`/finance/bills`, {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  /** POST /api/finance/investments */
  addInvestmentPlan(input: {
    name: string
    icon: 'plane' | 'home' | 'gift'
    current: number
    target: number
  }): Promise<void> {
    return request<void>(`/finance/investments`, {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
}

/**
 * Types mirror the JSON shape expected from the Spring Boot backend.
 * Keep these in sync with the corresponding Java DTOs / records, e.g.:
 *
 *   record UserSummaryResponse(String firstName, String role, String avatarInitial) {}
 *   record OverviewResponse(BigDecimal overallBalance, BigDecimal totalBalance, BigDecimal totalExpense) {}
 *   record CashFlowPointResponse(String day, BigDecimal expense, BigDecimal savings) {}
 *   record InvestmentPlanResponse(String id, String name, String icon, BigDecimal current, BigDecimal target) {}
 *   record BillResponse(String id, String name, String dueDate, BigDecimal amount) {}
 *   record ExpenseCategoryResponse(String id, String name, BigDecimal amount, String colorHex) {}
 *   record ExpenseSummaryResponse(BigDecimal total, double percentChangeVsLastWeek, List<ExpenseCategoryResponse> categories) {}
 */

export type CashFlowPeriod = 'This week' | 'This month' | 'This year'

export interface UserSummary {
  firstName: string
  role: string
  avatarInitial: string
}

export interface Overview {
  overallBalance: number
  totalBalance: number
  totalExpense: number
}

export interface CashFlowPoint {
  day: string
  expense: number
  savings: number
}

export interface InvestmentPlan {
  id: string
  name: string
  icon: 'plane' | 'home' | 'gift'
  current: number
  target: number
}

export interface Bill {
  id: string
  name: string
  dueDate: string
  amount: number
}

export interface ExpenseCategory {
  id: string
  name: string
  amount: number
  colorHex: string
}

export interface ExpenseSummary {
  total: number
  percentChangeVsLastWeek: number
  categories: ExpenseCategory[]
}

export interface InvestmentSummary {
  totalSavings: number
  plans: InvestmentPlan[]
}

/** Aggregate shape returned by GET /api/finance/dashboard */
export interface FinanceDashboard {
  user: UserSummary
  overview: Overview
  cashFlow: CashFlowPoint[]
  investments: InvestmentSummary
  bills: Bill[]
  expenses: ExpenseSummary
}

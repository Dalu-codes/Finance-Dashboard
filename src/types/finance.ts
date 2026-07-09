
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

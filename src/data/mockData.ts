import type { FinanceDashboard } from '@/types/finance'

/**
 * Fallback data used when the Spring Boot backend is unreachable, or during
 * local UI development without the backend running.
 */
export const mockDashboard: FinanceDashboard = {
  user: {
    firstName: 'John',
    role: 'Software engineer',
    avatarInitial: 'J',
  },
  overview: {
    overallBalance: 100_000_000,
    totalBalance: 100_000_000,
    totalExpense: 100_000_000,
  },
  cashFlow: [
    { day: 'Monday', expense: 40000, savings: 85000 },
    { day: 'Tuesday', expense: 25000, savings: 34000 },
    { day: 'Wednesday', expense: 50000, savings: 58000 },
    { day: 'Thursday', expense: 90000, savings: 26000 },
    { day: 'Friday', expense: 8000, savings: 98000 },
    { day: 'Saturday', expense: 82000, savings: 25000 },
    { day: 'Sunday', expense: 80000, savings: 24000 },
  ],
  investments: {
    totalSavings: 500000,
    plans: [
      { id: 'trip-maldives', name: 'Trip to Maldives', icon: 'plane', current: 300000, target: 400000 },
      { id: 'new-apartment', name: 'New Apartment', icon: 'home', current: 2_000_000, target: 5_000_000 },
      { id: 'birthday', name: 'Birthday', icon: 'gift', current: 50000, target: 200000 },
    ],
  },
  bills: [
    { id: 'gym-1', name: 'Gym membership', dueDate: '2026-06-29', amount: 70000 },
    { id: 'gym-2', name: 'Gym membership', dueDate: '2026-06-29', amount: 70000 },
    { id: 'gym-3', name: 'Gym membership', dueDate: '2026-06-29', amount: 70000 },
  ],
  expenses: {
    total: 205000,
    percentChangeVsLastWeek: -20,
    categories: [
      { id: 'bus', name: 'Bus Transport', amount: 20000, colorHex: '#272727' },
      { id: 'groceries', name: 'Groceries', amount: 15000, colorHex: '#272727' },
      { id: 'spa', name: 'Spa treatment', amount: 70000, colorHex: '#272727' },
      { id: 'shopping', name: 'Shopping', amount: 100000, colorHex: '#272727' },
    ],
  },
}

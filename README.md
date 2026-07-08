# Finance-Dashboard
Built a polished dashboard UI that consumes data from a Spring Boot backend. 
=======
# Financial Board (Personal)

React + TypeScript + Tailwind CSS + Recharts port of the original static
HTML dashboard, wired up to consume JSON from a Spring Boot backend.

## Stack

- **React 18 + TypeScript** — Vite-powered SPA
- **Tailwind CSS** — design tokens (`tailwind.config.js`) map 1:1 to the
  original CSS custom properties (`--ink`, `--green-lt`, `--blue`, etc.)
- **Recharts** — replaces Chart.js: `CashFlowChart` (bar chart) and
  `ExpenseDonut` (pie/donut chart)
- Fully responsive: 3-column KPI row → 1 column, two-column main grid →
  stacked, investments/bills grid → stacked, all below `lg`/`sm` breakpoints

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Connecting to the Spring Boot backend

The frontend fetches everything from **one endpoint**:

```
GET /api/finance/dashboard?period=This%20week
```

expected to return a JSON body matching `FinanceDashboard` in
`src/types/finance.ts`:

```jsonc
{
  "user": { "firstName": "John", "role": "Software engineer", "avatarInitial": "J" },
  "overview": { "overallBalance": 100000000, "totalBalance": 100000000, "totalExpense": 100000000 },
  "cashFlow": [
    { "day": "Monday", "expense": 40000, "savings": 85000 }
    // ...one entry per day
  ],
  "investments": {
    "totalSavings": 500000,
    "plans": [
      { "id": "trip-maldives", "name": "Trip to Maldives", "icon": "plane", "current": 300000, "target": 400000 }
    ]
  },
  "bills": [
    { "id": "gym-1", "name": "Gym membership", "dueDate": "2026-06-29", "amount": 70000 }
  ],
  "expenses": {
    "total": 205000,
    "percentChangeVsLastWeek": -20,
    "categories": [
      { "id": "bus", "name": "Bus Transport", "amount": 20000, "colorHex": "#272727" }
    ]
  }
}
```

Matching Spring Boot record shapes are sketched at the top of
`src/types/finance.ts`. A minimal controller looks like:

```java
@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:5173") // or use a global CORS config
public class FinanceController {

    @GetMapping("/dashboard")
    public FinanceDashboardResponse getDashboard(
            @RequestParam(defaultValue = "This week") String period) {
        return financeService.buildDashboard(period);
    }

    @PostMapping("/bills")
    public ResponseEntity<Void> addBill(@RequestBody CreateBillRequest request) {
        financeService.addBill(request);
        return ResponseEntity.noContent().build();
    }
}
```

### Where the wiring lives

- `src/api/financeApi.ts` — thin `fetch` client (`financeApi.getDashboard`,
  `financeApi.addBill`), base URL from `VITE_API_BASE_URL`
- `src/hooks/useFinanceDashboard.ts` — loads data on mount / when the cash
  flow period changes, exposes `isLoading`, `error`, and `isFallback`
- `src/data/mockData.ts` — local fallback shown automatically if the
  backend request fails (e.g. backend not running yet), so the UI is never
  empty during development
- `App.tsx` shows a small "Showing sample data" banner with a **Retry**
  button whenever the fallback is active

### Environment configuration

```bash
cp .env.example .env
```

- **Local dev:** leave `VITE_API_BASE_URL` unset. `vite.config.ts` proxies
  same-origin `/api/**` requests to `VITE_BACKEND_URL`
  (`http://localhost:8080` by default), so there's no CORS setup needed
  while developing against a local Spring Boot app.
- **Production:** set `VITE_API_BASE_URL` to the deployed backend's
  origin, e.g. `https://api.yourdomain.com`. Configure CORS on the Spring
  Boot side to allow the frontend's origin.

## Project structure

```
src/
  api/financeApi.ts          fetch client for the Spring Boot backend
  hooks/useFinanceDashboard.ts  data-fetching hook (loading/error/fallback)
  types/finance.ts           TypeScript types mirroring backend DTOs
  data/mockData.ts           fallback/dev data
  utils/format.ts            currency + date formatting helpers
  components/
    TopBar.tsx
    KpiCards.tsx
    CashFlowChart.tsx        Recharts BarChart + period selector
    InvestmentPlans.tsx
    UpcomingBills.tsx
    ExpenseDonut.tsx          Recharts PieChart (donut)
    icons.tsx
  App.tsx
  main.tsx
```
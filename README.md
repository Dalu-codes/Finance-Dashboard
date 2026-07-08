# Financial Board

A polished personal finance dashboard — React + TypeScript + Tailwind + Recharts on the frontend, backed by a Spring Boot API.

Originally built as a static HTML dashboard, then ported to a typed React SPA with live charts and a real backend contract, to practice wiring a full frontend against a Java service instead of hardcoded data.



## Features

- KPI overview (balance, expenses) with responsive card grid
- Cash flow bar chart with day/week period switching
- Expense breakdown donut chart by category
- Investment/savings goal tracking with progress bars
- Upcoming bills list
- Graceful fallback to mock data if the backend is unreachable, so the UI is never empty in development

## Stack

- **React 18 + TypeScript** — Vite-powered SPA
- **Tailwind CSS** — design tokens map 1:1 to the original CSS custom properties
- **Recharts** — `CashFlowChart` (bar chart) and `ExpenseDonut` (pie/donut chart)
- Fully responsive down to mobile: 3-column KPI row → 1 column, two-column main grid → stacked

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  api/financeApi.ts             fetch client for the Spring Boot backend
  hooks/useFinanceDashboard.ts  data-fetching hook (loading/error/fallback)
  types/finance.ts               TypeScript types mirroring backend DTOs
  data/mockData.ts               fallback/dev data
  utils/format.ts                currency + date formatting helpers
  components/
    TopBar.tsx
    KpiCards.tsx
    CashFlowChart.tsx            Recharts BarChart + period selector
    InvestmentPlans.tsx
    UpcomingBills.tsx
    ExpenseDonut.tsx              Recharts PieChart (donut)
    icons.tsx
  App.tsx
  main.tsx
```

<details>
<summary><strong>Backend integration details (Spring Boot API contract)</strong></summary>

The frontend fetches everything from one endpoint:

```
GET /api/finance/dashboard?period=This%20week
```

Expected response, matching `FinanceDashboard` in `src/types/finance.ts`:

```jsonc
{
  "user": { "firstName": "John", "role": "Software engineer", "avatarInitial": "J" },
  "overview": { "overallBalance": 100000000, "totalBalance": 100000000, "totalExpense": 100000000 },
  "cashFlow": [
    { "day": "Monday", "expense": 40000, "savings": 85000 }
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

Minimal Spring Boot controller:

```java
@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:5173")
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

### Environment configuration

```bash
cp .env.example .env
```

- **Local dev:** leave `VITE_API_BASE_URL` unset. `vite.config.ts` proxies same-origin `/api/**` requests to `VITE_BACKEND_URL` (`http://localhost:8080` by default) — no CORS setup needed while developing against a local Spring Boot app.
- **Production:** set `VITE_API_BASE_URL` to the deployed backend's origin, e.g. `https://api.yourdomain.com`. Configure CORS on the Spring Boot side to allow the frontend's origin.

</details>
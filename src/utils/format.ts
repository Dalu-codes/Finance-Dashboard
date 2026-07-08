/** Formats a number as Naira, compact for large KPI values (e.g. ₦100m). */
export function formatCompactNaira(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    const rounded = Number.isInteger(millions) ? millions.toString() : millions.toFixed(1)
    return `\u20A6${rounded}m`
  }
  if (value >= 1_000) {
    const thousands = value / 1_000
    const rounded = Number.isInteger(thousands) ? thousands.toString() : thousands.toFixed(1)
    return `\u20A6${rounded}k`
  }
  return `\u20A6${value.toLocaleString()}`
}

/** Formats a number as Naira with thousands separators, e.g. ₦300,000 */
export function formatNaira(value: number): string {
  return `\u20A6${value.toLocaleString()}`
}

/** Formats an ISO date string as "29th Jun 2026" */
export function formatDueDate(isoDate: string): string {
  const date = new Date(isoDate)
  const day = date.getDate()
  const suffix = ordinalSuffix(day)
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()
  return `Due ${day}${suffix} ${month} ${year}`
}

function ordinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

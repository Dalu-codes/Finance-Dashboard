import type { UserSummary } from '@/types/finance'

interface TopBarProps {
  user: UserSummary
}

export function TopBar({ user }: TopBarProps) {
  return (
    <header
      role="banner"
      className="flex items-center justify-between border-b border-stroke bg-white px-4 py-3.5 sm:px-8 sm:py-4 mb-3"
    >
      <h1 className="font-heading text-base font-bold tracking-heading text-ink sm:text-xl">
        Financial board(Personal)
      </h1>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-pink font-heading text-lg font-bold text-ink"
        >
          {user.avatarInitial}
        </div>
        <div>
          <p className="font-heading text-sm font-bold tracking-heading leading-tight text-ink">
            Hello, {user.firstName}
          </p>
          <p className="font-body text-[13px] text-body">{user.role}</p>
        </div>
      </div>
    </header>
  )
}

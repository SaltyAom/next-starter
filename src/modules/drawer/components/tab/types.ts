import type { FunctionComponent } from 'react'

export interface TabProps {
    href: string
    className?: string
    activeClassName?: string
    dismiss: () => void
    enabled?: boolean
}

export type TabComponent = FunctionComponent<TabProps>

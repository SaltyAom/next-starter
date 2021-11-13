import type { FunctionComponent } from 'react'

import type { Icon } from 'react-feather'

export interface TabProps {
    title: string
    href: string
    Icon: Icon
}

export type TabComponent = FunctionComponent<TabProps>

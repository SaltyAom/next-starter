import type { FunctionComponent } from 'react'

import type { Icon } from 'react-feather'

export interface SubTabProps {
    title: string
    href: string
    Icon: Icon
}

export type SubTabComponent = FunctionComponent<SubTabProps>

import type {
    ButtonHTMLAttributes,
    FunctionComponent
} from 'react'

export interface HamburgerMenuProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
        isOpen?: boolean
        toggle?: () => void
}

export type HamburgerMenuComponent = FunctionComponent<HamburgerMenuProps>

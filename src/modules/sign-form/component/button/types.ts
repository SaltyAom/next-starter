import type { ButtonHTMLAttributes, FunctionComponent, ReactElement } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactElement
    primary?: boolean
}

export type ButtonComponent = FunctionComponent<ButtonProps>

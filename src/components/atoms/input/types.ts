import type { FunctionComponent, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    active?: boolean
    className?: string
    labelClassName?: string
    wrapperClassName?: string
    label?: string
    name: string
    withCheck?: boolean
    error?: string
}

export type InputComponent = FunctionComponent<InputProps>

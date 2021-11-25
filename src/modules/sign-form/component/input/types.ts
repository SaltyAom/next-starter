import type { InputHTMLAttributes, FunctionComponent } from 'react'

import type { UseFormRegisterReturn } from 'react-hook-form'

export interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelClassName?: string
    register: UseFormRegisterReturn
}

export type LoginInputComponent = FunctionComponent<LoginInputProps>

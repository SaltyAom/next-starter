import type { FunctionComponent, ReactNode } from 'react'

export interface ModalButtonProps {
    className?: string
    modalClassName?: string
    button: ReactNode
}

export type ModalButtonComponent = FunctionComponent<ModalButtonProps>

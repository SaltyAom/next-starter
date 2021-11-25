import { RefObject } from 'preact'
import type { InputHTMLAttributes, FunctionComponent } from 'react'

export interface ImagePickerProps extends InputHTMLAttributes<HTMLSelectElement> {
    imageRef: RefObject<FileList>
    fallback?: string
    className?: string
}

export type ImagePickerComponent = FunctionComponent<ImagePickerProps>

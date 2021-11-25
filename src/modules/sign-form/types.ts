import type { InputHTMLAttributes } from "react"

export type DraftForm = Record<string, InputHTMLAttributes<HTMLInputElement>>
export type FormValue = Record<keyof DraftForm, string>

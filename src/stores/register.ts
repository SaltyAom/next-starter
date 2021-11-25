import { atom, useAtom } from 'jotai'

interface RegisterAtom {
    specialNeed: string
    step: number
    subjects: string[]
    totalConfirmedSubjects: number
    locations: Partial<Record<string, string[]>>
    totalReset: number
}

export const registerAtom = atom<RegisterAtom>({
    specialNeed: 'ไม่ต้องการ',
    step: 0,
    subjects: [],
    locations: {},
    totalConfirmedSubjects: 0,
    totalReset: 1
})

export const useRegister = () => useAtom(registerAtom)

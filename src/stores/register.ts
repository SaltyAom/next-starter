import { atom, useAtom } from 'jotai'

interface RegisterAtom {
    specialNeed: string
    step: number
    subjects: string[]
    locations: Partial<Record<string, string[]>>
}

export const registerAtom = atom<RegisterAtom>({
    specialNeed: 'ไม่ต้องการ',
    step: 0,
    subjects: [],
    locations: {}
})

export const useRegister = () => useAtom(registerAtom)

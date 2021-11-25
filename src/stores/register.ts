import { atom, useAtom } from 'jotai'

interface RegisterAtom {
    specialNeed: string
    step: number
    subjects: string[]
    normals: string[]
    locations: Partial<Record<string, string[]>>
}

export const registerAtom = atom<RegisterAtom>({
    specialNeed: 'ไม่ต้องการ',
    step: 0,
    subjects: [],
    normals: [],
    locations: {}
})

export const useRegister = () => useAtom(registerAtom)

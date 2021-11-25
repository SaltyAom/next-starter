import { atom, useAtom } from 'jotai'

export interface Profile {
    id?: string | null
    firstName: {
        th?: string | null
        en?: string | null
    }
    lastName: {
        th?: string | null
        en?: string | null
    }
    gender?: string | null
    idCard?: string | null
    email?: string | null
    phoneNumber?: string | null
    graduation?: string | null
    image?: string | null
    school?: string | null
    schoolCode?: string | null
    province?: string | null
    parentEmail?: string | null
    parentPhoneNumber?: string | null
}

const profileAtom = atom<Profile>({
    id: null,
    firstName: {
        th: null,
        en: null
    },
    lastName: {
        th: null,
        en: null
    },
    gender: null,
    idCard: null,
    email: null,
    phoneNumber: null,
    graduation: null,
    image: null,
    school: null,
    schoolCode: null,
    province: null,
    parentEmail: null,
    parentPhoneNumber: null
})

export const useProfile = () => useAtom(profileAtom)

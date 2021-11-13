import { atom, useAtom } from 'jotai'

export const subMenuAtom = atom<boolean>(false)
export const useSubMenu = () => useAtom(subMenuAtom)

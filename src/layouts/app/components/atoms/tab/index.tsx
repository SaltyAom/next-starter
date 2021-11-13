import Link from 'next/link'
import { useRouter } from 'next/router'

import tw, { combine } from '@tailwind'

import type { TabComponent } from './types'

import styles from '../../../app-layout.module.sass'

const Tab: TabComponent = ({ title, href, Icon }) => {
    const { asPath } = useRouter()

    return (
        <Link href={href}>
            <a
                className={combine(
                    tw`flex flex-col md:flex-row items-center gap-1 md:gap-0 text-sm md:text-xl bg-white overflow-hidden`,
                    styles.item,
                    asPath === href
                        ? combine(
                              styles.main,
                              tw`justify-center md:justify-start text-white font-semibold gap-1 rounded-full md:rounded-none`
                          )
                        : ''
                )}
            >
                <Icon
                    className={combine(
                        styles.icon,
                        asPath === href ? tw`text-white` : ''
                    )}
                />
                {title}
            </a>
        </Link>
    )
}

export default Tab

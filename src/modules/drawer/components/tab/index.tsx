import type { MouseEventHandler } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import tw, { combine } from '@tailwind'

import type { TabComponent } from './types'

const Tab: TabComponent = ({
    children,
    href,
    className = '',
    activeClassName,
    dismiss,
    enabled = true
}) => {
    const { asPath } = useRouter()
    const isActive = asPath === href
    const active = isActive
        ? activeClassName ||
          tw`text-white bg-black hover:bg-black focus:bg-black`
        : tw`text-gray-700 hover:bg-gray-100 focus:bg-gray-100`

    const disableClassName = !enabled ? tw`opacity-50 hover:bg-transparent focus:bg-transparent !cursor-not-allowed` : ''

    const handleClick: MouseEventHandler = () => {
        dismiss()
    }

    return (
        <Link href={enabled ? href : ''}>
            <a
                className={combine(
                    tw`flex flex-row items-center text-lg gap-1 w-full px-4 py-3 rounded-lg overflow-hidden transition-colors cursor-pointer`,
                    active,
                    className,
                    disableClassName
                )}
                onClick={handleClick}
                onKeyDown={dismiss}
                role="link"
                tabIndex={enabled ? 0 : -1}
            >
                {children}
            </a>
        </Link>
    )
}

export default Tab

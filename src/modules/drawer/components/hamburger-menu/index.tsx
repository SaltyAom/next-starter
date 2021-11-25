import tw, { combine } from '@tailwind'

import type { HamburgerMenuComponent } from './types'

const HamburgerMenu: HamburgerMenuComponent = ({
    className = '',
    isOpen,
    toggle,
    ...props
}) => (
    <button
        className={combine(
            tw`flex text-gray-700 p-2.5 mr-2 hover:bg-gray-200 focus:bg-gray-200 rounded-full transition-colors`,
            className
        )}
        type="button"
        onClick={toggle}
        {...props}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    </button>
)

export default HamburgerMenu

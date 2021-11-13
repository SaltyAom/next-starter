import Link from 'next/link'

import tw from '@tailwind'

import type { SubTabComponent } from './types'

const SubTab: SubTabComponent = ({ href, title, Icon }) => (
    <Link href={href}>
        <a className={tw`flex text-base gap-5 p-3 md:px-5`}>
            <Icon className={tw`min-w-[21px] min-h-[21px] md:min-w-[24px] md:min-h-[24px]`} />
            {title}
        </a>
    </Link>
)

export default SubTab

import type { FunctionComponent } from 'react'

import tw from '@tailwind'

import { Aside, SubMenu } from './components'

import styles from './app-layout.module.sass'

const AppLayout: FunctionComponent = ({ children }) => (
    <>
        <Aside />
        <SubMenu />

        <section className={tw`flex flex-row w-full`}>
            <div className={styles['aside-placeholder']} />
            {children}
        </section>
    </>
)

export default AppLayout

import { useEffect, useReducer } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { useProfile } from '@stores'

import {
    Edit3,
    FilePlus,
    FileText,
    Info,
    Layout,
    Tool,
    User,
    Book
} from 'react-feather'

import tw, { combine } from '@tailwind'

import { Tab, HamburgerMenu } from './components'

import type { DrawerComponent } from './types'

const items = [
    ['/', 'หน้าแรก', <Layout />],
    ['/register', 'สมัครสอบ', <Edit3 />],
    ['/history', 'ประวัติการสมัคร', <Book />],
    ['/edit', 'แก้ไขการสมัคร', <Tool />],
    ['/map', 'ที่นั่งสอบ/สถานที่สอบ', <Info />, false],
    ['/result', 'ผลการสอบ', <FileText />, false],
    ['/help', 'ขอทบทวนผลการสอบ', <FilePlus />, false]
] as const

const whitelist = {
    // '/profile': 'ข้อมูลส่วนตัว'
} as const

/**
 * @example
 * ```tsx
 * <Drawer>
 *     <h1>Hello World</h1>
 * </Drawer>
 * ```
 */
const Drawer: DrawerComponent = ({ children }) => {
    const [{ firstName, lastName }] = useProfile()

    const [isOpen, toggle] = useReducer((v) => !v, false)

    useEffect(() => {
        if (window.innerWidth > 768) toggle()
    }, [])

    const { asPath } = useRouter()
    const active = items.find(([path]) => asPath === path)
    const asTitle = active ? active[1] : 'สมัครสอบ GAT/PAT และ วิชาสามัญ - TCAS 65'

    const dismiss = () => {
        if (isOpen && window.innerWidth < 768) toggle()
    }

    const activeClassName = isOpen
        ? tw`fixed z-20 md:sticky w-[280px]`
        : tw`fixed z-10 hidden w-full h-screen bg-[rgba(0,0,0,.2)]`

    return (
        <>
            <Head>
                <title>{asTitle}</title>
            </Head>
            <section className={tw`flex w-full min-h-screen`}>
                {isOpen && (
                    <div
                        className={tw`fixed z-40 md:hidden w-full h-screen bg-[rgba(0,0,0,.2)]`}
                        role="button"
                        tabIndex={0}
                        onClick={toggle}
                        onKeyDown={toggle}
                        aria-label="Close drawer"
                    />
                )}

                <aside
                    className={combine(
                        tw`top-0 left-0 z-50 flex flex-col justify-between h-screen p-2 bg-white border-r border-gray-200 overflow-x-hidden transition-all`,
                        activeClassName
                    )}
                >
                    <section className={tw`flex flex-col`}>
                        <header
                            className={tw`flex flex-col items-start h-[56px] px-1.5 py-3 border-b overflow-hidden whitespace-nowrap`}
                        >
                            <h1 className={tw`text-xl`}>TCAS 65</h1>
                            <div className={tw`h-[0px]`} />
                        </header>
                        <section className={tw`flex flex-col w-full py-2 gap-2`}>
                            {items.map(([href, content, icon, enabled = true]) => (
                                <Tab href={href} key={href} dismiss={dismiss} enabled={enabled}>
                                    {icon && (
                                        <div className={tw`text-xl mr-2`}>
                                            {icon}
                                        </div>
                                    )}
                                    {content}
                                </Tab>
                            ))}
                        </section>
                    </section>

                    <footer className={tw`flex flex-col w-full`}>
                        <Tab href="/profile" dismiss={dismiss}>
                            <div className={tw`text-xl mr-2`}>
                                <User />
                            </div>
                            คุณ{firstName.th}
                        </Tab>
                    </footer>
                </aside>

                <main className={tw`flex flex-col flex-1`}>
                    <nav
                        className={tw`sticky top-0 z-50 flex items-center w-full h-16 px-2 md:px-4 py-2 bg-white border-b border-gray-300`}
                    >
                        <HamburgerMenu className={tw`md:hidden`} isOpen={isOpen} toggle={toggle} />
                        <h1 className={tw`text-xl text-gray-700`}>
                            {/* @ts-ignore */}
                            {whitelist[asPath] ?? asTitle}
                        </h1>
                    </nav>
                    {children}
                </main>
            </section>
        </>
    )
}

export default Drawer

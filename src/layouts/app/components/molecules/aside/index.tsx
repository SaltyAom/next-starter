/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react'

import { useSubMenu } from '@stores/nav'

import { motion, useAnimation } from 'framer-motion'

import { Home, Info, Edit, Book, FileText, User } from 'react-feather'

import tw, { combine } from '@tailwind'
import { useMobile } from '@services/hooks'
import { expo } from '@services/transitions'

import { Tab } from '../..'

import styles from '../../../app-layout.module.sass'

enum Type {
    Mobile,
    Desktop
}

const navs = {
    [Type.Mobile]: [
        [Home, 'หน้าแรก', '/'],
        [Info, 'ข่าวสาร', '/news'],
        [Edit, 'การสมัคร', '/register'],
        [Book, 'หลักสูตร', '/course'],
        [FileText, 'เอกสาร', '/document']
    ],
    [Type.Desktop]: [
        [Edit, 'การสมัคร', '/register'],
        [Home, 'หน้าแรก', '/'],
        [Info, 'ข่าวสาร', '/news'],
        [Book, 'หลักสูตร', '/course'],
        [FileText, 'เอกสาร', '/document']
    ]
} as const

const Aside = () => {
    const controls = useAnimation()
    const isMobile = useMobile()
    const [subMenu, updateSubMenu] = useSubMenu()

    const asideRef = useRef<HTMLElement>(null)

    const openSubMenu = () => {
        updateSubMenu(true)
    }

    const toggleSubMenu = () => {
        updateSubMenu(!subMenu)
    }

    useEffect(() => {
        let isHover = false
        let extended = false

        asideRef.current?.addEventListener('mouseover', () => {
            isHover = true

            setTimeout(() => {
                if (!isHover) return

                extended = true

                controls.start({
                    width: 240,
                    transition: {
                        ease: expo.out,
                        duration: 0.36
                    }    
                })
            }, 100)
        })

        asideRef.current?.addEventListener('mouseleave', () => {
            isHover = false

            if (!extended) return

            extended = true

            controls.start({
                width: 74,
                transition: {
                    ease: expo.out,
                    duration: 0.36
                }
            })
        })
    }, [])

    return (
        <>
            <nav
                className={combine(
                    tw`fixed top-0 left-0 z-30 flex md:hidden justify-between w-full bg-white`,
                    styles.nav
                )}
            >
                <h1>TCAS</h1>
                <button
                    type="button"
                    className={tw`flex items-center gap-4 text-lg text-primary font-medium px-4`}
                    onClick={toggleSubMenu}
                >
                    SaltyAom
                    <User />
                </button>
            </nav>

            <motion.aside
                animate={controls}
                ref={asideRef}
                className={combine(
                    tw`fixed z-30 left-0 bottom-0 flex md:flex-col justify-around md:justify-start items-center w-full shadow-2xl`,
                    styles.aside
                )}
            >
                {navs[isMobile ? Type.Mobile : Type.Desktop].map(([Icon, title, href]) => (
                    <Tab key={title} {...{ title, href, Icon }} />
                ))}

                {!isMobile && (
                    <>
                        <div className={tw`flex flex-1`} />
                        <button
                            type="button"
                            className={combine(
                                tw`flex flex-col md:flex-row items-center gap-1 md:gap-0 text-sm md:text-xl overflow-hidden`,
                                styles.item
                            )}
                            onClick={openSubMenu}
                            onMouseOver={openSubMenu}
                            onFocus={openSubMenu}
                        >
                            <User className={combine(styles.icon)} />
                            <h4>SaltyAom</h4>
                        </button>
                    </>
                )}
            </motion.aside>
        </>
    )
}

export default Aside

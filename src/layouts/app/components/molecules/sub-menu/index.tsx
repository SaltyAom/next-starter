/* eslint-disable no-lonely-if */
import { useEffect } from 'react'

import {
    User,
    Lock,
    Mail,
    Smartphone,
    FileText,
    Folder,
    List,
    Globe,
    Edit,
    LogOut
} from 'react-feather'

import { motion, useAnimation } from 'framer-motion'

import tw, { combine } from '@tailwind'
import { useMobile } from '@services/hooks'
import { expo } from '@services/transitions'

import { useSubMenu } from '@stores/nav'

import { SubDiv, SubTab } from '../../atoms'

import styles from '../../../app-layout.module.sass'

const SubMenu = () => {
    const [isOpen, update] = useSubMenu()
    const controls = useAnimation()

    const isMobile = useMobile()

    const closeSubMenu = () => {
        update(false)
    }

    useEffect(() => {
        if (isOpen)
            if (isMobile)
                controls.start({
                    height: 'calc(100vh - 64px)',
                    transition: {
                        ease: expo.out,
                        duration: 0.36
                    }
                })
            else
                controls.start({
                    width: 300,
                    transition: {
                        ease: expo.out,
                        duration: 0.36
                    }
                })
        else {
            if (isMobile)
                controls.start({
                    height: 0,
                    transition: {
                        ease: expo.out,
                        duration: 0.36
                    }
                })
            else
                controls.start({
                    width: 0,
                    transition: {
                        ease: expo.out,
                        duration: 0.36
                    }
                })
        }
    }, [isOpen])

    useEffect(() => {
        const transition = {
            transition: {
                duration: 0
            }
        }

        if (isOpen)
            if (isMobile)
                controls.start({
                    height: 'calc(100vh - 64px)',
                    transition
                })
            else
                controls.start({
                    width: 300,
                    transition
                })
        else {
            if (isMobile)
                controls.start({
                    height: 0,
                    transition
                })
            else
                controls.start({
                    width: 0,
                    transition
                })
        }
    }, [isMobile])

    return (
        <motion.aside
            animate={controls}
            className={combine(
                tw`fixed z-50 w-full h-screen bg-primary overflow-auto`,
                styles['sub-menu']
            )}
            onMouseLeave={closeSubMenu}
        >
            <div
                className={tw`flex flex-col w-full p-4 pb-4 md:pb-0 md:px-0 text-white text-lg whitespace-pre`}
            >
                <header className="flex items-center gap-4 font-medium text-xl p-6 md:py-3">
                    <figure
                        className={combine(
                            tw`block m-0 p-0 bg-gray-200 rounded-full overflow-hidden`,
                            styles.profile
                        )}
                    >
                        <img
                            className={combine(
                                tw`object-cover object-center`,
                                styles.profile
                            )}
                            src="https://pbs.twimg.com/profile_images/1305491092918292485/q6p8QmUl_400x400.jpg"
                            alt="Profile"
                        />
                    </figure>
                    <h3>SaltyAom</h3>
                </header>

                <SubDiv />

                <SubTab href="/profile" title="ข้อมูลส่วนตัว" Icon={User} />
                <SubTab href="/profile" title="เปลี่ยนรหัสผ่าน" Icon={Lock} />
                <SubTab href="/profile" title="เปลี่ยนอีเมลล์" Icon={Mail} />
                <SubTab
                    href="/profile"
                    title="เปลี่ยนเบอร์โทรศัพท์"
                    Icon={Smartphone}
                />

                <SubDiv />

                <h4 className="mt-1 py-2 pl-4">ข้อมูลการสมัคร</h4>
                <section className={tw`flex flex-col pl-6 mb-1`}>
                    <SubTab href="/profile" title="คะแนนสอบ" Icon={FileText} />
                    <SubTab
                        href="/profile"
                        title="รอบที่ 1 แฟ้มสะสมผลงาน"
                        Icon={Folder}
                    />
                    <SubTab
                        href="/profile"
                        title="รอบที่ 2 โควต้า"
                        Icon={List}
                    />
                    <SubTab
                        href="/profile"
                        title="รอบที่ 3 แอดมิชชั่น"
                        Icon={Edit}
                    />
                    <SubTab
                        href="/profile"
                        title="รอบที่ 4 รับตรงอิสระ"
                        Icon={Globe}
                    />
                </section>

                <SubDiv />

                <SubTab href="/profile" title="เปลี่ยนภาษา" Icon={Globe} />
                <SubDiv />
                <SubTab href="/profile" title="ออกจากระบบ" Icon={LogOut} />
            </div>
        </motion.aside>
    )
}

export default SubMenu

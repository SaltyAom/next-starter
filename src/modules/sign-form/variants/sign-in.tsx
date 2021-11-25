import { useState } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { useProfile } from '@stores'

import { Button, FormLayout, Input } from '../component'
// import { Facebook, Google } from '../icon'

import style from '../sign-form.module.sass'

import type { DraftForm, FormValue } from '../types'

const form: DraftForm = {
    username: {
        placeholder: 'เลขประจำตัว'
    },
    password: {
        placeholder: 'รหัสผ่าน',
        type: 'password'
    }
}

const SignIn = () => {
    const { register, handleSubmit } = useForm<FormValue>()
    const [error] = useState('')

    const [, updateProfile] = useProfile()

    const process = (_data: FormValue) => {
        updateProfile({
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            firstName: {
                th: 'ซอลตี้',
                en: 'Salty'
            },
            lastName: {
                th: 'ออม',
                en: 'Aom'
            },
            gender: 'male',
            idCard: '1100703123456',
            email: 'saltyaom@gmail.com',
            phoneNumber: '0901234567',
            graduation: '2561',
            image: null,
            school: 'อัสสัมชัญสมุทรปราการ',
            schoolCode: 'ACSP',
            province: 'สมุทรปราการ',
            parentEmail: 'saltyaom@gmail.com',
            parentPhoneNumber: '0902345678'
        })
    }

    return (
        <FormLayout title="เข้าสู่ระบบเพื่อดำเนินการต่อ">
            <form
                className="flex flex-col w-full pt-6 pb-2 gap-4"
                onSubmit={handleSubmit(process)}
            >
                {Object.keys(form).map((input) => (
                    <Input
                        key={input}
                        placeholder={input}
                        {...form[input]}
                        register={register(input)}
                    />
                ))}
                {error && (
                    <a className={`${style.content} text-red-400 font-medium`}>
                        {error}
                    </a>
                )}

                <a className={`${style.link} font-normal`}>ลืมรหัสผ่าน</a>
                <Button primary onClick={handleSubmit(process)}>
                    เข้าสู่ระบบ
                </Button>
                <p className={`${style.content} mt-2`}>
                    เข้าสู่ระบบไม่ได้?{' '}
                    <Link href="/">
                        <a className={style.link}>สร้างบัญชี</a>
                    </Link>
                </p>
            </form>

            {/* <div className="w-full h-[1px] bg-gray-300 my-4" /> */}

            {/* <footer className="flex flex-col w-full gap-3">
                <Button icon={<Google />}>Continue with Google</Button>
                <Button icon={<Facebook />}>Continue with Facebook</Button>
            </footer> */}
        </FormLayout>
    )
}

export default SignIn

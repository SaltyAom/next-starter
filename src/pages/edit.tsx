import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { useRegister } from '@stores'

import tw from '@tailwind'

const Register = () => {
    const [registration, updateRegistration] = useRegister()
    const { step, totalReset } = registration

    const [isInit, init] = useReducer(() => true, false)
    const [isLeaving, leave] = useReducer(() => true, false)

    const { push } = useRouter()

    useEffect(() => {
        if (step < 4) push('/register')

        init()
    }, [])

    const edit = () => {
        if (!isInit || isLeaving) return

        updateRegistration({
            ...registration,
            step: 0,
            totalReset: totalReset + 1
        })

        leave()
        push('/register')
    }

    const setZero = () => {
        if (!isInit || isLeaving) return

        updateRegistration({
            specialNeed: 'ไม่ต้องการ',
            step: 0,
            subjects: [],
            totalConfirmedSubjects: 0,
            locations: {},
            totalReset: 0
        })

        leave()
        push('/register')
    }

    if (totalReset >= 3)
        return (
            <main
                className={tw`flex flex-col justify-center items-center max-w-md w-full min-h-app gap-2 mx-auto py-4 px-4`}
            >
                <Typography variant="h5" className={tw`my-4`}>
                    Set Zero
                </Typography>

                <Typography className={tw`text-gray-700 text-center`}>
                    ท่านได้ใช้สิทธิ์ในการแก้ไขการสมัครครบทั้ง 3 ครั้งแล้ว
                </Typography>
                <Typography className={tw`text-gray-700 text-center`}>
                    ท่านสามารถแก้ไขใบสมัครได้
                    แต่ท่านจะต้องจ่ายเงินค่าลงทะเบียนใหม่อีกครั้ง
                </Typography>

                <Button
                    className={tw`px-6 py-3 my-4`}
                    variant="contained"
                    color="error"
                    disableElevation
                    onClick={setZero}
                >
                    <Typography>Set Zero</Typography>
                </Button>
            </main>
        )

    return (
        <main
            className={tw`flex flex-col justify-center items-center max-w-sm w-full min-h-app gap-2 mx-auto py-4 px-4`}
        >
            <Typography variant="h5" className={tw`my-4`}>
                แก้ไขใบสมัคร
            </Typography>

            <Typography className={tw`text-gray-700 text-center`}>
                ท่านสามารถแก้ไขการสมัครได้ทั้งหมด 3 ครั้ง
            </Typography>
            <Typography className={tw`text-gray-700 text-center`}>
                ท่านได้ใช้สิทธิ์ไปแล้ว{' '}
                <span className={tw`font-bold underline`}>
                    {totalReset} จาก 3 ครั้ง
                </span>
            </Typography>

            <Button
                className={tw`px-6 py-3 my-4`}
                variant="contained"
                color="warning"
                disableElevation
                onClick={edit}
            >
                <Typography>ยืนยันการแก้ไขใบสมัคร</Typography>
            </Button>
        </main>
    )
}

export default Register

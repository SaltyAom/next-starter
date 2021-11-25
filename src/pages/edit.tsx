import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { useRegister } from '@stores'

import tw from '@tailwind'

const Register = () => {
    const [registration, updateRegistration] = useRegister()

    const { push } = useRouter()

    const edit = () => {
        updateRegistration({
            ...registration,
            step: 0
        })

        push('/register')
    }

    useEffect(() => {
        if (registration.step < 4) push('/register')
    }, [])


    return (
        <main
            className={tw`flex flex-col justify-center items-center max-w-sm w-full min-h-app gap-2 mx-auto py-4 px-4`}
        >
            <Typography variant="h5" className={tw`my-4`}>
                แก้ไขใบสมัคร
            </Typography>

            <Typography className={tw`text-gray-700`}>
                ท่านสามารถแก้ไขการสมัครได้ทั้งหมด 3 ครั้ง
            </Typography>
            <Typography className={tw`text-gray-700`}>
                ท่านได้ใช้สิทธิ์ไปแล้ว{' '}
                <span className={tw`font-bold underline`}>1 จาก 3 ครั้ง</span>
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

import { useCallback, useState, useReducer, Reducer, useEffect } from 'react'

import { ChevronLeft } from 'react-feather'

import { Button, Typography } from '@mui/material'

import { Otp } from '@atoms'

import { useProfile } from '@stores/profile'

import tw from '@tailwind'

const OtpLayout = ({
    complete = () => {},
    reset = null
}: {
    complete?: () => void
    reset?: (() => void) | null
}) => {
    const [{ phoneNumber: tel }] = useProfile()

    const [error, updateError] = useState('')
    const [countdown, updateCountdown] = useReducer<
        Reducer<
            number,
            { type: 'decrement' } | { type: 'update'; value: number }
        >
    >((v, action) => {
        switch (action.type) {
            case 'decrement':
                if (v <= 0) return 0

                return v - 1

            case 'update':
                return action.value

            default:
                return v
        }
    }, 15 * 60)

    const onSubmit = useCallback((value: string) => {
        if (value === '123456') return complete()

        updateError('รหัส OTP ไม่ถูกต้อง')
    }, [])

    useEffect(() => {
        const timeout = setInterval(() => {
            updateCountdown({ type: 'decrement' })
        }, 1000)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    const requestOtp = () => {
        if (countdown > 0) return

        updateCountdown({
            type: 'update',
            value: 300
        })
    }

    return (
        <main
            className={tw`flex flex-col items-center mx-auto w-full max-w-sm py-4`}
        >
            {reset && (
                <Button className={tw`mb-2 px-2 py-1 mr-auto`} color="info" onClick={reset}>
                    <Typography className={tw`flex items-center gap-1`}>
                        <ChevronLeft /> แก้ไข
                    </Typography>
                </Button>
            )}

            <Typography variant="h6" className={tw`my-4 text-center mx-auto`}>
                ยืนยัน OTP
            </Typography>
            <Typography
                className={tw`flex flex-col items-center gap-2 px-4 text-center text-gray-400`}
            >
                กรุณาตรวจสอบรหัส OTP ที่ส่งไปที่โทรศัพท์มือถือของท่าน ({tel})
                <Typography>(REF: xxxxxx)</Typography>
            </Typography>
            <Otp onSubmit={onSubmit} error={error} />
            <Button
                variant="text"
                onClick={requestOtp}
                className={tw`text-center mx-auto`}
                disabled={countdown > 0}
            >
                ขอรหัสใหม่อีกครั้ง ({countdown} วินาที)
            </Button>
        </main>
    )
}

export default OtpLayout

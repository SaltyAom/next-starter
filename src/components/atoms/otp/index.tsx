/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { useRef, useEffect, useMemo, useReducer, useCallback } from 'react'
import type { FormEventHandler } from 'react'

import { Button, Typography } from '@mui/material'

import { Input } from '@atoms'

import tw, { combine } from '@tailwind'

const Otp = ({
    onSubmit = (_v: string) => {},
    error = '',
    noFocus = false
}) => {
    const submitRef = useRef<HTMLButtonElement>(null)

    const otpParent = useRef<HTMLElement>(null)

    const [isInit, init] = useReducer(() => true, false)
    const otps = useMemo(
        () => otpParent.current?.querySelectorAll('.otp > div > input'),
        [isInit]
    )

    useEffect(() => {
        init()

        if (otps && !noFocus) (otps[0] as HTMLInputElement)?.focus()
    }, [isInit])

    const handleInput: FormEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            const { currentTarget: element } = event
            const { value, name } = element as HTMLInputElement
            const index = +name[4]

            if (!otps) return

            if (value) {
                const nextElement = otps[index + 1] as HTMLInputElement

                if (nextElement) return nextElement.focus()

                submitRef.current?.focus()
            } else {
                const previousElement = otps[index - 1] as HTMLInputElement

                if (previousElement) return previousElement.focus()
            }
        },
        [isInit]
    )

    const handleSubmit: FormEventHandler = useCallback(
        (event) => {
            event.preventDefault()

            if (!otps) return

            let value = ''

            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < otps.length; index++) {
                const { value: v } = otps[index] as HTMLInputElement
                value += v
            }

            onSubmit(value)
        },
        [otps]
    )

    return (
        <form onSubmit={handleSubmit} className={tw`flex flex-col`}>
            <section
                className={tw`flex justify-center items-start w-full my-4 gap-2`}
                ref={otpParent}
            >
                {[...Array(6)].map((_, index) => (
                    <Input
                        key={`otp-${index}`}
                        name={`otp-${index}`}
                        required
                        type="text"
                        labelClassName={combine(tw`max-w-[44px]`, 'otp')}
                        maxLength={1}
                        className={tw`max-w-[36px] !text-2xl text-center font-medium text-gray-600 !px-0 mx-auto`}
                        onChange={handleInput}
                    />
                ))}
            </section>
            {error && <p className={tw`error mx-auto my-2`}>{error}</p>}
            <Button type="submit" className={tw`my-2 py-3`}>
                <Typography variant="body1">ยืนยัน</Typography>
            </Button>
        </form>
    )
}

export default Otp

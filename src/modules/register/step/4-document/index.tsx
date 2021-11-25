import { useEffect } from 'react'

import { useRegister } from '@stores'

import { Printer } from 'react-feather'

import { Button, Typography } from '@mui/material'

import tw from '@tailwind'

const Document = () => {
    const [registration, updateRegistration] = useRegister()

    useEffect(() => {
        updateRegistration({
            ...registration,
            totalConfirmedSubjects: registration.subjects.length
        })
    }, [])

    return (
        <main className={tw`flex flex-col items-start gap-1 w-full max-w-4xl`}>
            <Typography variant="h6">ใบสมัคร</Typography>

            <Button
                variant="contained"
                disableElevation
                className={tw`px-6 py-3 my-6`}
            >
                <Typography className={tw`flex items-center gap-3`}>
                    <Printer width={21} /> Print ใบชำระเงิน
                </Typography>
            </Button>
        </main>
    )
}

export default Document

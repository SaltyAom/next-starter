import { useRegister } from '@stores'

import { Typography } from '@mui/material'

import tw from '@tailwind'

const Document = () => {
    const [registration, updateRegistration] = useRegister()

    return (
        <main className={tw`flex flex-col items-start gap-1 w-full max-w-4xl`}>
            <Typography>ใบสมัคร</Typography>
        </main>
    )
}

export default Document

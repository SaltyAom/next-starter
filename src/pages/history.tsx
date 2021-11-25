import { Typography } from '@mui/material'

import tw from '@tailwind'

const Register = () => {    
    return (
        <main
            className={tw`flex flex-col items-start max-w-4xl w-full mx-auto py-4 px-2`}
        >
            <Typography variant="h6">ประวัติการสมัคร</Typography>
        </main>
    )
}

export default Register

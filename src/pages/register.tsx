import { useEffect } from 'react'
import { Box, Stepper, Step, StepLabel } from '@mui/material'

import registrations from '@modules/register'

import { useRegister } from '@stores'

import tw from '@tailwind'

const steps = ['ลงทะเบียน', 'ยืนยัน OTP', 'ตรวจสอบ', 'จ่ายเงิน', 'ใบสมัคร']

const Register = () => {    
    const [{ step }] = useRegister()

    const Registration = registrations[step]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])

    return (
        <main
            className={tw`flex flex-col items-start max-w-4xl w-full mx-auto py-4 px-4`}
        >
            <Box className={tw`w-full my-8`}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <Registration />
        </main>
    )
}

export default Register

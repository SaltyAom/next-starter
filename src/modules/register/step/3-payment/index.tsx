import { useRegister } from '@stores'

import { Button, Typography } from '@mui/material'

import { Printer } from 'react-feather'

import tw from '@tailwind'

const Payment = () => {
    const [registration, updateRegistration] = useRegister()

    const { subjects } = registration

    const next = () => {
        updateRegistration({
            ...registration,
            step: 4
        })
    }

    return (
        <main className={tw`flex flex-col items-start gap-1 w-full max-w-4xl`}>
            <Typography variant="h6" className={tw`mb-2`}>
                ชำระค่าสมัคร
            </Typography>
            <Typography variant="body1" className={tw`text-gray-500`}>
                ใบสมัครนี้จะสมบูรณ์ เมื่อท่านได้กดยืนยันการสมัคร
                และได้ชำระเงินครบแล้ว
            </Typography>
            <Typography variant="body1" className={tw`text-gray-500`}>
                ท่านสามารถชำระค่าสมัครได้จนถึงเวลา 23:29 ของวันที่ xx ธันวาคม
                2565
            </Typography>

            <Typography variant="body1" className={tw`mt-8 text-gray-700`}>
                ท่านต้องชำระเงินค่าสมัครทั้งหมด {subjects.length} วิชา
            </Typography>
            <Typography variant="h6" className={tw`my-2`}>
                รวมเป็นค่าสมัครสอบ {subjects.length * 140} บาท
            </Typography>

            <Button
                variant="contained"
                disableElevation
                className={tw`px-6 py-3 my-6`}
            >
                <Typography className={tw`flex items-center gap-3`}>
                    <Printer width={21} /> Print ใบชำระเงิน
                </Typography>
            </Button>

            <Button
                variant="contained"
                disableElevation
                className={tw`px-9 py-3 my-6 ml-auto`}
                onClick={next}
            >
                <Typography>ต่อไป</Typography>
            </Button>
        </main>
    )
}

export default Payment

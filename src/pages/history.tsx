import { Card, CardContent, Chip, Typography } from '@mui/material'

import tw from '@tailwind'

const Register = () => {
    return (
        <main
            className={tw`flex flex-col items-start max-w-4xl w-full mx-auto py-4 px-2`}
        >
            <Typography variant="h6" className={tw`my-2`}>
                ประวัติการสมัคร
            </Typography>

            <section className={tw`grid md:grid-cols-2 w-full gap-6`}>
                <Card variant="outlined" className={tw`w-full`}>
                    <CardContent>
                        <Typography variant="h6" className={tw`mb-2`}>
                            จำนวนที่สมัคร: 3 วิชา
                        </Typography>
                        <Typography className={tw`dash text-gray-500`}>
                            85 GAT ความถนัดทั่วไป
                        </Typography>
                        <Typography className={tw`dash text-gray-500`}>
                            73 PAT 3 ความถนัดทางวิศวกรรม
                        </Typography>
                        <Typography className={tw`dash text-gray-500`}>
                            85 GAT ความถนัดทั่วไป
                        </Typography>

                        <Chip label="ชำระเงินแล้ว" color="success" className={tw`mt-4`} />
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}

export default Register

import { useRegister } from '@stores'

import tw from '@tailwind'

import { Autocomplete, TextField, Typography } from '@mui/material'

const options = [
    'ไม่ต้องการ',
    'ต้องการข้อสอบอักษรเบรลล์ ภาษาอังกฤษ แบบตัวเต็ม',
    'ต้องการข้อสอบอักษรเบรลล์ ภาษาอังกฤษ แบบตัวย่อย',
    'ต้องการอักษรขยาย',
    'ต้องการผู้ช่วยอ่านข้อสอบ',
    'ต้องการผู้ช่วยในการเดินเข้าห้องสอบ',
    'บกพร่องทางการได้ยิน'
]

const SpecialNeed = () => {
    const [registration, updateRegistration] = useRegister()

    const handleChange = (_: any, specialNeed: string | null) => {
        updateRegistration({
            ...registration,
            specialNeed: specialNeed || 'ไม่ต้องการ'
        })
    }

    return (
        <section className={tw`flex flex-col md:flex-row md:items-center gap-4 w-full mb-6`}>
            <Typography>เลือกความต้องการพิเศษ</Typography>
            <Autocomplete
                id="special-need"
                value={registration.specialNeed}
                options={options}
                getOptionLabel={(option) => option}
                onChange={handleChange}
                className={tw`flex flex-1`}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="เลือกความต้องการพิเศษ"
                        required
                    />
                )}
            />
        </section>
    )
}

export default SpecialNeed

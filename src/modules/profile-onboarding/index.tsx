import { useRef } from 'react'
import type { FormEventHandler } from 'react'

import { useProfile } from '@stores'

import { Typography } from '@mui/material'

import tw from '@tailwind'

import ImagePicker from './image-picker'

const Landing = () => {
    const [profile, updateProfile] = useProfile()

    const imageRef = useRef<FileList>(null)

    const handleUpload = () => {
        updateProfile({
            ...profile,
            image: "https://pbs.twimg.com/profile_images/1305491092918292485/q6p8QmUl_400x400.jpg"
        })
    }

    return (
        <section
            className={tw`flex flex-col justify-center items-center w-full max-w-4xl min-h-app mx-auto px-4 py-12 gap-12`}
        >
            <Typography variant="h5">อัพโหลดรูปถ่าย</Typography>

            <main className={tw`flex flex-col-reverse md:flex-row gap-4 justify-between w-full`}>
                <section
                    className={tw`flex flex-1 flex-col justify-center items-center`}
                >
                    <ImagePicker imageRef={imageRef} />

                    <button
                        type="button"
                        className={tw`mt-4 px-6 py-3 text-white font-semibold bg-black rounded-lg`}
                        onClick={handleUpload}
                    >
                        บันทึกรูปภาพ
                    </button>
                </section>

                <section
                    className={tw`flex flex-1 flex-col justify-center items-start gap-2`}
                >
                    <Typography variant="h6" className={tw`mb-2`}>คำแนะนำ</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>รูปถ่ายหน้าตรงไม่สวมแว่นตาดำ ไม่สวมหมวก หรือผ้าคลุมศีรษะใดๆ ยกเว้นผ้าคลุมทางศาสนา</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>ห้ามตกแต่งภาพ หน้ามองตรง จมูก คิ้ว และปาก จะต้องปรากฏบนภาพถ่าย พื้นหลังไม่มีลวดลาย</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>ภาพถ่ายจะต้องครอบคลุมถึงศีรษะ และด้านบนของหัวไหล่ โดยให้เห็นใบหน้า 25% ของภาพถ่าย</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>ถ่ายไว้ไม่เกิน 6 เดือน</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>ขนาดไฟล์ไม่น้อยกว่า 40KB</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>จนาดของรูปถ่าย 1 หรือ 1.5 นิ้ว</Typography>
                    <Typography className={tw`mb-2 text-gray-500 dash`}>ประเภทของไฟล์เป็น jpg หรือ png เท่านั้น</Typography>
                 </section>
            </main>
        </section>
    )
}

export default Landing

import { Check } from 'react-feather'

import tw, { combine } from '@tailwind'

const CheckCircle = ({ className = tw`w-[28px] h-[28px]`, active = false }) => (
    <div
        className={combine(
            tw`flex justify-center items-center rounded-full`,
            active
                ? tw`text-white bg-green-500`
                : tw`bg-gray-100 text-gray-300`,
            className
        )}
    >
        <Check className={tw`w-[21px] h-[21px] p-0.5`} strokeWidth={3} />
    </div>
)

export default CheckCircle

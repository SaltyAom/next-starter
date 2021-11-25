import Otp from '@modules/otp'

import { useRegister } from '@stores'

const RegisterOtp = () => {
    const [registration, updateRegistration] = useRegister()

    const complete = () => {
        updateRegistration({
            ...registration,
            step: 2
        })
    }

    const reset = () => {
        updateRegistration({
            ...registration,
            step: 0
        })
    }

    return <Otp complete={complete} reset={reset} />
}

export default RegisterOtp

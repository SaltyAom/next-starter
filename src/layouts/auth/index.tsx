import type { FC } from 'react'

import dynamic from 'next/dynamic'
import { useProfile } from '@stores'

const SignIn = dynamic(() => import('@modules/sign-form/variants/sign-in'))
const ProfileOnboarding = dynamic(() => import('@modules/profile-onboarding'))

const AuthProvider: FC = ({ children }) => {
    const [{ id, image }] = useProfile()

    if (!id) return <SignIn />
    if (!image) return <ProfileOnboarding />

    return <>{children}</>
}

export default AuthProvider

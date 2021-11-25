import { useEffect } from 'react'

import { useProfile } from '@stores'

import ProfileOnboarding from '@modules/profile-onboarding'

import { Button } from '@mui/material'

const Profile = () => {
    const [profile, updateProfile] = useProfile()

    const logout = () => {
        updateProfile({
            id: null,
            firstName: {
                th: null,
                en: null
            },
            lastName: {
                th: null,
                en: null
            },
            gender: null,
            idCard: null,
            email: null,
            phoneNumber: null,
            graduation: null,
            image: null,
            school: null,
            schoolCode: null,
            province: null,
            parentEmail: null,
            parentPhoneNumber: null
        })
    }

    return (
        <ProfileOnboarding>
            <Button variant="contained" disableElevation onClick={logout}>
                ออกจากระบบ
            </Button>
        </ProfileOnboarding>
    )
}

export default Profile

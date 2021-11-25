import dynamic from 'next/dynamic'

export const SubjectSelection = dynamic(() => import('./0-subject-selection'))
export const RegistrationOtp = dynamic(() => import('./1-otp'))
export const RegistrationReview = dynamic(() => import('./2-review-registration'))
export const Payment = dynamic(() => import('./3-payment'))
export const Document = dynamic(() => import('./4-document'))

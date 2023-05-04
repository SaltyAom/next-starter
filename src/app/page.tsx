import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hello',
    openGraph: {
        title: 'Next Starter',
        description: "SaltyAom's Next Starter",
        images: '/og',
        authors: 'SaltyAom'
    }
}

export default function Index() {
    return (
        <h1 className="flex justify-center items-center w-full h-screen text-2xl">
            Hi friends!
        </h1>
    )
}

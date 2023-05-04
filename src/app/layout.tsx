import type { PropsWithChildren } from 'react'

import { OpenGraph } from '@shared'

import '@styles/global.sass'

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <OpenGraph
                    canonical="https://saltyaom.com"
                    title="Next Starter"
                    description="Satyaom's Next Starter"
                    image={{
                        src: '/',
                        width: 1920,
                        height: 1080
                    }}
                    icon="/"
                />
            </head>
            <body>{children}</body>
        </html>
    )
}

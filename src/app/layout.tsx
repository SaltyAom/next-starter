import type { PropsWithChildren } from 'react'

import '@styles/global.sass'

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head />
            <body>{children}</body>
        </html>
    )
}

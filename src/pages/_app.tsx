import { useEffect } from 'react'

import { AppProps } from 'next/app'

import { Provider } from 'jotai'

import { AppLayout } from '@layouts'

import '@styles/init.sass'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.addEventListener('touchstart', () => null, {
            passive: true
        })
    }, [])

    return (
        <Provider>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    )
}

export default App

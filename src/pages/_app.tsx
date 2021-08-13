import { useEffect } from 'react'

import { AppProps } from 'next/app'

import '@styles/init.sass'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.addEventListener('touchstart', () => null, {
            passive: true
        })
    }, [])

    return <Component {...pageProps} />
}

export default App

import type { AppProps } from 'next/app'

import '@styles/global.sass'
import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { Provider } from 'jotai'

import Drawer from '@modules/drawer'
import { AuthProvider } from '@layouts'

import '@styles/init.sass'
import 'tailwindcss/tailwind.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#007aff'
        }
    }
})

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.addEventListener('touchstart', () => null, {
            passive: true
        })
    }, [])

    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Drawer>
                        <Component {...pageProps} />
                    </Drawer>
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default App

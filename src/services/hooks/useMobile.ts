import { useState, useLayoutEffect, useEffect } from 'react'

const useMobile = () => {
    const [isMobile, updateMobile] = useState(true)

    useLayoutEffect(() => {
        updateMobile(window.innerWidth <= 768)
    }, [])

    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia('(min-width: 768px)').matches
        )
            window
                .matchMedia('(min-width: 768px)')
                .addEventListener('change', ({ matches }) => {
                    updateMobile(!matches)
                })
    }, [])

    return isMobile
}

export default useMobile

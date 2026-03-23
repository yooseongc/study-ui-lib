import { useLayoutEffect, useState } from 'react'
import { ThemeContext } from './ThemeContextDef'
import type { Theme } from './ThemeContextDef'

function getInitialTheme(): Theme {
    try {
        return (localStorage.getItem('theme') as Theme) ?? 'dark'
    } catch {
        return 'dark'
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        try {
            localStorage.setItem('theme', theme)
        } catch {
            // SSR or localStorage disabled
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>
            {children}
        </ThemeContext.Provider>
    )
}

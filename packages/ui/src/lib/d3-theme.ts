import { themeColors } from './colors'

export interface D3Theme {
    colors: ReturnType<typeof themeColors>
    fonts: {
        sans: string
        mono: string
        size: { sm: number; base: number; lg: number; xl: number }
    }
    spacing: { xs: number; sm: number; md: number; lg: number; xl: number }
    border: { radius: number; width: number }
    transition: { duration: number }
}

export function createD3Theme(isDark: boolean): D3Theme {
    return {
        colors: themeColors(isDark),
        fonts: {
            sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif",
            mono: "'JetBrains Mono', 'Fira Code', 'D2Coding', ui-monospace, monospace",
            size: { sm: 11, base: 13, lg: 15, xl: 18 },
        },
        spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
        border: { radius: 6, width: 1 },
        transition: { duration: 200 },
    }
}

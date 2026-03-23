import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@fontsource/jetbrains-mono'
import './index.css'
import { ThemeProvider, StudyProvider } from '@study-ui/components'
import { App } from './App'
import { siteConfig } from './data/siteConfig'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <StudyProvider config={siteConfig}>
                <BrowserRouter basename="/study-ui-lib">
                    <App />
                </BrowserRouter>
            </StudyProvider>
        </ThemeProvider>
    </StrictMode>,
)

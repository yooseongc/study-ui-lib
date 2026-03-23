import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@study-ui/components'
import { HomePage } from './pages/HomePage'
import { TypographyPage } from './pages/TypographyPage'
import { ColorsPage } from './pages/ColorsPage'
import { UIComponentsPage } from './pages/UIComponentsPage'
import { VizComponentsPage } from './pages/VizComponentsPage'
import { LayoutPage } from './pages/LayoutPage'
import { ThemePage } from './pages/ThemePage'
import { D3DslPage } from './pages/D3DslPage'
import { SpacingPage } from './pages/SpacingPage'
import { SearchPage } from './pages/SearchPage'
import { HooksPage } from './pages/HooksPage'

export function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="style-guide/typography" element={<TypographyPage />} />
                <Route path="style-guide/colors" element={<ColorsPage />} />
                <Route path="style-guide/spacing" element={<SpacingPage />} />
                <Route path="components/ui" element={<UIComponentsPage />} />
                <Route path="components/viz" element={<VizComponentsPage />} />
                <Route path="components/layout" element={<LayoutPage />} />
                <Route path="components/search" element={<SearchPage />} />
                <Route path="theme" element={<ThemePage />} />
                <Route path="components/d3-dsl" element={<D3DslPage />} />
                <Route path="customization/hooks" element={<HooksPage />} />
            </Route>
        </Routes>
    )
}

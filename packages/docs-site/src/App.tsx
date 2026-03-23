import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@study-ui/components'
import { HomePage } from './pages/HomePage'
import { TypographyPage } from './pages/TypographyPage'
import { ColorsPage } from './pages/ColorsPage'
import { UIComponentsPage } from './pages/UIComponentsPage'
import { VizComponentsPage } from './pages/VizComponentsPage'
import { LayoutPage } from './pages/LayoutPage'

export function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="style-guide/typography" element={<TypographyPage />} />
                <Route path="style-guide/colors" element={<ColorsPage />} />
                <Route path="components/ui" element={<UIComponentsPage />} />
                <Route path="components/viz" element={<VizComponentsPage />} />
                <Route path="components/layout" element={<LayoutPage />} />
            </Route>
        </Routes>
    )
}

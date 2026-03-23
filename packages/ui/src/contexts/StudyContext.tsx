import type { SiteConfig } from '../types'
import { StudyContext } from './StudyContextDef'

export function StudyProvider({ config, children }: { config: SiteConfig; children: React.ReactNode }) {
    return <StudyContext.Provider value={config}>{children}</StudyContext.Provider>
}

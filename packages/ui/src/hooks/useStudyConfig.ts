import { useContext } from 'react'
import { StudyContext } from '../contexts/StudyContextDef'
import type { SiteConfig } from '../types'

export function useStudyConfig(): SiteConfig {
    const ctx = useContext(StudyContext)
    if (!ctx) throw new Error('useStudyConfig must be used within a StudyProvider')
    return ctx
}

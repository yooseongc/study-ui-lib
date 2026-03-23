import { createContext } from 'react'
import type { SiteConfig } from '../types'

export const StudyContext = createContext<SiteConfig | null>(null)

import type { Topic } from './topic'
import type { GlossaryConfig } from './glossary'
import type { SectionEntry } from './search'

export interface FooterLink {
    label: string
    to: string
    icon?: 'glossary' | 'graph' | 'link'
}

export interface SiteConfig {
    name: string
    subtitle: string
    topics: Topic[]
    glossary: GlossaryConfig
    searchIndex: SectionEntry[]
    footerLinks?: FooterLink[]
}

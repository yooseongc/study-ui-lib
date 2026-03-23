export interface GlossaryEntry {
    id: string
    term: string
    /** kernel-study: optional, network-study: required — library treats as optional */
    aliases?: string[]
    /** Project-specific category string. Must have matching entry in GlossaryConfig.categoryLabels */
    category: string
    definition: string
    /** kernel-study: string, network-study: string[] — library accepts both */
    topicRef?: string | string[]
}

export interface GlossaryConfig {
    entries: GlossaryEntry[]
    /** Map of category ID → display label. Every category in entries must have a label here. */
    categoryLabels: Record<string, string>
    /** Map of category ID → Tailwind class string for badge styling. */
    categoryColors: Record<string, string>
}

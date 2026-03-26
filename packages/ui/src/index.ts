// ── Types ─────────────────────────────────────────────────────────────────────
export type { Topic } from './types/topic'
export type { GlossaryEntry, GlossaryConfig } from './types/glossary'
export type { SectionEntry } from './types/search'
export type { FooterLink, SiteConfig } from './types/site'
export type { Theme, ThemeContextValue } from './contexts/ThemeContextDef'
export type { D3Theme } from './lib/d3-theme'
export type { TableRow, TableColumn } from './components/ui/InfoTable'
export type { InfoBoxColor } from './components/ui/InfoBox'
export type { StatColor } from './components/ui/StatCard'
export type { AlertVariant } from './components/ui/Alert'
export type { AnimationStep } from './components/viz/AnimatedDiagram'
export type { InlineCodeColor } from './components/ui/InlineCode'
export type { ConsoleEntry } from './hooks/useIframeConsole'
export type { NavItem, NavGroup, NavSection, NavExtra, NestedSidebarProps } from './components/layout/NestedSidebar'
export type { IframeRunnerFile, IframeRunnerProps } from './components/viz/IframeRunner'
export type { CodeViewerProps } from './components/viz/CodeViewer'
export type { FileEntry, FileGroup } from './components/viz/FileExplorer'

// ── Contexts ──────────────────────────────────────────────────────────────────
export { ThemeProvider } from './contexts/ThemeContext'
export { ThemeContext } from './contexts/ThemeContextDef'
export { StudyProvider } from './contexts/StudyContext'
export { useStudyConfig } from './hooks/useStudyConfig'

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { useTheme } from './hooks/useTheme'
export { useIsDark } from './hooks/useIsDark'
export { useAnimationStep } from './hooks/useAnimationStep'
export { useD3 } from './hooks/useD3'
export { useThree } from './hooks/useThree'
export { useIframeConsole, CONSOLE_BRIDGE_SCRIPT } from './hooks/useIframeConsole'

// ── Utilities ─────────────────────────────────────────────────────────────────
export { themeColors, createColorMap } from './lib/colors'
export { createD3Theme } from './lib/d3-theme'
export { addLabel, addNode, addArrow, addLegend } from './lib/d3-helpers'

// ── Layout Components ─────────────────────────────────────────────────────────
export { AppLayout } from './components/layout/AppLayout'
export { Sidebar } from './components/layout/Sidebar'
export { NestedSidebar } from './components/layout/NestedSidebar'
export { BackToTop } from './components/layout/BackToTop'
export { TableOfContents } from './components/layout/TableOfContents'

// ── UI Components ─────────────────────────────────────────────────────────────
export { Alert } from './components/ui/Alert'
export { InfoBox } from './components/ui/InfoBox'
export { StatCard } from './components/ui/StatCard'
export { Section } from './components/ui/Section'
export { Prose } from './components/ui/Prose'
export { InfoTable } from './components/ui/InfoTable'
export { CardGrid } from './components/ui/CardGrid'
export { InlineCode } from './components/ui/InlineCode'
export { SourceRef } from './components/ui/SourceRef'
export { TopicNavigation } from './components/ui/TopicNavigation'
export { LearningCard } from './components/ui/LearningCard'
export { TopicHeader } from './components/ui/TopicHeader'
export { TopicPage } from './components/ui/TopicPage'
export { T, T as GlossaryTooltip } from './components/ui/GlossaryTooltip'
export { SubSection } from './components/ui/SubSection'

// ── Search ────────────────────────────────────────────────────────────────────
export { SearchModal } from './components/search/SearchModal'

// ── Visualization Components ──────────────────────────────────────────────────
export { CodeBlock } from './components/viz/CodeBlock'
export { D3Container } from './components/viz/D3Container'
export { MermaidDiagram } from './components/viz/MermaidDiagram'
export { WebGLCanvas } from './components/viz/WebGLCanvas'
export { AnimatedDiagram } from './components/viz/AnimatedDiagram'
export { IframeRunner } from './components/viz/IframeRunner'
export { ConsolePanel } from './components/viz/ConsolePanel'
export { CodeViewer } from './components/viz/CodeViewer'
export { FileExplorer } from './components/viz/FileExplorer'

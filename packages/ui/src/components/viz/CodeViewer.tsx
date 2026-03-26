import { useState, useRef, useEffect, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useIsDark } from '../../hooks/useIsDark'
import type { FileEntry, FileGroup } from './FileExplorer'
import { FileExplorer } from './FileExplorer'

type LayoutMode = 'horizontal' | 'vertical' | 'code-only'

export interface CodeViewerProps {
    /** Source files to display */
    files: FileEntry[]
    /** Additional file groups for the file explorer (libraries, etc.) */
    fileGroups?: FileGroup[]
    /** Runner element to render alongside the code */
    runner?: React.ReactNode
    /** Code language for syntax highlighting */
    language?: string
    /** Height of the runner panel */
    runnerHeight?: number
    /** Max file size in bytes to display code (larger files show placeholder) */
    maxDisplaySize?: number
    className?: string
}

export function CodeViewer({
    files,
    fileGroups = [],
    runner,
    language = 'javascript',
    runnerHeight = 600,
    maxDisplaySize = 50 * 1024,
    className = '',
}: CodeViewerProps) {
    const [activeTab, setActiveTab] = useState(0)
    const [layout, setLayout] = useState<LayoutMode>(runner ? 'horizontal' : 'code-only')
    const [showFileTree, setShowFileTree] = useState(true)
    const [copied, setCopied] = useState(false)
    const codeScrollRef = useRef<HTMLDivElement>(null)
    const [canScrollDown, setCanScrollDown] = useState(false)
    const isDark = useIsDark()

    const checkScroll = useCallback(() => {
        const el = codeScrollRef.current
        if (!el) return
        setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 8)
    }, [])

    useEffect(() => {
        const t = setTimeout(checkScroll, 100)
        return () => clearTimeout(t)
    }, [activeTab, layout, checkScroll])

    // Auto-switch layout on small screens
    useEffect(() => {
        if (!runner) return
        const mq = window.matchMedia('(max-width: 1023px)')
        const handler = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches && layout === 'horizontal') setLayout('vertical')
        }
        handler(mq)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [runner]) // eslint-disable-line react-hooks/exhaustive-deps

    if (files.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                Loading files...
            </div>
        )
    }

    const activeFile = files[activeTab]
    // Control bar ~40px, tab bar ~36px, console header ~32px, console ~128px, margins ~32px = ~268px
    const panelHeight = runnerHeight + 268

    const handleCopy = () => {
        navigator.clipboard.writeText(activeFile.content.trim()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    const layoutBtn = (mode: LayoutMode, icon: string, titleText: string) => (
        <button
            onClick={() => setLayout(mode)}
            className={`text-xs px-1.5 py-1 rounded transition-colors focus-visible:outline-2 focus-visible:outline-pink-500 ${
                layout === mode
                    ? 'text-pink-600 dark:text-pink-400 bg-white dark:bg-gray-800'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title={titleText}
            aria-label={titleText}
        >
            {icon}
        </button>
    )

    const codeBg = isDark ? '#0d1117' : '#fafbfc'
    const codeStyle = isDark ? vscDarkPlus : oneLight

    const tabBar = (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <button
                onClick={() => setShowFileTree((v) => !v)}
                className={`shrink-0 text-xs px-2 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-pink-500 ${
                    showFileTree
                        ? 'text-pink-600 dark:text-pink-400'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title={showFileTree ? 'Hide file tree' : 'Show file tree'}
                aria-label={showFileTree ? 'Hide file tree' : 'Show file tree'}
            >
                {showFileTree ? '\u25E7' : '\u2630'}
            </button>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="flex items-center overflow-x-auto min-w-0 flex-1 px-1">
                {files.map((file, i) => (
                    <button
                        key={file.name}
                        onClick={() => { setActiveTab(i); setCopied(false) }}
                        className={`shrink-0 text-xs font-mono px-3 py-2 whitespace-nowrap transition-colors ${
                            i === activeTab
                                ? 'text-pink-600 dark:text-pink-400 bg-white dark:bg-gray-800 border-b-2 border-pink-500'
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        {file.name}
                    </button>
                ))}
            </div>
            <div className="shrink-0 flex items-center gap-1 mr-1">
                {/* Copy button */}
                <button
                    onClick={handleCopy}
                    className="text-[10px] px-2 py-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-pink-500"
                    aria-label="Copy code"
                    title="Copy code"
                >
                    {copied ? '\u2713 Copied' : 'Copy'}
                </button>
                {runner && (
                    <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-md bg-gray-200 dark:bg-gray-800">
                        {layoutBtn('horizontal', '\u25EB', 'Side by side')}
                        {layoutBtn('vertical', '\u2B12', 'Top/bottom')}
                        {layoutBtn('code-only', '\u25A1', 'Code only')}
                    </div>
                )}
            </div>
        </div>
    )

    const isFileTooLarge = activeFile.content.length > maxDisplaySize
    const fileSizeKB = (activeFile.content.length / 1024).toFixed(1)

    const codePanel = (
        <div className="flex-1 relative min-h-0" style={{ background: codeBg }}>
            {isFileTooLarge ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 px-6 text-center">
                    <p className="text-sm font-mono mb-1">{activeFile.name} ({fileSizeKB} KB)</p>
                    <p className="text-xs">File too large to display in code view.</p>
                </div>
            ) : (
                <>
                    <div
                        ref={codeScrollRef}
                        onScroll={checkScroll}
                        className="absolute inset-0 overflow-auto"
                    >
                        <SyntaxHighlighter
                            language={language}
                            style={codeStyle}
                            customStyle={{ margin: 0, borderRadius: 0, background: codeBg, fontSize: '0.82rem', minHeight: '100%' }}
                            showLineNumbers
                        >
                            {activeFile.content.trim()}
                        </SyntaxHighlighter>
                    </div>
                    {canScrollDown && (
                        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
                            <div className="h-8" style={{ background: `linear-gradient(transparent, ${codeBg})` }} />
                            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] rounded-full px-2 py-0.5 animate-bounce ${
                                isDark ? 'text-gray-500 bg-gray-800/80' : 'text-gray-400 bg-white/80'
                            }`}>
                                \u2193 scroll
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )

    const fileTree = showFileTree ? (
        <FileExplorer files={files} groups={fileGroups} activeIndex={activeTab} onSelect={(i) => { setActiveTab(i); setCopied(false) }} className="hidden sm:flex" />
    ) : null

    if (layout === 'horizontal' && runner) {
        return (
            <div className={`rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
                <div className="flex flex-col lg:flex-row">
                    <div className="flex border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-1/2" style={{ height: panelHeight }}>
                        {fileTree}
                        <div className="flex flex-col flex-1 min-w-0">{tabBar}{codePanel}</div>
                    </div>
                    <div className="lg:w-1/2 bg-gray-50 dark:bg-gray-950 flex flex-col overflow-hidden" style={{ height: panelHeight }}>
                        {runner}
                    </div>
                </div>
            </div>
        )
    }

    if (layout === 'vertical' && runner) {
        return (
            <div className={`rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
                <div className="bg-gray-50 dark:bg-gray-950">{runner}</div>
                <div className="flex border-t border-gray-200 dark:border-gray-800" style={{ height: 480 }}>
                    {fileTree}
                    <div className="flex flex-col flex-1 min-w-0">{tabBar}{codePanel}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
            <div className="flex" style={{ height: panelHeight }}>
                {fileTree}
                <div className="flex flex-col flex-1 min-w-0">{tabBar}{codePanel}</div>
            </div>
        </div>
    )
}

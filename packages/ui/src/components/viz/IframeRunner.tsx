import { useRef, useState, useCallback, useEffect } from 'react'
import { useIsDark } from '../../hooks/useIsDark'
import { ConsolePanel } from './ConsolePanel'
import { useIframeConsole, CONSOLE_BRIDGE_SCRIPT } from '../../hooks/useIframeConsole'

export interface IframeRunnerFile {
    name: string
    content: string
}

export interface IframeRunnerProps {
    /** HTML to inject into the iframe's srcdoc. If provided, overrides buildSrcdoc. */
    srcdoc?: string
    /** Script files to inline in the iframe body */
    files?: IframeRunnerFile[]
    /** External library script URLs to load in the iframe head */
    libraryUrls?: string[]
    /** Custom CSS to inject in the iframe head */
    css?: string
    /** HTML to inject into the iframe body before scripts */
    bodyHtml?: string
    /** Base URL for relative asset paths inside the iframe */
    baseUrl?: string
    /** iframe title for accessibility */
    title?: string
    /** iframe sandbox attributes */
    sandbox?: string
    /** iframe allow attributes */
    allow?: string
    /** Canvas/iframe width hint (used for display info) */
    width?: number
    /** Canvas/iframe height */
    height?: number
    /** Pause/resume callback names on the iframe window */
    pauseFn?: string
    resumeFn?: string
    /** Show console panel */
    showConsole?: boolean
    className?: string
}

export function IframeRunner({
    srcdoc: srcdocProp,
    files = [],
    libraryUrls = [],
    css = '',
    bodyHtml = '',
    baseUrl,
    title = 'Interactive sketch',
    sandbox = 'allow-scripts allow-same-origin allow-popups allow-modals',
    allow = '',
    width = 600,
    height = 600,
    pauseFn = 'noLoop',
    resumeFn = 'loop',
    showConsole: initialShowConsole = true,
    className = '',
}: IframeRunnerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isRunning, setIsRunning] = useState(true)
    const [key, setKey] = useState(0)
    const [showConsole, setShowConsole] = useState(initialShowConsole)
    const isDark = useIsDark()
    const { entries, clear, errorCount, warnCount } = useIframeConsole()

    const buildSrcdoc = useCallback(() => {
        if (srcdocProp) return srcdocProp

        const libScripts = libraryUrls.map((url) => `<script src="${url}"><\/script>`).join('\n    ')
        const inlineScripts = files.map((f) => `<script>\n${f.content}\n<\/script>`).join('\n    ')
        const bg = isDark ? '#000' : '#f8f8f8'
        const fg = isDark ? '#ccc' : '#333'
        const baseTag = baseUrl ? `<base href="${baseUrl}" />` : ''

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    ${baseTag}
    <style>
        html, body { margin: 0; padding: 0; background: ${bg}; color: ${fg}; font-family: sans-serif; font-size: 12px; }
        canvas { display: block; }
        input[type="range"] { width: 200px; margin: 6px 8px; accent-color: #ec4899; }
        p, span, div:not(:has(canvas)) { padding: 0 8px; }
        select, button, input { margin: 4px 8px; }
        ${css}
    </style>
    ${CONSOLE_BRIDGE_SCRIPT}
    ${libScripts}
</head>
<body>
    ${bodyHtml}
    ${inlineScripts}
</body>
</html>`
    }, [srcdocProp, files, libraryUrls, isDark, baseUrl, bodyHtml, css])

    const restart = useCallback(() => {
        setKey((k) => k + 1)
        setIsRunning(true)
        clear()
    }, [clear])

    const togglePause = useCallback(() => {
        const iframe = iframeRef.current
        if (!iframe?.contentWindow) return
        try {
            const win = iframe.contentWindow as unknown as Record<string, unknown>
            if (isRunning) {
                (win[pauseFn] as (() => void) | undefined)?.()
            } else {
                (win[resumeFn] as (() => void) | undefined)?.()
            }
            setIsRunning((r) => !r)
        } catch {
            // cross-origin
        }
    }, [isRunning, pauseFn, resumeFn])

    useEffect(() => {
        setIsRunning(true)
    }, [key])

    const doc = buildSrcdoc()

    return (
        <div className={`flex flex-col w-full ${className}`}>
            {/* Iframe */}
            <div className="relative rounded-t-lg overflow-hidden bg-black dark:bg-black">
                <iframe
                    ref={iframeRef}
                    key={key}
                    srcDoc={doc}
                    title={title}
                    sandbox={sandbox}
                    allow={allow}
                    className="w-full border-0"
                    style={{ height: height + 60 }}
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
                <button
                    onClick={togglePause}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label={isRunning ? 'Pause' : 'Resume'}
                >
                    {isRunning ? '\u23F8 Pause' : '\u25B6 Resume'}
                </button>
                <button
                    onClick={restart}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Restart"
                >
                    Restart
                </button>
                <div className="ml-auto flex items-center gap-2">
                    {errorCount > 0 && (
                        <span className="text-[10px] text-red-600 dark:text-red-400 font-mono">{errorCount} error{errorCount > 1 ? 's' : ''}</span>
                    )}
                    {warnCount > 0 && (
                        <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-mono">{warnCount} warn{warnCount > 1 ? 's' : ''}</span>
                    )}
                    <button
                        onClick={() => setShowConsole((v) => !v)}
                        className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
                            showConsole
                                ? 'bg-gray-400 dark:bg-gray-600 text-white'
                                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-600'
                        }`}
                        aria-label={showConsole ? 'Hide console' : 'Show console'}
                    >
                        Console
                    </button>
                    <span className="text-[10px] text-gray-500 font-mono">{width}\u00D7{height}</span>
                </div>
            </div>

            {/* Console */}
            {showConsole && (
                <ConsolePanel entries={entries} onClear={clear} className="rounded-b-lg" />
            )}
        </div>
    )
}

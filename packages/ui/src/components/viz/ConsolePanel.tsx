import { useRef, useEffect } from 'react'
import type { ConsoleEntry } from '../../hooks/useIframeConsole'

const levelColors: Record<string, string> = {
    log: 'text-gray-300',
    info: 'text-blue-400',
    warn: 'text-yellow-400',
    error: 'text-red-400',
}

const levelIcons: Record<string, string> = {
    log: '\u203A',
    info: '\u2139',
    warn: '\u26A0',
    error: '\u2715',
}

interface ConsolePanelProps {
    entries: ConsoleEntry[]
    onClear?: () => void
    height?: number
    className?: string
}

export function ConsolePanel({ entries, onClear, height = 128, className = '' }: ConsolePanelProps) {
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = endRef.current
        if (el) {
            el.parentElement?.scrollTo({ top: el.parentElement.scrollHeight, behavior: 'smooth' })
        }
    }, [entries])

    return (
        <div className={`bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 overflow-hidden ${className}`} role="log" aria-live="polite">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-gray-800">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Console</span>
                {onClear && (
                    <button
                        onClick={onClear}
                        className="text-[10px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-mono transition-colors"
                        aria-label="Clear console"
                    >
                        Clear
                    </button>
                )}
            </div>
            <div className="overflow-y-auto font-mono text-[11px] leading-relaxed" style={{ height }}>
                {entries.length === 0 && (
                    <div className="px-3 py-2 text-gray-400 dark:text-gray-600 italic">No console output</div>
                )}
                {entries.map((entry, i) => (
                    <div
                        key={i}
                        className={`flex gap-2 px-3 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-800/50 ${levelColors[entry.level]} ${
                            entry.level === 'error' ? 'bg-red-50 dark:bg-red-900/10' : entry.level === 'warn' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                        }`}
                    >
                        <span className="shrink-0 w-3 text-center opacity-60">{levelIcons[entry.level]}</span>
                        <span className="break-all">{entry.args}</span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    )
}

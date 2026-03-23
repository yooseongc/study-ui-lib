import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useTheme } from '../../hooks/useTheme'

interface MermaidDiagramProps {
    chart: string
    className?: string
}

let renderSeq = 0

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string | null>(null)
    const { theme } = useTheme()
    const stableId = useId()
    const renderId = useRef(0)

    useEffect(() => {
        if (!ref.current) return
        setError(null)
        const seq = ++renderSeq
        renderId.current = seq
        const id = `mermaid-${stableId.replace(/:/g, '')}-${seq}`

        mermaid.initialize({
            startOnLoad: false,
            theme: theme === 'dark' ? 'dark' : 'default',
        })

        mermaid
            .render(id, chart)
            .then(({ svg }) => {
                if (ref.current && renderId.current === seq) {
                    ref.current.innerHTML = svg
                }
            })
            .catch((e) => setError(String(e)))
    }, [chart, theme, stableId])

    if (error)
        return (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-300 text-sm font-mono">
                Mermaid error: {error}
            </div>
        )

    return <div ref={ref} className={`flex justify-center overflow-x-auto ${className}`} />
}

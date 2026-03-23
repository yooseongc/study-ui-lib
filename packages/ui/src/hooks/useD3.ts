import { useRef, useEffect } from 'react'
import type { RefObject } from 'react'

type D3Module = typeof import('d3')
type D3Selection = import('d3').Selection<SVGSVGElement, unknown, null, undefined>

export function useD3(
    renderFn: (svg: D3Selection) => void,
    deps: React.DependencyList = [],
): RefObject<SVGSVGElement | null> {
    const ref = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        if (!ref.current) return
        let cancelled = false

        import('d3').then((d3: D3Module) => {
            if (cancelled || !ref.current) return
            const svg = d3.select(ref.current)
            renderFn(svg)
        })

        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return ref
}

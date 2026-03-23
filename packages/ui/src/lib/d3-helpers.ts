/**
 * D3 DSL 헬퍼 함수
 *
 * D3 시각화에서 테마/폰트 일관성을 자동으로 보장하는 선언적 빌더 함수들.
 * D3Theme와 함께 사용하여 dark/light 모드에서 일관된 렌더링을 제공.
 */
import type * as d3 from 'd3'
import type { D3Theme } from './d3-theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Selection = d3.Selection<any, unknown, any, unknown>

// ── addLabel ──────────────────────────────────────────────────────────────────
interface LabelOptions {
    x: number
    y: number
    font?: 'sans' | 'mono'
    size?: 'sm' | 'base' | 'lg' | 'xl'
    color?: string
    anchor?: 'start' | 'middle' | 'end'
    weight?: 'normal' | 'bold' | '500' | '600' | '700'
    dy?: string
}

export function addLabel(parent: Selection, text: string, theme: D3Theme, options: LabelOptions): Selection {
    const { x, y, font = 'sans', size = 'base', anchor = 'start', weight = 'normal', dy = '0.35em' } = options
    const color = options.color ?? theme.colors.text

    return parent
        .append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', anchor)
        .attr('dominant-baseline', 'central')
        .attr('dy', dy)
        .style('font-family', theme.fonts[font])
        .style('font-size', `${theme.fonts.size[size]}px`)
        .style('font-weight', weight)
        .style('fill', color)
        .text(text)
}

// ── addNode ───────────────────────────────────────────────────────────────────
interface NodeOptions {
    x: number
    y: number
    width: number
    height: number
    fill?: string
    stroke?: string
    rx?: number
    label?: string
    labelColor?: string
    labelFont?: 'sans' | 'mono'
    labelSize?: 'sm' | 'base' | 'lg' | 'xl'
}

export function addNode(parent: Selection, theme: D3Theme, options: NodeOptions): Selection {
    const {
        x,
        y,
        width,
        height,
        rx = theme.border.radius,
        label,
        labelFont = 'sans',
        labelSize = 'base',
    } = options
    const fill = options.fill ?? theme.colors.bgCard
    const stroke = options.stroke ?? theme.colors.border
    const labelColor = options.labelColor ?? theme.colors.text

    const g = parent.append('g')

    g.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .attr('rx', rx)
        .style('fill', fill)
        .style('stroke', stroke)
        .style('stroke-width', theme.border.width)

    if (label) {
        g.append('text')
            .attr('x', x + width / 2)
            .attr('y', y + height / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .style('font-family', theme.fonts[labelFont])
            .style('font-size', `${theme.fonts.size[labelSize]}px`)
            .style('fill', labelColor)
            .text(label)
    }

    return g
}

// ── addArrow ──────────────────────────────────────────────────────────────────
interface ArrowOptions {
    from: [number, number]
    to: [number, number]
    color?: string
    dashed?: boolean
    label?: string
    labelOffset?: number
    strokeWidth?: number
    markerSize?: number
}

export function addArrow(parent: Selection, theme: D3Theme, options: ArrowOptions): Selection {
    const { from, to, dashed = false, strokeWidth = 1.5, markerSize = 6, labelOffset = -8 } = options
    const color = options.color ?? theme.colors.textMuted

    const g = parent.append('g')

    // 화살표 마커 정의 (defs에 추가)
    const markerId = `arrow-${Math.random().toString(36).slice(2, 8)}`
    const svg = parent.select(function (this: SVGElement) {
        return this.ownerSVGElement ?? this
    })
    let defs = svg.select<SVGDefsElement>('defs')
    if (defs.empty()) {
        defs = svg.append('defs')
    }

    defs.append('marker')
        .attr('id', markerId)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 10)
        .attr('refY', 5)
        .attr('markerWidth', markerSize)
        .attr('markerHeight', markerSize)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .style('fill', color)

    const line = g
        .append('line')
        .attr('x1', from[0])
        .attr('y1', from[1])
        .attr('x2', to[0])
        .attr('y2', to[1])
        .style('stroke', color)
        .style('stroke-width', strokeWidth)
        .attr('marker-end', `url(#${markerId})`)

    if (dashed) {
        line.style('stroke-dasharray', '4,3')
    }

    if (options.label) {
        const mx = (from[0] + to[0]) / 2
        const my = (from[1] + to[1]) / 2
        g.append('text')
            .attr('x', mx)
            .attr('y', my + labelOffset)
            .attr('text-anchor', 'middle')
            .style('font-family', theme.fonts.sans)
            .style('font-size', `${theme.fonts.size.sm}px`)
            .style('fill', theme.colors.textMuted)
            .text(options.label)
    }

    return g
}

// ── addLegend ─────────────────────────────────────────────────────────────────
interface LegendItem {
    label: string
    color: string
}

interface LegendOptions {
    x: number
    y: number
    direction?: 'horizontal' | 'vertical'
    itemGap?: number
    swatchSize?: number
}

export function addLegend(
    parent: Selection,
    items: LegendItem[],
    theme: D3Theme,
    options: LegendOptions,
): Selection {
    const { x, y, direction = 'horizontal', itemGap = direction === 'horizontal' ? 100 : 22, swatchSize = 10 } =
        options

    const g = parent.append('g').attr('transform', `translate(${x},${y})`)

    items.forEach((item, i) => {
        const dx = direction === 'horizontal' ? i * itemGap : 0
        const dy = direction === 'vertical' ? i * itemGap : 0
        const ig = g.append('g').attr('transform', `translate(${dx},${dy})`)

        ig.append('rect')
            .attr('width', swatchSize)
            .attr('height', swatchSize)
            .attr('rx', 2)
            .style('fill', item.color)

        ig.append('text')
            .attr('x', swatchSize + 6)
            .attr('y', swatchSize / 2)
            .attr('dominant-baseline', 'central')
            .style('font-family', theme.fonts.sans)
            .style('font-size', `${theme.fonts.size.sm}px`)
            .style('fill', theme.colors.textMuted)
            .text(item.label)
    })

    return g
}

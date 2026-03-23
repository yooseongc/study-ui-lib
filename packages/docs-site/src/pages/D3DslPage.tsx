import { Section, Prose, InfoBox, CardGrid, CodeBlock, InfoTable, Alert } from '@study-ui/components'
import type { TableColumn } from '@study-ui/components'

const themeCode = `import { createD3Theme, useIsDark } from '@study-ui/components'

function MyDiagram() {
    const isDark = useIsDark()
    const theme = createD3Theme(isDark)

    // theme.colors  — oklch 색상 팔레트
    // theme.fonts   — { sans, mono, size: { sm: 11, base: 13, lg: 15, xl: 18 } }
    // theme.spacing — { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }
    // theme.border  — { radius: 6, width: 1 }
}`

const beforeCode = `// Before: 각 다이어그램에서 수동 테마 적용
function renderDiagram(svg, width, height) {
    const isDark = document.documentElement.classList.contains('dark')
    const c = themeColors(isDark)

    svg.append('rect')
        .attr('x', 50).attr('y', 50)
        .attr('width', 200).attr('height', 40)
        .attr('rx', 6)
        .style('fill', c.blueFill)
        .style('stroke', c.blueStroke)
        .style('stroke-width', 1)

    svg.append('text')
        .attr('x', 150).attr('y', 70)
        .attr('text-anchor', 'middle')
        .style('font-family', "'Pretendard Variable', sans-serif")
        .style('font-size', '13px')
        .style('fill', c.text)
        .text('Process')
}`

const afterCode = `// After: DSL 헬퍼 + 자동 테마
import { addNode, addLabel, addArrow, addLegend } from '@study-ui/components'
import type { D3Theme } from '@study-ui/components'

function renderDiagram(svg, width, height, theme: D3Theme) {
    addNode(svg, theme, {
        x: 50, y: 50, width: 200, height: 40,
        fill: theme.colors.blueFill,
        label: 'Process',
    })

    addArrow(svg, theme, {
        from: [150, 90], to: [150, 150],
        color: theme.colors.link,
        label: 'syscall',
    })

    addLabel(svg, 'Memory Map', theme, {
        x: 150, y: 170, font: 'sans', size: 'lg',
    })
}`

const addNodeCode = `addNode(parent, theme, {
    x: number,          // 좌상단 X
    y: number,          // 좌상단 Y
    width: number,
    height: number,
    fill?: string,      // 기본: theme.colors.bgCard
    stroke?: string,    // 기본: theme.colors.border
    rx?: number,        // 기본: theme.border.radius (6)
    label?: string,     // 중앙 텍스트
    labelColor?: string,
    labelFont?: 'sans' | 'mono',
    labelSize?: 'sm' | 'base' | 'lg' | 'xl',
})`

const addArrowCode = `addArrow(parent, theme, {
    from: [x, y],       // 시작점
    to: [x, y],         // 끝점
    color?: string,     // 기본: theme.colors.textMuted
    dashed?: boolean,   // 점선 여부
    label?: string,     // 중간 라벨
    strokeWidth?: number,
    markerSize?: number,
})`

const addLabelCode = `addLabel(parent, 'text', theme, {
    x: number,
    y: number,
    font?: 'sans' | 'mono',   // 기본: 'sans'
    size?: 'sm' | 'base' | 'lg' | 'xl',  // 기본: 'base'
    color?: string,            // 기본: theme.colors.text
    anchor?: 'start' | 'middle' | 'end',
    weight?: 'normal' | 'bold' | '500' | '600' | '700',
})`

const addLegendCode = `addLegend(parent, [
    { label: 'User Space', color: theme.colors.blueStroke },
    { label: 'Kernel', color: theme.colors.greenStroke },
], theme, {
    x: 10, y: 10,
    direction?: 'horizontal' | 'vertical',  // 기본: 'horizontal'
    itemGap?: number,    // 항목 간격
    swatchSize?: number, // 색상 사각형 크기 (기본 10)
})`

const apiColumns: TableColumn[] = [
    { header: '함수', mono: true, cellClassName: 'text-blue-600 dark:text-blue-400 font-medium' },
    { header: '용도', cellClassName: 'text-gray-700 dark:text-gray-300' },
    { header: '자동 적용', cellClassName: 'text-gray-500 dark:text-gray-400' },
]

export function D3DslPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">D3 DSL</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    D3 시각화에서 테마/폰트 일관성을 자동으로 보장하는 선언적 헬퍼 시스템
                </p>
            </div>

            <Section id="overview" title="개요">
                <Prose>
                    D3 시각화를 작성할 때 매번 색상, 폰트, 크기를 수동으로 지정하면 다크 모드 전환 시 누락이 생기고 스타일이 불일치합니다.
                    D3 DSL은 테마 객체(D3Theme)와 헬퍼 함수(addNode, addArrow, addLabel, addLegend)를 제공하여 이를 해결합니다.
                </Prose>
                <InfoTable
                    headers={apiColumns}
                    rows={[
                        { cells: ['createD3Theme(isDark)', '테마 객체 생성', '색상, 폰트, 간격, 테두리'] },
                        { cells: ['addLabel()', '텍스트 렌더링', '폰트, 크기, 색상'] },
                        { cells: ['addNode()', '박스/노드 렌더링', '배경, 테두리, 라벨 폰트'] },
                        { cells: ['addArrow()', '화살표 렌더링', '색상, 마커'] },
                        { cells: ['addLegend()', '범례 렌더링', '폰트, 색상 스와치'] },
                    ]}
                />
            </Section>

            <Section id="theme" title="D3Theme 생성">
                <Prose>
                    createD3Theme(isDark)는 현재 테마에 맞는 색상, 폰트, 간격 정보를 담은 객체를 반환합니다.
                </Prose>
                <CodeBlock code={themeCode} language="tsx" filename="D3Theme 사용" />
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="fonts">
                        sans: Pretendard Variable 풀스택, mono: JetBrains Mono 풀스택.
                        size: sm(11px), base(13px), lg(15px), xl(18px)
                    </InfoBox>
                    <InfoBox color="green" title="spacing & border">
                        spacing: xs(4), sm(8), md(16), lg(24), xl(32).
                        border: radius(6px), width(1px)
                    </InfoBox>
                </CardGrid>
            </Section>

            <Section id="comparison" title="기존 방식 vs DSL">
                <Alert variant="info">
                    DSL 헬퍼는 기존 D3 API를 대체하는 것이 아니라, 반복되는 테마 적용 코드를 줄여주는 편의 함수입니다. 복잡한 시각화에서는 D3 API를 직접 사용할 수 있습니다.
                </Alert>
                <CodeBlock code={beforeCode} language="typescript" filename="Before (수동 테마)" />
                <CodeBlock code={afterCode} language="typescript" filename="After (DSL 헬퍼)" />
            </Section>

            <Section id="add-node" title="addNode()">
                <Prose>테마 적용된 사각형 노드를 생성합니다. label을 지정하면 중앙에 텍스트도 추가됩니다.</Prose>
                <CodeBlock code={addNodeCode} language="typescript" filename="addNode API" />
            </Section>

            <Section id="add-arrow" title="addArrow()">
                <Prose>화살표 마커가 포함된 선을 그립니다. dashed 옵션으로 점선도 가능합니다.</Prose>
                <CodeBlock code={addArrowCode} language="typescript" filename="addArrow API" />
            </Section>

            <Section id="add-label" title="addLabel()">
                <Prose>테마의 폰트와 크기가 자동 적용된 텍스트를 추가합니다.</Prose>
                <CodeBlock code={addLabelCode} language="typescript" filename="addLabel API" />
            </Section>

            <Section id="add-legend" title="addLegend()">
                <Prose>색상 스와치와 라벨로 구성된 범례를 추가합니다.</Prose>
                <CodeBlock code={addLegendCode} language="typescript" filename="addLegend API" />
            </Section>
        </div>
    )
}

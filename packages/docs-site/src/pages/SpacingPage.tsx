import { Section, InfoBox, CardGrid, InfoTable, Alert, CodeBlock } from '@study-ui/components'

const spacingScale = [
    { cells: ['p-1 / m-1', '4px', '아이콘 내부 여백, 배지'] },
    { cells: ['p-2 / m-2', '8px', '버튼 내부 여백, 인라인 간격'] },
    { cells: ['p-3 / m-3', '12px', '작은 카드 패딩'] },
    { cells: ['p-4 / m-4', '16px', '컴포넌트 내부 패딩 (기본)'] },
    { cells: ['p-5 / m-5', '20px', '넓은 카드 패딩'] },
    { cells: ['p-6 / m-6', '24px', '섹션 내부 패딩'] },
    { cells: ['p-8 / m-8', '32px', '큰 섹션 패딩'] },
]

const gapScale = [
    { cells: ['space-y-2 / gap-2', '8px', '인접 인라인 요소'] },
    { cells: ['space-y-3 / gap-3', '12px', 'CardGrid 기본 간격'] },
    { cells: ['space-y-4 / gap-4', '16px', '컴포넌트 간 간격 (기본)'] },
    { cells: ['space-y-6 / gap-6', '24px', '섹션 내 블록 간격'] },
    { cells: ['space-y-8 / gap-8', '32px', '큰 블록 간격'] },
    { cells: ['space-y-10', '40px', '페이지 내 섹션 간격'] },
    { cells: ['space-y-14', '56px', 'TopicPage 섹션 간격'] },
]

const d3Spacing = [
    { cells: ['xs', '4', '라벨 내부 패딩'] },
    { cells: ['sm', '8', '노드 간 최소 간격'] },
    { cells: ['md', '16', '그룹 내부 여백'] },
    { cells: ['lg', '24', '범례와 차트 간격'] },
    { cells: ['xl', '32', '다이어그램 외부 마진'] },
]

const exampleCode = `// Tailwind 클래스 — 컴포넌트 간 간격
<div className="space-y-4">
    <Alert variant="info" title="알림" />
    <InfoBox color="blue" title="정보">내용</InfoBox>
</div>

// D3 DSL — theme.spacing 활용
const theme = createD3Theme(isDark)
const margin = theme.spacing.lg   // 24px
const gap = theme.spacing.sm      // 8px`

export function SpacingPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Spacing</h1>
                <p className="text-gray-500 dark:text-gray-400">간격, 여백, 패딩 체계 — Tailwind 스케일 기반</p>
            </div>

            <Section id="padding-margin" title="패딩 & 마진 스케일">
                <Alert variant="tip" title="Tailwind 기본 스케일">
                    모든 간격은 Tailwind CSS의 4px 단위 스케일을 사용합니다. 커스텀 값 없이 일관된 리듬을 유지합니다.
                </Alert>
                <InfoTable
                    headers={['클래스', '크기', '용도']}
                    rows={spacingScale}
                                    />
            </Section>

            <Section id="gap-between" title="요소 간 간격">
                <InfoTable
                    headers={['클래스', '크기', '용도']}
                    rows={gapScale}
                                    />
                <div className="mt-6 space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">라이브 비교</div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">space-y-2 (8px)</div>
                        <div className="space-y-2">
                            <div className="h-8 rounded bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800" />
                            <div className="h-8 rounded bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">space-y-4 (16px)</div>
                        <div className="space-y-4">
                            <div className="h-8 rounded bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800" />
                            <div className="h-8 rounded bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">space-y-8 (32px)</div>
                        <div className="space-y-8">
                            <div className="h-8 rounded bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800" />
                            <div className="h-8 rounded bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800" />
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="component-spacing" title="컴포넌트별 간격 규칙">
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="컴포넌트 내부">
                        InfoBox, Alert, StatCard 등의 내부 패딩은 <strong>p-4 ~ p-6</strong> (16~24px) 범위입니다.
                    </InfoBox>
                    <InfoBox color="purple" title="컴포넌트 간 간격">
                        일반 컴포넌트 사이는 <strong>space-y-4</strong> (16px), 섹션 간은 <strong>space-y-10</strong> (40px) 이상을 권장합니다.
                    </InfoBox>
                    <InfoBox color="green" title="TopicPage 섹션">
                        TopicPage 내부 Section 간격은 <strong>space-y-14</strong> (56px)로 시각적 구분이 명확합니다.
                    </InfoBox>
                    <InfoBox color="amber" title="CardGrid 간격">
                        CardGrid의 아이템 간 간격은 <strong>gap-3</strong> (12px)로 고정됩니다.
                    </InfoBox>
                </CardGrid>
            </Section>

            <Section id="d3-spacing" title="D3 시각화 간격 (theme.spacing)">
                <Alert variant="info" title="createD3Theme">
                    D3 시각화에서는 Tailwind 클래스 대신 <code className="font-mono text-sm">createD3Theme(isDark).spacing</code>을 사용합니다.
                </Alert>
                <InfoTable
                    headers={[{ header: '토큰', mono: true }, { header: '값 (px)', mono: true }, { header: '용도' }]}
                    rows={d3Spacing}
                />
            </Section>

            <Section id="usage" title="사용 예시">
                <CodeBlock code={exampleCode} language="tsx" filename="spacing-example.tsx" />
            </Section>
        </div>
    )
}

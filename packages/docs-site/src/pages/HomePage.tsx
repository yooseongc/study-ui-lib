import { Link } from 'react-router-dom'
import { Section, InfoBox, CardGrid } from '@study-ui/components'

export function HomePage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study UI Library</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                    <code className="text-blue-600 dark:text-blue-400 font-mono text-base">kernel-study</code>와{' '}
                    <code className="text-blue-600 dark:text-blue-400 font-mono text-base">network-study</code>의 공통
                    UI 컴포넌트 라이브러리입니다.
                </p>
            </div>

            <Section id="style-guide" title="Style Guide">
                <CardGrid cols={3}>
                    <Link to="/style-guide/typography" className="block">
                        <InfoBox color="blue" title="Typography">
                            폰트 패밀리, 크기 스케일, 굵기, 한글/영문 혼용 가이드
                        </InfoBox>
                    </Link>
                    <Link to="/style-guide/colors" className="block">
                        <InfoBox color="purple" title="Colors">
                            oklch 기반 색상 팔레트, 시맨틱 색상, Dark/Light 모드
                        </InfoBox>
                    </Link>
                    <Link to="/style-guide/spacing" className="block">
                        <InfoBox color="green" title="Spacing">
                            간격/여백 체계, 컴포넌트 간격 규칙, D3 spacing 토큰
                        </InfoBox>
                    </Link>
                </CardGrid>
            </Section>

            <Section id="components" title="Components">
                <CardGrid cols={3}>
                    <Link to="/components/ui" className="block">
                        <InfoBox color="green" title="UI Components">
                            Alert, InfoBox, StatCard, Section, Prose, InfoTable, CardGrid 등
                        </InfoBox>
                    </Link>
                    <Link to="/components/viz" className="block">
                        <InfoBox color="amber" title="Visualization">
                            CodeBlock, D3Container, MermaidDiagram, AnimatedDiagram
                        </InfoBox>
                    </Link>
                    <Link to="/components/layout" className="block">
                        <InfoBox color="cyan" title="Layout">
                            AppLayout, Sidebar, TopicPage, TableOfContents
                        </InfoBox>
                    </Link>
                    <Link to="/theme" className="block">
                        <InfoBox color="teal" title="Theme & Context">
                            ThemeProvider, StudyProvider, SiteConfig, 다크 모드
                        </InfoBox>
                    </Link>
                    <Link to="/components/d3-dsl" className="block">
                        <InfoBox color="indigo" title="D3 DSL">
                            createD3Theme, addNode, addArrow, addLabel, addLegend
                        </InfoBox>
                    </Link>
                    <Link to="/components/search" className="block">
                        <InfoBox color="rose" title="SearchModal">
                            토픽, 용어, 섹션 통합 검색 (⌘K)
                        </InfoBox>
                    </Link>
                    <Link to="/customization/hooks" className="block">
                        <InfoBox color="orange" title="Hooks">
                            useAnimationStep, useD3, useThree, useTheme
                        </InfoBox>
                    </Link>
                </CardGrid>
            </Section>

            <Section id="quick-start" title="Quick Start">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 p-5 text-sm font-mono text-gray-300 space-y-2">
                    <div className="text-gray-500"># git submodule로 추가</div>
                    <div>
                        git submodule add ../study-ui-lib <span className="text-green-400">lib/study-ui-lib</span>
                    </div>
                    <div className="mt-3 text-gray-500"># tsconfig.app.json에 path alias 추가</div>
                    <div className="text-amber-300">
                        {'"@study-ui/components": ["./lib/study-ui-lib/packages/ui/src/index.ts"]'}
                    </div>
                    <div className="mt-3 text-gray-500"># 컴포넌트 사용</div>
                    <div>
                        <span className="text-purple-400">import</span> {'{ Alert, InfoBox }'}{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-green-400">'@study-ui/components'</span>
                    </div>
                </div>
            </Section>
        </div>
    )
}

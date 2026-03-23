import { Section, Prose, Alert, InfoBox, CardGrid, CodeBlock, InfoTable } from '@study-ui/components'
import type { TableColumn } from '@study-ui/components'

const themeProviderCode = `// main.tsx
import { ThemeProvider, StudyProvider } from '@study-ui/components'
import { siteConfig } from './data/siteConfig'

<ThemeProvider>
    <StudyProvider config={siteConfig}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StudyProvider>
</ThemeProvider>`

const useThemeCode = `import { useTheme, useIsDark } from '@study-ui/components'

function MyComponent() {
    const { theme, toggle } = useTheme()  // 'dark' | 'light' + toggle()
    const isDark = useIsDark()            // boolean

    return <button onClick={toggle}>{isDark ? 'Light' : 'Dark'}</button>
}`

const siteConfigCode = `import type { SiteConfig } from '@study-ui/components'

const siteConfig: SiteConfig = {
    name: 'My Study',                    // 사이드바 로고, 모바일 헤더
    subtitle: 'Learning Platform',       // 사이드바 부제목
    topics: [                            // Topic[] — 사이드바 네비, 검색
        {
            id: '01-basics',
            number: 1,
            title: '기초',
            subtitle: 'Fundamentals',
            description: '기본 개념을 학습합니다',
            route: '/topic/01-basics',
            vizType: 'D3',
            tags: ['basic'],
            status: 'complete',
            difficulty: 'beginner',
            prerequisites: [],
        },
    ],
    glossary: {                          // GlossaryConfig — GlossaryTooltip, SearchModal
        entries: [...],                  // GlossaryEntry[]
        categoryLabels: {               // 카테고리 ID → 한글 라벨
            process: '프로세스',
            memory: '메모리',
        },
        categoryColors: {               // 카테고리 ID → Tailwind 클래스
            process: 'text-blue-600 dark:text-blue-400 ...',
            memory: 'text-purple-600 dark:text-purple-400 ...',
        },
    },
    searchIndex: [...],                  // SectionEntry[] — SearchModal
    footerLinks: [                       // 사이드바 하단 링크
        { label: '용어 사전', to: '/glossary', icon: 'glossary' },
        { label: '개념 지도', to: '/graph', icon: 'graph' },
    ],
}`

const providerColumns: TableColumn[] = [
    { header: 'Provider', mono: true, cellClassName: 'text-blue-600 dark:text-blue-400 font-medium' },
    { header: '역할', cellClassName: 'text-gray-700 dark:text-gray-300' },
    { header: '필수 여부', cellClassName: 'text-gray-500 dark:text-gray-400' },
]

const dependentColumns: TableColumn[] = [
    { header: '컴포넌트', mono: true, cellClassName: 'text-blue-600 dark:text-blue-400 font-medium' },
    { header: 'ThemeProvider', cellClassName: 'text-gray-700 dark:text-gray-300' },
    { header: 'StudyProvider', cellClassName: 'text-gray-700 dark:text-gray-300' },
]

export function ThemePage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Theme & Context</h1>
                <p className="text-gray-500 dark:text-gray-400">테마 시스템과 사이트 설정 컨텍스트</p>
            </div>

            <Section id="providers" title="Provider 구조">
                <Prose>
                    라이브러리는 두 개의 React Context Provider를 사용합니다. 앱 최상위에서 래핑해야 합니다.
                </Prose>
                <InfoTable
                    headers={providerColumns}
                    rows={[
                        { cells: ['ThemeProvider', 'dark/light 모드 관리, localStorage 저장', '필수'] },
                        { cells: ['StudyProvider', '토픽/용어/검색 데이터 주입', 'Layout 사용 시 필수'] },
                    ]}
                />
                <CodeBlock code={themeProviderCode} language="tsx" filename="main.tsx" />
            </Section>

            <Section id="theme-hooks" title="테마 Hooks">
                <Prose>
                    Provider 없이 호출하면 에러를 throw합니다 (무음 실패 방지).
                </Prose>
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="useTheme()">
                        {'{ theme, toggle }'} 반환. theme은 'dark' | 'light', toggle()로 전환.
                    </InfoBox>
                    <InfoBox color="purple" title="useIsDark()">
                        boolean 반환. 조건부 스타일링에 편리.
                    </InfoBox>
                </CardGrid>
                <CodeBlock code={useThemeCode} language="tsx" filename="useTheme / useIsDark" />
            </Section>

            <Section id="dark-mode" title="다크 모드 동작">
                <Prose>
                    ThemeProvider는 useLayoutEffect로 {'<html>'} 요소에 dark 클래스를 동기 토글합니다. FOUC(Flash of Unstyled Content)가 없습니다.
                </Prose>
                <CardGrid cols={3}>
                    <InfoBox color="gray" title="저장소">localStorage 'theme' 키</InfoBox>
                    <InfoBox color="gray" title="CSS">Tailwind dark: variant</InfoBox>
                    <InfoBox color="gray" title="SSR">try-catch로 안전 처리</InfoBox>
                </CardGrid>
                <Alert variant="tip">
                    Tailwind CSS 4에서는 base.css에 <code className="font-mono text-xs">@custom-variant dark</code>을 선언해야 dark: prefix가 동작합니다.
                </Alert>
            </Section>

            <Section id="site-config" title="SiteConfig 구조">
                <Prose>
                    StudyProvider에 전달하는 설정 객체입니다. 이 데이터를 기반으로 Sidebar, SearchModal, TopicPage 등이 자동 구성됩니다.
                </Prose>
                <CodeBlock code={siteConfigCode} language="typescript" filename="siteConfig.ts" />
            </Section>

            <Section id="dependencies" title="컴포넌트별 Provider 의존성">
                <Prose>Provider 없이 독립 사용 가능한 컴포넌트와 Provider가 필요한 컴포넌트입니다.</Prose>
                <InfoTable
                    headers={dependentColumns}
                    rows={[
                        { cells: ['Alert, InfoBox, StatCard, Section', '-', '-'] },
                        { cells: ['CodeBlock, MermaidDiagram', 'MermaidDiagram만', '-'] },
                        { cells: ['D3Container, AnimatedDiagram', '-', '-'] },
                        { cells: ['AppLayout, Sidebar, SearchModal', 'O', 'O'] },
                        { cells: ['TopicPage, TopicHeader', '-', 'O'] },
                        { cells: ['LearningCard, TopicNavigation', '-', 'O'] },
                        { cells: ['GlossaryTooltip (T)', '-', 'O'] },
                    ]}
                />
            </Section>
        </div>
    )
}

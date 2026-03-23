import { Section, Prose, InfoBox, CardGrid, Alert, CodeBlock } from '@study-ui/components'

const appLayoutCode = `// App.tsx
import { AppLayout, StudyProvider, ThemeProvider } from '@study-ui/components'

function App() {
    return (
        <ThemeProvider>
            <StudyProvider config={siteConfig}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route index element={<Home />} />
                            <Route path="topic/:id" element={<Topic />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </StudyProvider>
        </ThemeProvider>
    )
}`

const siteConfigCode = `const siteConfig: SiteConfig = {
    name: 'My Study',
    subtitle: 'Learning Platform',
    topics: [...],
    glossary: {
        entries: [...],
        categoryLabels: { process: '프로세스', memory: '메모리' },
        categoryColors: { process: 'text-blue-600 ...', memory: 'text-green-600 ...' },
    },
    searchIndex: [...],
    footerLinks: [
        { label: '용어 사전', to: '/glossary', icon: 'glossary' },
        { label: '개념 지도', to: '/graph', icon: 'graph' },
    ],
}`

const topicPageCode = `// Before: 각 토픽 페이지에서 반복
<div className="max-w-4xl mx-auto px-6 py-10 space-y-14">
    <header className="space-y-3">
        <p>Topic 01</p>
        <h1>리눅스 커널 개요</h1>
        <p>Linux Kernel Overview</p>
        <p>커널은 하드웨어와...</p>
    </header>
    <LearningCard topicId="01-overview" items={[...]} />
    ...sections...
    <TopicNavigation topicId="01-overview" />
</div>

// After: TopicPage로 통합
<TopicPage topicId="01-overview" learningItems={[
    '커널이 하는 일과 유저/커널 공간의 경계를 이해합니다',
    '시스템 콜이 어떻게 유저 프로그램과 커널을 연결하는지 배웁니다',
]}>
    ...sections...
</TopicPage>`

export function LayoutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Layout Components</h1>
                <p className="text-gray-500 dark:text-gray-400">3단 레이아웃 시스템과 네비게이션 컴포넌트</p>
            </div>

            <Section id="applayout" title="AppLayout">
                <Prose>
                    3단 레이아웃 (Sidebar | Content | TOC)을 제공하는 최상위 레이아웃 컴포넌트입니다.
                    이 문서 사이트 자체가 AppLayout을 사용하고 있습니다.
                </Prose>
                <CardGrid cols={3}>
                    <InfoBox color="blue" title="Sidebar">
                        토픽 네비게이션, 검색 버튼, 테마 토글, 모바일 드로어
                    </InfoBox>
                    <InfoBox color="green" title="Main Content">
                        React Router Outlet, 자동 스크롤 복귀, Cmd+K 검색
                    </InfoBox>
                    <InfoBox color="purple" title="Table of Contents">
                        h2/h3 자동 탐지, IntersectionObserver 활성 추적
                    </InfoBox>
                </CardGrid>

                <Alert variant="info">
                    좌우 패널은 토글 버튼으로 접을 수 있으며, 상태는 localStorage에 저장됩니다.
                    모바일에서는 사이드바가 오버레이 드로어로 동작합니다.
                </Alert>
                <CodeBlock code={appLayoutCode} language="tsx" filename="App.tsx" />
            </Section>

            <Section id="topic-page" title="TopicPage / TopicHeader">
                <Prose>
                    토픽 페이지의 공통 구조(헤더, LearningCard, 하단 네비게이션)를 자동으로 구성합니다.
                    topicId만 전달하면 StudyConfig에서 번호, 제목, 부제목, 설명을 가져옵니다.
                </Prose>
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="TopicHeader">
                        Topic 번호, 제목, 부제목, 설명을 자동 렌더링. topicId만 전달.
                    </InfoBox>
                    <InfoBox color="green" title="TopicPage">
                        TopicHeader + LearningCard + children + TopicNavigation 전체 래핑.
                    </InfoBox>
                </CardGrid>
                <CodeBlock code={topicPageCode} language="tsx" filename="TopicPage 사용 전/후" />
            </Section>

            <Section id="study-provider" title="StudyProvider">
                <Prose>
                    AppLayout, Sidebar, SearchModal, TopicNavigation 등이 사용하는 사이트 설정 Context입니다.
                    SiteConfig 객체를 통해 토픽, 용어집, 검색 인덱스, 푸터 링크를 주입합니다.
                </Prose>
                <CodeBlock code={siteConfigCode} language="typescript" filename="siteConfig.ts" />
            </Section>

            <Section id="responsive" title="반응형 동작">
                <CardGrid cols={3}>
                    <InfoBox color="gray" title="Mobile (~767px)">
                        1단 레이아웃. 사이드바는 햄버거 메뉴로 열리는 오버레이 드로어.
                        TOC는 숨김.
                    </InfoBox>
                    <InfoBox color="gray" title="Tablet (md: 768px+)">
                        2단 레이아웃. 사이드바가 왼쪽에 표시.
                        TOC는 여전히 숨김.
                    </InfoBox>
                    <InfoBox color="gray" title="Desktop (xl: 1280px+)">
                        3단 레이아웃. 사이드바 + 콘텐츠 + TOC 모두 표시.
                        양쪽 패널 토글 가능.
                    </InfoBox>
                </CardGrid>
            </Section>

            <Section id="keyboard" title="키보드 단축키">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">검색 모달 열기/닫기</span>
                        <kbd className="font-mono text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5">⌘K / Ctrl+K</kbd>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">검색 결과 탐색</span>
                        <kbd className="font-mono text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5">↑ ↓</kbd>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">검색 결과 이동</span>
                        <kbd className="font-mono text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5">Enter</kbd>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">모달 닫기</span>
                        <kbd className="font-mono text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5">Escape</kbd>
                    </div>
                </div>
            </Section>
        </div>
    )
}

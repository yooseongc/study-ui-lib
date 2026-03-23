import { Section, InfoBox, CardGrid, InfoTable, Alert, CodeBlock } from '@study-ui/components'

const searchFeatures = [
    { cells: ['토픽 검색', 'title, subtitle, tags, description 매칭', '가중 점수 정렬'] },
    { cells: ['용어 검색', 'term, aliases, definition 매칭', '용어사전 결과'] },
    { cells: ['섹션 검색', 'title 부분 매칭', '페이지 내 섹션 이동'] },
]

const keyboardShortcuts = [
    { cells: ['⌘K / Ctrl+K', '검색 모달 열기'] },
    { cells: ['↑ ↓', '결과 탐색'] },
    { cells: ['Enter ↵', '선택 항목으로 이동'] },
    { cells: ['Escape', '모달 닫기'] },
]

const configCode = `const siteConfig: SiteConfig = {
    name: 'My Study',
    subtitle: 'Description',
    topics: [
        {
            id: 'topic-01',
            title: 'Introduction',
            subtitle: '소개',
            tags: ['intro', '소개'],
            // ... 검색에 title, subtitle, tags, description 사용
        },
    ],
    glossary: {
        entries: [
            {
                id: 'tcp',
                term: 'TCP',
                aliases: ['Transmission Control Protocol'],
                definition: '신뢰성 있는 데이터 전송 프로토콜',
                // ... 검색에 term, aliases, definition 사용
            },
        ],
        categoryLabels: {},
        categoryColors: {},
    },
    searchIndex: [
        {
            topicId: 'topic-01',
            sectionId: 'section-1',
            title: '1.1 개요',
            route: '/topics/01-introduction#section-1',
        },
    ],
}`

const scoringCode = `// SearchModal 내부 점수 체계
function score(text: string, query: string): number {
    if (text === query)        return 4  // 완전 일치
    if (text.startsWith(query)) return 3  // 접두사 일치
    if (text.includes(query))   return 2  // 부분 일치
    return 0
}

// 토픽 검색: title ×4, subtitle ×3, tags ×2, description ×1
// 용어 검색: term ×4, aliases ×3, definition ×1`

export function SearchPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SearchModal</h1>
                <p className="text-gray-500 dark:text-gray-400">전역 검색 — 토픽, 용어, 섹션을 한 곳에서 검색</p>
            </div>

            <Section id="overview" title="개요">
                <Alert variant="tip" title="⌘K로 열기">
                    SearchModal은 AppLayout에 통합되어 있습니다. 어디서든 <kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-xs font-mono">⌘K</kbd>를 눌러 검색할 수 있습니다.
                </Alert>
                <CardGrid cols={3}>
                    <InfoBox color="blue" title="토픽 검색">
                        제목, 부제목, 태그, 설명을 가중 점수로 매칭하여 가장 관련도 높은 토픽 최대 5개를 표시합니다.
                    </InfoBox>
                    <InfoBox color="green" title="용어 검색">
                        용어명, 별칭(aliases), 정의를 검색하여 용어사전 결과를 최대 4개 표시합니다.
                    </InfoBox>
                    <InfoBox color="purple" title="섹션 검색">
                        searchIndex에 등록된 페이지 내 섹션 제목을 검색하여 해당 위치로 바로 이동합니다.
                    </InfoBox>
                </CardGrid>
            </Section>

            <Section id="features" title="검색 기능">
                <InfoTable
                    headers={['검색 유형', '매칭 대상', '비고']}
                    rows={searchFeatures}
                />
            </Section>

            <Section id="keyboard" title="키보드 단축키">
                <InfoTable
                    headers={[{ header: '키', mono: true }, { header: '동작' }]}
                    rows={keyboardShortcuts}
                />
            </Section>

            <Section id="scoring" title="점수 체계">
                <Alert variant="info" title="가중 점수 정렬">
                    검색 결과는 매칭 위치와 필드 가중치를 곱한 점수로 정렬됩니다. 완전 일치가 가장 높은 점수를 받습니다.
                </Alert>
                <CodeBlock code={scoringCode} language="typescript" filename="score-algorithm.ts" />
            </Section>

            <Section id="config" title="SiteConfig 연동">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    SearchModal은 <code className="font-mono text-sm text-blue-600 dark:text-blue-400">StudyProvider</code>의 SiteConfig에서 데이터를 가져옵니다.
                    topics, glossary.entries, searchIndex 세 필드가 검색 대상입니다.
                </p>
                <CodeBlock code={configCode} language="typescript" filename="siteConfig.ts" />
            </Section>

            <Section id="optimization" title="성능 최적화">
                <CardGrid cols={2}>
                    <InfoBox color="cyan" title="useMemo 캐싱">
                        검색 결과는 <code className="font-mono text-sm">useMemo</code>로 캐싱되어 query가 변경될 때만 재계산됩니다.
                    </InfoBox>
                    <InfoBox color="amber" title="useCallback">
                        검색 함수는 <code className="font-mono text-sm">useCallback</code>으로 메모이제이션되어 불필요한 재생성을 방지합니다.
                    </InfoBox>
                </CardGrid>
            </Section>
        </div>
    )
}

import { Section, Prose, CodeBlock, MermaidDiagram, AnimatedDiagram, Alert, InfoTable, CardGrid, InfoBox } from '@study-ui/components'
import type { AnimationStep } from '@study-ui/components'

const codeExample = `#include <stdio.h>

int main(void) {
    printf("Hello, Kernel!\\n");
    return 0;
}`

const mermaidChart = `graph TD
    A[User Space] -->|System Call| B[Kernel Space]
    B --> C[VFS Layer]
    B --> D[Network Stack]
    B --> E[Memory Manager]
    C --> F[ext4 / btrfs]
    D --> G[TCP/IP]
    E --> H[Page Allocator]`

const steps: AnimationStep[] = [
    { label: 'SYN', description: '클라이언트가 서버에 SYN 패킷을 보냅니다 (SEQ=100)' },
    { label: 'SYN-ACK', description: '서버가 SYN-ACK로 응답합니다 (SEQ=300, ACK=101)' },
    { label: 'ACK', description: '클라이언트가 ACK를 보내 연결이 수립됩니다 (ACK=301)' },
]

function renderHandshakeStep(step: number) {
    const states = [
        { client: 'SYN_SENT', arrow: '→ SYN', server: 'LISTEN' },
        { client: 'SYN_SENT', arrow: '← SYN-ACK', server: 'SYN_RCVD' },
        { client: 'ESTABLISHED', arrow: '→ ACK', server: 'ESTABLISHED' },
    ]
    const s = states[step]
    return (
        <div className="flex items-center justify-between px-8 py-6">
            <div className="text-center">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Client</div>
                <div className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg">
                    {s.client}
                </div>
            </div>
            <div className="text-center flex-1 mx-4">
                <div className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400">{s.arrow}</div>
            </div>
            <div className="text-center">
                <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Server</div>
                <div className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-lg">
                    {s.server}
                </div>
            </div>
        </div>
    )
}

const iframeRunnerCode = `import { IframeRunner } from '@study-ui/components'

// Basic usage — inline scripts in iframe
<IframeRunner
    files={[{ name: 'sketch.js', content: 'console.log("hello")' }]}
    libraryUrls={['/lib/p5.min.js']}
    baseUrl="/sketches/001_starfield/"
    width={600}
    height={400}
    title="Starfield sketch"
    allow="microphone; camera"
    pauseFn="noLoop"
    resumeFn="loop"
/>`

const iframeRunnerProps = [
    { cells: ['files', 'IframeRunnerFile[]', '[]', 'iframe body에 인라인 삽입할 스크립트 파일 배열'] },
    { cells: ['libraryUrls', 'string[]', '[]', 'iframe head에 로드할 외부 라이브러리 URL'] },
    { cells: ['srcdoc', 'string', '—', '직접 srcdoc을 전달 (files/libraryUrls 대신)'] },
    { cells: ['baseUrl', 'string', '—', 'iframe 내 상대 경로 기준 URL (<base> 태그)'] },
    { cells: ['bodyHtml', 'string', "''", 'iframe body에 스크립트 앞에 삽입할 HTML'] },
    { cells: ['css', 'string', "''", 'iframe head에 추가할 커스텀 CSS'] },
    { cells: ['width / height', 'number', '600', '캔버스 크기 힌트 (표시용)'] },
    { cells: ['pauseFn / resumeFn', 'string', "'noLoop' / 'loop'", 'iframe window에서 호출할 일시정지/재개 함수명'] },
    { cells: ['showConsole', 'boolean', 'true', '콘솔 패널 초기 표시 여부'] },
    { cells: ['title', 'string', "'Interactive sketch'", 'iframe title (접근성)'] },
    { cells: ['sandbox', 'string', "'allow-scripts ...'", 'iframe sandbox 속성'] },
]

const consolePanelCode = `import { ConsolePanel, useIframeConsole } from '@study-ui/components'

function MyRunner() {
    const { entries, clear } = useIframeConsole()

    return (
        <div>
            <iframe srcDoc={...} />
            <ConsolePanel entries={entries} onClear={clear} height={128} />
        </div>
    )
}`

const codeViewerCode = `import { CodeViewer } from '@study-ui/components'

const files = [
    { name: 'sketch.js', content: 'function setup() { ... }' },
    { name: 'particle.js', content: 'class Particle { ... }' },
]

// Code-only mode (no runner)
<CodeViewer files={files} language="javascript" />

// With runner (side-by-side layout)
<CodeViewer
    files={files}
    fileGroups={[
        { label: 'libraries', files: [{ name: 'p5.sound.js' }], defaultOpen: false },
        { label: 'core', files: [{ name: 'p5.min.js' }], defaultOpen: false },
    ]}
    runner={<MyP5Runner files={files} />}
    runnerHeight={400}
/>`

const fileExplorerCode = `import { FileExplorer } from '@study-ui/components'

<FileExplorer
    files={[
        { name: 'sketch.js', content: '...' },
        { name: 'particle.js', content: '...' },
    ]}
    groups={[
        { label: 'libraries', files: [{ name: 'p5.sound.js' }] },
    ]}
    activeIndex={0}
    onSelect={(i) => setActiveTab(i)}
    mainLabel="sketch"
/>`

const codeBlockCode = `<CodeBlock
    code={\`#include <stdio.h>
int main(void) { return 0; }\`}
    language="c"
    filename="hello.c"
/>`

export function VizComponentsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visualization Components</h1>
                <p className="text-gray-500 dark:text-gray-400">코드 블록, 다이어그램, 애니메이션 컴포넌트</p>
            </div>

            <Section id="codeblock" title="CodeBlock">
                <Prose>구문 강조, 줄 번호, 복사 버튼을 지원하는 코드 블록입니다.</Prose>
                <CodeBlock code={codeExample} language="c" filename="hello.c" />
                <CodeBlock code={codeBlockCode} language="tsx" filename="사용법" />
            </Section>

            <Section id="mermaid" title="MermaidDiagram">
                <Prose>Mermaid 문법으로 다이어그램을 렌더링합니다. 다크/라이트 모드에 자동 대응합니다.</Prose>
                <MermaidDiagram chart={mermaidChart} />
                <CodeBlock
                    code={`<MermaidDiagram chart={\`graph TD
    A[User Space] -->|System Call| B[Kernel Space]
    B --> C[VFS Layer]\`} />`}
                    language="tsx"
                    filename="사용법"
                />
            </Section>

            <Section id="animated" title="AnimatedDiagram">
                <Prose>단계별 애니메이션을 지원하는 다이어그램입니다. Play/Pause, Prev/Next 컨트롤을 제공합니다.</Prose>
                <AnimatedDiagram steps={steps} renderStep={renderHandshakeStep} autoPlayInterval={2000} />
            </Section>

            {/* ── Interactive Components ─────────────────────────── */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interactive Components</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">iframe 기반 코드 실행기, 코드 뷰어, 파일 탐색기, 콘솔 패널</p>
            </div>

            <Section id="iframe-runner" title="IframeRunner">
                <Prose>
                    iframe 안에서 스크립트를 격리 실행하는 범용 러너입니다.
                    콘솔 브릿지(postMessage)로 iframe 내부의 console.log/error를 부모 창에서 수신하며,
                    재시작/일시정지 컨트롤과 ConsolePanel을 내장합니다.
                </Prose>
                <CardGrid cols={3}>
                    <InfoBox color="blue" title="격리 실행">
                        sandbox iframe으로 스크립트를 안전하게 실행. srcdoc 또는 files 배열로 주입.
                    </InfoBox>
                    <InfoBox color="green" title="콘솔 브릿지">
                        log/warn/error/info + unhandled promise rejection을 postMessage로 캡처.
                    </InfoBox>
                    <InfoBox color="purple" title="Pause/Restart">
                        iframe window의 함수명을 지정하여 일시정지/재개. p5.js noLoop/loop 기본 지원.
                    </InfoBox>
                </CardGrid>
                <CodeBlock code={iframeRunnerCode} language="tsx" filename="IframeRunner 사용법" />
                <Alert variant="info" title="Props">
                    srcdoc을 직접 전달하면 files/libraryUrls/bodyHtml/css는 무시됩니다.
                </Alert>
                <InfoTable
                    headers={[
                        { header: 'Prop', mono: true },
                        { header: '타입', mono: true },
                        { header: '기본값', mono: true },
                        { header: '설명' },
                    ]}
                    rows={iframeRunnerProps}
                />
            </Section>

            <Section id="console-panel" title="ConsolePanel">
                <Prose>
                    콘솔 출력을 표시하는 독립 패널입니다.
                    IframeRunner에 내장되어 있지만, <code className="font-mono text-sm text-blue-600 dark:text-blue-400">useIframeConsole</code> 훅과
                    함께 별도로 사용할 수도 있습니다.
                    레벨별 아이콘/색상, 자동 스크롤, Clear 버튼을 제공합니다.
                </Prose>
                <CodeBlock code={consolePanelCode} language="tsx" filename="ConsolePanel 사용법" />
            </Section>

            <Section id="code-viewer" title="CodeViewer">
                <Prose>
                    멀티 파일 코드 뷰어입니다. 파일 탭, 구문 강조(react-syntax-highlighter), 3가지 레이아웃 모드(좌우/상하/코드만),
                    파일 트리 토글을 지원합니다. runner prop을 전달하면 코드와 실행 결과를 나란히 볼 수 있습니다.
                </Prose>
                <CardGrid cols={3}>
                    <InfoBox color="blue" title="Horizontal">
                        코드 왼쪽, 러너 오른쪽. 데스크톱 기본 레이아웃.
                    </InfoBox>
                    <InfoBox color="green" title="Vertical">
                        러너 위, 코드 아래. 좁은 화면에 적합.
                    </InfoBox>
                    <InfoBox color="purple" title="Code Only">
                        러너 없이 코드만 표시. runner prop이 없으면 자동 선택.
                    </InfoBox>
                </CardGrid>
                <CodeBlock code={codeViewerCode} language="tsx" filename="CodeViewer 사용법" />
            </Section>

            <Section id="file-explorer" title="FileExplorer">
                <Prose>
                    접이식 폴더 구조의 파일 탐색기입니다. CodeViewer에 내장되어 있으며, 독립적으로도 사용 가능합니다.
                    메인 파일 그룹 + 추가 그룹(libraries, core 등)을 표시하며 파일 선택 콜백을 지원합니다.
                </Prose>
                <CodeBlock code={fileExplorerCode} language="tsx" filename="FileExplorer 사용법" />
            </Section>
        </div>
    )
}

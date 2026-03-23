import { Section, Prose, CodeBlock, MermaidDiagram, AnimatedDiagram } from '@study-ui/components'
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
        </div>
    )
}

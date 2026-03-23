import { Section, InfoBox, CardGrid, InfoTable, Alert, CodeBlock } from '@study-ui/components'

const fontSizes = [
    { cells: ['text-xs', '12px', '캡션, 배지'] },
    { cells: ['text-sm', '14px', '보조 텍스트, 테이블'] },
    { cells: ['text-base', '16px', '본문'] },
    { cells: ['text-lg', '18px', '소제목'] },
    { cells: ['text-xl', '20px', '섹션 제목'] },
    { cells: ['text-2xl', '24px', '페이지 제목'] },
    { cells: ['text-3xl', '30px', '대제목'] },
]

const fontWeights = [
    { cells: ['400 (normal)', '본문 텍스트'] },
    { cells: ['500 (medium)', '소제목, 강조'] },
    { cells: ['600 (semibold)', '섹션 제목'] },
    { cells: ['700 (bold)', '페이지 제목, 강한 강조'] },
]

const cssCode = `@theme {
    --font-sans: 'Pretendard Variable', Pretendard,
        -apple-system, BlinkMacSystemFont,
        'Apple SD Gothic Neo', 'Noto Sans KR',
        system-ui, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code',
        'D2Coding', ui-monospace, monospace;
}`

export function TypographyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Typography</h1>
                <p className="text-gray-500 dark:text-gray-400">폰트 패밀리, 크기 스케일, 굵기, 한글/영문 혼용 가이드</p>
            </div>

            <Section id="font-family" title="폰트 패밀리">
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="본문 — Pretendard Variable">
                        한글과 영문 모두에 최적화된 가변(Variable) 폰트. 400~700 weight를 하나의 파일로 제공하며, 한글/영문
                        자간과 행간이 균일합니다.
                    </InfoBox>
                    <InfoBox color="purple" title="코드 — JetBrains Mono">
                        리가처(ligature) 지원 코딩 전용 폰트. 한글 코드 주석과 조화를 이루며, D3 시각화의 수치/코드
                        라벨에도 사용됩니다.
                    </InfoBox>
                </CardGrid>
                <CodeBlock code={cssCode} language="css" filename="base.css" />
            </Section>

            <Section id="font-size" title="크기 스케일">
                <InfoTable headers={['클래스', '크기', '용도']} rows={fontSizes} />
                <div className="space-y-3 mt-6 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                    <div className="text-xs text-gray-600 dark:text-gray-400">text-xs — 캡션 텍스트 (12px)</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">text-sm — 보조 텍스트 (14px)</div>
                    <div className="text-base text-gray-600 dark:text-gray-400">text-base — 본문 텍스트 (16px)</div>
                    <div className="text-lg text-gray-600 dark:text-gray-400">text-lg — 소제목 (18px)</div>
                    <div className="text-xl text-gray-600 dark:text-gray-400">text-xl — 섹션 제목 (20px)</div>
                    <div className="text-2xl text-gray-600 dark:text-gray-400">text-2xl — 페이지 제목 (24px)</div>
                    <div className="text-3xl text-gray-600 dark:text-gray-400">text-3xl — 대제목 (30px)</div>
                </div>
            </Section>

            <Section id="font-weight" title="굵기 가이드">
                <InfoTable headers={['Weight', '용도']} rows={fontWeights} />
                <div className="space-y-3 mt-6 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                    <div className="text-base font-normal text-gray-600 dark:text-gray-400">
                        font-normal (400) — 기본 본문에 사용합니다
                    </div>
                    <div className="text-base font-medium text-gray-600 dark:text-gray-400">
                        font-medium (500) — 소제목이나 약한 강조에 사용합니다
                    </div>
                    <div className="text-base font-semibold text-gray-600 dark:text-gray-400">
                        font-semibold (600) — 섹션 제목에 사용합니다
                    </div>
                    <div className="text-base font-bold text-gray-600 dark:text-gray-400">
                        font-bold (700) — 페이지 제목이나 강한 강조에 사용합니다
                    </div>
                </div>
            </Section>

            <Section id="mixed-lang" title="한글/영문 혼용">
                <Alert variant="tip" title="Pretendard Variable">
                    한글과 영문의 자간(letter-spacing)과 행간(line-height)이 균일하게 설계된 폰트입니다. 별도의 자간 조정
                    없이 사용할 수 있습니다.
                </Alert>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4 mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        Linux 커널의 <strong>task_struct</strong>는 프로세스의 모든 메타데이터를 담고 있는 핵심 자료구조입니다.
                        이 구조체는 <code className="font-mono text-blue-600 dark:text-blue-400">include/linux/sched.h</code>에
                        정의되어 있으며, PID, 메모리 맵, 스케줄링 정보 등을 포함합니다.
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        TCP의 3-way handshake는 <strong>SYN → SYN-ACK → ACK</strong> 순서로 진행됩니다.
                        이 과정에서 양쪽 호스트는 Initial Sequence Number(ISN)를 교환하고,
                        <code className="font-mono text-blue-600 dark:text-blue-400">net/ipv4/tcp_input.c</code>에서
                        상태 전이가 처리됩니다.
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 mt-4">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-widest">
                        Monospace 비교
                    </div>
                    <div className="font-mono text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <div>struct task_struct {'{'} pid_t pid; {'}'}</div>
                        <div>// 프로세스의 고유 식별자를 저장하는 필드</div>
                        <div>printf("PID: %d\n", current→pid);</div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
